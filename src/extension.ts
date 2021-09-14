import * as vscode from 'vscode'
import { createVm, deleteVm, refreshVmList, renameVm, signInViaBrowser, signOut, viewVmInfo } from './commands'
import { OAuthUriHandler } from './handlers'

export async function activate (context: vscode.ExtensionContext) {
  console.log('activating remote vm extension')

  context.subscriptions.push(vscode.window.registerUriHandler(new OAuthUriHandler()))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signInViaBrowser', signInViaBrowser))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.signOut', signOut))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.refreshVmList', refreshVmList))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVm', createVm))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.viewVmInfo', viewVmInfo))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.renameVm', renameVm))
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.deleteVm', deleteVm))
}

export function deactivate () { }
