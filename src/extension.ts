import * as vscode from 'vscode'
import { createApiClient } from 'dots-wrapper'
import { IDroplet } from 'dots-wrapper/dist/modules/droplet'

export async function activate (context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('remote-vm')
  const token = config.get<string>('do-token')

  if (token === undefined) {
    await vscode.window.showErrorMessage('Token wasn\'t found')
    return
  }

  context.subscriptions.push(vscode.commands.registerCommand('remote-vm.connectToVm', async () => {
    const cpus = 1
    const ram = 1
    const type = '' // '-intel' or '-amd'
    const sshKeyName = 'Lenovo330'
    const region = 'fra1'
    const baseImage = 'ubuntu-20-04-x64'

    const username = 'root'
    const folder = '/root'
    const snapshotName = 'remote-vm'
    const dropletName = 'remote-vm'
    const tag = 'remote-vm'
    const size = `s-${cpus}vcpu-${ram}gb${type}`

    const client = createApiClient({
      token: token
    })

    let droplet: IDroplet

    const dropletsResponse = await client.droplet.listDroplets({ tag_name: tag })
    const droplets = dropletsResponse.data.droplets
    if (droplets.length > 0) {
      droplet = droplets[0]
    } else {
      let image: string | number
      const snapshots = await client.snapshot.listSnapshots({ resource_type: 'droplet' })
      const matchedSnapshots = snapshots.data.snapshots.filter(snapshot => {
        return snapshot.name === snapshotName
      })
      if (matchedSnapshots.length > 0) {
        image = matchedSnapshots[0].id
      } else {
        image = baseImage
      }

      const keys = await client.sshKey.listSshKeys({})
      const matchedKeys = keys.data.ssh_keys.filter(key => {
        return key.name === sshKeyName
      })
      if (matchedKeys.length === 0) {
        await vscode.window.showErrorMessage('No SSH key was created')
        return
      }

      try {
        const dropletResponse = await client.droplet.createDroplet({
          name: dropletName,
          image: image,
          region: region,
          size: size,
          backups: false,
          ipv6: true,
          monitoring: true,
          private_networking: true,
          ssh_keys: [matchedKeys[0].id],
          tags: [tag]
        })

        droplet = dropletResponse.data.droplet
      } catch (error) {
        await vscode.window.showErrorMessage('VM creation failed')
        return
      }
    }

    const publicIps = droplet.networks.v4.filter(ip => {
      return ip.type === 'public'
    })
    if (publicIps.length === 0) {
      await vscode.window.showErrorMessage('Couldn\'t find public IPv4 on created VM')
    }

    const host = publicIps[0].ip_address

    const copyOption = 'Copy SSH command'
    const connectOption = 'Connect'
    const selection = await vscode.window.showInformationMessage('Remote VM is ready', copyOption, connectOption)
    if (selection === copyOption) {
      await vscode.env.clipboard.writeText(`ssh ${username}@${host} -A`)
    } else {
      const uri = vscode.Uri.parse(`vscode-remote://ssh-remote+${username}@${host}${folder}`)
      try {
        await vscode.commands.executeCommand('vscode.openFolder', uri, false)
      } catch (error) {
        await vscode.window.showErrorMessage('Couldn\'t connect to created VM')
      }
    }
  }))

  // context.subscriptions.push(vscode.commands.registerCommand('remote-vm.disconnectFromVm', async () => {

  // })
}

export function deactivate () {}
