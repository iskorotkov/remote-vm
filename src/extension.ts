import * as vscode from 'vscode'

export function activate (context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "remote-vm" is now active!')
  const disposable = vscode.commands.registerCommand('remote-vm.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from remote-vm!')
  })

  context.subscriptions.push(disposable)
}

export function deactivate () {}
