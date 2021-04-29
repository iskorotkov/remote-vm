import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import * as Sentry from '@sentry/node'
import { environment, release } from './meta'
import { addCreateVMCommand } from './commands/createVM'
import { addConnectToVMCommand } from './commands/connectToVM'
import { addDestroyVMCommand } from './commands/destroyVM'
import { addCreateVolumeCommand } from './commands/createVolume'
import { addDestroyVolumeCommand } from './commands/destroyVolume'

export const username = 'root'
export const path = '/home'

export async function activate (context: vscode.ExtensionContext) {
  Sentry.init({
    dsn: 'https://4a44f71cb9314f6cb6fbfdada15a8f8b@o575650.ingest.sentry.io/5728149',
    tracesSampleRate: 1.0,
    environment: environment,
    release: release
  })

  const token = vscode.workspace.getConfiguration('remote-vm').get<string>('do-token')

  if (!token) {
    Sentry.captureMessage('no token was specified', Sentry.Severity.Warning)
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

    Sentry.captureMessage('extension was successfully activated', Sentry.Severity.Log)
  } catch (error) {
    Sentry.captureException(error)
    await vscode.window.showErrorMessage(`Error occurred: ${error}`)
  }
}

export function deactivate () { }
