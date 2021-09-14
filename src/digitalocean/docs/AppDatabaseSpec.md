# DigitalOceanApi.AppDatabaseSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**clusterName** | **String** | The name of the underlying DigitalOcean DBaaS cluster. This is required for production databases. For dev databases, if cluster_name is not set, a new cluster will be provisioned. | [optional] 
**dbName** | **String** | The name of the MySQL or PostgreSQL database to configure. | [optional] 
**dbUser** | **String** | The name of the MySQL or PostgreSQL user to configure. | [optional] 
**engine** | **String** | - MYSQL: MySQL - PG: PostgreSQL - REDIS: Redis | [optional] [default to &#x27;UNSET&#x27;]
**name** | **String** | The name. Must be unique across all components within the same app. | 
**production** | **Boolean** | Whether this is a production or dev database. | [optional] 
**version** | **String** | The version of the database engine | [optional] 

<a name="EngineEnum"></a>
## Enum: EngineEnum

* `UNSET` (value: `"UNSET"`)
* `MYSQL` (value: `"MYSQL"`)
* `PG` (value: `"PG"`)
* `REDIS` (value: `"REDIS"`)

