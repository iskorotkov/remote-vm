import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import {} from 'tslib'
import { createDroplet, getDropletIP, hasPublicIP, selectDroplet } from './digitalocean'
import { connectToHost } from './connect'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'

export async function activate (context: vscode.ExtensionContext) {
  const username = 'root'
  const path = '/home'

  const config = vscode.workspace.getConfiguration('remote-vm')
  const token = config.get<string>('do-token')

  if (!token) {
    throw Error('No token was specified in config. Specify token and retry')
  }

  const client = createApiClient({
    token: token
  })

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVM', async () => {
    try {
      const createdDroplet = await createDroplet(client)

      let droplet: IDroplet | undefined
      while (!droplet || !hasPublicIP(droplet)) {
        const dropletResponse = await client.droplet.getDroplet({ droplet_id: createdDroplet.id })
        droplet = dropletResponse.data.droplet
      }

      const host = getDropletIP(droplet)

      await connectToHost(host, username, path)
    } catch (error) {
      vscode.window.showErrorMessage(`Error occurred: ${error}`)
    }
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      const droplet = await selectDroplet(droplets)
      const host = getDropletIP(droplet)

      await connectToHost(host, username, path)
    } catch (error) {
      vscode.window.showErrorMessage(`Error occurred: ${error}`)
    }
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.destroyVM', async () => {
    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      const droplet = await selectDroplet(droplets)

      await client.droplet.deleteDroplet({ droplet_id: droplet.id })
    } catch (error) {
      vscode.window.showErrorMessage(`Error occurred: ${error}`)
    }
  }))
}

export function deactivate () {}
