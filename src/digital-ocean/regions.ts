import { IRegion } from 'dots-wrapper/dist/modules/region'
import * as vscode from 'vscode'

export async function selectRegion (regions: IRegion[]): Promise<IRegion> {
  const availableRegions = regions
    .filter(region => region.available)

  const selectedRegion = await vscode.window.showQuickPick(availableRegions.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: false,
    placeHolder: 'Select region'
  })

  return selectedRegion?.value!
}
