import * as vscode from 'vscode'

export async function connectToHost (host: string, user: string, path: string) {
  try {
    const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${user}@${host}${path}`)
    await vscode.commands.executeCommand('vscode.openFolder', uri, false)
  } catch (error) {
    await vscode.window.showErrorMessage(`Error occurred when trying to connect to the host: ${error}`)
    throw error
  }
}
