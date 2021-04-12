import * as vscode from 'vscode'

export function connectionString (host: string, username: string) {
  return `ssh ${username}@${host} -A`
}

export async function connect (host: string, username: string, path:string) {
  const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${username}@${host}${path}`)
  await vscode.commands.executeCommand('vscode.openFolder', uri, false)
}
