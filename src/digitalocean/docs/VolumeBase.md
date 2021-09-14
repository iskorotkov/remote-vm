# DigitalOceanApi.VolumeBase

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The unique identifier for the block storage volume. | [optional] 
**dropletIds** | **[Number]** | An array containing the IDs of the Droplets the volume is attached to. Note that at this time, a volume can only be attached to a single Droplet. | [optional] 
**name** | **String** | A human-readable name for the block storage volume. Must be lowercase and be composed only of numbers, letters and \&quot;-\&quot;, up to a limit of 64 characters. The name must begin with a letter. | [optional] 
**description** | **String** | An optional free-form text field to describe a block storage volume. | [optional] 
**sizeGigabytes** | **Number** | The size of the block storage volume in GiB (1024^3). | [optional] 
**createdAt** | **String** | A time value given in ISO8601 combined date and time format that represents when the block storage volume was created. | [optional] 
**tags** | [**TagsArray**](TagsArray.md) |  | [optional] 
