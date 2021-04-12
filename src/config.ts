import * as vscode from 'vscode'

interface Config {
    token: string
}

export function readConfig (): Config {
  const config = vscode.workspace.getConfiguration('remote-vm')
  const token = config.get<string>('do-token')

  if (!token) {
    throw Error("couldn't read config or config is invalid")
  }

  return {
    token: token
  }
}
