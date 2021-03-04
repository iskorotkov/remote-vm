# Inputs

$cpus = 2 # Virtual CPUs
$ram = 2 # RAM in GB
$type = "" # <empty> <or> "-intel" <or> "-amd"
# TODO: Support adding new SSH key
# TODO: Support using several SSH keys
$sshKeyName = "Lenovo330"
# TODO: Add more checks for region
$desiredRegion = "fra1" # Region to create droplet in
# TODO: Check when snapshot is too large for given VM
$desiredImage = "ubuntu-20-04-x64" # Base image to use if no snapshot is available

# Variables

$snapshotName = "remote-dev"
$dropletName = "remote-dev"
$desiredSize = "s-${cpus}vcpu-${ram}gb${type}"

# Regex parts

$separatorRegex = "\s+" # <several spaces>
$nameRegex = "([\-_a-zA-Z0-9]+)" # some-name-13123
$numberRegex = "([0-9]+)" # 34234
$ipv4Regex = "([\.0-9]+)" # 23.13.41.123
$ipv6Regex = "([a-zA-Z0-9:]+)" # 2a03:b0c0:3:d0::1079:d001
$timeRegex = "([:\-0-9TZ]+)" # 2021-02-28T09:12:59Z
$sizeRegex = "([0-9]+.[0-9]+\s[ibkmgtBKMGT]+)" # 8.54 GiB
$uuidRegex = "([a-zA-Z0-9\-]+)" # 64854a76-16b8-477e-bc28-5679ca2cf091
$fingerprintRegex = "([a-zA-Z0-9:]+)" # 23:45:7c:01:42:4b:34:de:32:23:8d:43:b4:12:02:65
$imageRegex = "([a-zA-Z0-9\-\(\)\.\s]*)" # Ubuntu 20.04 (LTS) x64
$listRegex = "\[?([\-_a-z0-9,]*)\]?" # [elem1,elem2] <or> elem1,elem2 <or> <empty>

# Functions

function Get-Droplets {
    doctl compute droplet list
    | Select-Object -Skip 1
    | Where-Object {
        $_ -match "${numberRegex}${separatorRegex}${nameRegex}${separatorRegex}${ipv4Regex}${separatorRegex}${ipv4Regex}${separatorRegex}${ipv6Regex}${separatorRegex}${numberRegex}${separatorRegex}${numberRegex}${separatorRegex}${numberRegex}${separatorRegex}${nameRegex}${separatorRegex}${imageRegex}${separatorRegex}${uuidRegex}${separatorRegex}${nameRegex}${separatorRegex}${nameRegex}${separatorRegex}${listRegex}${separatorRegex}${listRegex}"
    }
    | ForEach-Object {
        New-Object -Type PSObject -Property @{
            "Id"         = $matches[1]
            "Name"       = $matches[2]
            "PublicIPv4" = $matches[3]
            "PrivatIPv4" = $matches[4]
            "PublicIPv6" = $matches[5]
            "Memory"     = $matches[6]
            "VCPUs"      = $matches[7]
            "Disk"       = $matches[8]
            "Region"     = $matches[9]
            "Image"      = $matches[10]
            "VPC"        = $matches[11]
            "Status"     = $matches[12]
            "Tags"       = $matches[13].Split(",")
            "Features"   = $matches[14].Split(",")
            "Volumes"    = $matches[15].Split(",")
        }
    }
    | Write-Output
}

function Get-DropletsByName {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][ValidateNotNullOrEmpty()]
        [string]$DropletName
    )

    Get-Droplets
    | Where-Object { $_.Name -match "^${DropletName}$" }
    | Write-Output
}

function Get-Snapshots {
    doctl compute snapshot list
    | Select-Object -Skip 1
    | Where-Object {
        $_ -match "${numberRegex}${separatorRegex}${nameRegex}${separatorRegex}${timeRegex}${separatorRegex}${listRegex}${separatorRegex}${numberRegex}${separatorRegex}${nameRegex}${separatorRegex}${numberRegex}${separatorRegex}${sizeRegex}${separatorRegex}${listRegex}"
    }
    | ForEach-Object {
        New-Object -Type PSObject -Property @{
            "Id"           = $matches[1]
            "Name"         = $matches[2]
            "CreatedAt"    = $matches[3]
            "Regions"      = $matches[4].Split(",")
            "ResourceId"   = $matches[5]
            "ResourceType" = $matches[6]
            "MinDiskSize"  = $matches[7]
            "Size"         = $matches[8]
            "Tags"         = $matches[9].Split(",")
        }
    }
    | Write-Output
}

function Get-SnapshotsByName {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][ValidateNotNullOrEmpty()]
        [string]$SnapshotName
    )

    Get-Snapshots
    | Where-Object { $_.Name -match "^${SnapshotName}$" }
    | Write-Output
}

function Get-SSHKeys {
    doctl compute ssh-key list
    | Select-Object -Skip 1
    | Where-Object {
        $_ -match "${numberRegex}${separatorRegex}${nameRegex}${separatorRegex}${fingerprintRegex}"
    } | ForEach-Object {
        New-Object -Type PSObject -Property @{
            "Id"          = $matches[1]
            "Name"        = $matches[2]
            "Fingerprint" = $matches[3]
        }
    }
    | Write-Output
}

function Get-SSHKeysByName {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][ValidateNotNullOrEmpty()]
        [string]$SSHKeyName
    )

    Get-SSHKeys
    | Where-Object { $_.Name -match "^${SSHKeyName}$" }
    | Write-Output
}

# Logic

Write-Output "Getting existing droplet"

$droplets = Get-DropletsByName $dropletName
if (@($droplets).length -ge 1) {
    Write-Output "Droplet already created"
    Write-Output "Not implemented" # TODO: Not implemented branch when droplet is already created
    exit
}

Write-Output "Determining the base image"

$snapshots = Get-SnapshotsByName $snapshotName
if (@($snapshots).length -ge 1) {
    Write-Output "Finding the last snapshot"
    $baseImage = $snapshots | Sort-Object -Property CreatedAt -Descending
    $name = $baseImage.Name
    $createdAt = $baseImage.CreatedAt
    Write-Output "Selected snapshot '${name}' created at ${createdAt}"
}
else {
    Write-Output "Using base Ubuntu 20.04 image"
    $baseImage = $desiredImage
}


Write-Output "Obtaining SSH key fingerprint"

$sshKeys = Get-SSHKeysByName $sshKeyName
if (@($sshKeys).length -lt 1) {
    Write-Output "No SSH key was created"
    exit
}
$sshKey = $sshKeys[0].Id

Write-Output "Creating a new droplet"
doctl compute droplet create $dropletName --enable-ipv6 --enable-monitoring --enable-private-networking --image $desiredImage --region $desiredRegion --size $desiredSize --ssh-keys $sshKey.Id --tag-names $dropletName --wait

Write-Output "Obtaining the droplet ip"
doctl compute droplet list

Write-Output "Configure users"

Write-Output "Determining container to use"

Write-Output "Connecting to container"

Write-Output "Disconnecting from container"

Write-Output "Creating VM snapshot"

Write-Output "Destroying created VM"
$droplets = Get-DropletsByName $dropletName
foreach ($droplet in $droplets) {
    doctl compute droplet delete $droplet.Id -f
}
