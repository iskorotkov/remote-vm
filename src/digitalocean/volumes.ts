import { IRegion } from 'dots-wrapper/dist/modules/region'
import { IVolume } from 'dots-wrapper/dist/modules/volume'
import { selectMultiple } from '../ui/selectMultiple'

export async function selectVolumes (volumes: IVolume[], region: IRegion): Promise<IVolume[]> {
  const volumesInRegion = volumes
    .filter(volume => volume.region === region)

  return selectMultiple(volumesInRegion, 'Select volumes')
}
