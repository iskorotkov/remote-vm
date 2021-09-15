import * as vscode from 'vscode'
import { digitalOceanHost } from './var'
import ClientOAuth2 = require('client-oauth2')

const refreshTokenKey = 'refresh-token'

export async function saveToken (context: vscode.ExtensionContext, token: ClientOAuth2.Token) {
  await context.secrets.store(refreshTokenKey, token.refreshToken)
}

export async function retrieveToken (context: vscode.ExtensionContext): Promise<ClientOAuth2.Token | null> {
  const refreshToken = await context.secrets.get(refreshTokenKey)
  const client = new ClientOAuth2({
    accessTokenUri: `${digitalOceanHost}/v2/auth/token`
  })

  if (refreshToken !== undefined) {
    return client.createToken('', refreshToken, {})
  }

  return null
}

export async function deleteToken (context: vscode.ExtensionContext) {
  await context.secrets.delete(refreshTokenKey)
}
