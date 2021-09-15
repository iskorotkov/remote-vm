import * as vscode from 'vscode'
import { createVm, deleteVm, refreshVmTree, renameVm, signInViaBrowser, signOut } from './commands'
import { OAuthUriHandler } from './handlers'
import { VmTreeDataProvider } from './providers'
import { retrieveToken } from './tokens'

export async function activate (context: vscode.ExtensionContext) {
  console.log('activating remote vm extension')

  let token = await retrieveToken(context)
  if (token !== null) {
    console.log('retrieved token from secret storage')
  } else {
    console.log('token not present in secret storage')

    vscode.window.showInformationMessage('You need to sign in via browser in order to use Remove VM extension')
  }

  const vmProvider = new VmTreeDataProvider()

  // URI handler.
  context.subscriptions.push(vscode.window.registerUriHandler(new OAuthUriHandler(context, newToken => {
    token = newToken
    vscode.commands.executeCommand('remote-vm.refreshVmTree')
  })))

  // Commands: auth.
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signInViaBrowser', signInViaBrowser))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signOut', () => {
    token = null
    signOut({ context: context })

    vmProvider.refresh([])
  }))

  // Commands: VMs.
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.refreshVmTree', () => {
    if (token !== null) {
      refreshVmTree({ token: token })
        .then(data => vmProvider.refresh(data))
    } else {
      vscode.window.showErrorMessage('Can\'t refresh VM tree: no auth token')
    }
  }))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVm', () => {
    if (token !== null) {
      createVm({ token: token })

      setTimeout(() => vscode.commands.executeCommand('remote-vm.refreshVmTree'), 1000)
    } else {
      vscode.window.showErrorMessage('Can\'t create a new VM: no auth token')
    }
  }))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.renameVm', () => {
    if (token !== null) {
      renameVm({ token: token })

      setTimeout(() => vscode.commands.executeCommand('remote-vm.refreshVmTree'), 1000)
    } else {
      vscode.window.showErrorMessage('Can\'t create a new VM: no auth token')
    }
  }))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.deleteVm', () => {
    if (token !== null) {
      deleteVm({ token: token })

      setTimeout(() => vscode.commands.executeCommand('remote-vm.refreshVmTree'), 1000)
    } else {
      vscode.window.showErrorMessage('Can\'t create a new VM: no auth token')
    }
  }))

  // Tree views.
  context.subscriptions.push(vscode.window.registerTreeDataProvider('vmTree', vmProvider))

  if (token !== null) {
    vscode.commands.executeCommand('remote-vm.refreshVmTree')
  }
}

export function deactivate () { }
