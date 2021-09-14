# DigitalOceanApi.DropletSnapshot

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | A human-readable name for the snapshot. | 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. | 
**regions** | **[String]** | An array of the regions that the snapshot is available in. The regions are represented by their identifying slug values. | 
**minDiskSize** | **Number** | The minimum size in GB required for a volume or Droplet to use this snapshot. | 
**sizeGigabytes** | **Number** | The billable size of the snapshot in gigabytes. | 
**type** | **String** | Describes the kind of image. It may be one of &#x60;snapshot&#x60; or &#x60;backup&#x60;. This specifies whether an image is a user-generated Droplet snapshot or automatically created Droplet backup. | 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `snapshot` (value: `"snapshot"`)
* `backup` (value: `"backup"`)

