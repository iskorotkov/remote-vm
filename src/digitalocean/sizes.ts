import { IRegion } from 'dots-wrapper/dist/modules/region'
import { ISize } from 'dots-wrapper/dist/modules/size'
import * as vscode from 'vscode'

export async function selectDropletSize (sizes: ISize[], region: IRegion): Promise<ISize> {
  const availableSizes = sizes
    .filter(size => size.regions.find(r => r === region.slug))
    .filter(size => size.available)

  const selectedSize = await vscode.window.showQuickPick(availableSizes.map(x => ({
    label: `${x.slug}: ${x.vcpus} CPUs, ${x.memory} MB RAM, ${x.disk}GB SSD ($${x.price_hourly}/h | $${x.price_monthly}/m)`,
    value: x
  })), {
    canPickMany: false,
    placeHolder: 'Select size'
  })

  return selectedSize?.value!
}
