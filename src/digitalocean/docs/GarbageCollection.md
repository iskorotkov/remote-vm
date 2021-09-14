# DigitalOceanApi.GarbageCollection

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uuid** | **String** | A string specifying the UUID of the garbage collection. | [optional] 
**registryName** | **String** | The name of the container registry. | [optional] 
**status** | **String** | The current status of this garbage collection. | [optional] 
**createdAt** | **Date** | The time the garbage collection was created. | [optional] 
**updatedAt** | **Date** | The time the garbage collection was last updated. | [optional] 
**blobsDeleted** | **Number** | The number of blobs deleted as a result of this garbage collection. | [optional] 
**freedBytes** | **Number** | The number of bytes freed as a result of this garbage collection. | [optional] 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `requested` (value: `"requested"`)
* `waitingForWriteJWTsToExpire` (value: `"waiting for write JWTs to expire"`)
* `scanningManifests` (value: `"scanning manifests"`)
* `deletingUnreferencedBlobs` (value: `"deleting unreferenced blobs"`)
* `cancelling` (value: `"cancelling"`)
* `failed` (value: `"failed"`)
* `succeeded` (value: `"succeeded"`)
* `cancelled` (value: `"cancelled"`)

