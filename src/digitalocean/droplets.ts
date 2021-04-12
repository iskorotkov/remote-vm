import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import { IRegion } from 'dots-wrapper/dist/modules/region'
import { ISize } from 'dots-wrapper/dist/modules/size'
import { ISshKey } from 'dots-wrapper/dist/modules/ssh-key'
import { IVolume } from 'dots-wrapper/dist/modules/volume'
import * as vscode from 'vscode'
import { Client } from '../client'
import { selectRegion } from './regions'
import { selectDropletSize } from './sizes'
import { selectSshKeys } from './sshKeys'
import { selectVolumes } from './volumes'

export interface DropletParams {
  name: string;
  image: string;
  region: IRegion;
  size: ISize;
  sshKeys: ISshKey[];
  volumes: IVolume[];
  tags: string[];
  userData: string
}

export async function selectDroplet (droplets: IDroplet[]): Promise<IDroplet> {
  const availableDroplets = droplets
    .filter(droplet => droplet.networks.v4
      .find(ip => ip.type === 'public'))

  const selectedDroplet = await vscode.window.showQuickPick(availableDroplets.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: false,
    placeHolder: 'Select droplet'
  })

  return selectedDroplet?.value!
}

export async function createDroplet (client: Client, { name, region, image, size, sshKeys, volumes, tags, userData }: DropletParams): Promise<IDroplet> {
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

export async function selectDropletName () {
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

  return name
}

export async function selectDropletImage () {
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

  return image
}

export async function configureDroplet (client: Client): Promise<IDroplet> {
  const regionsResponse = await client.region.listRegions({})
  const region = await selectRegion(regionsResponse.data.regions)

  const sizesResponse = await client.size.listSizes({})
  const size = await selectDropletSize(sizesResponse.data.sizes, region)

  const sshKeysResponse = await client.sshKey.listSshKeys({})
  const sshKeys = await selectSshKeys(sshKeysResponse.data.ssh_keys)

  const volumesResponse = await client.volume.listVolumes({})
  const volumes = await selectVolumes(volumesResponse.data.volumes, region)

  const name = await selectDropletName()
  const image = await selectDropletImage()

  const tags: string[] = []
  const userData = ''

  const droplet = await createDroplet(client, { name, image, region, size, sshKeys, volumes, tags, userData })
  return droplet
}

export function hasPublicIP (droplet: IDroplet) {
  return droplet.networks.v4
    .find(ip => ip.type === 'public') === undefined
}

export function getDropletIP (droplet: IDroplet) {
  const publicIps = droplet.networks.v4
    .filter(ip => ip.type === 'public')

  if (publicIps.length === 0) {
    throw Error('Couldn\'t find public IPv4 on created VM')
  }

  return publicIps[0].ip_address
}
