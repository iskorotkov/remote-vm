# DigitalOceanApi.BlockStorageActionsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getVolumeAction**](BlockStorageActionsApi.md#getVolumeAction) | **GET** /v2/volumes/{volume_id}/actions/{action_id} | Retrieve an Existing Volume Action
[**listAllVolumeActions**](BlockStorageActionsApi.md#listAllVolumeActions) | **GET** /v2/volumes/{volume_id}/actions | List All Actions for a Volume
[**postVolumeActionById**](BlockStorageActionsApi.md#postVolumeActionById) | **POST** /v2/volumes/{volume_id}/actions | Initiate A Block Storage Action By Volume Id
[**postVolumeActionByName**](BlockStorageActionsApi.md#postVolumeActionByName) | **POST** /v2/volumes/actions | Initiate A Block Storage Action By Volume Name

<a name="getVolumeAction"></a>
# **getVolumeAction**
> InlineResponse2027 getVolumeAction(volumeId, actionId, opts)

Retrieve an Existing Volume Action

To retrieve the status of a volume action, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/actions/$ACTION_ID&#x60;.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageActionsApi();
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.
let actionId = 56; // Number | A unique numeric ID that can be used to identify and reference an action.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.getVolumeAction(volumeId, actionId, opts, (error, data, response) => {
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
 **volumeId** | [**String**](.md)| The ID of the block storage volume. | 
 **actionId** | **Number**| A unique numeric ID that can be used to identify and reference an action. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse2027**](InlineResponse2027.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllVolumeActions"></a>
# **listAllVolumeActions**
> InlineResponse20059 listAllVolumeActions(volumeId, opts)

List All Actions for a Volume

To retrieve all actions that have been executed on a volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/actions&#x60;.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageActionsApi();
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllVolumeActions(volumeId, opts, (error, data, response) => {
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
 **volumeId** | [**String**](.md)| The ID of the block storage volume. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20059**](InlineResponse20059.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postVolumeActionById"></a>
# **postVolumeActionById**
> InlineResponse2027 postVolumeActionById(body, volumeId, opts)

Initiate A Block Storage Action By Volume Id

To initiate an action on a block storage volume by Id, send a POST request to &#x60;~/v2/volumes/$VOLUME_ID/actions&#x60;. The body should contain the appropriate attributes for the respective action.  ## Attach a Block Storage Volume to a Droplet  | Attribute  | Details                                                             | | ---------- | ------------------------------------------------------------------- | | type       | This must be &#x60;attach&#x60;                                               | | droplet_id | Set to the Droplet&#x27;s ID                                             | | region     | Set to the slug representing the region where the volume is located |  Each volume may only be attached to a single Droplet. However, up to five volumes may be attached to a Droplet at a time. Pre-formatted volumes will be automatically mounted to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018 when attached. On older Droplets, [additional configuration](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-digitalocean-block-storage-volumes-in-linux#mounting-the-filesystems) is required.  ## Remove a Block Storage Volume from a Droplet  | Attribute  | Details                                                             | | ---------- | ------------------------------------------------------------------- | | type       | This must be &#x60;detach&#x60;                                               | | droplet_id | Set to the Droplet&#x27;s ID                                             | | region     | Set to the slug representing the region where the volume is located |  ## Resize a Volume  | Attribute      | Details                                                             | | -------------- | ------------------------------------------------------------------- | | type           | This must be &#x60;resize&#x60;                                               | | size_gigabytes | The new size of the block storage volume in GiB (1024^3)            | | region         | Set to the slug representing the region where the volume is located |  Volumes may only be resized upwards. The maximum size for a volume is 16TiB. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageActionsApi();
let body = new DigitalOceanApi.VolumeIdActionsBody(); // VolumeIdActionsBody | 
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.postVolumeActionById(body, volumeId, opts, (error, data, response) => {
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
 **body** | [**VolumeIdActionsBody**](VolumeIdActionsBody.md)|  | 
 **volumeId** | [**String**](.md)| The ID of the block storage volume. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse2027**](InlineResponse2027.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="postVolumeActionByName"></a>
# **postVolumeActionByName**
> InlineResponse2027 postVolumeActionByName(body, opts)

Initiate A Block Storage Action By Volume Name

To initiate an action on a block storage volume by Id, send a POST request to &#x60;~/v2/volumes/actions&#x60;. The body should contain the appropriate attributes for the respective action.  ## Attach a Block Storage Volume to a Droplet  | Attribute   | Details                                                             | | ----------- | ------------------------------------------------------------------- | | type        | This must be &#x60;attach&#x60;                                               | | volume_name | The name of the block storage volume                                | | droplet_id  | Set to the Droplet&#x27;s ID                                             | | region      | Set to the slug representing the region where the volume is located |  Each volume may only be attached to a single Droplet. However, up to five volumes may be attached to a Droplet at a time. Pre-formatted volumes will be automatically mounted to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018 when attached. On older Droplets, [additional configuration](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-digitalocean-block-storage-volumes-in-linux#mounting-the-filesystems) is required.  ## Remove a Block Storage Volume from a Droplet  | Attribute   | Details                                                             | | ----------- | ------------------------------------------------------------------- | | type        | This must be &#x60;detach&#x60;                                               | | volume_name | The name of the block storage volume                                | | droplet_id  | Set to the Droplet&#x27;s ID                                             | | region      | Set to the slug representing the region where the volume is located | 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageActionsApi();
let body = new DigitalOceanApi.VolumesActionsBody(); // VolumesActionsBody | 
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.postVolumeActionByName(body, opts, (error, data, response) => {
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
 **body** | [**VolumesActionsBody**](VolumesActionsBody.md)|  | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse2027**](InlineResponse2027.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

