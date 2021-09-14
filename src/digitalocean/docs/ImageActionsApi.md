# DigitalOceanApi.ImageActionsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getImageAction**](ImageActionsApi.md#getImageAction) | **GET** /v2/images/{image_id}/actions/{action_id} | Retrieve an Existing Action
[**listImageActions**](ImageActionsApi.md#listImageActions) | **GET** /v2/images/{image_id}/actions | List All Actions for an Image
[**postImageAction**](ImageActionsApi.md#postImageAction) | **POST** /v2/images/{image_id}/actions | Initiate an Image Action

<a name="getImageAction"></a>
# **getImageAction**
> Action getImageAction(imageId, actionId)

Retrieve an Existing Action

To retrieve the status of an image action, send a GET request to &#x60;/v2/images/$IMAGE_ID/actions/$IMAGE_ACTION_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImageActionsApi();
let imageId = 56; // Number | A unique number that can be used to identify and reference a specific image.
let actionId = 56; // Number | A unique numeric ID that can be used to identify and reference an action.

apiInstance.getImageAction(imageId, actionId, (error, data, response) => {
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
 **imageId** | **Number**| A unique number that can be used to identify and reference a specific image. | 
 **actionId** | **Number**| A unique numeric ID that can be used to identify and reference an action. | 

### Return type

[**Action**](Action.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listImageActions"></a>
# **listImageActions**
> InlineResponse2004 listImageActions(imageId)

List All Actions for an Image

To retrieve all actions that have been executed on an image, send a GET request to &#x60;/v2/images/$IMAGE_ID/actions&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImageActionsApi();
let imageId = 56; // Number | A unique number that can be used to identify and reference a specific image.

apiInstance.listImageActions(imageId, (error, data, response) => {
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
 **imageId** | **Number**| A unique number that can be used to identify and reference a specific image. | 

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postImageAction"></a>
# **postImageAction**
> Action postImageAction(imageId, opts)

Initiate an Image Action

The following actions are available on an Image.  ## Convert an Image to a Snapshot  To convert an image, for example, a backup to a snapshot, send a POST request to &#x60;/v2/images/$IMAGE_ID/actions&#x60;. Set the &#x60;type&#x60; attribute to &#x60;convert&#x60;.  ## Transfer an Image  To transfer an image to another region, send a POST request to &#x60;/v2/images/$IMAGE_ID/actions&#x60;. Set the &#x60;type&#x60; attribute to &#x60;transfer&#x60; and set &#x60;region&#x60; attribute to the slug identifier of the region you wish to transfer to. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImageActionsApi();
let imageId = 56; // Number | A unique number that can be used to identify and reference a specific image.
let opts = { 
  'body': new DigitalOceanApi.ImageIdActionsBody() // ImageIdActionsBody | 
};
apiInstance.postImageAction(imageId, opts, (error, data, response) => {
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
 **imageId** | **Number**| A unique number that can be used to identify and reference a specific image. | 
 **body** | [**ImageIdActionsBody**](ImageIdActionsBody.md)|  | [optional] 

### Return type

[**Action**](Action.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

