# Remote VM extension

Automatically create, setup and connect to Digital Ocean VMs for effective remote development.

- [Remote VM extension](#remote-vm-extension)
  - [Setup](#setup)
  - [Usage](#usage)

## Setup

1. Add `"remote-vm.do-token": "<Your Digital Ocean token here>",` to your config file.

## Usage

1. (Optional) Open Command Palette and create a volume via `Create volume` action.
1. (If no droplet created) Open Command Palette and create a droplet via `Create VM` action. Connect to created droplet via `Connect` button.
1. (If droplet already created) Open Command Palette and connect to the droplet via `Connect to VM` action.
