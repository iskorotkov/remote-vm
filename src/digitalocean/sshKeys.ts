import { ISshKey } from 'dots-wrapper/dist/modules/ssh-key'
import { selectMultiple } from '../ui/selectMultiple'

export async function selectSshKeys (sshKeys: ISshKey[]): Promise<ISshKey[]> {
  return await selectMultiple(sshKeys, 'Select SSH keys')
}
