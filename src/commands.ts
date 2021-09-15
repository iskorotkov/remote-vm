import axios from 'axios'
import * as vscode from 'vscode'
import { extensionName, publisherName } from './const'
import { Droplet, Image, Region, Size, SshKey } from './digitalocean/src'
import { createVmFromDroplet } from './models'
import { Token } from './tokens'
import { digitalOceanHost, serverHost } from './var'

export async function signInViaBrowser () {
  const redirectUrl = vscode.env.uriScheme
  const uri = `${serverHost}/api/v1/auth?redirect_url=${redirectUrl}://${publisherName}.${extensionName}/callback`

  await vscode.env.openExternal(vscode.Uri.parse(uri))
}

export async function signOut ({ token }: { token: Token }) {
  await token.deleteFromSecrets()
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
  return droplets.map(createVmFromDroplet)
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
    return null
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
    return null
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
    return null
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
    return null
  }

  const selectedName = await vscode.window.showInputBox({
    placeHolder: 'Enter virtual machine name (can be changed later)'
  })

  if (selectedName === undefined) {
    return null
  }

  const createdDroplet = await axios(await token.sign({
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

  return <Droplet>createdDroplet.data.droplet
}

export async function connect ({ host, user, path, openNewWindow }: { host: string, user: string, path: string, openNewWindow: boolean }) {
  const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${user}@${host}${path}`)
  await vscode.commands.executeCommand('vscode.openFolder', uri, openNewWindow)
}

export async function renameVm ({ token, id, name }: { token: Token, id: string, name: string }) {
  const selectedName = await vscode.window.showInputBox({
    placeHolder: 'Enter virtual machine name',
    value: name
  })

  if (selectedName === undefined) {
    return null
  }

  await axios(await token.sign({
    method: 'POST',
    url: `${digitalOceanHost}/v2/droplets/${id}/actions`,
    data: {
      type: 'rename',
      name: selectedName
    }
  }))

  return selectedName
}

export async function deleteVm ({ token, id }: { token: Token, id: string }) {
  await axios(await token.sign({
    method: 'DELETE',
    url: `${digitalOceanHost}/v2/droplets/${id}`
  }))
}
