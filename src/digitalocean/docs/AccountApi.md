# DigitalOceanApi.AccountApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getUserInformation**](AccountApi.md#getUserInformation) | **GET** /v2/account | Get User Information

<a name="getUserInformation"></a>
# **getUserInformation**
> InlineResponse2002 getUserInformation()

Get User Information

To show information about the current user account, send a GET request to &#x60;/v2/account&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AccountApi();
apiInstance.getUserInformation((error, data, response) => {
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

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

