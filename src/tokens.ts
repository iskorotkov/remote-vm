import axios from 'axios'
import * as vscode from 'vscode'
import { digitalOceanHost } from './var'

const tokenKey = 'token'

interface Request {
  headers?: any
  [key: string]: any
}

export class Token {
  private context?: vscode.ExtensionContext

  constructor (
    public accessToken: string,
    public refreshToken: string,
    public expiry: Date,
    public tokenType: string,
    context: vscode.ExtensionContext
  ) {
    this.context = context
  }

  static async loadFromSecrets (context: vscode.ExtensionContext): Promise<Token | null> {
    const saved = await context.secrets.get(tokenKey)

    if (saved !== undefined) {
      const json = JSON.parse(saved)

      return Object.assign(new Token('', '', new Date(), '', context), json)
    }

    return null
  }

  async sign<T extends Request> (request: T): Promise<T> {
    if (this.expired()) {
      await this.refresh()
    }

    if (request.headers === undefined) {
      request.headers = {}
    }

    request.headers.Authorization = `Bearer ${this.accessToken}`
    return request
  }

  async saveToSecrets () {
    const context = this.context!
    this.context = undefined

    await context.secrets.store(tokenKey, JSON.stringify(this))
  }

  async deleteFromSecrets () {
    const context = this.context!

    await context.secrets.delete(tokenKey)
  }

  private expired (): boolean {
    return this.expiry <= new Date()
  }

  private async refresh () {
    const response = await axios({
      method: 'POST',
      url: `${digitalOceanHost}/v1/oauth/token`,
      params: {
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken
      }
    })

    this.accessToken = response.data.access_token
    this.refreshToken = response.data.refresh_token
    this.expiry = new Date(response.data.created_at) + response.data.expires_in
    this.tokenType = response.data.token_type

    await this.saveToSecrets()
  }
}
