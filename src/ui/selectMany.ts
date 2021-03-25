import * as vscode from 'vscode'

export async function selectMany (items: { label: string }[], description: string) {
  const selected = await vscode.window.showQuickPick(items.map(x => ({
    label: x.label,
    value: x
  })), {
    canPickMany: true,
    placeHolder: description
  })

  return selected?.map(item => item.value)
}
