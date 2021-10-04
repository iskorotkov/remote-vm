# Remote VM extension

Automatically create, setup and connect to remote VMs for effective remote development.

- [Remote VM extension](#remote-vm-extension)
  - [Overview](#overview)
    - [Features](#features)
    - [Limitations](#limitations)
  - [Alternatives](#alternatives)
  - [Setup](#setup)
  - [Bugs and errors](#bugs-and-errors)

## Overview

### Features

- supported providers: [Digital Ocean](https://www.digitalocean.com/);
  - it's possible to add support for other providers in the future (candidates are Linode, AWS, GCP, Azure);
- view list of created VMs in Digital Ocean;
- create/rename/delete VM in Digital Ocean;
- connect VS Code to the VM via SSH (just like `Remote Containers`, `Remote WSL` or `Remote SSH` extensions);

### Limitations

- there is no way to persist data from VM after it's deleted;
  - it's possible to add support for volumes for storing data across VMs in the future;
- created VM has no compilers/tools (`gcc`, `clang`, `npm`, `dotnet`, `docker`, etc...) installed so you will have to install everything yourself;
  - one of the possible workarounds is to [upload and use a custom image](https://docs.digitalocean.com/products/images/custom-images/) with preinstalled tools;
  - it's possible to add support for Docker/Podman containers so that you could connect to preconfigured containers running in a remote VM;
- VS Code-only, doesn't have support for browser or other editors/IDEs;
  - it's possible to add support for working in VS Code using a browser (there are projects for this), but it's not what I want from this project;
  - it's possible to add support for other IDEs or editors (JetBrains IDEs, Visual Studio, etc...), but I don't have short term plans for this;

## Alternatives

|                         | Remote VM                                                                   | GitHub Codespaces                     | Gitpod                                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Platforms\*             | VS Code                                                                     | VS Code, VS, browser                  | browser                                                                                                                                                |
| Editors/IDEs            | VS Code, but it's possible to support VS, JetBrains IDEs and other products | VS Code, VS                           | VS Code, Theia (deprecated)                                                                                                                            |
| Limitations             | see above                                                                   | you need to be invited to closed beta | browser-only: some of the shortcuts are intercepted by the browser, you need to install and enable all your themes/icon packs each time you use it\*\* |
| Price for 1 vCPU/1 GB   | $5/mo; $0.00744/hr                                                          | -                                     | -                                                                                                                                                      |
| Price for 1 vCPU/2 GB   | $10/mo; $0.01488/hr                                                         | -                                     | -                                                                                                                                                      |
| Price for 2 vCPU/2 GB   | $15/mo; $0.02232/hr                                                         | -                                     | -                                                                                                                                                      |
| Price for 2 vCPU/4 GB   | $20/mo; $0.02976/hr                                                         | $0.18/hr                              | -                                                                                                                                                      |
| Price for 4 vCPU/8 GB   | $40/mo; $0.05952/hr                                                         | $0.36/hr                              | -                                                                                                                                                      |
| Price for 8 vCPU/16 GB  | $80/mo; $0.11905/hr                                                         | $0.72/hr                              | -                                                                                                                                                      |
| Price for 16 vCPU/32 GB | $320/mo; $0.47619/hr                                                        | $1.44/hr                              | -                                                                                                                                                      |
| Price for 32 vCPU/64 GB | $640/mo; $0.95238/hr                                                        | $2.88/hr                              | -                                                                                                                                                      |

\* VS = Visual Studio, VS Code = Visual Studio Code.

\*\* tell me if I'm wrong; I've found no way to make Gitpod remember my theme/icon pack across different workspaces.

## Setup

1. Create a Digital Ocean account and add a payment method (as Digital Ocean droplets have a cost).
2. Create at least one SSH key for your Digital Ocean account. It will be used to access Digital Ocean droplets.
3. Execute command "Remote VM: Sign in via browser" to start working.

## Bugs and errors

If you've encountered a bug, report it using [GitHub Issues](https://github.com/iskorotkov/remote-vm/issues).
