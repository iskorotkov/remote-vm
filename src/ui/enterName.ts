import * as vscode from 'vscode'

export async function enterName (description: string, initialValue: string, regex = /[a-zA-Z0-9-_]+/) {
  const value = await vscode.window.showInputBox({
    placeHolder: description,
    value: initialValue,
    validateInput (value: string) {
      if (value.length === 0) {
        return 'Value can\'t be empty'
      }

      if (!value.match(regex)) {
        return 'Value must match regex /[a-zA-Z0-9-_]+/'
      }

      return null
    }
  })

  if (!value) {
    throw Error('Nothing was selected')
  }

  return value
}
