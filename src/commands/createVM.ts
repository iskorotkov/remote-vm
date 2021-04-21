import * as vscode from 'vscode'
import { enterDropletImage, enterName, getDropletIP, hasPublicIP, selectRegion, selectSize, selectSshKeys, selectVolumes, Client } from '../services/digitalocean'
import { connectToHost } from '../utils/connect'
import { username, path } from '../extension'

export function addCreateVMCommand (context: vscode.ExtensionContext, client: Client) {
  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVM', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Create VM',
      cancellable: false
    }, async (progress) => {
      try {
        progress.report({
          message: 'Fetching data',
          increment: 10
        })

        const regionsRequest = client.region.listRegions({})
        const sizesRequest = client.size.listSizes({})
        const sshKeysRequest = client.sshKey.listSshKeys({})
        const volumesRequest = client.volume.listVolumes({})

        progress.report({
          message: 'Selecting region',
          increment: 5
        })

        const regionsResponse = await regionsRequest
        const region = await selectRegion(regionsResponse.data.regions)

        progress.report({
          message: 'Selecting size',
          increment: 5
        })

        const sizesResponse = await sizesRequest
        const size = await selectSize(sizesResponse.data.sizes, region)

        progress.report({
          message: 'Selecting SSH keys',
          increment: 5
        })

        const sshKeysResponse = await sshKeysRequest
        const sshKeys = await selectSshKeys(sshKeysResponse.data.ssh_keys)

        progress.report({
          message: 'Selecting volumes',
          increment: 5
        })

        const volumesResponse = await volumesRequest
        const volumes = await selectVolumes(volumesResponse.data.volumes, region)

        progress.report({
          message: 'Entering name',
          increment: 5
        })

        const name = await enterName('Droplet name', 'remote-vm')

        progress.report({
          message: 'Entering image',
          increment: 5
        })

        const image = await enterDropletImage('Droplet image', 'ubuntu-20-04-x64')

        progress.report({
          message: 'Selecting region',
          increment: 5
        })

        const tags: string[] = []
        const userData = ''

        progress.report({
          message: 'Creating VM',
          increment: 5
        })

        const dropletResponse = await client.droplet.createDroplet({
          name: name,
          image: image,
          region: region.slug,
          size: size.slug,
          backups: false,
          ipv6: true,
          monitoring: true,
          private_networking: true,
          ssh_keys: sshKeys.map(key => key.id),
          volumes: volumes.map(volume => volume.id),
          tags: tags,
          user_data: userData
        })

        if (!dropletResponse.data.droplet) {
          throw Error('Couldn\'t create droplet')
        }

        progress.report({
          message: 'VM created',
          increment: 10
        })

        const createdDroplet = dropletResponse.data.droplet

        progress.report({
          message: 'Waiting for VM startup',
          increment: 10
        })

        let completed = false

        const tryToConnect = async () => {
          const dropletResponse = await client.droplet.getDroplet({ droplet_id: createdDroplet.id })
          const droplet = dropletResponse.data.droplet

          if (droplet && droplet.status === 'active' && hasPublicIP(droplet)) {
            const host = getDropletIP(droplet)

            progress.report({
              message: 'Connecting to VM',
              increment: 10
            })

            setTimeout(async () => {
              progress.report({
                message: 'Relaunching editor',
                increment: 10
              })

              await connectToHost(host, username, path)
              completed = true

              progress.report({
                message: 'Completed',
                increment: 10
              })
            }, 10000)
          } else {
            setTimeout(tryToConnect, 1000)
          }
        }

        await tryToConnect()

        return new Promise<void>(resolve => {
          const checkCompleted = async () => {
            if (completed) {
              resolve()
            } else {
              setTimeout(checkCompleted, 1000)
            }
          }

          checkCompleted()
        })
      } catch (error) {
        vscode.window.showErrorMessage(`Error occurred: ${error}`)
      }
    })
  }))
}
