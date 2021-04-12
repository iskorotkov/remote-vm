import { ISshKey } from 'dots-wrapper/dist/modules/ssh-key'
import * as vscode from 'vscode'

export async function selectSshKeys (sshKeys: ISshKey[]): Promise<ISshKey[]> {
  const selectedKeys = await vscode.window.showQuickPick(sshKeys.map(x => ({
    label: x.name,
    picked: true,
    value: x
  })), {
    canPickMany: true,
    placeHolder: 'Select SSH keys'
  })

  return selectedKeys?.map(key => key.value)!
}
