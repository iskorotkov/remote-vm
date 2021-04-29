import * as vscode from 'vscode'
import * as Sentry from '@sentry/node'

export async function connectToHost (host: string, username: string, path: string) {
  try {
    const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${username}@${host}${path}`)
    await vscode.commands.executeCommand('vscode.openFolder', uri, false)

    Sentry.captureMessage('successfully connected to host', Sentry.Severity.Log)
  } catch (error) {
    Sentry.captureException(error)
    await vscode.window.showErrorMessage(`Error occurred when trying to connect to the host: ${error}`)
    throw error
  }
}
