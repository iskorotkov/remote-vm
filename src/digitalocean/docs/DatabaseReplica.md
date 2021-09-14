# DigitalOceanApi.DatabaseReplica

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The name to give the read-only replicating | 
**region** | **String** | A slug identifier for the region where the read-only replica will be located. If excluded, the replica will be placed in the same region as the cluster. | [optional] 
**size** | **String** | A slug identifier representing the size of the node for the read-only replica. The size of the replica must be at least as large as the node size for the database cluster from which it is replicating. | [optional] 
**status** | **String** | A string representing the current status of the database cluster. | [optional] 
**tags** | **[String]** | A flat array of tag names as strings to apply to the read-only replica after it is created. Tag names can either be existing or new tags. | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. | [optional] 
**privateNetworkUuid** | **String** | A string specifying the UUID of the VPC to which the read-only replica will be assigned. If excluded, the replica will be assigned to your account&#x27;s default VPC for the region. | [optional] 
**connection** | **AllOfdatabaseReplicaConnection** |  | [optional] 
**privateConnection** | **AllOfdatabaseReplicaPrivateConnection** |  | [optional] 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `creating` (value: `"creating"`)
* `online` (value: `"online"`)
* `resizing` (value: `"resizing"`)
* `migrating` (value: `"migrating"`)
* `forking` (value: `"forking"`)

