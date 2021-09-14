# DigitalOceanApi.FloatingIPsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createFloatingIp**](FloatingIPsApi.md#createFloatingIp) | **POST** /v2/floating_ips | Create a New Floating IP
[**deleteFloatingIp**](FloatingIPsApi.md#deleteFloatingIp) | **DELETE** /v2/floating_ips/{floating_ip} | Delete a Floating IPs
[**getFloatingIp**](FloatingIPsApi.md#getFloatingIp) | **GET** /v2/floating_ips/{floating_ip} | Retrieve an Existing Floating IP
[**listFloatingIps**](FloatingIPsApi.md#listFloatingIps) | **GET** /v2/floating_ips | List All Floating IPs

<a name="createFloatingIp"></a>
# **createFloatingIp**
> InlineResponse2022 createFloatingIp(body)

Create a New Floating IP

On creation, a floating IP must be either assigned to a Droplet or reserved to a region. * To create a new floating IP assigned to a Droplet, send a POST   request to &#x60;/v2/floating_ips&#x60; with the &#x60;droplet_id&#x60; attribute.  * To create a new floating IP reserved to a region, send a POST request to   &#x60;/v2/floating_ips&#x60; with the &#x60;region&#x60; attribute.  **Note**:  In addition to the standard rate limiting, only 12 floating IPs may be created per 60 seconds.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPsApi();
let body = new DigitalOceanApi.FloatingIpCreate(); // FloatingIpCreate | 

apiInstance.createFloatingIp(body, (error, data, response) => {
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
 **body** | [**FloatingIpCreate**](FloatingIpCreate.md)|  | 

### Return type

[**InlineResponse2022**](InlineResponse2022.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteFloatingIp"></a>
# **deleteFloatingIp**
> deleteFloatingIp(floatingIp)

Delete a Floating IPs

To delete a floating IP and remove it from your account, send a DELETE request to &#x60;/v2/floating_ips/$FLOATING_IP_ADDR&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPsApi();
let floatingIp = "floatingIp_example"; // String | A floating IP address.

apiInstance.deleteFloatingIp(floatingIp, (error, data, response) => {
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
 **floatingIp** | **String**| A floating IP address. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getFloatingIp"></a>
# **getFloatingIp**
> InlineResponse20031 getFloatingIp(floatingIp)

Retrieve an Existing Floating IP

To show information about a floating IP, send a GET request to &#x60;/v2/floating_ips/$FLOATING_IP_ADDR&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPsApi();
let floatingIp = "floatingIp_example"; // String | A floating IP address.

apiInstance.getFloatingIp(floatingIp, (error, data, response) => {
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

[**InlineResponse20031**](InlineResponse20031.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listFloatingIps"></a>
# **listFloatingIps**
> InlineResponse20030 listFloatingIps()

List All Floating IPs

To list all of the floating IPs available on your account, send a GET request to &#x60;/v2/floating_ips&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FloatingIPsApi();
apiInstance.listFloatingIps((error, data, response) => {
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

[**InlineResponse20030**](InlineResponse20030.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

