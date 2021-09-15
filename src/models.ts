import { Droplet, DropletNetworks, Image, NetworkV4, NetworkV6, Region } from './digitalocean/src'

export interface Vm {
  id: number,
  name: string,
  status: string,
  cpus: number,
  ram: number,
  storage: number,
  region: string,
  os: string,
  tags: string[],
  ipv4?: string,
  ipv6?: string
}

export function createVmFromDroplet (droplet: Droplet): Vm {
  const region = <Region>droplet.region
  const image = <Image>droplet.image
  const networks = <DropletNetworks>droplet.networks
  const v4 = <NetworkV4>networks.v4
  const v6 = <NetworkV6>networks.v6

  return {
    id: droplet.id,
    name: droplet.name,
    status: droplet.status,
    cpus: droplet.vcpus,
    ram: droplet.memory / 1024,
    storage: droplet.disk,
    region: region.name,
    os: image.description,
    tags: droplet.tags,
    ipv4: v4.ipAddress,
    ipv6: v6.ipAddress
  }
}
