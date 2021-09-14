# DigitalOceanApi.StickySessions

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | An attribute indicating how and if requests from a client will be persistently served by the same backend Droplet. The possible values are &#x60;cookies&#x60; or &#x60;none&#x60;. | [optional] [default to &#x27;none&#x27;]
**cookieName** | **String** | The name of the cookie sent to the client. This attribute is only returned when using &#x60;cookies&#x60; for the sticky sessions type. | [optional] 
**cookieTtlSeconds** | **Number** | The number of seconds until the cookie set by the load balancer expires. This attribute is only returned when using &#x60;cookies&#x60; for the sticky sessions type. | [optional] 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `cookies` (value: `"cookies"`)
* `none` (value: `"none"`)

