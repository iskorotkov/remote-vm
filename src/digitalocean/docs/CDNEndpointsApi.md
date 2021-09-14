# DigitalOceanApi.CDNEndpointsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCdnEndpoint**](CDNEndpointsApi.md#createCdnEndpoint) | **POST** /v2/cdn/endpoints | Create a New CDN Endpoint
[**deleteCdnEndpoint**](CDNEndpointsApi.md#deleteCdnEndpoint) | **DELETE** /v2/cdn/endpoints/{cdn_id} | Delete a CDN Endpoint
[**getCdnEndpoint**](CDNEndpointsApi.md#getCdnEndpoint) | **GET** /v2/cdn/endpoints/{cdn_id} | Retrieve an Existing CDN Endpoint
[**listCdnEndpoints**](CDNEndpointsApi.md#listCdnEndpoints) | **GET** /v2/cdn/endpoints | List All CDN Endpoints
[**purgeCdnCache**](CDNEndpointsApi.md#purgeCdnCache) | **DELETE** /v2/cdn/endpoints/{cdn_id}/cache | Purge the Cache for an Existing CDN Endpoint
[**updateCdnEndpoint**](CDNEndpointsApi.md#updateCdnEndpoint) | **PUT** /v2/cdn/endpoints/{cdn_id} | Update a CDN Endpoint

<a name="createCdnEndpoint"></a>
# **createCdnEndpoint**
> InlineResponse2011 createCdnEndpoint(body)

Create a New CDN Endpoint

To create a new CDN endpoint, send a POST request to &#x60;/v2/cdn/endpoints&#x60;. The origin attribute must be set to the fully qualified domain name (FQDN) of a DigitalOcean Space. Optionally, the TTL may be configured by setting the &#x60;ttl&#x60; attribute.  A custom subdomain may be configured by specifying the &#x60;custom_domain&#x60; and &#x60;certificate_id&#x60; attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CDNEndpointsApi();
let body = new DigitalOceanApi.CdnEndpoint(); // CdnEndpoint | 

apiInstance.createCdnEndpoint(body, (error, data, response) => {
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
 **body** | [**CdnEndpoint**](CdnEndpoint.md)|  | 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteCdnEndpoint"></a>
# **deleteCdnEndpoint**
> deleteCdnEndpoint(cdnId)

Delete a CDN Endpoint

To delete a specific CDN endpoint, send a DELETE request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CDNEndpointsApi();
let cdnId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a CDN endpoint.

apiInstance.deleteCdnEndpoint(cdnId, (error, data, response) => {
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
 **cdnId** | [**String**](.md)| A unique identifier for a CDN endpoint. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getCdnEndpoint"></a>
# **getCdnEndpoint**
> InlineResponse2011 getCdnEndpoint(cdnId)

Retrieve an Existing CDN Endpoint

To show information about an existing CDN endpoint, send a GET request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CDNEndpointsApi();
let cdnId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a CDN endpoint.

apiInstance.getCdnEndpoint(cdnId, (error, data, response) => {
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
 **cdnId** | [**String**](.md)| A unique identifier for a CDN endpoint. | 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listCdnEndpoints"></a>
# **listCdnEndpoints**
> InlineResponse2006 listCdnEndpoints(opts)

List All CDN Endpoints

To list all of the CDN endpoints available on your account, send a GET request to &#x60;/v2/cdn/endpoints&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CDNEndpointsApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listCdnEndpoints(opts, (error, data, response) => {
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
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="purgeCdnCache"></a>
# **purgeCdnCache**
> purgeCdnCache(body, cdnId)

Purge the Cache for an Existing CDN Endpoint

To purge cached content from a CDN endpoint, send a DELETE request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID/cache&#x60;. The body of the request should include a &#x60;files&#x60; attribute containing a list of cached file paths to be purged. A path may be for a single file or may contain a wildcard (&#x60;*&#x60;) to recursively purge all files under a directory. When only a wildcard is provided, all cached files will be purged. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CDNEndpointsApi();
let body = new DigitalOceanApi.PurgeCache(); // PurgeCache | 
let cdnId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a CDN endpoint.

apiInstance.purgeCdnCache(body, cdnId, (error, data, response) => {
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
 **body** | [**PurgeCache**](PurgeCache.md)|  | 
 **cdnId** | [**String**](.md)| A unique identifier for a CDN endpoint. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateCdnEndpoint"></a>
# **updateCdnEndpoint**
> InlineResponse2011 updateCdnEndpoint(body, cdnId)

Update a CDN Endpoint

To update the TTL, certificate ID, or the FQDN of the custom subdomain for an existing CDN endpoint, send a PUT request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CDNEndpointsApi();
let body = new DigitalOceanApi.UpdateEndpoint(); // UpdateEndpoint | 
let cdnId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a CDN endpoint.

apiInstance.updateCdnEndpoint(body, cdnId, (error, data, response) => {
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
 **body** | [**UpdateEndpoint**](UpdateEndpoint.md)|  | 
 **cdnId** | [**String**](.md)| A unique identifier for a CDN endpoint. | 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

