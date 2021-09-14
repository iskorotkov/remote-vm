# DigitalOceanApi.LoadBalancersApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addLoadBalancerDroplets**](LoadBalancersApi.md#addLoadBalancerDroplets) | **POST** /v2/load_balancers/{lb_id}/droplets | Add Droplets to a Load Balancer
[**addLoadBalancerForwardingRules**](LoadBalancersApi.md#addLoadBalancerForwardingRules) | **POST** /v2/load_balancers/{lb_id}/forwarding_rules | Add Forwarding Rules to a Load Balancer
[**createLoadBalancer**](LoadBalancersApi.md#createLoadBalancer) | **POST** /v2/load_balancers | Create a New Load Balancer
[**deleteLoadBalancer**](LoadBalancersApi.md#deleteLoadBalancer) | **DELETE** /v2/load_balancers/{lb_id} | Delete a Load Balancer
[**getLoadBalancer**](LoadBalancersApi.md#getLoadBalancer) | **GET** /v2/load_balancers/{lb_id} | Retrieve an Existing Load Balancer
[**listAllLoadBalancers**](LoadBalancersApi.md#listAllLoadBalancers) | **GET** /v2/load_balancers | List All Load Balancers
[**removeLoadBalancerDroplets**](LoadBalancersApi.md#removeLoadBalancerDroplets) | **DELETE** /v2/load_balancers/{lb_id}/droplets | Remove Droplets from a Load Balancer
[**removeLoadBalancerForwardingRules**](LoadBalancersApi.md#removeLoadBalancerForwardingRules) | **DELETE** /v2/load_balancers/{lb_id}/forwarding_rules | Remove Forwarding Rules from a Load Balancer
[**updateLoadBalancer**](LoadBalancersApi.md#updateLoadBalancer) | **PUT** /v2/load_balancers/{lb_id} | Update a Load Balancer

<a name="addLoadBalancerDroplets"></a>
# **addLoadBalancerDroplets**
> addLoadBalancerDroplets(body, lbId)

Add Droplets to a Load Balancer

To assign a Droplet to a load balancer instance, send a POST request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs. Individual Droplets can not be added to a load balancer configured with a Droplet tag. Attempting to do so will result in a \&quot;422 Unprocessable Entity\&quot; response from the API.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let body = new DigitalOceanApi.LbIdDropletsBody(); // LbIdDropletsBody | 
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.addLoadBalancerDroplets(body, lbId, (error, data, response) => {
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
 **body** | [**LbIdDropletsBody**](LbIdDropletsBody.md)|  | 
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addLoadBalancerForwardingRules"></a>
# **addLoadBalancerForwardingRules**
> addLoadBalancerForwardingRules(body, lbId)

Add Forwarding Rules to a Load Balancer

To add an additional forwarding rule to a load balancer instance, send a POST request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules&#x60;. In the body of the request, there should be a &#x60;forwarding_rules&#x60; attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let body = new DigitalOceanApi.LbIdForwardingRulesBody(); // LbIdForwardingRulesBody | 
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.addLoadBalancerForwardingRules(body, lbId, (error, data, response) => {
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
 **body** | [**LbIdForwardingRulesBody**](LbIdForwardingRulesBody.md)|  | 
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createLoadBalancer"></a>
# **createLoadBalancer**
> InlineResponse2026 createLoadBalancer(body)

Create a New Load Balancer

To create a new load balancer instance, send a POST request to &#x60;/v2/load_balancers&#x60;.  You can specify the Droplets that will sit behind the load balancer using one of two methods:  * Set &#x60;droplet_ids&#x60; to a list of specific Droplet IDs. * Set &#x60;tag&#x60; to the name of a tag. All Droplets with this tag applied will be   assigned to the load balancer. Additional Droplets will be automatically   assigned as they are tagged.  These methods are mutually exclusive. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let body = new DigitalOceanApi.LoadBalancerCreate(); // LoadBalancerCreate | 

apiInstance.createLoadBalancer(body, (error, data, response) => {
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
 **body** | [**LoadBalancerCreate**](LoadBalancerCreate.md)|  | 

### Return type

[**InlineResponse2026**](InlineResponse2026.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteLoadBalancer"></a>
# **deleteLoadBalancer**
> deleteLoadBalancer(lbId)

Delete a Load Balancer

To delete a load balancer instance, disassociating any Droplets assigned to it and removing it from your account, send a DELETE request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.deleteLoadBalancer(lbId, (error, data, response) => {
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
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getLoadBalancer"></a>
# **getLoadBalancer**
> InlineResponse2026 getLoadBalancer(lbId)

Retrieve an Existing Load Balancer

To show information about a load balancer instance, send a GET request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.getLoadBalancer(lbId, (error, data, response) => {
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
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

[**InlineResponse2026**](InlineResponse2026.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllLoadBalancers"></a>
# **listAllLoadBalancers**
> InlineResponse20039 listAllLoadBalancers(opts)

List All Load Balancers

To list all of the load balancer instances on your account, send a GET request to &#x60;/v2/load_balancers&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllLoadBalancers(opts, (error, data, response) => {
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

[**InlineResponse20039**](InlineResponse20039.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="removeLoadBalancerDroplets"></a>
# **removeLoadBalancerDroplets**
> removeLoadBalancerDroplets(body, lbId)

Remove Droplets from a Load Balancer

To remove a Droplet from a load balancer instance, send a DELETE request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let body = new DigitalOceanApi.LbIdDropletsBody1(); // LbIdDropletsBody1 | 
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.removeLoadBalancerDroplets(body, lbId, (error, data, response) => {
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
 **body** | [**LbIdDropletsBody1**](LbIdDropletsBody1.md)|  | 
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="removeLoadBalancerForwardingRules"></a>
# **removeLoadBalancerForwardingRules**
> removeLoadBalancerForwardingRules(body, lbId)

Remove Forwarding Rules from a Load Balancer

To remove forwarding rules from a load balancer instance, send a DELETE request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules&#x60;. In the body of the request, there should be a &#x60;forwarding_rules&#x60; attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let body = new DigitalOceanApi.LbIdForwardingRulesBody1(); // LbIdForwardingRulesBody1 | 
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.removeLoadBalancerForwardingRules(body, lbId, (error, data, response) => {
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
 **body** | [**LbIdForwardingRulesBody1**](LbIdForwardingRulesBody1.md)|  | 
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateLoadBalancer"></a>
# **updateLoadBalancer**
> InlineResponse2026 updateLoadBalancer(body, lbId)

Update a Load Balancer

To update a load balancer&#x27;s settings, send a PUT request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID&#x60;. The request should contain a full representation of the load balancer including existing attributes. It may contain _one of_ the &#x60;droplets_ids&#x60; or &#x60;tag&#x60; attributes as they are mutually exclusive. **Note that any attribute that is not provided will be reset to its default value.** 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.LoadBalancersApi();
let body = new DigitalOceanApi.LoadBalancerCreate(); // LoadBalancerCreate | 
let lbId = "lbId_example"; // String | A unique identifier for a load balancer.

apiInstance.updateLoadBalancer(body, lbId, (error, data, response) => {
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
 **body** | [**LoadBalancerCreate**](LoadBalancerCreate.md)|  | 
 **lbId** | **String**| A unique identifier for a load balancer. | 

### Return type

[**InlineResponse2026**](InlineResponse2026.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

