# DigitalOceanApi.DomainRecord

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | A unique identifier for each domain record. | [optional] 
**type** | **String** | The type of the DNS record. For example: A, CNAME, TXT, ... | 
**name** | **String** | The host name, alias, or service being defined by the record. | [optional] 
**data** | **String** | Variable data depending on record type. For example, the \&quot;data\&quot; value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates. | [optional] 
**priority** | **Number** | The priority for SRV and MX records. | [optional] 
**port** | **Number** | The port for SRV records. | [optional] 
**ttl** | **Number** | This value is the time to live for the record, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested. | [optional] 
**weight** | **Number** | The weight for SRV records. | [optional] 
**flags** | **Number** | An unsigned integer between 0-255 used for CAA records. | [optional] 
**tag** | **String** | The parameter tag for CAA records. Valid values are \&quot;issue\&quot;, \&quot;issuewild\&quot;, or \&quot;iodef\&quot; | [optional] 
