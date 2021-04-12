import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import {} from 'tslib'
import { showVMReadyMessage } from './connect'
import { configureDroplet, getDropletIP, hasPublicIP, selectDroplet } from './digitalocean/droplets'
import { readConfig } from './config'

export async function activate (context: vscode.ExtensionContext) {
  const config = readConfig()
  const username = 'root'
  const folder = '/home'

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    const client = createApiClient({
      token: config.token
    })

    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      if (droplets.length === 0) {
        const createdDroplet = await configureDroplet(client)

        let fetchedDroplet: IDroplet | undefined
        while (fetchedDroplet === undefined || hasPublicIP(fetchedDroplet)) {
          const dropletResponse = await client.droplet.getDroplet({
            droplet_id: createdDroplet.id
          })
          fetchedDroplet = dropletResponse.data.droplet
        }

        const ip = getDropletIP(fetchedDroplet)
        await showVMReadyMessage(ip, username, folder)
      } else {
        const droplet = await selectDroplet(droplets)
        const ip = getDropletIP(droplet)
        await showVMReadyMessage(ip, username, folder)
      }
    } catch (error) {
      vscode.window.showErrorMessage('Error occurred', error)
    }
  }))

  // context.subscriptions.push(vscode.commands.registerCommand('remote-vm.disconnectFromVm', async () => {

  // })
}

export function deactivate () {}
