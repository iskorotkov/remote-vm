# DigitalOceanApi.VPCsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createVpc**](VPCsApi.md#createVpc) | **POST** /v2/vpcs | Create a New VPC
[**deleteVpc**](VPCsApi.md#deleteVpc) | **DELETE** /v2/vpcs/{vpc_id} | Delete a VPC
[**getVpc**](VPCsApi.md#getVpc) | **GET** /v2/vpcs/{vpc_id} | Retrieve an Existing VPC
[**listVpcMembers**](VPCsApi.md#listVpcMembers) | **GET** /v2/vpcs/{vpc_id}/members | List the Member Resources of a VPC
[**listVpcs**](VPCsApi.md#listVpcs) | **GET** /v2/vpcs | List All VPCs
[**patchVpc**](VPCsApi.md#patchVpc) | **PATCH** /v2/vpcs/{vpc_id} | Partially Update a VPC
[**updateVpc**](VPCsApi.md#updateVpc) | **PUT** /v2/vpcs/{vpc_id} | Update a VPC

<a name="createVpc"></a>
# **createVpc**
> InlineResponse20117 createVpc(body)

Create a New VPC

To create a VPC, send a POST request to &#x60;/v2/vpcs&#x60; specifying the attributes in the table below in the JSON body.  **Note:** If you do not currently have a VPC network in a specific datacenter region, the first one that you create will be set as the default for that region. The default VPC for a region cannot be changed or deleted. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let body = new DigitalOceanApi.V2VpcsBody(); // V2VpcsBody | 

apiInstance.createVpc(body, (error, data, response) => {
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
 **body** | [**V2VpcsBody**](V2VpcsBody.md)|  | 

### Return type

[**InlineResponse20117**](InlineResponse20117.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteVpc"></a>
# **deleteVpc**
> deleteVpc(vpcId)

Delete a VPC

To delete a VPC, send a DELETE request to &#x60;/v2/vpcs/$VPC_ID&#x60;. A 204 status code with no body will be returned in response to a successful request.  The default VPC for a region can not be deleted. Additionally, a VPC can only be deleted if it does not contain any member resources. Attempting to delete a region&#x27;s default VPC or a VPC that still has members will result in a 403 Forbidden error response. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let vpcId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a VPC.

apiInstance.deleteVpc(vpcId, (error, data, response) => {
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
 **vpcId** | [**String**](.md)| A unique identifier for a VPC. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getVpc"></a>
# **getVpc**
> InlineResponse20117 getVpc(vpcId)

Retrieve an Existing VPC

To show information about an existing VPC, send a GET request to &#x60;/v2/vpcs/$VPC_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let vpcId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a VPC.

apiInstance.getVpc(vpcId, (error, data, response) => {
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
 **vpcId** | [**String**](.md)| A unique identifier for a VPC. | 

### Return type

[**InlineResponse20117**](InlineResponse20117.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listVpcMembers"></a>
# **listVpcMembers**
> InlineResponse20062 listVpcMembers(vpcId, opts)

List the Member Resources of a VPC

To list all of the resources that are members of a VPC, send a GET request to &#x60;/v2/vpcs/$VPC_ID/members&#x60;.  To only list resources of a specific type that are members of the VPC, included a &#x60;resource_type&#x60; query parameter. For example, to only list Droplets in the VPC, send a GET request to &#x60;/v2/vpcs/$VPC_ID/members?resource_type&#x3D;droplet&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let vpcId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a VPC.
let opts = { 
  'resourceType': "resourceType_example", // String | Used to filter VPC members by a resource type.
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listVpcMembers(vpcId, opts, (error, data, response) => {
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
 **vpcId** | [**String**](.md)| A unique identifier for a VPC. | 
 **resourceType** | **String**| Used to filter VPC members by a resource type. | [optional] 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20062**](InlineResponse20062.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listVpcs"></a>
# **listVpcs**
> InlineResponse20061 listVpcs(opts)

List All VPCs

To list all of the VPCs on your account, send a GET request to &#x60;/v2/vpcs&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listVpcs(opts, (error, data, response) => {
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

[**InlineResponse20061**](InlineResponse20061.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="patchVpc"></a>
# **patchVpc**
> InlineResponse20117 patchVpc(body, vpcId)

Partially Update a VPC

To update a subset of information about a VPC, send a PATCH request to &#x60;/v2/vpcs/$VPC_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let body = new DigitalOceanApi.VpcsVpcIdBody1(); // VpcsVpcIdBody1 | 
let vpcId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a VPC.

apiInstance.patchVpc(body, vpcId, (error, data, response) => {
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
 **body** | [**VpcsVpcIdBody1**](VpcsVpcIdBody1.md)|  | 
 **vpcId** | [**String**](.md)| A unique identifier for a VPC. | 

### Return type

[**InlineResponse20117**](InlineResponse20117.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateVpc"></a>
# **updateVpc**
> InlineResponse20117 updateVpc(body, vpcId)

Update a VPC

To update information about a VPC, send a PUT request to &#x60;/v2/vpcs/$VPC_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.VPCsApi();
let body = new DigitalOceanApi.VpcsVpcIdBody(); // VpcsVpcIdBody | 
let vpcId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a VPC.

apiInstance.updateVpc(body, vpcId, (error, data, response) => {
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
 **body** | [**VpcsVpcIdBody**](VpcsVpcIdBody.md)|  | 
 **vpcId** | [**String**](.md)| A unique identifier for a VPC. | 

### Return type

[**InlineResponse20117**](InlineResponse20117.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

