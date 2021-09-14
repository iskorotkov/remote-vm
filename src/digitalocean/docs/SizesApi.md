# DigitalOceanApi.SizesApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listAllSizes**](SizesApi.md#listAllSizes) | **GET** /v2/sizes | List All Droplet Sizes

<a name="listAllSizes"></a>
# **listAllSizes**
> InlineResponse20052 listAllSizes(opts)

List All Droplet Sizes

To list all of available Droplet sizes, send a GET request to &#x60;/v2/sizes&#x60;. The response will be a JSON object with a key called &#x60;sizes&#x60;. The value of this will be an array of &#x60;size&#x60; objects each of which contain the standard size attributes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SizesApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllSizes(opts, (error, data, response) => {
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

[**InlineResponse20052**](InlineResponse20052.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

