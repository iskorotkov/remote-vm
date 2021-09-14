# DigitalOceanApi.FloatingIPActionsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFloatingIpAction**](FloatingIPActionsApi.md#getFloatingIpAction) | **GET** /v2/floating_ips/{floating_ip}/actions/{action_id} | Retrieve an Existing Floating IP Action
[**listFloatingIpActions**](FloatingIPActionsApi.md#listFloatingIpActions) | **GET** /v2/floating_ips/{floating_ip}/actions | List All Actions for a Floating IP
[**postFloatingIpAction**](FloatingIPActionsApi.md#postFloatingIpAction) | **POST** /v2/floating_ips/{floating_ip}/actions | Initiate a Floating IP Action

<a name="getFloatingIpAction"></a>
# **getFloatingIpAction**
> InlineResponse20111 getFloatingIpAction(floatingIp, actionId)

Retrieve an Existing Floating IP Action

To retrieve the status of a floating IP action, send a GET request to &#x60;/v2/floating_ips/$FLOATING_IP/actions/$ACTION_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPActionsApi();
let floatingIp = "floatingIp_example"; // String | A floating IP address.
let actionId = 56; // Number | A unique numeric ID that can be used to identify and reference an action.

apiInstance.getFloatingIpAction(floatingIp, actionId, (error, data, response) => {
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
 **floatingIp** | **String**| A floating IP address. | 
 **actionId** | **Number**| A unique numeric ID that can be used to identify and reference an action. | 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listFloatingIpActions"></a>
# **listFloatingIpActions**
> InlineResponse20032 listFloatingIpActions(floatingIp)

List All Actions for a Floating IP

To retrieve all actions that have been executed on a floating IP, send a GET request to &#x60;/v2/floating_ips/$FLOATING_IP/actions&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPActionsApi();
let floatingIp = "floatingIp_example"; // String | A floating IP address.

apiInstance.listFloatingIpActions(floatingIp, (error, data, response) => {
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
 **floatingIp** | **String**| A floating IP address. | 

### Return type

[**InlineResponse20032**](InlineResponse20032.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postFloatingIpAction"></a>
# **postFloatingIpAction**
> InlineResponse20111 postFloatingIpAction(floatingIp, opts)

Initiate a Floating IP Action

To initiate an action on a floating IP send a POST request to &#x60;/v2/floating_ips/$FLOATING_IP/actions&#x60;. In the JSON body to the request, set the &#x60;type&#x60; attribute to on of the supported action types:  | Action     | Details |------------|-------- | &#x60;assign&#x60;   | Assigns a floating IP to a Droplet | &#x60;unassign&#x60; | Unassign a floating IP from a Droplet 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPActionsApi();
let floatingIp = "floatingIp_example"; // String | A floating IP address.
let opts = { 
  'body': new DigitalOceanApi.FloatingIpActionsBody() // FloatingIpActionsBody | The `type` attribute set in the request body will specify the action that
will be taken on the floating IP.

};
apiInstance.postFloatingIpAction(floatingIp, opts, (error, data, response) => {
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
 **floatingIp** | **String**| A floating IP address. | 
 **body** | [**FloatingIpActionsBody**](FloatingIpActionsBody.md)| The &#x60;type&#x60; attribute set in the request body will specify the action that
will be taken on the floating IP.
 | [optional] 

### Return type

[**InlineResponse20111**](InlineResponse20111.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

