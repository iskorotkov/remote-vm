import * as vscode from 'vscode'
import { loginInBrowser } from './commands'
import { OAuthUriHandler } from './handlers'

export async function activate (context: vscode.ExtensionContext) {
  console.log('activating remote-vm extension')

  context.subscriptions.push(vscode.window.registerUriHandler(new OAuthUriHandler()))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.login', loginInBrowser))
}

export function deactivate () { }
