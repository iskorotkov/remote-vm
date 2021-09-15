import axios from 'axios'
import * as vscode from 'vscode'
import { extensionName, publisherName } from './const'
import { Droplet, DropletNetworks, Image, NetworkV4, NetworkV6, Region, Size, SshKey } from './digitalocean/src'
import { Vm } from './models'
import { deleteToken, Token } from './tokens'
import { digitalOceanHost, serverHost } from './var'

export async function signInViaBrowser () {
  const redirectUrl = vscode.env.uriScheme
  const uri = `${serverHost}/api/v1/auth?redirect_url=${redirectUrl}://${publisherName}.${extensionName}/callback`

  await vscode.env.openExternal(vscode.Uri.parse(uri))
}

export async function signOut (props: { context: vscode.ExtensionContext }) {
  await deleteToken(props.context)
}

export async function refreshVmTree ({ token }: { token: Token }) {
  const response = await axios(await token.sign({
    method: 'GET',
    url: `${digitalOceanHost}/v2/droplets`,
    params: {
      per_page: 200,
      page: 1
    }
  }))

  const droplets = <Droplet[]>response.data.droplets

  return droplets.map(item => {
    const region = <Region>item.region
    const image = <Image>item.image
    const networks = <DropletNetworks>item.networks
    const v4 = <NetworkV4>networks.v4
    const v6 = <NetworkV6>networks.v6

    return new Vm(item.id, item.name, item.status, item.vcpus, item.memory / 1024, item.disk, region.name, image.description, item.tags, v4.ipAddress, v6.ipAddress)
  })
}

export async function createVm ({ token }: { token: Token }) {
  const sizesPromise = axios(await token.sign({
    method: 'GET',
    url: `${digitalOceanHost}/v2/sizes`,
    params: {
      per_page: 200,
      page: 1
    }
  }))
  const regionsPromise = axios(await token.sign({
    method: 'GET',
    url: `${digitalOceanHost}/v2/regions`,
    params: {
      per_page: 200,
      page: 1
    }
  }))
  const imagesPromise = axios(await token.sign({
    method: 'GET',
    url: `${digitalOceanHost}/v2/images`,
    params: {
      per_page: 200,
      page: 1,
      type: 'distribution'
    }
  }))
  const keysPromise = axios(await token.sign({
    method: 'GET',
    url: `${digitalOceanHost}/v2/account/keys`,
    params: {
      per_page: 200,
      page: 1
    }
  }))

  const regions = <Region[]>(await regionsPromise).data.regions
  const selectedRegion = await vscode.window.showQuickPick(regions
    .filter(region => region.available)
    .map(region => <vscode.QuickPickItem>{
      label: region.name,
      description: region.slug
    }), {
    placeHolder: 'Select region'
  })

  if (selectedRegion === undefined) {
    return
  }

  const images = <Image[]>(await imagesPromise).data.images
  const selectedImage = await vscode.window.showQuickPick(images
    .filter(image => {
      const regions = <string[]>(image.regions)
      return regions.indexOf(selectedRegion.description!) !== -1
    })
    .map(image => <vscode.QuickPickItem>{
      label: image.description,
      description: image.slug
    }), {
    placeHolder: 'Select image'
  })

  if (selectedImage === undefined) {
    return
  }

  const sizes = <Size[]>(await sizesPromise).data.sizes
  const selectedSize = await vscode.window.showQuickPick(sizes
    .filter(size => {
      const regions = <string[]>(size.regions)
      return regions.indexOf(selectedRegion.description!) !== -1
    })
    .map(size => <vscode.QuickPickItem>{
      // @ts-ignore
      label: `${size.vcpus} CPUs / ${size.memory / 1024} GB / ${size.disk} GB / $${size.price_monthly}`,
      description: size.slug
    }), {
    placeHolder: 'Select size'
  })

  if (selectedSize === undefined) {
    return
  }

  const keys = <SshKey[]>(await keysPromise).data.ssh_keys
  const selectedKeys = await vscode.window.showQuickPick(keys
    .map(key => <vscode.QuickPickItem>{
      label: key.name,
      description: key.fingerprint,
      picked: true
    }), {
    placeHolder: 'Select SSH keys used to connect to virtual machine',
    canPickMany: true
  })

  if (selectedKeys === undefined) {
    return
  }

  const selectedName = await vscode.window.showInputBox({
    placeHolder: 'Enter virtual machine name (can be changed later)'
  })

  if (selectedName === undefined) {
    return
  }

  await axios(await token.sign({
    method: 'POST',
    url: `${digitalOceanHost}/v2/droplets`,
    data: {
      name: selectedName,
      region: selectedRegion.description,
      size: selectedSize.description,
      image: selectedImage.description,
      ssh_keys: selectedKeys.map(key => key.description),
      backups: false,
      ipv6: true,
      monitoring: true,
      tags: []
    }
  }))
}

export async function renameVm ({ token, id }: { token: Token, id: string }) {
  const selectedName = await vscode.window.showInputBox({
    placeHolder: 'Enter virtual machine name'
  })

  if (selectedName === undefined) {
    return
  }

  await axios(await token.sign({
    method: 'POST',
    url: `${digitalOceanHost}/v2/droplets/${id}/actions`,
    data: {
      type: 'rename',
      name: selectedName
    }
  }))
}

export async function deleteVm ({ token, id }: { token: Token, id: string }) {
  await axios(await token.sign({
    method: 'DELETE',
    url: `${digitalOceanHost}/v2/droplets/${id}`
  }))
}
