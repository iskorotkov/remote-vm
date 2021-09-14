# DigitalOceanApi.CdnEndpoint

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | A unique ID that can be used to identify and reference a CDN endpoint. | [optional] 
**origin** | **String** | The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. This is currently restricted to a Space. | 
**endpoint** | **String** | The fully qualified domain name (FQDN) from which the CDN-backed content is served. | [optional] 
**ttl** | **Number** | The amount of time the content is cached by the CDN&#x27;s edge servers in seconds. TTL must be one of 60, 600, 3600, 86400, or 604800. Defaults to 3600 (one hour) when excluded. | [optional] [default to TtlEnum._3600]
**certificateId** | **String** | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. | [optional] 
**customDomain** | **String** | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created. | [optional] 

<a name="TtlEnum"></a>
## Enum: TtlEnum

* `_60` (value: `60`)
* `_600` (value: `600`)
* `_3600` (value: `3600`)
* `_86400` (value: `86400`)
* `_604800` (value: `604800`)

