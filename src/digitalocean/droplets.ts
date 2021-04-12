import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import { IRegion } from 'dots-wrapper/dist/modules/region'
import { ISize } from 'dots-wrapper/dist/modules/size'
import { ISshKey } from 'dots-wrapper/dist/modules/ssh-key'
import { IVolume } from 'dots-wrapper/dist/modules/volume'
import { Client } from '../client'
import { enterName } from '../ui/enterName'
import { selectSingle } from '../ui/selectSingle'
import { selectRegion } from './regions'
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

  return await selectSingle(availableDroplets, 'Select droplet')
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

  if (!dropletResponse.data.droplet) {
    throw Error('Couldn\'t create droplet')
  }

  return dropletResponse.data.droplet
}

export async function selectDropletSize (sizes: ISize[], region: IRegion): Promise<ISize> {
  const availableSizes = sizes
    .filter(size => size.regions.find(r => r === region.slug))
    .filter(size => size.available)

  const items = availableSizes.map(x => ({
    name: `${x.slug}: ${x.vcpus} CPUs, ${x.memory} MB RAM, ${x.disk}GB SSD ($${x.price_hourly}/h | $${x.price_monthly}/m)`,
    value: x
  }))

  const size = await selectSingle(items, 'Select size')
  return size.value
}

export async function selectDropletName (): Promise<string> {
  return await enterName('Droplet name', 'remote-vm')
}

export async function selectDropletImage (): Promise<string> {
  return await enterName('Droplet image', 'ubuntu-20-04-x64')
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
