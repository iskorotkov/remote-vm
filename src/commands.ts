import * as vscode from 'vscode'
import { extensionName, publisherName } from './const'
import { serverHost } from './var'

export async function loginInBrowser () {
  const redirectUrl = vscode.env.uriScheme
  const uri = `${serverHost}/api/v1/auth?redirect_url=${redirectUrl}://${publisherName}.${extensionName}/callback`

  await vscode.env.openExternal(vscode.Uri.parse(uri))
}
