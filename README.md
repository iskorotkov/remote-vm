# Remote VM extension

Automatically create, setup and connect to Digital Ocean VMs for effective remote development.

- [Remote VM extension](#remote-vm-extension)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Bugs and errors](#bugs-and-errors)

## Setup

1. Create Digital Ocean account and add a payment method (Digital Ocean droplets have a cost).
1. Create Digital Ocean token and copy it to clipboard.
1. Add `"remote-vm.do-token": "<Your Digital Ocean token here>",` to your VSCode config file (`CTRL+SHIFT+P`, then `Preferences: Open Settings (JSON)`).

## Usage

1. (Optional: if you need to preserve files between different droplets) Open Command Palette and create a volume via `Create volume` action.
1. Create droplet or connect to the existing one:
   1. If no droplets were created: Open Command Palette and create a droplet via `Create VM` action. Connect to created droplet via `Connect` button.
   1. If droplets were already created: open Command Palette and connect to the droplet via `Connect to VM` action.
1. When finished working: open Command Palette and run `Destroy VM` action to destroy a droplet. If you leave a droplet as is, it will spend your money even when idling.
1. (Optional: if you created a volume and want to destroy it) Open Command Palette and destroy a volume via `Destroy volume` actions. If you leave a volume as is, it will spend your money even if it's not attached to any droplet.

## Bugs and errors

If you've encountered a bug, report it in [GitHub Issues](https://github.com/iskorotkov/remote-vm/issues).
