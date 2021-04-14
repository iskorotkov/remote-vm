import * as vscode from 'vscode'

export function getConnectionString (host: string, username: string) {
  return `ssh ${username}@${host} -A`
}

export async function connectToHost (host: string, username: string, path:string) {
  const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${username}@${host}${path}`)
  await vscode.commands.executeCommand('vscode.openFolder', uri, false)
}
