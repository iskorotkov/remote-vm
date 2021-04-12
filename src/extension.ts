import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import {} from 'tslib'
import { createDroplet, getDropletIP, hasPublicIP, selectDroplet } from './digitalocean/droplets'
import { readConfig } from './config'
import { connect, connectionString } from './connect'

export async function activate (context: vscode.ExtensionContext) {
  const config = readConfig()
  const username = 'root'
  const folder = '/home'

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    const client = createApiClient({
      token: config.token
    })

    let host = ''

    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      if (droplets.length === 0) {
        const createdDroplet = await createDroplet(client)

        let fetchedDroplet: IDroplet | undefined
        while (fetchedDroplet === undefined || hasPublicIP(fetchedDroplet)) {
          const dropletResponse = await client.droplet.getDroplet({
            droplet_id: createdDroplet.id
          })
          fetchedDroplet = dropletResponse.data.droplet
        }

        host = getDropletIP(fetchedDroplet)
      } else {
        const droplet = await selectDroplet(droplets)
        host = getDropletIP(droplet)
      }

      const copyOption = 'Copy SSH command'
      const connectOption = 'Connect'

      const selection = await vscode.window.showInformationMessage('Remote VM is ready', copyOption, connectOption)

      if (selection === copyOption) {
        await vscode.env.clipboard.writeText(connectionString(host, username))
      } else if (selection === connectOption) {
        await connect(host, username, folder)
      } else {
        throw Error('Nothing was selected')
      }
    } catch (error) {
      vscode.window.showErrorMessage('Error occurred', error)
    }
  }))

  // context.subscriptions.push(vscode.commands.registerCommand('remote-vm.disconnectFromVm', async () => {

  // })
}

export function deactivate () {}
