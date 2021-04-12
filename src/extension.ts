import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import {} from 'tslib'
import { connectToDroplet } from './connect'
import { configureDroplet, getDropletIP, selectDroplet } from './digital-ocean/droplets'

export async function activate (context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('remote-vm')
  const token = config.get<string>('do-token')

  const username = 'root'
  const folder = '/home'

  if (token === undefined) {
    await vscode.window.showErrorMessage('Token wasn\'t found')
    return
  }

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    const client = createApiClient({
      token: token
    })

    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      if (droplets.length === 0) {
        const createdDroplet = await configureDroplet(client)

        let fetchedDroplet: IDroplet | undefined
        while (fetchedDroplet === undefined ||
          fetchedDroplet.networks.v4.find(ip => ip.type === 'public') === undefined) {
          const dropletResponse = await client.droplet.getDroplet({
            droplet_id: createdDroplet.id
          })
          fetchedDroplet = dropletResponse.data.droplet
        }

        const ip = getDropletIP(fetchedDroplet)
        await connectToDroplet(ip, username, folder)
      } else {
        const droplet = await selectDroplet(droplets)
        const ip = getDropletIP(droplet)
        await connectToDroplet(ip, username, folder)
      }
    } catch (error) {
      vscode.window.showErrorMessage('Error occurred', error)
    }
  }))

  // context.subscriptions.push(vscode.commands.registerCommand('remote-vm.disconnectFromVm', async () => {

  // })
}

export function deactivate () {}
