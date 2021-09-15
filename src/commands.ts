import * as vscode from 'vscode'
import { extensionName, publisherName } from './const'
import { Vm } from './models'
import { deleteToken } from './tokens'
import { serverHost } from './var'
import ClientOAuth2 = require('client-oauth2')

export async function signInViaBrowser () {
  const redirectUrl = vscode.env.uriScheme
  const uri = `${serverHost}/api/v1/auth?redirect_url=${redirectUrl}://${publisherName}.${extensionName}/callback`

  await vscode.env.openExternal(vscode.Uri.parse(uri))
}

export async function signOut (props: { context: vscode.ExtensionContext }) {
  await deleteToken(props.context)
}

export async function refreshVmList (props: { token: ClientOAuth2.Token }) {

}

export async function createVm (props: { token: ClientOAuth2.Token, vm: Vm }) {

}

export async function renameVm (props: { token: ClientOAuth2.Token, id: number, name: string }) {

}

export async function deleteVm (props: { token: ClientOAuth2.Token, id: number }) {

}
