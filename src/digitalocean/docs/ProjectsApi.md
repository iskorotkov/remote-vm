# DigitalOceanApi.ProjectsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createProject**](ProjectsApi.md#createProject) | **POST** /v2/projects | Create a Project
[**deleteProject**](ProjectsApi.md#deleteProject) | **DELETE** /v2/projects/{project_id} | Delete an Existing Project
[**getDefaultProject**](ProjectsApi.md#getDefaultProject) | **GET** /v2/projects/default | Retrieve the Default Project
[**getProject**](ProjectsApi.md#getProject) | **GET** /v2/projects/{project_id} | Retrieve an Existing Project
[**listProjects**](ProjectsApi.md#listProjects) | **GET** /v2/projects | List All Projects
[**patchDefaultProject**](ProjectsApi.md#patchDefaultProject) | **PATCH** /v2/projects/default | Patch the Default Project
[**patchProject**](ProjectsApi.md#patchProject) | **PATCH** /v2/projects/{project_id} | Patch a Project
[**updateDefaultProject**](ProjectsApi.md#updateDefaultProject) | **PUT** /v2/projects/default | Update the Default Project
[**updateProject**](ProjectsApi.md#updateProject) | **PUT** /v2/projects/{project_id} | Update a Project

<a name="createProject"></a>
# **createProject**
> InlineResponse20114 createProject(body)

Create a Project

To create a project, send a POST request to &#x60;/v2/projects&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let body = new DigitalOceanApi.V2ProjectsBody(); // V2ProjectsBody | 

apiInstance.createProject(body, (error, data, response) => {
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
 **body** | [**V2ProjectsBody**](V2ProjectsBody.md)|  | 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteProject"></a>
# **deleteProject**
> deleteProject(projectId)

Delete an Existing Project

To delete a project, send a DELETE request to &#x60;/v2/projects/$PROJECT_ID&#x60;. To be deleted, a project must not have any resources assigned to it. Any existing resources must first be reassigned or destroyed, or you will receive a 412 error.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let projectId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a project.

apiInstance.deleteProject(projectId, (error, data, response) => {
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
 **projectId** | [**String**](.md)| A unique identifier for a project. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDefaultProject"></a>
# **getDefaultProject**
> InlineResponse20042 getDefaultProject()

Retrieve the Default Project

To get your default project, send a GET request to &#x60;/v2/projects/default&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
apiInstance.getDefaultProject((error, data, response) => {
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

[**InlineResponse20042**](InlineResponse20042.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getProject"></a>
# **getProject**
> InlineResponse20114 getProject(projectId)

Retrieve an Existing Project

To get a project, send a GET request to &#x60;/v2/projects/$PROJECT_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let projectId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a project.

apiInstance.getProject(projectId, (error, data, response) => {
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

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listProjects"></a>
# **listProjects**
> InlineResponse20041 listProjects()

List All Projects

To list all your projects, send a GET request to &#x60;/v2/projects&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
apiInstance.listProjects((error, data, response) => {
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

[**InlineResponse20041**](InlineResponse20041.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="patchDefaultProject"></a>
# **patchDefaultProject**
> InlineResponse20114 patchDefaultProject(body)

Patch the Default Project

To update only specific attributes of a project, send a PATCH request to &#x60;/v2/projects/default&#x60;. At least one of the following attributes needs to be sent.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let body = new DigitalOceanApi.Project(); // Project | 

apiInstance.patchDefaultProject(body, (error, data, response) => {
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
 **body** | [**Project**](Project.md)|  | 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="patchProject"></a>
# **patchProject**
> InlineResponse20114 patchProject(body, projectId)

Patch a Project

To update only specific attributes of a project, send a PATCH request to &#x60;/v2/projects/$PROJECT_ID&#x60;. At least one of the following attributes needs to be sent.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let body = new DigitalOceanApi.Project(); // Project | 
let projectId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a project.

apiInstance.patchProject(body, projectId, (error, data, response) => {
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
 **body** | [**Project**](Project.md)|  | 
 **projectId** | [**String**](.md)| A unique identifier for a project. | 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateDefaultProject"></a>
# **updateDefaultProject**
> InlineResponse20114 updateDefaultProject(body)

Update the Default Project

To update a project, send a PUT request to &#x60;/v2/projects/default&#x60;. All of the following attributes must be sent.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let body = new DigitalOceanApi.ProjectsDefaultBody(); // ProjectsDefaultBody | 

apiInstance.updateDefaultProject(body, (error, data, response) => {
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
 **body** | [**ProjectsDefaultBody**](ProjectsDefaultBody.md)|  | 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateProject"></a>
# **updateProject**
> InlineResponse20114 updateProject(body, projectId)

Update a Project

To update a project, send a PUT request to &#x60;/v2/projects/$PROJECT_ID&#x60;. All of the following attributes must be sent.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ProjectsApi();
let body = new DigitalOceanApi.ProjectsProjectIdBody(); // ProjectsProjectIdBody | 
let projectId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a project.

apiInstance.updateProject(body, projectId, (error, data, response) => {
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
 **body** | [**ProjectsProjectIdBody**](ProjectsProjectIdBody.md)|  | 
 **projectId** | [**String**](.md)| A unique identifier for a project. | 

### Return type

[**InlineResponse20114**](InlineResponse20114.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

