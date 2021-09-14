# DigitalOceanApi.ContainerRegistryApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRegistry**](ContainerRegistryApi.md#createRegistry) | **POST** /v2/registry | Create Container Registry
[**deleteRegistry**](ContainerRegistryApi.md#deleteRegistry) | **DELETE** /v2/registry | Delete Container Registry
[**deleteRepositoryManifest**](ContainerRegistryApi.md#deleteRepositoryManifest) | **DELETE** /v2/registry/{registry_name}/{repository_name}/digests/{manifest_digest} | Delete Container Registry Repository Manifest
[**deleteRepositoryTag**](ContainerRegistryApi.md#deleteRepositoryTag) | **DELETE** /v2/registry/{registry_name}/{repository_name}/tags/{repository_tag} | Delete Container Registry Repository Tag
[**getDockerCredentials**](ContainerRegistryApi.md#getDockerCredentials) | **GET** /v2/registry/docker-credentials | Get Docker Credentials for Container Registry
[**getGarbageCollection**](ContainerRegistryApi.md#getGarbageCollection) | **GET** /v2/registry/{registry_name}/garbage-collection | Get Active Garbage Collection
[**getRegistry**](ContainerRegistryApi.md#getRegistry) | **GET** /v2/registry | Get Container Registry Information
[**getRegistryOptions**](ContainerRegistryApi.md#getRegistryOptions) | **GET** /v2/registry/options | List Available Subscription Tiers
[**getRegistrySubscription**](ContainerRegistryApi.md#getRegistrySubscription) | **GET** /v2/registry/subscription | Get Subscription Information
[**listGarbageCollections**](ContainerRegistryApi.md#listGarbageCollections) | **GET** /v2/registry/{registry_name}/garbage-collections | List Garbage Collections
[**listRegistryRepositories**](ContainerRegistryApi.md#listRegistryRepositories) | **GET** /v2/registry/{registry_name} | List All Container Registry Repositories
[**listRepositoryTags**](ContainerRegistryApi.md#listRepositoryTags) | **GET** /v2/registry/{registry_name}/{repository_name}/tags | List All Container Registry Repository Tags
[**postRegistrySubscription**](ContainerRegistryApi.md#postRegistrySubscription) | **POST** /v2/registry/subscription | Update Subscription Tier
[**runGarbageCollection**](ContainerRegistryApi.md#runGarbageCollection) | **POST** /v2/registry/{registry_name}/garbage-collection | Start Garbage Collection
[**updateGarbageCollection**](ContainerRegistryApi.md#updateGarbageCollection) | **PUT** /v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid} | Update Garbage Collection
[**validateRegistryName**](ContainerRegistryApi.md#validateRegistryName) | **POST** /v2/registry/validate-name | Validate a Container Registry Name

<a name="createRegistry"></a>
# **createRegistry**
> InlineResponse20046 createRegistry(body)

Create Container Registry

To create your container registry, send a POST request to &#x60;/v2/registry&#x60;.  The &#x60;name&#x60; becomes part of the URL for images stored in the registry. For example, if your registry is called &#x60;example&#x60;, an image in it will have the URL &#x60;registry.digitalocean.com/example/image:tag&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let body = new DigitalOceanApi.RegistryCreate(); // RegistryCreate | 

apiInstance.createRegistry(body, (error, data, response) => {
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
 **body** | [**RegistryCreate**](RegistryCreate.md)|  | 

### Return type

[**InlineResponse20046**](InlineResponse20046.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteRegistry"></a>
# **deleteRegistry**
> deleteRegistry()

Delete Container Registry

To delete your container registry, destroying all container image data stored in it, send a DELETE request to &#x60;/v2/registry&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
apiInstance.deleteRegistry((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteRepositoryManifest"></a>
# **deleteRepositoryManifest**
> deleteRepositoryManifest(registryName, repositoryName, manifestDigest)

Delete Container Registry Repository Manifest

To delete a container repository manifest by digest, send a DELETE request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to delete &#x60;registry.digitalocean.com/example/my/repo@sha256:abcd&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.
let repositoryName = "repositoryName_example"; // String | The name of a container registry repository. If the name contains `/` characters, they must be URL-encoded, e.g. `%2F`.
let manifestDigest = "manifestDigest_example"; // String | The manifest digest of a container registry repository tag.

apiInstance.deleteRepositoryManifest(registryName, repositoryName, manifestDigest, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 
 **repositoryName** | **String**| The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;. | 
 **manifestDigest** | **String**| The manifest digest of a container registry repository tag. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteRepositoryTag"></a>
# **deleteRepositoryTag**
> deleteRepositoryTag(registryName, repositoryName, repositoryTag)

Delete Container Registry Repository Tag

To delete a container repository tag, send a DELETE request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to delete &#x60;registry.digitalocean.com/example/my/repo:mytag&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/tags/mytag&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.
let repositoryName = "repositoryName_example"; // String | The name of a container registry repository. If the name contains `/` characters, they must be URL-encoded, e.g. `%2F`.
let repositoryTag = "repositoryTag_example"; // String | The name of a container registry repository tag.

apiInstance.deleteRepositoryTag(registryName, repositoryName, repositoryTag, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 
 **repositoryName** | **String**| The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;. | 
 **repositoryTag** | **String**| The name of a container registry repository tag. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDockerCredentials"></a>
# **getDockerCredentials**
> DockerCredentials getDockerCredentials(opts)

Get Docker Credentials for Container Registry

In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to &#x60;/v2/registry/docker-credentials&#x60;.  The response will be in the format of a Docker &#x60;config.json&#x60; file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file&#x3D;.dockerconfigjson&#x3D;config.json \\       --type&#x3D;kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: &#x60;/v2/registry/docker-credentials?read_write&#x3D;true&#x60;  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: &#x60;/v2/registry/docker-credentials?expiry_seconds&#x3D;3600&#x60; will return credentials that expire after one hour. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let opts = { 
  'expirySeconds': 0, // Number | The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.
  'readWrite': false // Boolean | By default, the registry credentials allow for read-only access. Set this query parameter to `true` to obtain read-write credentials.
};
apiInstance.getDockerCredentials(opts, (error, data, response) => {
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
 **expirySeconds** | **Number**| The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire. | [optional] [default to 0]
 **readWrite** | **Boolean**| By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials. | [optional] [default to false]

### Return type

[**DockerCredentials**](DockerCredentials.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getGarbageCollection"></a>
# **getGarbageCollection**
> InlineResponse20049 getGarbageCollection(registryName)

Get Active Garbage Collection

To get information about the currently-active garbage collection for a registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.

apiInstance.getGarbageCollection(registryName, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 

### Return type

[**InlineResponse20049**](InlineResponse20049.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getRegistry"></a>
# **getRegistry**
> InlineResponse20046 getRegistry()

Get Container Registry Information

To get information about your container registry, send a GET request to &#x60;/v2/registry&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
apiInstance.getRegistry((error, data, response) => {
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

[**InlineResponse20046**](InlineResponse20046.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getRegistryOptions"></a>
# **getRegistryOptions**
> InlineResponse20051 getRegistryOptions()

List Available Subscription Tiers

There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to &#x60;/v2/registry/options&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
apiInstance.getRegistryOptions((error, data, response) => {
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

[**InlineResponse20051**](InlineResponse20051.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getRegistrySubscription"></a>
# **getRegistrySubscription**
> Subscription getRegistrySubscription()

Get Subscription Information

A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to &#x60;/v2/registry/subscription&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
apiInstance.getRegistrySubscription((error, data, response) => {
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

[**Subscription**](Subscription.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listGarbageCollections"></a>
# **listGarbageCollections**
> InlineResponse20050 listGarbageCollections(registryName, opts)

List Garbage Collections

To get information about past garbage collections for a registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collections&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listGarbageCollections(registryName, opts, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20050**](InlineResponse20050.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listRegistryRepositories"></a>
# **listRegistryRepositories**
> InlineResponse20047 listRegistryRepositories(registryName, opts)

List All Container Registry Repositories

To list all repositories in your container registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/repositories&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listRegistryRepositories(registryName, opts, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20047**](InlineResponse20047.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listRepositoryTags"></a>
# **listRepositoryTags**
> InlineResponse20048 listRepositoryTags(registryName, repositoryName, opts)

List All Container Registry Repository Tags

To list all tags in your container registry repository, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to list tags for &#x60;registry.digitalocean.com/example/my/repo&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/tags&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.
let repositoryName = "repositoryName_example"; // String | The name of a container registry repository. If the name contains `/` characters, they must be URL-encoded, e.g. `%2F`.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listRepositoryTags(registryName, repositoryName, opts, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 
 **repositoryName** | **String**| The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20048**](InlineResponse20048.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postRegistrySubscription"></a>
# **postRegistrySubscription**
> Subscription postRegistrySubscription(opts)

Update Subscription Tier

After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to &#x60;/v2/registry/subscription&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let opts = { 
  'body': new DigitalOceanApi.RegistrySubscriptionBody() // RegistrySubscriptionBody | 
};
apiInstance.postRegistrySubscription(opts, (error, data, response) => {
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
 **body** | [**RegistrySubscriptionBody**](RegistrySubscriptionBody.md)|  | [optional] 

### Return type

[**Subscription**](Subscription.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="runGarbageCollection"></a>
# **runGarbageCollection**
> InlineResponse20049 runGarbageCollection(registryName)

Start Garbage Collection

Garbage collection enables users to clear out unreferenced blobs (layer &amp; manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection&#x60;. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as &#x60;success&#x60;. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let registryName = "registryName_example"; // String | The name of a container registry.

apiInstance.runGarbageCollection(registryName, (error, data, response) => {
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
 **registryName** | **String**| The name of a container registry. | 

### Return type

[**InlineResponse20049**](InlineResponse20049.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateGarbageCollection"></a>
# **updateGarbageCollection**
> InlineResponse20049 updateGarbageCollection(body, registryName, garbageCollectionUuid)

Update Garbage Collection

To cancel the currently-active garbage collection for a registry, send a PUT request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID&#x60; and specify one or more of the attributes below.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let body = new DigitalOceanApi.UpdateRegistry(); // UpdateRegistry | 
let registryName = "registryName_example"; // String | The name of a container registry.
let garbageCollectionUuid = "garbageCollectionUuid_example"; // String | The UUID of a garbage collection run.

apiInstance.updateGarbageCollection(body, registryName, garbageCollectionUuid, (error, data, response) => {
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
 **body** | [**UpdateRegistry**](UpdateRegistry.md)|  | 
 **registryName** | **String**| The name of a container registry. | 
 **garbageCollectionUuid** | **String**| The UUID of a garbage collection run. | 

### Return type

[**InlineResponse20049**](InlineResponse20049.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="validateRegistryName"></a>
# **validateRegistryName**
> validateRegistryName(body)

Validate a Container Registry Name

To validate that a container registry name is available for use, send a POST request to &#x60;/v2/registry/validate-name&#x60;.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ContainerRegistryApi();
let body = new DigitalOceanApi.ValidateRegistry(); // ValidateRegistry | 

apiInstance.validateRegistryName(body, (error, data, response) => {
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
 **body** | [**ValidateRegistry**](ValidateRegistry.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

