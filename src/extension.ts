import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import {} from 'tslib'
import { ISize } from 'dots-wrapper/dist/modules/size'
import { IRegion } from 'dots-wrapper/dist/modules/region'
import { ISshKey } from 'dots-wrapper/dist/modules/ssh-key'
import { IVolume } from 'dots-wrapper/dist/modules/volume'

interface DropletParams {
  name: string;
  image: string;
  region: IRegion;
  size: ISize;
  sshKeys: ISshKey[];
  volumes: IVolume[];
  tags: string[];
  userData: string
}

async function selectRegion (regions: IRegion[]): Promise<IRegion> {
  // TODO: Handle regions not fetched.
  // TODO: Handle zero regions available.
  // TODO: Handle no region or invalid region selected.
  // TODO: Handle region selection canceled.

  const availableRegions = regions
    .filter(region => region.available)

  const selectedRegion = await vscode.window.showQuickPick(availableRegions.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: false,
    placeHolder: 'Select region'
  })

  return selectedRegion?.value!
}

async function selectDropletSize (sizes: ISize[], region: IRegion): Promise<ISize> {
  // TODO: Handle no region was found in list.
  // TODO: Handle sizes not fetched.
  // TODO: Handle zero sizes available.
  // TODO: Handle zero sizes available in region.
  // TODO: Handle zero sizes available.
  // TODO: Handle no size or invalid size selected.
  // TODO: Handle size selection canceled.
  // TODO: Handle no size was found in list.

  const availableSizes = sizes
    .filter(size => size.regions.find(r => r === region.slug))
    .filter(size => size.available)

  const selectedSize = await vscode.window.showQuickPick(availableSizes.map(x => ({
    label: `${x.slug}: ${x.vcpus} CPUs, ${x.memory} MB RAM, ${x.disk}GB SSD ($${x.price_hourly}/h | $${x.price_monthly}/m)`,
    value: x
  })), {
    canPickMany: false,
    placeHolder: 'Select size'
  })

  return selectedSize?.value!
}

async function selectDroplet (droplets: IDroplet[]): Promise<IDroplet> {
  const availableDroplets = droplets
    .filter(droplet => droplet.networks.v4
      .find(ip => ip.type === 'public'))

  // TODO: Allow refreshing list of droplets.
  const selectedDroplet = await vscode.window.showQuickPick(availableDroplets.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: false,
    placeHolder: 'Select droplet'
  })

  return selectedDroplet?.value!
}

async function selectVolumes (volumes: IVolume[], region: IRegion): Promise<IVolume[]> {
  const volumesInRegion = volumes
    .filter(volume => volume.region === region)

  const selectedVolumes = await vscode.window.showQuickPick(volumesInRegion.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: true,
    placeHolder: 'Select volumes'
  })

  return selectedVolumes?.map(volume => volume.value)!
}

async function selectSshKeys (sshKeys: ISshKey[]): Promise<ISshKey[]> {
  const selectedKeys = await vscode.window.showQuickPick(sshKeys.map(x => ({
    label: x.name,
    picked: true,
    value: x
  })), {
    canPickMany: true,
    placeHolder: 'Select SSH keys'
  })

  return selectedKeys?.map(key => key.value)!
}

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

    async function createDroplet ({ name, region, image, size, sshKeys, volumes, tags, userData }: DropletParams): Promise<IDroplet> {
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
      return dropletResponse.data.droplet!
    }

    async function configureDroplet (): Promise<IDroplet> {
      const regionsResponse = await client.region.listRegions({})
      const region = await selectRegion(regionsResponse.data.regions)

      const sizesResponse = await client.size.listSizes({})
      const size = await selectDropletSize(sizesResponse.data.sizes, region)

      const sshKeysResponse = await client.sshKey.listSshKeys({})
      const sshKeys = await selectSshKeys(sshKeysResponse.data.ssh_keys)

      const volumesResponse = await client.volume.listVolumes({})
      const volumes = await selectVolumes(volumesResponse.data.volumes, region)

      const name = await vscode.window.showInputBox({
        placeHolder: 'Droplet name',
        value: 'remote-vm',
        validateInput (value: string) {
          if (value.length === 0) {
            return 'Name can\'t be empty'
          }

          if (!value.match(/[a-zA-Z0-9-_]+/)) {
            return 'Name must contain only alphanumeric symbols'
          }

          return null
        }
      }) ?? ''

      const image = await vscode.window.showInputBox({
        placeHolder: 'Droplet image',
        value: 'ubuntu-20-04-x64',
        validateInput (value: string) {
          if (value.length === 0) {
            return 'Image can\'t be empty'
          }

          if (!value.match(/[a-zA-Z0-9-_]+/)) {
            return 'Image must contain only alphanumeric symbols'
          }

          return null
        }
      }) ?? ''

      const tags: string[] = []
      const userData = ''

      const droplet = await createDroplet({ name, image, region, size, sshKeys, volumes, tags, userData })
      return droplet
    }

    async function connectToDroplet (droplet: IDroplet) {
      const publicIps = droplet.networks.v4
        .filter(ip => ip.type === 'public')

      if (publicIps.length === 0) {
        await vscode.window.showErrorMessage('Couldn\'t find public IPv4 on created VM')
        return
      }

      const host = publicIps[0].ip_address

      const copyOption = 'Copy SSH command'
      const connectOption = 'Connect'
      const selection = await vscode.window.showInformationMessage('Remote VM is ready', copyOption, connectOption)
      if (selection === copyOption) {
        await vscode.env.clipboard.writeText(`ssh ${username}@${host} -A`)
      } else {
        const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${username}@${host}${folder}`)
        try {
          await vscode.commands.executeCommand('vscode.openFolder', uri, false)
        } catch (error) {
          await vscode.window.showErrorMessage('Couldn\'t connect to created VM')
        }
      }
    }

    try {
      const dropletsResponse = await client.droplet.listDroplets({})
      const droplets = dropletsResponse.data.droplets
      if (droplets.length === 0) {
        const createdDroplet = await configureDroplet()

        let fetchedDroplet: IDroplet | undefined
        while (fetchedDroplet === undefined ||
          fetchedDroplet.networks.v4.find(ip => ip.type === 'public') === undefined) {
          const dropletResponse = await client.droplet.getDroplet({
            droplet_id: createdDroplet.id
          })
          fetchedDroplet = dropletResponse.data.droplet
        }

        await connectToDroplet(fetchedDroplet)
      } else {
        const droplet = await selectDroplet(droplets)
        // TODO: Mount/unmount volumes.
        await connectToDroplet(droplet)
      }
    } catch (error) {
      vscode.window.showErrorMessage('Error occurred', error)
    }
  }))

  // context.subscriptions.push(vscode.commands.registerCommand('remote-vm.disconnectFromVm', async () => {

  // })
}

export function deactivate () {}
