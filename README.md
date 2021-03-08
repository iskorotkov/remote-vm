# Remote Development extension

Automatically create, setup and connect to Digital Cloud VM for effective remote development.

## Features

- [x] automatically create VM and connect to it
- [ ] add more dialogs for selecting region, VM size, etc
- [ ] destroy VM when closing the last workspace
- [ ] create workspace for each project
- [ ] destroy old workspaces
- [ ] save workspace state
- [ ] create workspace from configuration stored in project repo

## Design notes

### Different workspaces

1. -> Launch Docker containers in a droplet and connect to containers.
   1. (+) Cheap (one droplet per user).
2. Different droplet for each workspace
   1. (-) Costly (more droplets cost more).
   2. (-) More time consuming (each droplet takes time to start).

### State preservation

1. Create droplet snapshots and restore droplets from snapshots when available.
   1. (+) Full backup of all data in the droplet.
   2. (-) Cheaper (no need for another services or infrastructure besides droplets and snapshots).
   3. (-) Snapshots require droplets to meet minimal disk size to restore (can't create small droplet from large snapshot).
2. -> Store user data on volumes and mount subfolders inside containers.
   1. (+) Fast (all data is already where it must be).
   2. (+) Safe (if container or VM fails all data will be preserved).
   3. (-) Costly (volumes will cost extra).
   4. (-) Not all data will be preserved (installed packages will be missing after restarting the VM).
3. Store user data in containers and store containers in container registry.
   1. (+) All data will be preserved.
   2. (+) Quicker than creating snapshots of entire droplets.
   3. (-) Costly (container registry will cost extra).
   4. (-) Large containers (large containers will cost more and take more time to save/load)
4. Store user data in containers and store containers on volumes.
   1. (+) All data will be preserved.
   2. (+) Quicker than creating snapshots of entire droplets.
   3. (-) Costly (volumes will cost extra).
5. Push user data to git repository on another remote (i. e. our own).
   1. (+) Cheap (no need to store large files).
   2. (+) Fast (only files not ignored by .gitignore are saved).
   3. (-) Not all data will be preserved (all container-specific data and files not added to git will be lost).
