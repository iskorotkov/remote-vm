import * as vscode from 'vscode'

export async function enterString (description: string, initialValue: string, regex = /[a-zA-Z0-9-_]+/) {
  const value = await vscode.window.showInputBox({
    placeHolder: description,
    value: initialValue,
    validateInput (value: string) {
      if (value.length === 0) {
        return 'Value can\'t be empty'
      }

      if (!value.match(regex)) {
        return 'Value must contain only alphanumeric symbols'
      }

      return null
    }
  })

  return value
}
