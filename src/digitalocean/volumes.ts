import { IRegion } from 'dots-wrapper/dist/modules/region'
import { IVolume } from 'dots-wrapper/dist/modules/volume'
import * as vscode from 'vscode'

export async function selectVolumes (volumes: IVolume[], region: IRegion): Promise<IVolume[]> {
  const volumesInRegion = volumes
    .filter(volume => volume.region === region)

  const selectedVolumes = await vscode.window.showQuickPick(volumesInRegion.map(x => ({
    label: x.name,
    value: x
  })), {
    canPickMany: true,
    placeHolder: 'Select volumes'
  })

  return selectedVolumes?.map(volume => volume.value)!
}
