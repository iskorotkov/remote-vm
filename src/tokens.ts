import axios from 'axios'
import * as vscode from 'vscode'
import { digitalOceanHost } from './var'

const tokenKey = 'token'

interface Request {
  headers?: any
  [key: string]: any
}

export class Token {
  constructor (
    public accessToken: string,
    public refreshToken: string,
    public expiry: Date,
    public tokenType: string
  ) { }

  sign<T extends Request> (request: T): T {
    if (request.headers === undefined) {
      request.headers = {}
    }

    request.headers.Authorization = `Bearer ${this.accessToken}`
    return request
  }

  expired (): boolean {
    return this.expiry <= new Date()
  }

  async refresh () {
    const url = `${digitalOceanHost}/v1/oauth/token?${this.query()}`
    const response = await axios.post(url)

    this.accessToken = response.data.access_token
    this.refreshToken = response.data.refresh_token
    this.expiry = new Date(response.data.created_at) + response.data.expires_in
    this.tokenType = response.data.token_type
  }

  private query (): string {
    return `grant_type=refresh_token&refresh_token=${this.refreshToken}`
  }
}

export async function saveToken (context: vscode.ExtensionContext, token: Token) {
  await context.secrets.store(tokenKey, JSON.stringify(token))
}

export async function retrieveToken (context: vscode.ExtensionContext): Promise<Token | null> {
  const saved = await context.secrets.get(tokenKey)

  if (saved !== undefined) {
    const json = JSON.parse(saved)

    return Object.assign(new Token('', '', new Date(), ''), json)
  }

  return null
}

export async function deleteToken (context: vscode.ExtensionContext) {
  await context.secrets.delete(tokenKey)
}
