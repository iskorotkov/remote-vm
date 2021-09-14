# DigitalOceanApi.ConnectionPool

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | A unique name for the connection pool. Must be between 3 and 60 characters. | 
**mode** | **String** | The PGBouncer transaction mode for the connection pool. The allowed values are session, transaction, and statement. | 
**size** | **Number** | The desired size of the PGBouncer connection pool. The maximum allowed size is determined by the size of the cluster&#x27;s primary node. 25 backend server connections are allowed for every 1GB of RAM. Three are reserved for maintenance. For example, a primary node with 1 GB of RAM allows for a maximum of 22 backend server connections while one with 4 GB would allow for 97. Note that these are shared across all connection pools in a cluster. | 
**db** | **String** | The database for use with the connection pool. | 
**user** | **String** | The name of the user for use with the connection pool. | 
**connection** | **AllOfconnectionPoolConnection** |  | [optional] 
**privateConnection** | **AllOfconnectionPoolPrivateConnection** |  | [optional] 
