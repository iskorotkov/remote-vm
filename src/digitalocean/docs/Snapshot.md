# DigitalOceanApi.Snapshot

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | A human-readable name for the snapshot. | 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. | 
**regions** | **[String]** | An array of the regions that the snapshot is available in. The regions are represented by their identifying slug values. | 
**minDiskSize** | **Number** | The minimum size in GB required for a volume or Droplet to use this snapshot. | 
**sizeGigabytes** | **Number** | The billable size of the snapshot in gigabytes. | 
**resourceId** | **String** | The unique identifier for the resource that the snapshot originated from. | 
**resourceType** | **String** | The type of resource that the snapshot originated from. | 
**tags** | **[String]** | An array of Tags the snapshot has been tagged with. | 

<a name="ResourceTypeEnum"></a>
## Enum: ResourceTypeEnum

* `droplet` (value: `"droplet"`)
* `volume` (value: `"volume"`)

