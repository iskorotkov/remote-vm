# DigitalOceanApi.Image

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | A unique number that can be used to identify and reference a specific image. | [optional] 
**name** | [**ImageName**](ImageName.md) |  | [optional] 
**type** | **String** | Describes the kind of image. It may be one of \&quot;snapshot\&quot;, \&quot;backup\&quot;, or \&quot;custom\&quot;. This specifies whether an image is a user-generated Droplet snapshot, automatically created Droplet backup, or a user-provided virtual machine image. | [optional] 
**distribution** | [**Distribution**](Distribution.md) |  | [optional] 
**slug** | **String** | A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. These can be used to reference a public image as an alternative to the numeric id. | [optional] 
**_public** | **Boolean** | This is a boolean value that indicates whether the image in question is public or not. An image that is public is available to all accounts. A non-public image is only accessible from your account. | [optional] 
**regions** | [**RegionsArray**](RegionsArray.md) |  | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the image was created. | [optional] 
**minDiskSize** | **Number** | The minimum disk size in GB required for a Droplet to use this image. | [optional] 
**sizeGigabytes** | **Number** | The size of the image in gigabytes. | [optional] 
**description** | [**ImageDescription**](ImageDescription.md) |  | [optional] 
**tags** | [**TagsArray**](TagsArray.md) |  | [optional] 
**status** | **String** | A status string indicating the state of a custom image. This may be &#x60;NEW&#x60;,  &#x60;available&#x60;, &#x60;pending&#x60;, &#x60;deleted&#x60;, or &#x60;retired&#x60;. | [optional] 
**errorMessage** | **String** | A string containing information about errors that may occur when importing  a custom image. | [optional] 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `base` (value: `"base"`)
* `snapshot` (value: `"snapshot"`)
* `backup` (value: `"backup"`)
* `custom` (value: `"custom"`)


<a name="StatusEnum"></a>
## Enum: StatusEnum

* `NEW` (value: `"NEW"`)
* `_new` (value: `"new"`)
* `available` (value: `"available"`)
* `pending` (value: `"pending"`)
* `deleted` (value: `"deleted"`)
* `retired` (value: `"retired"`)

