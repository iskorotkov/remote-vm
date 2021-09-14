# DigitalOceanApi.NewVolumeExt4

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**snapshotId** | **String** | The unique identifier for the volume snapshot from which to create the volume. | [optional] 
**filesystemType** | **String** | The name of the filesystem type to be used on the volume. When provided, the volume will automatically be formatted to the specified filesystem type. Currently, the available options are &#x60;ext4&#x60; and &#x60;xfs&#x60;. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to other Droplets is not recommended. | 
**region** | [**RegionSlug**](RegionSlug.md) |  | 
**filesystemLabel** | **Object** |  | [optional] 
