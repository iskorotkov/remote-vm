# DigitalOceanApi.FirewallsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addFirewallDroplets**](FirewallsApi.md#addFirewallDroplets) | **POST** /v2/firewalls/{firewall_id}/droplets | Add Droplets to a Firewall
[**addFirewallRules**](FirewallsApi.md#addFirewallRules) | **POST** /v2/firewalls/{firewall_id}/rules | Add Rules to a Firewall
[**addFirewallTags**](FirewallsApi.md#addFirewallTags) | **POST** /v2/firewalls/{firewall_id}/tags | Add Tags to a Firewall
[**createFirewall**](FirewallsApi.md#createFirewall) | **POST** /v2/firewalls | Create a New Firewall
[**deleteFirewall**](FirewallsApi.md#deleteFirewall) | **DELETE** /v2/firewalls/{firewall_id} | Delete a Firewall
[**deleteFirewallDroplets**](FirewallsApi.md#deleteFirewallDroplets) | **DELETE** /v2/firewalls/{firewall_id}/droplets | Remove Droplets from a Firewall
[**deleteFirewallRules**](FirewallsApi.md#deleteFirewallRules) | **DELETE** /v2/firewalls/{firewall_id}/rules | Remove Rules from a Firewall
[**deleteFirewallTags**](FirewallsApi.md#deleteFirewallTags) | **DELETE** /v2/firewalls/{firewall_id}/tags | Remove Tags from a Firewall
[**getFirewall**](FirewallsApi.md#getFirewall) | **GET** /v2/firewalls/{firewall_id} | Retrieve an Existing Firewall
[**listFirewalls**](FirewallsApi.md#listFirewalls) | **GET** /v2/firewalls | List All Firewalls
[**updateFirewall**](FirewallsApi.md#updateFirewall) | **PUT** /v2/firewalls/{firewall_id} | Update a Firewall

<a name="addFirewallDroplets"></a>
# **addFirewallDroplets**
> addFirewallDroplets(firewallId, opts)

Add Droplets to a Firewall

To assign a Droplet to a firewall, send a POST request to &#x60;/v2/firewalls/$FIREWALL_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallIdDropletsBody() // FirewallIdDropletsBody | 
};
apiInstance.addFirewallDroplets(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallIdDropletsBody**](FirewallIdDropletsBody.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addFirewallRules"></a>
# **addFirewallRules**
> addFirewallRules(firewallId, opts)

Add Rules to a Firewall

To add additional access rules to a firewall, send a POST request to &#x60;/v2/firewalls/$FIREWALL_ID/rules&#x60;. The body of the request may include an inbound_rules and/or outbound_rules attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallIdRulesBody() // FirewallIdRulesBody | 
};
apiInstance.addFirewallRules(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallIdRulesBody**](FirewallIdRulesBody.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addFirewallTags"></a>
# **addFirewallTags**
> addFirewallTags(firewallId, opts)

Add Tags to a Firewall

To assign a tag representing a group of Droplets to a firewall, send a POST request to &#x60;/v2/firewalls/$FIREWALL_ID/tags&#x60;. In the body of the request, there should be a &#x60;tags&#x60; attribute containing a list of tag names.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallIdTagsBody() // FirewallIdTagsBody | 
};
apiInstance.addFirewallTags(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallIdTagsBody**](FirewallIdTagsBody.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createFirewall"></a>
# **createFirewall**
> InlineResponse2021 createFirewall(opts)

Create a New Firewall

To create a new firewall, send a POST request to &#x60;/v2/firewalls&#x60;. The request must contain at least one inbound or outbound access rule. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let opts = { 
  'body': new DigitalOceanApi.V2FirewallsBody() // V2FirewallsBody | 
};
apiInstance.createFirewall(opts, (error, data, response) => {
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
 **body** | [**V2FirewallsBody**](V2FirewallsBody.md)|  | [optional] 

### Return type

[**InlineResponse2021**](InlineResponse2021.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteFirewall"></a>
# **deleteFirewall**
> deleteFirewall(firewallId)

Delete a Firewall

To delete a firewall send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID&#x60;.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.

apiInstance.deleteFirewall(firewallId, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteFirewallDroplets"></a>
# **deleteFirewallDroplets**
> deleteFirewallDroplets(firewallId, opts)

Remove Droplets from a Firewall

To remove a Droplet from a firewall, send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallIdDropletsBody1() // FirewallIdDropletsBody1 | 
};
apiInstance.deleteFirewallDroplets(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallIdDropletsBody1**](FirewallIdDropletsBody1.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteFirewallRules"></a>
# **deleteFirewallRules**
> deleteFirewallRules(firewallId, opts)

Remove Rules from a Firewall

To remove access rules from a firewall, send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID/rules&#x60;. The body of the request may include an &#x60;inbound_rules&#x60; and/or &#x60;outbound_rules&#x60; attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallIdRulesBody1() // FirewallIdRulesBody1 | 
};
apiInstance.deleteFirewallRules(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallIdRulesBody1**](FirewallIdRulesBody1.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteFirewallTags"></a>
# **deleteFirewallTags**
> deleteFirewallTags(firewallId, opts)

Remove Tags from a Firewall

To remove a tag representing a group of Droplets from a firewall, send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID/tags&#x60;. In the body of the request, there should be a &#x60;tags&#x60; attribute containing a list of tag names.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallIdTagsBody1() // FirewallIdTagsBody1 | 
};
apiInstance.deleteFirewallTags(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallIdTagsBody1**](FirewallIdTagsBody1.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getFirewall"></a>
# **getFirewall**
> InlineResponse2021 getFirewall(firewallId)

Retrieve an Existing Firewall

To show information about an existing firewall, send a GET request to &#x60;/v2/firewalls/$FIREWALL_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.

apiInstance.getFirewall(firewallId, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 

### Return type

[**InlineResponse2021**](InlineResponse2021.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listFirewalls"></a>
# **listFirewalls**
> InlineResponse20027 listFirewalls(opts)

List All Firewalls

To list all of the firewalls available on your account, send a GET request to &#x60;/v2/firewalls&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listFirewalls(opts, (error, data, response) => {
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

[**InlineResponse20027**](InlineResponse20027.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateFirewall"></a>
# **updateFirewall**
> InlineResponse2021 updateFirewall(firewallId, opts)

Update a Firewall

To update the configuration of an existing firewall, send a PUT request to &#x60;/v2/firewalls/$FIREWALL_ID&#x60;. The request should contain a full representation of the firewall including existing attributes. **Note that any attributes that are not provided will be reset to their default values.** 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.FirewallsApi();
let firewallId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to identify and reference a firewall.
let opts = { 
  'body': new DigitalOceanApi.FirewallsFirewallIdBody() // FirewallsFirewallIdBody | 
};
apiInstance.updateFirewall(firewallId, opts, (error, data, response) => {
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
 **firewallId** | [**String**](.md)| A unique ID that can be used to identify and reference a firewall. | 
 **body** | [**FirewallsFirewallIdBody**](FirewallsFirewallIdBody.md)|  | [optional] 

### Return type

[**InlineResponse2021**](InlineResponse2021.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

