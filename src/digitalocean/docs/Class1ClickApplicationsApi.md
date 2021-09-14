# DigitalOceanApi.Class1ClickApplicationsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**installKubernetes**](Class1ClickApplicationsApi.md#installKubernetes) | **POST** /v2/1-clicks/kubernetes | Install Kubernetes 1-Click Applications
[**list**](Class1ClickApplicationsApi.md#list) | **GET** /v2/1-clicks | List 1-Click Applications

<a name="installKubernetes"></a>
# **installKubernetes**
> InlineResponse2001 installKubernetes(body)

Install Kubernetes 1-Click Applications

To install a Kubernetes 1-Click application on a cluster, send a POST request to &#x60;/v2/1-clicks/kubernetes&#x60;. The &#x60;addon_slugs&#x60; and &#x60;cluster_uuid&#x60; must be provided as body parameter in order to specify which 1-Click application(s) to install. To list all available 1-Click Kubernetes applications, send a request to &#x60;/v2/1-clicks?type&#x3D;kubernetes&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.Class1ClickApplicationsApi();
let body = new DigitalOceanApi.Model1ClickCreate(); // Model1ClickCreate | 

apiInstance.installKubernetes(body, (error, data, response) => {
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
 **body** | [**Model1ClickCreate**](Model1ClickCreate.md)|  | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="list"></a>
# **list**
> InlineResponse200 list(opts)

List 1-Click Applications

To list all available 1-Click applications, send a GET request to &#x60;/v2/1-clicks&#x60;. The &#x60;type&#x60; may be provided as query paramater in order to restrict results to a certain type of 1-Click, for example: &#x60;/v2/1-clicks?type&#x3D;droplet&#x60;. Current supported types are &#x60;kubernetes&#x60; and &#x60;droplet&#x60;.  The response will be a JSON object with a key called &#x60;1_clicks&#x60;. This will be set to an array of 1-Click application data, each of which will contain the the slug and type for the 1-Click. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.Class1ClickApplicationsApi();
let opts = { 
  'type': "type_example" // String | Restrict results to a certain type of 1-Click.
};
apiInstance.list(opts, (error, data, response) => {
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
 **type** | **String**| Restrict results to a certain type of 1-Click. | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

