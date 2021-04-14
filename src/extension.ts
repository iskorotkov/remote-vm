import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import {} from 'tslib'
import { createDroplet, getDropletIP, hasPublicIP, selectDroplet } from './digitalocean/droplets'
import { readConfig } from './config'
import { connectToHost, getConnectionString } from './connect'

async function copyOrConnect (droplet: IDroplet, username: string, path: string) {
  const host = getDropletIP(droplet)

  const copyOption = 'Copy SSH command'
  const connectOption = 'Connect'

  const selection = await vscode.window.showInformationMessage('Remote VM is ready', copyOption, connectOption)

  if (selection === copyOption) {
    await vscode.env.clipboard.writeText(getConnectionString(host, username))
  } else if (selection === connectOption) {
    await connectToHost(host, username, path)
  } else {
    throw Error('Nothing was selected')
  }
}

export async function activate (context: vscode.ExtensionContext) {
  const config = readConfig()
  const username = 'root'
  const path = '/home'

  const client = createApiClient({
    token: config.token
  })

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVM', async () => {
    try {
      const createdDroplet = await createDroplet(client)

      let fetchedDroplet: IDroplet | undefined
      while (fetchedDroplet === undefined || hasPublicIP(fetchedDroplet)) {
        const dropletResponse = await client.droplet.getDroplet({ droplet_id: createdDroplet.id })
        fetchedDroplet = dropletResponse.data.droplet
      }

      await copyOrConnect(fetchedDroplet, username, path)
    } catch (error) {
      vscode.window.showErrorMessage(`Error occurred: ${error}`)
    }
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      const droplet = await selectDroplet(droplets)

      await copyOrConnect(droplet, username, path)
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
