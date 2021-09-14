# DigitalOceanApi.Certificate

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | A unique ID that can be used to identify and reference a certificate. | [optional] 
**name** | **String** | A unique human-readable name referring to a certificate. | [optional] 
**notAfter** | **Date** | A time value given in ISO8601 combined date and time format that represents the certificate&#x27;s expiration date. | [optional] 
**sha1Fingerprint** | **String** | A unique identifier generated from the SHA-1 fingerprint of the certificate. | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the certificate was created. | [optional] 
**dnsNames** | **[String]** | An array of fully qualified domain names (FQDNs) for which the certificate was issued. | [optional] 
**state** | **String** | A string representing the current state of the certificate. It may be &#x60;pending&#x60;, &#x60;verified&#x60;, or &#x60;error&#x60;. | [optional] 
**type** | **String** | A string representing the type of the certificate. The value will be &#x60;custom&#x60; for a user-uploaded certificate or &#x60;lets_encrypt&#x60; for one automatically generated with Let&#x27;s Encrypt. | [optional] 

<a name="StateEnum"></a>
## Enum: StateEnum

* `pending` (value: `"pending"`)
* `verified` (value: `"verified"`)
* `error` (value: `"error"`)


<a name="TypeEnum"></a>
## Enum: TypeEnum

* `custom` (value: `"custom"`)
* `letsEncrypt` (value: `"lets_encrypt"`)

