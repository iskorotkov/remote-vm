import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'
import { IRegion } from 'dots-wrapper/dist/modules/region'
import { ISize } from 'dots-wrapper/dist/modules/size'
import { ISshKey } from 'dots-wrapper/dist/modules/ssh-key'
import { IVolume } from 'dots-wrapper/dist/modules/volume'
import * as vscode from 'vscode'

export type Client = ReturnType<typeof createApiClient>

export function hasPublicIP (droplet: IDroplet) {
  return droplet.networks.v4
    .find(ip => ip.type === 'public') !== undefined
}

export function getDropletIP (droplet: IDroplet) {
  const publicIps = droplet.networks.v4
    .filter(ip => ip.type === 'public')

  if (publicIps.length === 0) {
    throw Error('Couldn\'t find public IPv4 on created VM')
  }

  return publicIps[0].ip_address
}

export async function enterName (description: string, initialValue: string) {
  const regex = /[a-zA-Z0-9-_]+/

  const value = await vscode.window.showInputBox({
    placeHolder: description,
    value: initialValue,
    validateInput (value: string) {
      if (value.length === 0) {
        return 'Value can\'t be empty'
      }

      if (!value.match(regex)) {
        return `Value must match regex ${regex}`
      }

      return null
    }
  })

  if (!value) {
    throw Error('Nothing was selected')
  }

  return value
}

export async function enterDropletImage (description: string, initialValue: string) {
  const regex = /[a-zA-Z0-9-_]+/

  const value = await vscode.window.showInputBox({
    placeHolder: description,
    value: initialValue,
    validateInput (value: string) {
      if (value.length === 0) {
        return 'Value can\'t be empty'
      }

      if (!value.match(regex)) {
        return `Value must match regex ${regex}`
      }

      return null
    }
  })

  if (!value) {
    throw Error('Nothing was selected')
  }

  return value
}

export function formatDropletSize (size: ISize) {
  return `${size.vcpus} CPUs, ${size.memory} MB RAM, ${size.disk} GB SDD - $${size.price_monthly}`
}

export function formatDropletInfo (droplet: IDroplet) {
  return `${droplet.vcpus} CPUs, ${droplet.memory} MB RAM, ${droplet.disk} GB SDD - ${droplet.status}`
}

export async function selectVolumes (volumes: IVolume[], region: IRegion): Promise<IVolume[]> {
  const items = volumes
    .filter(volume => volume.region.slug === region.slug)
    .map(volume => ({
      value: volume,
      label: volume.name,
      description: formatVolumeInfo(volume),
      picked: true
    }))

  const selected = await vscode.window.showQuickPick(items, {
    canPickMany: true,
    matchOnDetail: true,
    matchOnDescription: true,
    placeHolder: 'Select volumes'
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.map(item => item.value as IVolume)
}

export async function selectSshKeys (keys: ISshKey[]): Promise<ISshKey[]> {
  const items = keys.map(key => ({
    value: key,
    label: key.name,
    description: key.fingerprint,
    picked: true
  }))

  const selected = await vscode.window.showQuickPick(items, {
    canPickMany: true,
    matchOnDetail: true,
    matchOnDescription: true,
    placeHolder: 'Select SSH keys'
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.map(item => item.value as ISshKey)
}

export async function selectRegion (regions: IRegion[]): Promise<IRegion> {
  const items = regions
    .filter(region => region.available)
    .map(region => ({
      value: region,
      label: region.name
    }))

  const selected = await vscode.window.showQuickPick(items, {
    canPickMany: false,
    matchOnDetail: true,
    matchOnDescription: true,
    placeHolder: 'Select region'
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.value as IRegion
}

export async function selectDroplet (droplets: IDroplet[]): Promise<IDroplet> {
  const items = droplets
    .filter(droplet => droplet.status === 'active')
    .filter(droplet => droplet.networks.v4
      .find(ip => ip.type === 'public'))
    .map(droplet => ({
      value: droplet,
      label: droplet.name,
      description: formatDropletInfo(droplet)
    }))

  const selected = await vscode.window.showQuickPick(items, {
    canPickMany: false,
    matchOnDetail: true,
    matchOnDescription: true,
    placeHolder: 'Select droplet'
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.value as IDroplet
}

export async function selectSize (sizes: ISize[], region: IRegion): Promise<ISize> {
  const items = sizes
    .filter(size => size.regions.find(r => r === region.slug))
    .filter(size => size.available)
    .map(size => ({
      value: size,
      label: size.slug,
      description: formatDropletSize(size)
    }))

  const selected = await vscode.window.showQuickPick(items, {
    canPickMany: false,
    matchOnDetail: true,
    matchOnDescription: true,
    placeHolder: 'Select size'
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.value as ISize
}

export function formatVolumeInfo (volume: IVolume) {
  return `${volume.size_gigabytes} GB`
}

export async function selectVolume (volumes: IVolume[]): Promise<IVolume> {
  const items = volumes
    .map(volume => ({
      value: volume,
      label: volume.name,
      description: formatVolumeInfo(volume)
    }))

  const selected = await vscode.window.showQuickPick(items, {
    canPickMany: false,
    matchOnDetail: true,
    matchOnDescription: true,
    placeHolder: 'Select volume'
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.value as IVolume
}

export async function enterSize (description: string, initialValue: string) {
  const regex = /[0-9]+/

  const value = await vscode.window.showInputBox({
    placeHolder: description,
    value: initialValue,
    validateInput (value: string) {
      if (value.length === 0) {
        return 'Value can\'t be empty'
      }

      if (!value.match(regex)) {
        return `Value must match regex ${regex}`
      }

      return null
    }
  })

  if (!value) {
    throw Error('Nothing was selected')
  }

  return value
}
