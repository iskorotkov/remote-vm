# DigitalOceanApi.Account

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**dropletLimit** | **Number** | The total number of Droplets current user or team may have active at one time. | 
**floatingIpLimit** | **Number** | The total number of Floating IPs the current user or team may have. | 
**email** | **String** | The email address used by the current user to register for DigitalOcean. | 
**uuid** | **String** | The unique universal identifier for the current user. | 
**emailVerified** | **Boolean** | If true, the user has verified their account via email. False otherwise. | [default to false]
**status** | **String** | This value is one of \&quot;active\&quot;, \&quot;warning\&quot; or \&quot;locked\&quot;. | [default to &#x27;active&#x27;]
**statusMessage** | **String** | A human-readable message giving more details about the status of the account. | 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `active` (value: `"active"`)
* `warning` (value: `"warning"`)
* `locked` (value: `"locked"`)

