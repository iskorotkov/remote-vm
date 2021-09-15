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
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVm', createVm))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.renameVm', renameVm))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.deleteVm', deleteVm))

  // Tree views.
  context.subscriptions.push(vscode.window.registerTreeDataProvider('vmTree', vmProvider))

  if (token !== null) {
    await vscode.commands.executeCommand('remote-vm.refreshVmTree')
  }
}

export function deactivate () { }
