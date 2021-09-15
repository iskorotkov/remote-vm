import * as vscode from 'vscode'
import { createVm, deleteVm, refreshVmList, renameVm, signInViaBrowser, signOut } from './commands'
import { OAuthUriHandler } from './handlers'
import { VmTreeDataProvider } from './providers'
import { retrieveToken } from './tokens'

export async function activate (context: vscode.ExtensionContext) {
  console.log('activating remote vm extension')

  const token = await retrieveToken(context)
  if (token) {
    console.log('retrieved token from secret storage')
  } else {
    console.log('token not present in secret storage')

    vscode.window.showInformationMessage('You need to sign in via browser in order to use Remove VM extension')
  }

  // URI handler.
  context.subscriptions.push(vscode.window.registerUriHandler(new OAuthUriHandler(context)))

  // Commands: auth.
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signInViaBrowser', signInViaBrowser))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signOut', signOut))

  // Commands: VMs.
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.refreshVmList', refreshVmList))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVm', createVm))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.renameVm', renameVm))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.deleteVm', deleteVm))

  // Tree views.
  context.subscriptions.push(vscode.window.registerTreeDataProvider('vmTree', new VmTreeDataProvider()))
}

export function deactivate () { }
