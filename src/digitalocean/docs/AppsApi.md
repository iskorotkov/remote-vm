# DigitalOceanApi.AppsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createApp**](AppsApi.md#createApp) | **POST** /v2/apps | Create a New App
[**createDeployment**](AppsApi.md#createDeployment) | **POST** /v2/apps/{app_id}/deployments | Create an App Deployment
[**deleteApp**](AppsApi.md#deleteApp) | **DELETE** /v2/apps/{id} | Delete an App
[**getApp**](AppsApi.md#getApp) | **GET** /v2/apps/{id} | Retrieve an Existing App
[**getDeployment**](AppsApi.md#getDeployment) | **GET** /v2/apps/{app_id}/deployments/{deployment_id} | Retrieve an App Deployment
[**getInstanceSize**](AppsApi.md#getInstanceSize) | **GET** /v2/apps/tiers/instance_sizes/{slug} | Retrieve an Instance Size
[**getLogs**](AppsApi.md#getLogs) | **GET** /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs | Retrieve Deployment Logs
[**getLogsAggregate**](AppsApi.md#getLogsAggregate) | **GET** /v2/apps/{app_id}/deployments/{deployment_id}/logs | Retrieve Aggregate Deployment Logs
[**getTier**](AppsApi.md#getTier) | **GET** /v2/apps/tiers/{slug} | Retrieve an App Tier
[**listApps**](AppsApi.md#listApps) | **GET** /v2/apps | List All Apps
[**listDeployments**](AppsApi.md#listDeployments) | **GET** /v2/apps/{app_id}/deployments | List App Deployments
[**listInstanceSizes**](AppsApi.md#listInstanceSizes) | **GET** /v2/apps/tiers/instance_sizes | List Instance Sizes
[**listRegions**](AppsApi.md#listRegions) | **GET** /v2/apps/regions | List App Regions
[**listTiers**](AppsApi.md#listTiers) | **GET** /v2/apps/tiers | List App Tiers
[**postCancelDeployment**](AppsApi.md#postCancelDeployment) | **POST** /v2/apps/{app_id}/deployments/{deployment_id}/cancel | Cancel a Deployment
[**updateApp**](AppsApi.md#updateApp) | **PUT** /v2/apps/{id} | Update an App
[**validateAppSpec**](AppsApi.md#validateAppSpec) | **POST** /v2/apps/propose | Propose an App Spec

<a name="createApp"></a>
# **createApp**
> AppResponse createApp(body)

Create a New App

Create a new app by submitting an app specification. For documentation on app specifications (&#x60;AppSpec&#x60; objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let body = new DigitalOceanApi.AppsCreateAppRequest(); // AppsCreateAppRequest | 

apiInstance.createApp(body, (error, data, response) => {
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
 **body** | [**AppsCreateAppRequest**](AppsCreateAppRequest.md)|  | 

### Return type

[**AppResponse**](AppResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createDeployment"></a>
# **createDeployment**
> AppsDeploymentResponse createDeployment(body, appId)

Create an App Deployment

Creating an app deployment will pull the latest changes from your repository and schedule a new deployment for your app.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let body = new DigitalOceanApi.AppsCreateDeploymentRequest(); // AppsCreateDeploymentRequest | 
let appId = "appId_example"; // String | The app ID

apiInstance.createDeployment(body, appId, (error, data, response) => {
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
 **body** | [**AppsCreateDeploymentRequest**](AppsCreateDeploymentRequest.md)|  | 
 **appId** | **String**| The app ID | 

### Return type

[**AppsDeploymentResponse**](AppsDeploymentResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteApp"></a>
# **deleteApp**
> AppsDeleteAppResponse deleteApp(id)

Delete an App

Delete an existing app. Once deleted, all active deployments will be permanently shut down and the app deleted. If needed, be sure to back up your app specification so that you may re-create it at a later time.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let id = "id_example"; // String | The ID of the app

apiInstance.deleteApp(id, (error, data, response) => {
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
 **id** | **String**| The ID of the app | 

### Return type

[**AppsDeleteAppResponse**](AppsDeleteAppResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getApp"></a>
# **getApp**
> AppResponse getApp(id, opts)

Retrieve an Existing App

Retrieve details about an existing app by either its ID or name. To retrieve an app by its name, do not include an ID in the request path. Information about the current active deployment as well as any in progress ones will also be included in the response.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let id = "id_example"; // String | The ID of the app
let opts = { 
  'name': "name_example" // String | The name of the app to retrieve.
};
apiInstance.getApp(id, opts, (error, data, response) => {
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
 **id** | **String**| The ID of the app | 
 **name** | **String**| The name of the app to retrieve. | [optional] 

### Return type

[**AppResponse**](AppResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDeployment"></a>
# **getDeployment**
> AppsDeploymentResponse getDeployment(appId, deploymentId)

Retrieve an App Deployment

Retrieve information about an app deployment.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let appId = "appId_example"; // String | The app ID
let deploymentId = "deploymentId_example"; // String | The deployment ID

apiInstance.getDeployment(appId, deploymentId, (error, data, response) => {
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
 **appId** | **String**| The app ID | 
 **deploymentId** | **String**| The deployment ID | 

### Return type

[**AppsDeploymentResponse**](AppsDeploymentResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getInstanceSize"></a>
# **getInstanceSize**
> AppsGetInstanceSizeResponse getInstanceSize(slug)

Retrieve an Instance Size

Retrieve information about a specific instance size for &#x60;service&#x60;, &#x60;worker&#x60;, and &#x60;job&#x60; components.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let slug = "slug_example"; // String | The slug of the instance size

apiInstance.getInstanceSize(slug, (error, data, response) => {
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
 **slug** | **String**| The slug of the instance size | 

### Return type

[**AppsGetInstanceSizeResponse**](AppsGetInstanceSizeResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getLogs"></a>
# **getLogs**
> AppsGetLogsResponse getLogs(appId, deploymentId, componentName, type, opts)

Retrieve Deployment Logs

Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let appId = "appId_example"; // String | The app ID
let deploymentId = "deploymentId_example"; // String | The deployment ID
let componentName = "componentName_example"; // String | An optional component name. If set, logs will be limited to this component only.
let type = "UNSPECIFIED"; // String | The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
let opts = { 
  'follow': true, // Boolean | Whether the logs should follow live updates.
  'podConnectionTimeout': "podConnectionTimeout_example" // String | An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.
};
apiInstance.getLogs(appId, deploymentId, componentName, type, opts, (error, data, response) => {
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
 **appId** | **String**| The app ID | 
 **deploymentId** | **String**| The deployment ID | 
 **componentName** | **String**| An optional component name. If set, logs will be limited to this component only. | 
 **type** | **String**| The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs | [default to UNSPECIFIED]
 **follow** | **Boolean**| Whether the logs should follow live updates. | [optional] 
 **podConnectionTimeout** | **String**| An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;. | [optional] 

### Return type

[**AppsGetLogsResponse**](AppsGetLogsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getLogsAggregate"></a>
# **getLogsAggregate**
> AppsGetLogsResponse getLogsAggregate(appId, deploymentId, type, opts)

Retrieve Aggregate Deployment Logs

Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let appId = "appId_example"; // String | The app ID
let deploymentId = "deploymentId_example"; // String | The deployment ID
let type = "UNSPECIFIED"; // String | The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
let opts = { 
  'follow': true, // Boolean | Whether the logs should follow live updates.
  'podConnectionTimeout': "podConnectionTimeout_example" // String | An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.
};
apiInstance.getLogsAggregate(appId, deploymentId, type, opts, (error, data, response) => {
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
 **appId** | **String**| The app ID | 
 **deploymentId** | **String**| The deployment ID | 
 **type** | **String**| The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs | [default to UNSPECIFIED]
 **follow** | **Boolean**| Whether the logs should follow live updates. | [optional] 
 **podConnectionTimeout** | **String**| An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;. | [optional] 

### Return type

[**AppsGetLogsResponse**](AppsGetLogsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getTier"></a>
# **getTier**
> AppsGetTierResponse getTier(slug)

Retrieve an App Tier

Retrieve information about a specific app tier.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let slug = "slug_example"; // String | The slug of the tier

apiInstance.getTier(slug, (error, data, response) => {
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
 **slug** | **String**| The slug of the tier | 

### Return type

[**AppsGetTierResponse**](AppsGetTierResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listApps"></a>
# **listApps**
> AppsResponse listApps(opts)

List All Apps

List all apps on your account. Information about the current active deployment as well as any in progress ones will also be included for each app.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let opts = { 
  'page': 1, // Number | Which 'page' of paginated results to return.
  'perPage': 20 // Number | Number of items returned per page
};
apiInstance.listApps(opts, (error, data, response) => {
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
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]

### Return type

[**AppsResponse**](AppsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDeployments"></a>
# **listDeployments**
> AppsDeploymentsResponse listDeployments(appId, opts)

List App Deployments

List all deployments of an app.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let appId = "appId_example"; // String | The app ID
let opts = { 
  'page': 1, // Number | Which 'page' of paginated results to return.
  'perPage': 20 // Number | Number of items returned per page
};
apiInstance.listDeployments(appId, opts, (error, data, response) => {
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
 **appId** | **String**| The app ID | 
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]

### Return type

[**AppsDeploymentsResponse**](AppsDeploymentsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listInstanceSizes"></a>
# **listInstanceSizes**
> AppsListInstanceSizesResponse listInstanceSizes()

List Instance Sizes

List all instance sizes for &#x60;service&#x60;, &#x60;worker&#x60;, and &#x60;job&#x60; components.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
apiInstance.listInstanceSizes((error, data, response) => {
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

[**AppsListInstanceSizesResponse**](AppsListInstanceSizesResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listRegions"></a>
# **listRegions**
> AppsListRegionsResponse listRegions()

List App Regions

List all regions supported by App Platform.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
apiInstance.listRegions((error, data, response) => {
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

[**AppsListRegionsResponse**](AppsListRegionsResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listTiers"></a>
# **listTiers**
> AppsListTiersResponse listTiers()

List App Tiers

List all app tiers.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
apiInstance.listTiers((error, data, response) => {
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

[**AppsListTiersResponse**](AppsListTiersResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postCancelDeployment"></a>
# **postCancelDeployment**
> AppsDeploymentResponse postCancelDeployment(appId, deploymentId)

Cancel a Deployment

Immediately cancel an in-progress deployment.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let appId = "appId_example"; // String | The app ID
let deploymentId = "deploymentId_example"; // String | The deployment ID

apiInstance.postCancelDeployment(appId, deploymentId, (error, data, response) => {
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
 **appId** | **String**| The app ID | 
 **deploymentId** | **String**| The deployment ID | 

### Return type

[**AppsDeploymentResponse**](AppsDeploymentResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateApp"></a>
# **updateApp**
> AppResponse updateApp(body, id)

Update an App

Update an existing app by submitting a new app specification. For documentation on app specifications (&#x60;AppSpec&#x60; objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let body = new DigitalOceanApi.AppsUpdateAppRequest(); // AppsUpdateAppRequest | 
let id = "id_example"; // String | The ID of the app

apiInstance.updateApp(body, id, (error, data, response) => {
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
 **body** | [**AppsUpdateAppRequest**](AppsUpdateAppRequest.md)|  | 
 **id** | **String**| The ID of the app | 

### Return type

[**AppResponse**](AppResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="validateAppSpec"></a>
# **validateAppSpec**
> AppProposeResponse validateAppSpec(body)

Propose an App Spec

To propose and validate a spec for a new or existing app, send a PUT request to the &#x60;/v2/apps/propose&#x60; endpoint. The request returns some information about the proposed app, including app cost and upgrade cost. If an existing app ID is specified, the app spec is treated as a proposed update to the existing app.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.AppsApi();
let body = new DigitalOceanApi.AppPropose(); // AppPropose | 

apiInstance.validateAppSpec(body, (error, data, response) => {
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
 **body** | [**AppPropose**](AppPropose.md)|  | 

### Return type

[**AppProposeResponse**](AppProposeResponse.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

