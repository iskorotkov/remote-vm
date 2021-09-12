import { createApiClient } from 'dots-wrapper'
import * as vscode from 'vscode'
import { addConnectToVMCommand } from './commands/connectToVM'
import { addCreateVMCommand } from './commands/createVM'
import { addCreateVolumeCommand } from './commands/createVolume'
import { addDestroyVMCommand } from './commands/destroyVM'
import { addDestroyVolumeCommand } from './commands/destroyVolume'

export const username = 'root'
export const path = '/home'

export async function activate (context: vscode.ExtensionContext) {
  const token = vscode.workspace.getConfiguration('remote-vm').get<string>('do-token')

  if (!token) {
    await vscode.window.showWarningMessage('No token was specified in config. Specify token and retry')
    return
  }

  try {
    const client = createApiClient({
      token: token
    })

    addCreateVMCommand(context, client)
    addConnectToVMCommand(context, client)
    addDestroyVMCommand(context, client)
    addCreateVolumeCommand(context, client)
    addDestroyVolumeCommand(context, client)
  } catch (error) {
    await vscode.window.showErrorMessage(`Error occurred: ${error}`)
  }
}

export function deactivate () { }
