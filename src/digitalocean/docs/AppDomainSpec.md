# DigitalOceanApi.AppDomainSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**domain** | **String** | The hostname for the domain | 
**type** | **String** | - DEFAULT: The default &#x60;.ondigitalocean.app&#x60; domain assigned to this app - PRIMARY: The primary domain for this app that is displayed as the default in the control panel, used in bindable environment variables, and any other places that reference an app&#x27;s live URL. Only one domain may be set as primary. - ALIAS: A non-primary domain | [optional] [default to &#x27;UNSPECIFIED&#x27;]
**wildcard** | **Boolean** | Indicates whether the domain includes all sub-domains, in addition to the given domain | [optional] 
**zone** | **String** | Optional. If the domain uses DigitalOcean DNS and you would like App Platform to automatically manage it for you, set this to the name of the domain on your account.  For example, If the domain you are adding is &#x60;app.domain.com&#x60;, the zone could be &#x60;domain.com&#x60;. | [optional] 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `UNSPECIFIED` (value: `"UNSPECIFIED"`)
* `DEFAULT` (value: `"DEFAULT"`)
* `PRIMARY` (value: `"PRIMARY"`)
* `ALIAS` (value: `"ALIAS"`)

