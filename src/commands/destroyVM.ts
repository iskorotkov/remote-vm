import * as vscode from 'vscode'
import { selectDroplet, Client } from '../services/digitalocean'

export function addDestroyVMCommand (context: vscode.ExtensionContext, client: Client) {
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.destroyVM', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Destroy VM',
      cancellable: false
    }, async (progress) => {
      try {
        progress.report({
          message: 'Fetching list of VMs',
          increment: 10
        })

        const dropletsResponse = await client.droplet.listDroplets({})
        const droplets = dropletsResponse.data.droplets

        progress.report({
          message: 'Selecting VM',
          increment: 40
        })

        const droplet = await selectDroplet(droplets)

        progress.report({
          message: 'Destroying VM',
          increment: 40
        })

        await client.droplet.deleteDroplet({ droplet_id: droplet.id })

        progress.report({
          message: 'Completed',
          increment: 10
        })
      } catch (error) {
        vscode.window.showErrorMessage(`Error occurred: ${error}`)
      }
    })
  }))
}
