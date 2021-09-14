# DigitalOceanApi.ProjectResourcesApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**assignDefaultProjectResources**](ProjectResourcesApi.md#assignDefaultProjectResources) | **POST** /v2/projects/default/resources | Assign Resources to Default Project
[**assignProjectResources**](ProjectResourcesApi.md#assignProjectResources) | **POST** /v2/projects/{project_id}/resources | Assign Resources to a Project
[**listDefaultProjectResources**](ProjectResourcesApi.md#listDefaultProjectResources) | **GET** /v2/projects/default/resources | List Default Project Resources
[**listProjectResources**](ProjectResourcesApi.md#listProjectResources) | **GET** /v2/projects/{project_id}/resources | List Project Resources

<a name="assignDefaultProjectResources"></a>
# **assignDefaultProjectResources**
> InlineResponse20044 assignDefaultProjectResources(body)

Assign Resources to Default Project

To assign resources to your default project, send a POST request to &#x60;/v2/projects/default/resources&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectResourcesApi();
let body = new DigitalOceanApi.ProjectAssignment(); // ProjectAssignment | 

apiInstance.assignDefaultProjectResources(body, (error, data, response) => {
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
 **body** | [**ProjectAssignment**](ProjectAssignment.md)|  | 

### Return type

[**InlineResponse20044**](InlineResponse20044.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="assignProjectResources"></a>
# **assignProjectResources**
> InlineResponse20044 assignProjectResources(body, projectId)

Assign Resources to a Project

To assign resources to a project, send a POST request to &#x60;/v2/projects/$PROJECT_ID/resources&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectResourcesApi();
let body = new DigitalOceanApi.ProjectAssignment(); // ProjectAssignment | 
let projectId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a project.

apiInstance.assignProjectResources(body, projectId, (error, data, response) => {
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
 **body** | [**ProjectAssignment**](ProjectAssignment.md)|  | 
 **projectId** | [**String**](.md)| A unique identifier for a project. | 

### Return type

[**InlineResponse20044**](InlineResponse20044.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listDefaultProjectResources"></a>
# **listDefaultProjectResources**
> InlineResponse20043 listDefaultProjectResources()

List Default Project Resources

To list all your resources in your default project, send a GET request to &#x60;/v2/projects/default/resources&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectResourcesApi();
apiInstance.listDefaultProjectResources((error, data, response) => {
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

[**InlineResponse20043**](InlineResponse20043.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listProjectResources"></a>
# **listProjectResources**
> InlineResponse20043 listProjectResources(projectId)

List Project Resources

To list all your resources in a project, send a GET request to &#x60;/v2/projects/$PROJECT_ID/resources&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectResourcesApi();
let projectId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a project.

apiInstance.listProjectResources(projectId, (error, data, response) => {
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
 **projectId** | [**String**](.md)| A unique identifier for a project. | 

### Return type

[**InlineResponse20043**](InlineResponse20043.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

