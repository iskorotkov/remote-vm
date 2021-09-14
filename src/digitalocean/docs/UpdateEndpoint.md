# DigitalOceanApi.UpdateEndpoint

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ttl** | **Number** | The amount of time the content is cached by the CDN&#x27;s edge servers in seconds. TTL must be one of 60, 600, 3600, 86400, or 604800. Defaults to 3600 (one hour) when excluded. | [optional] [default to TtlEnum._3600]
**certificateId** | **String** | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. | [optional] 
**customDomain** | **String** | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. | [optional] 

<a name="TtlEnum"></a>
## Enum: TtlEnum

* `_60` (value: `60`)
* `_600` (value: `600`)
* `_3600` (value: `3600`)
* `_86400` (value: `86400`)
* `_604800` (value: `604800`)

