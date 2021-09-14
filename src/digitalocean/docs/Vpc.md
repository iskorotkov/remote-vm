# DigitalOceanApi.Vpc

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**region** | **String** | The slug identifier for the region where the VPC will be created. | [optional] 
**ipRange** | **String** | The range of IP addresses in the VPC in CIDR notation. Network ranges cannot overlap with other networks in the same account and must be in range of private addresses as defined in RFC1918. It may not be smaller than &#x60;/24&#x60; nor larger than &#x60;/16&#x60;. If no IP range is specified, a &#x60;/20&#x60; network range is generated that won&#x27;t conflict with other VPC networks in your account. | [optional] 
**_default** | **Boolean** | A boolean value indicating whether or not the VPC is the default network for the region. All applicable resources are placed into the default VPC network unless otherwise specified during their creation. The &#x60;default&#x60; field cannot be unset from &#x60;true&#x60;. If you want to set a new default VPC network, update the &#x60;default&#x60; field of another VPC network in the same region. The previous network&#x27;s &#x60;default&#x60; field will be set to &#x60;false&#x60; when a new default VPC has been defined. | [optional] 
**id** | **String** | A unique ID that can be used to identify and reference the VPC. | [optional] 
**urn** | [**Urn**](Urn.md) |  | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format. | [optional] 
