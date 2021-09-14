# DigitalOceanApi.DatabaseCluster

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | A unique ID that can be used to identify and reference a database cluster. | [optional] 
**name** | **String** | A unique, human-readable name referring to a database cluster. | 
**engine** | **String** | A slug representing the database engine used for the cluster. The possible values are: \&quot;pg\&quot; for PostgreSQL, \&quot;mysql\&quot; for MySQL, \&quot;redis\&quot; for Redis, and \&quot;mongodb\&quot; for MongoDB. | 
**version** | **String** | A string representing the version of the database engine in use for the cluster. | [optional] 
**numNodes** | **Number** | The number of nodes in the database cluster. | 
**size** | **String** | The slug identifier representing the size of the nodes in the database cluster. | 
**region** | **String** | The slug identifier for the region where the database cluster is located. | 
**status** | **String** | A string representing the current status of the database cluster. | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. | [optional] 
**privateNetworkUuid** | **String** | A string specifying the UUID of the VPC to which the database cluster will be assigned. If excluded, the cluster when creating a new database cluster, it will be assigned to your account&#x27;s default VPC for the region. | [optional] 
**tags** | **[String]** | An array of tags that have been applied to the database cluster. | [optional] 
**dbNames** | **[String]** | An array of strings containing the names of databases created in the database cluster. | [optional] 
**connection** | **AllOfdatabaseClusterConnection** |  | [optional] 
**privateConnection** | **AllOfdatabaseClusterPrivateConnection** |  | [optional] 
**users** | [**[DatabaseUser]**](DatabaseUser.md) |  | [optional] 
**maintenanceWindow** | **AllOfdatabaseClusterMaintenanceWindow** |  | [optional] 

<a name="EngineEnum"></a>
## Enum: EngineEnum

* `pg` (value: `"pg"`)
* `mysql` (value: `"mysql"`)
* `redis` (value: `"redis"`)
* `mongodb` (value: `"mongodb"`)


<a name="StatusEnum"></a>
## Enum: StatusEnum

* `creating` (value: `"creating"`)
* `online` (value: `"online"`)
* `resizing` (value: `"resizing"`)
* `migrating` (value: `"migrating"`)
* `forking` (value: `"forking"`)

