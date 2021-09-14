# DigitalOceanApi.DatabaseUser

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The name of a database user. | 
**role** | **String** | A string representing the database user&#x27;s role. The value will be either \&quot;primary\&quot; or \&quot;normal\&quot;.  | [optional] 
**password** | **String** | A randomly generated password for the database user. | [optional] 
**mysqlSettings** | [**MysqlSettings**](MysqlSettings.md) |  | [optional] 

<a name="RoleEnum"></a>
## Enum: RoleEnum

* `primary` (value: `"primary"`)
* `normal` (value: `"normal"`)

