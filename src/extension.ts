import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import {} from 'tslib'
import { enterDropletImage, enterName, enterSize, getDropletIP, hasPublicIP, selectDroplet, selectRegion, selectSize, selectSshKeys, selectVolume, selectVolumes } from './digitalocean'
import { connectToHost } from './connect'

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
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Create VM',
      cancellable: false
    }, async progress => {
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

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Connect to VM',
      cancellable: false
    }, async progress => {
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

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.destroyVM', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Destroy VM',
      cancellable: false
    }, async progress => {
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

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.createVolume', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Create volume',
      cancellable: false
    }, async progress => {
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
      } catch (error) {
        vscode.window.showErrorMessage(`Error occurred: ${error}`)
      }
    })
  }))

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.destroyVolume', async () => {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Destroy volume',
      cancellable: false
    }, async progress => {
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
      } catch (error) {
        vscode.window.showErrorMessage(`Error occurred: ${error}`)
      }
    })
  }))
}

export function deactivate () {}
