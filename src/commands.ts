import axios, { Method } from 'axios'
import * as vscode from 'vscode'
import { extensionName, publisherName } from './const'
import { Droplet, DropletNetworks, Image, NetworkV4, NetworkV6, Region } from './digitalocean/src'
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

export async function refreshVmTree (props: { token: Token }) {
  if (props.token.expired()) {
    await props.token.refresh()
  }

  const response = await axios(props.token.sign({
    method: <Method>'GET',
    url: `${digitalOceanHost}/v2/droplets`
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

export async function createVm (props: { token: Token, vm: Vm }) {

}

export async function renameVm (props: { token: Token, id: number, name: string }) {

}

export async function deleteVm (props: { token: Token, id: number }) {

}
