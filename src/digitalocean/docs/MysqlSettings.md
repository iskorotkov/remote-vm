# DigitalOceanApi.MysqlSettings

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**authPlugin** | **String** | A string specifying the authentication method to be used for connections to the MySQL user account. The valid values are &#x60;mysql_native_password&#x60; or &#x60;caching_sha2_password&#x60;. If excluded when creating a new user, the default for the version of MySQL in use will be used. As of MySQL 8.0, the default is &#x60;caching_sha2_password&#x60;.  | 

<a name="AuthPluginEnum"></a>
## Enum: AuthPluginEnum

* `mysqlNativePassword` (value: `"mysql_native_password"`)
* `cachingSha2Password` (value: `"caching_sha2_password"`)

