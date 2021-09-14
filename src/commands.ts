import * as vscode from 'vscode'
import { extensionName, publisherName } from './const'
import { serverHost } from './var'

export async function signInViaBrowser () {
  const redirectUrl = vscode.env.uriScheme
  const uri = `${serverHost}/api/v1/auth?redirect_url=${redirectUrl}://${publisherName}.${extensionName}/callback`

  await vscode.env.openExternal(vscode.Uri.parse(uri))
}

export async function signOut () {

}

export async function viewVmInfo () {

}

export async function refreshVmList () {

}

export async function createVm () {

}

export async function renameVm () {

}

export async function deleteVm () {

}
