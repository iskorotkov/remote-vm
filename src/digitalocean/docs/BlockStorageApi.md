# DigitalOceanApi.BlockStorageApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNewVolume**](BlockStorageApi.md#createNewVolume) | **POST** /v2/volumes | Create a New Block Storage Volume
[**createVolumeSnapshot**](BlockStorageApi.md#createVolumeSnapshot) | **POST** /v2/volumes/{volume_id}/snapshots | Create Snapshot from a Volume
[**deleteVolume**](BlockStorageApi.md#deleteVolume) | **DELETE** /v2/volumes/{volume_id} | Delete a Block Storage Volume
[**deleteVolumeByName**](BlockStorageApi.md#deleteVolumeByName) | **DELETE** /v2/volumes | Delete a Block Storage Volume by Name
[**deleteVolumeSnapshotById**](BlockStorageApi.md#deleteVolumeSnapshotById) | **DELETE** /v2/volumes/snapshot/{snapshot_id} | Delete a Volume Snapshot
[**getVolume**](BlockStorageApi.md#getVolume) | **GET** /v2/volumes/{volume_id} | Retrieve an Existing Block Storage Volume
[**getVolumeSnapshotById**](BlockStorageApi.md#getVolumeSnapshotById) | **GET** /v2/volumes/snapshot/{snapshot_id} | Retreive an Existing Volume Snapshot
[**listAllVolumes**](BlockStorageApi.md#listAllVolumes) | **GET** /v2/volumes | List All Block Storage Volumes
[**listVolumeSnapshots**](BlockStorageApi.md#listVolumeSnapshots) | **GET** /v2/volumes/{volume_id}/snapshots | List Snapshots for a Volume

<a name="createNewVolume"></a>
# **createNewVolume**
> InlineResponse20116 createNewVolume(body)

Create a New Block Storage Volume

To create a new volume, send a POST request to &#x60;/v2/volumes&#x60;. Optionally, a &#x60;filesystem_type&#x60; attribute may be provided in order to automatically format the volume&#x27;s filesystem. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to Droplets without support for auto-mounting is not recommended.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let body = new DigitalOceanApi.V2VolumesBody(); // V2VolumesBody | 

apiInstance.createNewVolume(body, (error, data, response) => {
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
 **body** | [**V2VolumesBody**](V2VolumesBody.md)|  | 

### Return type

[**InlineResponse20116**](InlineResponse20116.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createVolumeSnapshot"></a>
# **createVolumeSnapshot**
> InlineResponse20058 createVolumeSnapshot(body, volumeId)

Create Snapshot from a Volume

To create a snapshot from a volume, sent a POST request to &#x60;/v2/volumes/$VOLUME_ID/snapshots&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let body = new DigitalOceanApi.VolumeIdSnapshotsBody(); // VolumeIdSnapshotsBody | 
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.

apiInstance.createVolumeSnapshot(body, volumeId, (error, data, response) => {
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
 **body** | [**VolumeIdSnapshotsBody**](VolumeIdSnapshotsBody.md)|  | 
 **volumeId** | [**String**](.md)| The ID of the block storage volume. | 

### Return type

[**InlineResponse20058**](InlineResponse20058.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteVolume"></a>
# **deleteVolume**
> deleteVolume(volumeId)

Delete a Block Storage Volume

To delete a block storage volume, destroying all data and removing it from your account, send a DELETE request to &#x60;/v2/volumes/$VOLUME_ID&#x60;. No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.

apiInstance.deleteVolume(volumeId, (error, data, response) => {
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
 **volumeId** | [**String**](.md)| The ID of the block storage volume. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteVolumeByName"></a>
# **deleteVolumeByName**
> deleteVolumeByName(opts)

Delete a Block Storage Volume by Name

Block storage volumes may also be deleted by name by sending a DELETE request with the volume&#x27;s **name** and the **region slug** for the region it is located in as query parameters to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&amp;region&#x3D;nyc1&#x60;. No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let opts = { 
  'name': "name_example", // String | The block storage volume's name.
  'region': new DigitalOceanApi.RegionSlug() // RegionSlug | The slug identifier for the region where the resource is available.
};
apiInstance.deleteVolumeByName(opts, (error, data, response) => {
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
 **name** | **String**| The block storage volume&#x27;s name. | [optional] 
 **region** | [**RegionSlug**](.md)| The slug identifier for the region where the resource is available. | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteVolumeSnapshotById"></a>
# **deleteVolumeSnapshotById**
> deleteVolumeSnapshotById(snapshotId)

Delete a Volume Snapshot

To delete a volume snapshot, send a DELETE request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let snapshotId = new DigitalOceanApi.SnapshotId(); // SnapshotId | Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.

apiInstance.deleteVolumeSnapshotById(snapshotId, (error, data, response) => {
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
 **snapshotId** | [**SnapshotId**](.md)| Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getVolume"></a>
# **getVolume**
> InlineResponse20116 getVolume(volumeId)

Retrieve an Existing Block Storage Volume

To show information about a block storage volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID&#x60;.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.

apiInstance.getVolume(volumeId, (error, data, response) => {
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

### Return type

[**InlineResponse20116**](InlineResponse20116.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getVolumeSnapshotById"></a>
# **getVolumeSnapshotById**
> InlineResponse20058 getVolumeSnapshotById(snapshotId)

Retreive an Existing Volume Snapshot

To retrieve the details of a snapshot that has been created from a volume, send a GET request to &#x60;/v2/volumes/snapshots/$SNAPSHOT_ID&#x60;.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let snapshotId = new DigitalOceanApi.SnapshotId(); // SnapshotId | Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.

apiInstance.getVolumeSnapshotById(snapshotId, (error, data, response) => {
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
 **snapshotId** | [**SnapshotId**](.md)| Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot. | 

### Return type

[**InlineResponse20058**](InlineResponse20058.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllVolumes"></a>
# **listAllVolumes**
> InlineResponse20057 listAllVolumes(opts)

List All Block Storage Volumes

To list all of the block storage volumes available on your account, send a GET request to &#x60;/v2/volumes&#x60;. ## Filtering Results ### By Region The &#x60;region&#x60; may be provided as query paramater in order to restrict results to volumes available in a specific region. For example: &#x60;/v2/volumes?region&#x3D;nyc1&#x60; ### By Name It is also possible to list volumes on your account that match a specified name. To do so, send a GET request with the volume&#x27;s name as a query parameter to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&#x60;. **Note:** You can only create one volume per region with the same name. ### By Name and Region It is also possible to retrieve information about a block storage volume by name. To do so, send a GET request with the volume&#x27;s name and the region slug for the region it is located in as query parameters to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&amp;region&#x3D;nyc1&#x60;.   

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let opts = { 
  'name': "name_example", // String | The block storage volume's name.
  'region': new DigitalOceanApi.RegionSlug(), // RegionSlug | The slug identifier for the region where the resource is available.
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllVolumes(opts, (error, data, response) => {
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
 **name** | **String**| The block storage volume&#x27;s name. | [optional] 
 **region** | [**RegionSlug**](.md)| The slug identifier for the region where the resource is available. | [optional] 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20057**](InlineResponse20057.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listVolumeSnapshots"></a>
# **listVolumeSnapshots**
> InlineResponse20060 listVolumeSnapshots(volumeId, opts)

List Snapshots for a Volume

To retrieve the snapshots that have been created from a volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/snapshots&#x60;.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BlockStorageApi();
let volumeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | The ID of the block storage volume.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listVolumeSnapshots(volumeId, opts, (error, data, response) => {
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

[**InlineResponse20060**](InlineResponse20060.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

