import * as vscode from 'vscode'

export async function selectSingle<T> (items: (T&{name: string})[], description: string): Promise<T> {
  const selected = await vscode.window.showQuickPick(items.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: false,
    placeHolder: description
  })

  if (!selected) {
    throw Error('Nothing was selected')
  }

  return selected?.value as unknown as T
}
