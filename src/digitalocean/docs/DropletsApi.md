# DigitalOceanApi.DropletsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDroplet**](DropletsApi.md#createDroplet) | **POST** /v2/droplets | Create a New Droplet
[**destroyDroplet**](DropletsApi.md#destroyDroplet) | **DELETE** /v2/droplets/{droplet_id} | Delete an Existing Droplet
[**destroyDropletsByTag**](DropletsApi.md#destroyDropletsByTag) | **DELETE** /v2/droplets | Deleting Droplets by Tag
[**destroyWithAssociatedResourcesDangerous**](DropletsApi.md#destroyWithAssociatedResourcesDangerous) | **DELETE** /v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous | Destroy a Droplet and All of its Associated Resources (Dangerous)
[**destroyWithAssociatedResourcesSelective**](DropletsApi.md#destroyWithAssociatedResourcesSelective) | **DELETE** /v2/droplets/{droplet_id}/destroy_with_associated_resources/selective | Selectively Destroy a Droplet and its Associated Resources
[**getDestroyWithAssociatedResourcesStatus**](DropletsApi.md#getDestroyWithAssociatedResourcesStatus) | **GET** /v2/droplets/{droplet_id}/destroy_with_associated_resources/status | Check Status of a Droplet Destroy with Associated Resources Request
[**getDroplet**](DropletsApi.md#getDroplet) | **GET** /v2/droplets/{droplet_id} | Retrieve an Existing Droplet
[**listAllDropletNeighborsIds**](DropletsApi.md#listAllDropletNeighborsIds) | **GET** /v2/reports/droplet_neighbors_ids | List All Droplet Neighbors
[**listAllDroplets**](DropletsApi.md#listAllDroplets) | **GET** /v2/droplets | List All Droplets
[**listDropletAssociatedResources**](DropletsApi.md#listDropletAssociatedResources) | **GET** /v2/droplets/{droplet_id}/destroy_with_associated_resources | List Associated Resources for a Droplet
[**listDropletBackups**](DropletsApi.md#listDropletBackups) | **GET** /v2/droplets/{droplet_id}/backups | List Backups for a Droplet
[**listDropletFirewalls**](DropletsApi.md#listDropletFirewalls) | **GET** /v2/droplets/{droplet_id}/firewalls | List all Firewalls Applied to a Droplet
[**listDropletKernels**](DropletsApi.md#listDropletKernels) | **GET** /v2/droplets/{droplet_id}/kernels | List All Available Kernels for a Droplet
[**listDropletNeighbors**](DropletsApi.md#listDropletNeighbors) | **GET** /v2/droplets/{droplet_id}/neighbors | List Neighbors for a Droplet
[**listDropletSnapshots**](DropletsApi.md#listDropletSnapshots) | **GET** /v2/droplets/{droplet_id}/snapshots | List Snapshots for a Droplet
[**retryDestroyWithAssociatedResource**](DropletsApi.md#retryDestroyWithAssociatedResource) | **POST** /v2/droplets/{droplet_id}/destroy_with_associated_resources/retry | Retry a Droplet Destroy with Associated Resources Request

<a name="createDroplet"></a>
# **createDroplet**
> InlineResponse202 createDroplet(opts)

Create a New Droplet

To create a new Droplet, send a POST request to &#x60;/v2/droplets&#x60; setting the required attributes.  A Droplet will be created using the provided information. The response body will contain a JSON object with a key called &#x60;droplet&#x60;. The value will be an object containing the standard attributes for your new Droplet. The response code, 202 Accepted, does not indicate the success or failure of the operation, just that the request has been accepted for processing. The &#x60;actions&#x60; returned as part of the response&#x27;s &#x60;links&#x60; object can be used to check the status of the Droplet create event.  ### Create Multiple Droplets  Creating multiple Droplets is very similar to creating a single Droplet. Instead of sending &#x60;name&#x60; as a string, send &#x60;names&#x60; as an array of strings. A Droplet will be created for each name you send using the associated information. Up to ten Droplets may be created this way at a time.  Rather than returning a single Droplet, the response body will contain a JSON array with a key called &#x60;droplets&#x60;. This will be set to an array of JSON objects, each of which will contain the standard Droplet attributes. The response code, 202 Accepted, does not indicate the success or failure of any operation, just that the request has been accepted for processing. The array of &#x60;actions&#x60; returned as part of the response&#x27;s &#x60;links&#x60; object can be used to check the status of each individual Droplet create event. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let opts = { 
  'body': new DigitalOceanApi.V2DropletsBody() // V2DropletsBody | 
};
apiInstance.createDroplet(opts, (error, data, response) => {
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
 **body** | [**V2DropletsBody**](V2DropletsBody.md)|  | [optional] 

### Return type

[**InlineResponse202**](InlineResponse202.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="destroyDroplet"></a>
# **destroyDroplet**
> destroyDroplet(dropletId)

Delete an Existing Droplet

To delete a Droplet, send a DELETE request to &#x60;/v2/droplets/$DROPLET_ID&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.destroyDroplet(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyDropletsByTag"></a>
# **destroyDropletsByTag**
> destroyDropletsByTag(tagName)

Deleting Droplets by Tag

To delete **all** Droplets assigned to a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag in your DELETE request. For example,  &#x60;/v2/droplets?tag_name&#x3D;$TAG_NAME&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let tagName = "tagName_example"; // String | Specifies Droplets to be deleted by tag.

apiInstance.destroyDropletsByTag(tagName, (error, data, response) => {
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
 **tagName** | **String**| Specifies Droplets to be deleted by tag. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyWithAssociatedResourcesDangerous"></a>
# **destroyWithAssociatedResourcesDangerous**
> destroyWithAssociatedResourcesDangerous(dropletId, xDangerous)

Destroy a Droplet and All of its Associated Resources (Dangerous)

To destroy a Droplet along with all of its associated resources, send a DELETE request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/dangerous&#x60; endpoint. The headers of this request must include an &#x60;X-Dangerous&#x60; key set to &#x60;true&#x60;. To preview which resources will be destroyed, first query the Droplet&#x27;s associated resources. This operation _can not_ be reverse and should be used with caution.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let xDangerous = true; // Boolean | Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.

apiInstance.destroyWithAssociatedResourcesDangerous(dropletId, xDangerous, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **xDangerous** | **Boolean**| Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyWithAssociatedResourcesSelective"></a>
# **destroyWithAssociatedResourcesSelective**
> destroyWithAssociatedResourcesSelective(dropletId)

Selectively Destroy a Droplet and its Associated Resources

To destroy a Droplet along with a sub-set of its associated resources, send a DELETE request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/selective&#x60; endpoint. The JSON body of the request should include &#x60;snapshots&#x60;, &#x60;volumes&#x60;, or &#x60;volume_snapshots&#x60; keys each set to an array of IDs for the associated resources to be destroyed. The IDs can be found by querying the Droplet&#x27;s associated resources. Any associated resource not included in the request will remain and continue to accrue changes on your account.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.destroyWithAssociatedResourcesSelective(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDestroyWithAssociatedResourcesStatus"></a>
# **getDestroyWithAssociatedResourcesStatus**
> AssociatedResourceStatus getDestroyWithAssociatedResourcesStatus(dropletId)

Check Status of a Droplet Destroy with Associated Resources Request

To check on the status of a request to destroy a Droplet with its associated resources, send a GET request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/status&#x60; endpoint. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.getDestroyWithAssociatedResourcesStatus(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

[**AssociatedResourceStatus**](AssociatedResourceStatus.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDroplet"></a>
# **getDroplet**
> InlineResponse20023 getDroplet(dropletId)

Retrieve an Existing Droplet

To show information about an individual Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.getDroplet(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

[**InlineResponse20023**](InlineResponse20023.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllDropletNeighborsIds"></a>
# **listAllDropletNeighborsIds**
> NeighborIds listAllDropletNeighborsIds()

List All Droplet Neighbors

To retrieve a list of all Droplets that are co-located on the same physical hardware, send a GET request to &#x60;/v2/reports/droplet_neighbors_ids&#x60;.  The results will be returned as a JSON object with a key of &#x60;neighbor_ids&#x60;. This will be set to an array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server. An empty array indicates that all Droplets associated with your account are located on separate physical hardware. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
apiInstance.listAllDropletNeighborsIds((error, data, response) => {
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

[**NeighborIds**](NeighborIds.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllDroplets"></a>
# **listAllDroplets**
> InlineResponse20022 listAllDroplets(opts)

List All Droplets

To list all Droplets in your account, send a GET request to &#x60;/v2/droplets&#x60;.  The response body will be a JSON object with a key of &#x60;droplets&#x60;. This will be set to an array containing objects each representing a Droplet. These will contain the standard Droplet attributes.  ### Filtering Results by Tag  It&#x27;s possible to request filtered results by including certain query parameters. To only list Droplets assigned to a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag in your GET request. For example, &#x60;/v2/droplets?tag_name&#x3D;$TAG_NAME&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1, // Number | Which 'page' of paginated results to return.
  'tagName': "tagName_example" // String | Used to filter Droplets by a specific tag.
};
apiInstance.listAllDroplets(opts, (error, data, response) => {
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
 **tagName** | **String**| Used to filter Droplets by a specific tag. | [optional] 

### Return type

[**InlineResponse20022**](InlineResponse20022.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletAssociatedResources"></a>
# **listDropletAssociatedResources**
> InlineResponse20029 listDropletAssociatedResources(dropletId)

List Associated Resources for a Droplet

To list the associated billable resources that can be destroyed along with a Droplet, send a GET request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources&#x60; endpoint.  The response will be a JSON object containing &#x60;snapshots&#x60;, &#x60;volumes&#x60;, and &#x60;volume_snapshots&#x60; keys. Each will be set to an array of objects containing information about the associated resources. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.listDropletAssociatedResources(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

[**InlineResponse20029**](InlineResponse20029.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletBackups"></a>
# **listDropletBackups**
> InlineResponse20024 listDropletBackups(dropletId, opts)

List Backups for a Droplet

To retrieve any backups associated with a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/backups&#x60;.  You will get back a JSON object that has a &#x60;backups&#x60; key. This will be set to an array of backup objects, each of which contain the standard Droplet backup attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listDropletBackups(dropletId, opts, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20024**](InlineResponse20024.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletFirewalls"></a>
# **listDropletFirewalls**
> InlineResponse20027 listDropletFirewalls(dropletId, opts)

List all Firewalls Applied to a Droplet

To retrieve a list of all firewalls available to a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/firewalls&#x60;  The response will be a JSON object that has a key called &#x60;firewalls&#x60;. This will be set to an array of &#x60;firewall&#x60; objects, each of which contain the standard &#x60;firewall&#x60; attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listDropletFirewalls(dropletId, opts, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20027**](InlineResponse20027.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletKernels"></a>
# **listDropletKernels**
> InlineResponse20026 listDropletKernels(dropletId, opts)

List All Available Kernels for a Droplet

To retrieve a list of all kernels available to a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/kernels&#x60;  The response will be a JSON object that has a key called &#x60;kernels&#x60;. This will be set to an array of &#x60;kernel&#x60; objects, each of which contain the standard &#x60;kernel&#x60; attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listDropletKernels(dropletId, opts, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20026**](InlineResponse20026.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletNeighbors"></a>
# **listDropletNeighbors**
> InlineResponse20028 listDropletNeighbors(dropletId)

List Neighbors for a Droplet

To retrieve a list of any \&quot;neighbors\&quot; (i.e. Droplets that are co-located on the same physical hardware) for a specific Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/neighbors&#x60;.  The results will be returned as a JSON object with a key of &#x60;droplets&#x60;. This will be set to an array containing objects representing any other Droplets that share the same physical hardware. An empty array indicates that the Droplet is not co-located any other Droplets associated with your account. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.listDropletNeighbors(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

[**InlineResponse20028**](InlineResponse20028.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletSnapshots"></a>
# **listDropletSnapshots**
> InlineResponse20025 listDropletSnapshots(dropletId, opts)

List Snapshots for a Droplet

To retrieve the snapshots that have been created from a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/snapshots&#x60;.  You will get back a JSON object that has a &#x60;snapshots&#x60; key. This will be set to an array of snapshot objects, each of which contain the standard Droplet snapshot attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listDropletSnapshots(dropletId, opts, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20025**](InlineResponse20025.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="retryDestroyWithAssociatedResource"></a>
# **retryDestroyWithAssociatedResource**
> retryDestroyWithAssociatedResource(dropletId)

Retry a Droplet Destroy with Associated Resources Request

If the status of a request to destroy a Droplet with its associated resources reported any errors, it can be retried by sending a POST request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/retry&#x60; endpoint.  Only one destroy can be active at a time per Droplet. If a retry is issued while another destroy is in progress for the Droplet a 409 status code will be returned. A successful response will include a 202 response code and no content. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.

apiInstance.retryDestroyWithAssociatedResource(dropletId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

