# DigitalOceanApi.Droplet

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | A unique identifier for each Droplet instance. This is automatically generated upon Droplet creation. | 
**name** | **String** | The human-readable name set for the Droplet instance. | 
**memory** | **Number** | Memory of the Droplet in megabytes. | 
**vcpus** | **Number** | The number of virtual CPUs. | 
**disk** | **Number** | The size of the Droplet&#x27;s disk in gigabytes. | 
**locked** | **Boolean** | A boolean value indicating whether the Droplet has been locked, preventing actions by users. | 
**status** | **String** | A status string indicating the state of the Droplet instance. This may be \&quot;new\&quot;, \&quot;active\&quot;, \&quot;off\&quot;, or \&quot;archive\&quot;. | 
**kernel** | [**Kernel**](Kernel.md) |  | 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the Droplet was created. | 
**features** | **[String]** | An array of features enabled on this Droplet. | 
**backupIds** | **[Number]** | An array of backup IDs of any backups that have been taken of the Droplet instance.  Droplet backups are enabled at the time of the instance creation. | 
**nextBackupWindow** | [**DropletNextBackupWindow**](DropletNextBackupWindow.md) |  | 
**snapshotIds** | **[Number]** | An array of snapshot IDs of any snapshots created from the Droplet instance. | 
**image** | [**Image**](Image.md) |  | 
**volumeIds** | **[String]** | A flat array including the unique identifier for each Block Storage volume attached to the Droplet. | 
**size** | [**Size**](Size.md) |  | 
**sizeSlug** | **String** | The unique slug identifier for the size of this Droplet. | 
**networks** | [**DropletNetworks**](DropletNetworks.md) |  | 
**region** | [**Region**](Region.md) |  | 
**tags** | **[String]** | An array of Tags the Droplet has been tagged with. | 
**vpcUuid** | **String** | A string specifying the UUID of the VPC to which the Droplet is assigned. | [optional] 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `_new` (value: `"new"`)
* `active` (value: `"active"`)
* `off` (value: `"off"`)
* `archive` (value: `"archive"`)

