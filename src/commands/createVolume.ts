import * as vscode from 'vscode'
import { enterName, enterSize, selectRegion, Client } from '../services/digitalocean'
import * as Sentry from '@sentry/node'

export function addCreateVolumeCommand (context: vscode.ExtensionContext, client: Client) {
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVolume', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Create volume',
      cancellable: false
    }, async (progress) => {
      const tx = Sentry.startTransaction({
        name: 'Create volume dialog',
        op: 'create-volume'
      })

      try {
        progress.report({
          message: 'Fetching data',
          increment: 10
        })

        const regionsRequest = client.region.listRegions({})

        progress.report({
          message: 'Selecting region',
          increment: 10
        })

        const regionsResponse = await regionsRequest
        const region = await selectRegion(regionsResponse.data.regions)

        progress.report({
          message: 'Entering size',
          increment: 10
        })

        const size = await enterSize('Volume size', '1')

        progress.report({
          message: 'Entering name',
          increment: 10
        })

        const name = await enterName('Volume name', 'remove-vm-volume')

        const description = ''
        const filesystem = 'ext4'
        const tags: string[] = []

        progress.report({
          message: 'Creating volume',
          increment: 50
        })

        const volumeResponse = await client.volume.createVolume({
          name: name,
          description: description,
          filesystem_type: filesystem,
          size_gigabytes: parseInt(size),
          region: region.slug,
          tags: tags
        })

        if (!volumeResponse.data.volume) {
          throw Error('Couldn\'t create volume')
        }

        progress.report({
          message: 'Completed',
          increment: 10
        })

        Sentry.captureMessage('successfully created volume', Sentry.Severity.Log)
      } catch (error) {
        Sentry.captureException(error)
        await vscode.window.showErrorMessage(`Error occurred: ${error}`)
      } finally {
        tx.finish()
      }
    })
  }))
}
