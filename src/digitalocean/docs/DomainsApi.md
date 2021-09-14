# DigitalOceanApi.DomainsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDomain**](DomainsApi.md#createDomain) | **POST** /v2/domains | Create a New Domain
[**deleteDomain**](DomainsApi.md#deleteDomain) | **DELETE** /v2/domains/{domain_name} | Delete a Domain
[**getDomain**](DomainsApi.md#getDomain) | **GET** /v2/domains/{domain_name} | Retrieve an Existing Domain
[**listAllDomains**](DomainsApi.md#listAllDomains) | **GET** /v2/domains | List All Domains

<a name="createDomain"></a>
# **createDomain**
> InlineResponse2018 createDomain(opts)

Create a New Domain

To create a new domain, send a POST request to &#x60;/v2/domains&#x60;. Set the \&quot;name\&quot; attribute to the domain name you are adding. Optionally, you may set the \&quot;ip_address\&quot; attribute, and an A record will be automatically created pointing to the apex domain. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainsApi();
let opts = { 
  'body': new DigitalOceanApi.Domain() // Domain | 
};
apiInstance.createDomain(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Domain**](Domain.md)|  | [optional] 

### Return type

[**InlineResponse2018**](InlineResponse2018.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteDomain"></a>
# **deleteDomain**
> deleteDomain(domainName)

Delete a Domain

To delete a domain, send a DELETE request to &#x60;/v2/domains/$DOMAIN_NAME&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.

apiInstance.deleteDomain(domainName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domainName** | **String**| The name of the domain itself. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDomain"></a>
# **getDomain**
> InlineResponse20019 getDomain(domainName)

Retrieve an Existing Domain

To get details about a specific domain, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.

apiInstance.getDomain(domainName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domainName** | **String**| The name of the domain itself. | 

### Return type

[**InlineResponse20019**](InlineResponse20019.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllDomains"></a>
# **listAllDomains**
> InlineResponse20018 listAllDomains()

List All Domains

To retrieve a list of all of the domains in your account, send a GET request to &#x60;/v2/domains&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainsApi();
apiInstance.listAllDomains((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse20018**](InlineResponse20018.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

