import * as ClientOAuth2 from 'client-oauth2'
import { parse } from 'query-string'
import * as vscode from 'vscode'

export class OAuthUriHandler implements vscode.UriHandler {
  handleUri (uri: vscode.Uri): vscode.ProviderResult<void> {
    console.log(`handling URI: ${uri}`)

    if (uri.path === '/callback') {
      console.log('get oauth callback')

      const values = parse(uri.query)

      const accessToken = values.access_token
      const refreshToken = values.refresh_token
      const expiry = values.expiry

      if (typeof accessToken !== 'string' ||
        typeof refreshToken !== 'string' ||
        typeof expiry !== 'string') {
        throw Error('no access token, refresh token or expiry set on request')
      }

      const token = new ClientOAuth2({}).createToken(accessToken, refreshToken, {})

      console.log(`get token: ${token}`)
    }
  }
}
