import * as vscode from 'vscode'
import { selectVolume, Client } from '../services/digitalocean'
import * as Sentry from '@sentry/node'

export function addDestroyVolumeCommand (context: vscode.ExtensionContext, client: Client) {
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.destroyVolume', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Destroy volume',
      cancellable: false
    }, async (progress) => {
      try {
        progress.report({
          message: 'Fetching list of volumes',
          increment: 10
        })

        const volumesResponse = await client.volume.listVolumes({})
        const volumes = volumesResponse.data.volumes

        progress.report({
          message: 'Selecting volume',
          increment: 40
        })

        const volume = await selectVolume(volumes)

        progress.report({
          message: 'Destroying volume',
          increment: 40
        })

        await client.volume.deleteVolume({ volume_id: volume.id })

        progress.report({
          message: 'Completed',
          increment: 10
        })

        Sentry.captureMessage('successfully destroyed volume', Sentry.Severity.Log)
      } catch (error) {
        Sentry.captureException(error)
        await vscode.window.showErrorMessage(`Error occurred: ${error}`)
      }
    })
  }))
}
