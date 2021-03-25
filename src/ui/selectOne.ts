import * as vscode from 'vscode'

export async function selectOne (items: {label: string}[], description: string) {
  const selected = await vscode.window.showQuickPick(items.map(x => ({
    label: x.label,
    value: x
  })), {
    canPickMany: false,
    placeHolder: description
  })

  return selected?.value
}
