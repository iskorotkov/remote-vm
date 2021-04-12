import * as vscode from 'vscode'

export async function connectToHost (host: string, username: string, folder: string) {
  const copyOption = 'Copy SSH command'
  const connectOption = 'Connect'

  const selection = await vscode.window.showInformationMessage('Remote VM is ready', copyOption, connectOption)

  if (selection === copyOption) {
    await vscode.env.clipboard.writeText(`ssh ${username}@${host} -A`)
    return null
  } else if (selection === connectOption) {
    const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${username}@${host}${folder}`)

    try {
      await vscode.commands.executeCommand('vscode.openFolder', uri, false)
      return null
    } catch (error) {
      await vscode.window.showErrorMessage('Couldn\'t connect to created VM')
      return 'Couldn\'t connect to created VM'
    }
  } else {
    return 'Nothing was selected'
  }
}
