import { IRegion } from 'dots-wrapper/dist/modules/region'
import { selectSingle } from '../ui/selectSingle'

export async function selectRegion (regions: IRegion[]): Promise<IRegion> {
  const availableRegions = regions
    .filter(region => region.available)

  return selectSingle(availableRegions, 'Select region')
}
