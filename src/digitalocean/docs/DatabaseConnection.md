# DigitalOceanApi.DatabaseConnection

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uri** | **String** | A connection string in the format accepted by the &#x60;psql&#x60; command. This is provided as a convenience and should be able to be constructed by the other attributes. | [optional] 
**database** | **String** | The name of the default database. | [optional] 
**host** | **String** | The FQDN pointing to the database cluster&#x27;s current primary node. | [optional] 
**port** | **Number** | The port on which the database cluster is listening. | [optional] 
**user** | **String** | The default user for the database. | [optional] 
**password** | **String** | The randomly generated password for the default user. | [optional] 
**ssl** | **Boolean** | A boolean value indicating if the connection should be made over SSL. | [optional] 
