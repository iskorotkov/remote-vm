# DigitalOceanApi.RegionsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listAllRegions**](RegionsApi.md#listAllRegions) | **GET** /v2/regions | List All Data Center Regions

<a name="listAllRegions"></a>
# **listAllRegions**
> InlineResponse20045 listAllRegions(opts)

List All Data Center Regions

To list all of the regions that are available, send a GET request to &#x60;/v2/regions&#x60;. The response will be a JSON object with a key called &#x60;regions&#x60;. The value of this will be an array of &#x60;region&#x60; objects, each of which will contain the standard region attributes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.RegionsApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllRegions(opts, (error, data, response) => {
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

[**InlineResponse20045**](InlineResponse20045.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

