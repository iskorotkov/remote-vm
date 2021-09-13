import * as ClientOAuth2 from 'client-oauth2'
import { parse } from 'querystring'
import * as vscode from 'vscode'
import { digitalOceanHost } from './env'

export class OAuthUriHandler implements vscode.UriHandler {
  handleUri (uri: vscode.Uri): vscode.ProviderResult<void> {
    console.log(`handling URI: ${uri}`)

    if (uri.path === '/callback') {
      try {
        console.log('get oauth callback')

        const values = parse(uri.query)

        const accessToken = values.access_token
        const refreshToken = values.refresh_token
        const tokenType = values.token_type
        const expiry = values.expiry

        if (typeof accessToken !== 'string' ||
          typeof refreshToken !== 'string' ||
          typeof tokenType !== 'string' ||
          typeof expiry !== 'string') {
          throw Error('no access token, refresh token or expiry set on request')
        }

        const client = new ClientOAuth2({
          accessTokenUri: `${digitalOceanHost}/v2/auth/token`
        })

        const token = client.createToken(accessToken, refreshToken, tokenType, {})
        token.expiresIn(new Date(expiry))

        console.log(`get token: ${token.accessToken} ${token.refreshToken} of type ${token.tokenType}`)
      } catch (error) {
        console.error(`error parsing token in callback: ${error}`)
        throw error
      }
    }
  }
}
