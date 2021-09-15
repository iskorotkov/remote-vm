import * as vscode from 'vscode'
import { createVm, deleteVm, refreshVmTree, renameVm, signInViaBrowser, signOut } from './commands'
import { OAuthUriHandler } from './handlers'
import { createVmFromDroplet, Vm } from './models'
import { VmTreeDataProvider } from './providers'
import { Token } from './tokens'

export async function activate (context: vscode.ExtensionContext) {
  console.log('activating remote vm extension')

  let token = await Token.loadFromSecrets(context)
  if (token !== null) {
    console.log('retrieved token from secret storage')
  } else {
    console.log('token not present in secret storage')

    vscode.window.showInformationMessage('You need to sign in via browser in order to use Remove VM extension')
  }

  let vms: Vm[] = []

  const vmProvider = new VmTreeDataProvider()

  // URI handler.
  context.subscriptions.push(vscode.window.registerUriHandler(new OAuthUriHandler(context, newToken => {
    token = newToken
    vscode.commands.executeCommand('remote-vm.refreshVmTree')
  })))

  // Commands: auth.
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signInViaBrowser', () => {
    signInViaBrowser()
      .catch(error => {
        console.error(error)
        vscode.window.showErrorMessage('Couldn\'t sign in via browser. Please open an issue on GitHub repo if this error persists')
      })
  }))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signOut', () => {
    if (token === null) {
      vscode.window.showWarningMessage('You are non signed in to Remote VM extension')
      return
    }

    signOut({ token: token })
      .then(() => {
        token = null

        vmProvider.refresh([])
      }, error => {
        console.error(error)
        vscode.window.showErrorMessage('Couldn\'t sign out properly. Please open an issue on GitHub repo if this error persists')
      })
  }))

  // Commands: VMs.
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.refreshVmTree', () => {
    if (token === null) {
      vscode.window.showWarningMessage('Can\'t refresh list of virtual machines: no auth token')
      return
    }

    refreshVmTree({ token: token })
      .then(data => {
        vms = data

        vmProvider.refresh(vms)
      }, error => {
        console.error(error)
        vscode.window.showErrorMessage('Couldn\'t refresh list of virtual machines. Make sure you are connected to the Internet')
      })
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVm', () => {
    if (token === null) {
      vscode.window.showWarningMessage('Can\'t create a new virtual machine: no auth token')
      return
    }

    createVm({ token: token })
      .then(droplet => {
        if (droplet !== null) {
          vms.push(createVmFromDroplet(droplet))

          vmProvider.refresh(vms)
        }
      }, error => {
        console.error(error)
        vscode.window.showErrorMessage('Couldn\'t create a new virtual machine with provided properties. Make sure you entered correct values')
      })
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.renameVm', (item: vscode.TreeItem) => {
    if (token === null) {
      vscode.window.showWarningMessage('Can\'t rename virtual machine: no auth token')
      return
    }

    if (typeof item.label !== 'string') {
      console.error('item.label must be of type string')
      vscode.window.showErrorMessage('Rename failed due to a bug. Please open an issue on GitHub repo')

      return
    }

    renameVm({ token: token, id: item.id!, name: item.label })
      .then(name => {
        if (name !== null) {
          vms
            .filter(vm => vm.id.toString() === item.id!)
            .forEach(vm => { vm.name = name })

          vmProvider.refresh(vms)
        }
      }, error => {
        console.error(error)
        vscode.window.showErrorMessage('Couldn\'t rename a virtual machine using provided name. Make sure you entered a correct value')
      })
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.deleteVm', (item: vscode.TreeItem) => {
    if (token === null) {
      vscode.window.showWarningMessage('Can\'t delete virtual machine: no auth token')
      return
    }

    deleteVm({ token: token, id: item.id! })
      .then(() => {
        const deletedAt = vms.findIndex(vm => vm.id.toString() === item.id!)
        vms.splice(deletedAt, 1)

        vmProvider.refresh(vms)
      }, error => {
        console.error(error)
        vscode.window.showErrorMessage('Couldn\'t delete a virtual machine. Make sure no other resources depend on it')
      })
  }))

  // Tree views.
  context.subscriptions.push(vscode.window.registerTreeDataProvider('vmTree', vmProvider))

  if (token !== null) {
    vscode.commands.executeCommand('remote-vm.refreshVmTree')
  }
}

export function deactivate () { }
