import * as vscode from 'vscode'
import { getDropletIP, selectDroplet, Client } from '../services/digitalocean'
import { connectToHost } from '../utils/connect'
import { username, path } from '../extension'

export function addConnectToVMCommand (context: vscode.ExtensionContext, client: Client) {
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Connect to VM',
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
        const host = getDropletIP(droplet)

        progress.report({
          message: 'Relaunching editor',
          increment: 40
        })

        await connectToHost(host, username, path)

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
