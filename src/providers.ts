import * as vscode from 'vscode'
import { Vm } from './models'

class VmTreeItem extends vscode.TreeItem {
  constructor (props: { id?: string, label: string, description?: string, collapsibleState: vscode.TreeItemCollapsibleState }) {
    super(props.label, props.collapsibleState)

    this.id = props.id
    this.description = props.description
  }
}

export class VmTreeDataProvider implements vscode.TreeDataProvider<VmTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<VmTreeItem | null | undefined | void>()
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event

  private items: Map<string, Vm> = new Map()

  getTreeItem (element: VmTreeItem): vscode.TreeItem {
    return element
  }

  getChildren (element?: VmTreeItem): Promise<VmTreeItem[]> {
    // Element and id are both defined when we are creating 2nd level items (VM properties).
    if (element !== undefined && element.id !== undefined) {
      const item = this.items.get(element.id)
      if (item === undefined) {
        return Promise.reject(new Error('unknown element in vm list provider'))
      }

      const elements = [
        new VmTreeItem({ label: `Region: ${item.region}`, collapsibleState: vscode.TreeItemCollapsibleState.None }),
        new VmTreeItem({ label: `OS: ${item.os}`, collapsibleState: vscode.TreeItemCollapsibleState.None }),
        new VmTreeItem({ label: `CPUs: ${item.cpus}`, collapsibleState: vscode.TreeItemCollapsibleState.None }),
        new VmTreeItem({ label: `RAM: ${item.ram} GB`, collapsibleState: vscode.TreeItemCollapsibleState.None }),
        new VmTreeItem({ label: `Storage: ${item.storage} GB`, collapsibleState: vscode.TreeItemCollapsibleState.None })
      ]

      if (item.ipv4 !== undefined) {
        elements.push(new VmTreeItem({ label: `IPv4: ${item.ipv4 ?? '-'}`, collapsibleState: vscode.TreeItemCollapsibleState.None }))
      }

      if (item.ipv6 !== undefined) {
        elements.push(new VmTreeItem({ label: `IPv6: ${item.ipv6 ?? '-'}`, collapsibleState: vscode.TreeItemCollapsibleState.None }))
      }

      if (item.tags.length > 0) {
        elements.push(new VmTreeItem({ label: `Tags: ${item.tags.join(', ')}`, collapsibleState: vscode.TreeItemCollapsibleState.None }))
      }

      return Promise.resolve(elements)
    }

    // Element is undefined if we are creating root items (VMs themselves).
    if (element === undefined) {
      const elements = []

      for (const item of this.items.values()) {
        const element = new VmTreeItem({
          id: item.id.toString(),
          label: item.name,
          description: item.status,
          collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
        })
        elements.push(element)
      }

      return Promise.resolve(elements)
    }

    // Element is defined and id is undefined when we are working with 3rd level items (children of VM properties).
    return Promise.resolve([])
  }

  refresh (items: Vm[]) {
    this.items.clear()

    for (const item of items) {
      this.items.set(item.id.toString(), item)
    }

    this._onDidChangeTreeData.fire()
  }
}
