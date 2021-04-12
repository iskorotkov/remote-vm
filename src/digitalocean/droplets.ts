import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import { Client } from './client'
import { enterName } from '../ui/enterName'
import { selectMultiple } from '../ui/selectMultiple'
import { selectSingle } from '../ui/selectSingle'

export async function selectDroplet (droplets: IDroplet[]): Promise<IDroplet> {
  const availableDroplets = droplets
    .filter(droplet => droplet.networks.v4
      .find(ip => ip.type === 'public'))

  return await selectSingle(availableDroplets, 'Select droplet')
}

export async function createDroplet (client: Client): Promise<IDroplet> {
  const regionsResponse = await client.region.listRegions({})
  const availableRegions = regionsResponse.data.regions.filter(region => region.available)
  const region = await selectSingle(availableRegions, 'Select region')

  const sizesResponse = await client.size.listSizes({})
  const availableSizes = sizesResponse.data.sizes
    .filter(size => size.regions.find(r => r === region.slug))
    .filter(size => size.available)
  const sizes = availableSizes.map(x => ({
    name: `${x.slug}: ${x.vcpus} CPUs, ${x.memory} MB RAM, ${x.disk}GB SSD ($${x.price_hourly}/h | $${x.price_monthly}/m)`,
    value: x
  }))
  const size = (await selectSingle(sizes, 'Select size')).value

  const sshKeysResponse = await client.sshKey.listSshKeys({})
  const sshKeys = await selectMultiple(sshKeysResponse.data.ssh_keys, 'Select SSH keys')

  const volumesResponse = await client.volume.listVolumes({})
  const volumesInRegion = volumesResponse.data.volumes.filter(volume => volume.region === region)
  const volumes = await selectMultiple(volumesInRegion, 'Select volumes')

  const name = await enterName('Droplet name', 'remote-vm')
  const image = await enterName('Droplet image', 'ubuntu-20-04-x64')

  const tags: string[] = []
  const userData = ''

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
