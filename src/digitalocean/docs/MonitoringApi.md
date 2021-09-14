# DigitalOceanApi.MonitoringApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAlertPolicy**](MonitoringApi.md#createAlertPolicy) | **POST** /v2/monitoring/alerts | Create Alert Policy
[**deleteAlertPolicy**](MonitoringApi.md#deleteAlertPolicy) | **DELETE** /v2/monitoring/alerts/{alert_uuid} | Delete an Alert Policy
[**getAlertPolicy**](MonitoringApi.md#getAlertPolicy) | **GET** /v2/monitoring/alerts/{alert_uuid} | Retrieve an Existing Alert Policy
[**getDropletBandwidthMetrics**](MonitoringApi.md#getDropletBandwidthMetrics) | **GET** /v2/monitoring/metrics/droplet/bandwidth | Get Droplet Bandwidth Metrics
[**getDropletCpuMetrics**](MonitoringApi.md#getDropletCpuMetrics) | **GET** /v2/monitoring/metrics/droplet/cpu | Get Droplet CPU Metrics
[**getDropletFilesystemFreeMetrics**](MonitoringApi.md#getDropletFilesystemFreeMetrics) | **GET** /v2/monitoring/metrics/droplet/filesystem_free | Get Droplet Filesystem Free Metrics
[**getDropletFilesystemSizeMetrics**](MonitoringApi.md#getDropletFilesystemSizeMetrics) | **GET** /v2/monitoring/metrics/droplet/filesystem_size | Get Droplet Filesystem Size Metrics
[**getDropletLoad15Metrics**](MonitoringApi.md#getDropletLoad15Metrics) | **GET** /v2/monitoring/metrics/droplet/load_15 | Get Droplet Load15 Metrics
[**getDropletLoad1Metrics**](MonitoringApi.md#getDropletLoad1Metrics) | **GET** /v2/monitoring/metrics/droplet/load_1 | Get Droplet Load1 Metrics
[**getDropletLoad5Metrics**](MonitoringApi.md#getDropletLoad5Metrics) | **GET** /v2/monitoring/metrics/droplet/load_5 | Get Droplet Load5 Metrics
[**getDropletMemoryAvailableMetrics**](MonitoringApi.md#getDropletMemoryAvailableMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_available | Get Droplet Available Memory Metrics
[**getDropletMemoryCachedMetrics**](MonitoringApi.md#getDropletMemoryCachedMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_cached | Get Droplet Cached Memory Metrics
[**getDropletMemoryFreeMetrics**](MonitoringApi.md#getDropletMemoryFreeMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_free | Get Droplet Free Memory Metrics
[**getDropletMemoryTotalMetrics**](MonitoringApi.md#getDropletMemoryTotalMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_total | Get Droplet Total Memory Metrics
[**listAlertPolicies**](MonitoringApi.md#listAlertPolicies) | **GET** /v2/monitoring/alerts | List Alert Policies
[**updateAlertPolicy**](MonitoringApi.md#updateAlertPolicy) | **PUT** /v2/monitoring/alerts/{alert_uuid} | Update an Alert Policy

<a name="createAlertPolicy"></a>
# **createAlertPolicy**
> AlertPolicy createAlertPolicy(body)

Create Alert Policy

To create a new alert, send a POST request to &#x60;/v2/monitoring/alerts&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let body = new DigitalOceanApi.AlertPolicyRequest(); // AlertPolicyRequest | The 'type' field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the 'entities' array. If both the 'tags' array and 'entities' array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: <table><thead><tr><td>Type</td><td>Description</td><td>Valid Entity Type</td></tr></thead><tr><td>v1/insights/droplet/memory_utilization_percent</td><td>alert on the percent of memory utilization</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/disk_read</td><td>alert on the rate of disk read I/O in MBps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/load_5</td><td>alert on the 5 minute load average</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/load_15</td><td>alert on the 15 minute load average</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/disk_utilization_percent</td><td>alert on the percent of disk utilization</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/cpu</td><td>alert on the percent of CPU utilization</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/disk_write</td><td>alert on the rate of disk write I/O in MBps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/public_outbound_bandwidth</td><td>alert on the rate of public outbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/public_inbound_bandwidth</td><td>alert on the rate of public inbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/private_outbound_bandwidth</td><td>alert on the rate of private outbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/private_inbound_bandwidth</td><td>alert on the rate of private inbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/load_1</td><td>alert on the 1 minute load average</td><td>droplet ID</td></tr></table>

apiInstance.createAlertPolicy(body, (error, data, response) => {
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
 **body** | [**AlertPolicyRequest**](AlertPolicyRequest.md)| The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt; | 

### Return type

[**AlertPolicy**](AlertPolicy.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteAlertPolicy"></a>
# **deleteAlertPolicy**
> deleteAlertPolicy(alertUuid)

Delete an Alert Policy

To delete an alert policy, send a DELETE request to &#x60;/v2/monitoring/alerts/{alert_uuid}&#x60;

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let alertUuid = "alertUuid_example"; // String | A unique identifier for an alert policy.

apiInstance.deleteAlertPolicy(alertUuid, (error, data, response) => {
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
 **alertUuid** | **String**| A unique identifier for an alert policy. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getAlertPolicy"></a>
# **getAlertPolicy**
> AlertPolicy getAlertPolicy(alertUuid)

Retrieve an Existing Alert Policy

To retrieve a given alert policy, send a GET request to &#x60;/v2/monitoring/alerts/{alert_uuid}&#x60;

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let alertUuid = "alertUuid_example"; // String | A unique identifier for an alert policy.

apiInstance.getAlertPolicy(alertUuid, (error, data, response) => {
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
 **alertUuid** | **String**| A unique identifier for an alert policy. | 

### Return type

[**AlertPolicy**](AlertPolicy.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletBandwidthMetrics"></a>
# **getDropletBandwidthMetrics**
> Metrics getDropletBandwidthMetrics(hostId, _interface, direction, start, end)

Get Droplet Bandwidth Metrics

To retrieve bandwidth metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/bandwidth&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let _interface = "_interface_example"; // String | The network interface.
let direction = "direction_example"; // String | The traffic direction.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletBandwidthMetrics(hostId, _interface, direction, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **_interface** | **String**| The network interface. | 
 **direction** | **String**| The traffic direction. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletCpuMetrics"></a>
# **getDropletCpuMetrics**
> Metrics getDropletCpuMetrics(hostId, start, end)

Get Droplet CPU Metrics

To retrieve CPU metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/cpu&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletCpuMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletFilesystemFreeMetrics"></a>
# **getDropletFilesystemFreeMetrics**
> Metrics getDropletFilesystemFreeMetrics(hostId, start, end)

Get Droplet Filesystem Free Metrics

To retrieve filesystem free metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/filesystem_free&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletFilesystemFreeMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletFilesystemSizeMetrics"></a>
# **getDropletFilesystemSizeMetrics**
> Metrics getDropletFilesystemSizeMetrics(hostId, start, end)

Get Droplet Filesystem Size Metrics

To retrieve filesystem size metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/filesystem_size&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletFilesystemSizeMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletLoad15Metrics"></a>
# **getDropletLoad15Metrics**
> Metrics getDropletLoad15Metrics(hostId, start, end)

Get Droplet Load15 Metrics

To retrieve 15 minute load average metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/load_15&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletLoad15Metrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletLoad1Metrics"></a>
# **getDropletLoad1Metrics**
> Metrics getDropletLoad1Metrics(hostId, start, end)

Get Droplet Load1 Metrics

To retrieve 1 minute load average metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/load_1&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletLoad1Metrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletLoad5Metrics"></a>
# **getDropletLoad5Metrics**
> Metrics getDropletLoad5Metrics(hostId, start, end)

Get Droplet Load5 Metrics

To retrieve 5 minute load average metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/load_5&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletLoad5Metrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletMemoryAvailableMetrics"></a>
# **getDropletMemoryAvailableMetrics**
> Metrics getDropletMemoryAvailableMetrics(hostId, start, end)

Get Droplet Available Memory Metrics

To retrieve available memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_available&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletMemoryAvailableMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletMemoryCachedMetrics"></a>
# **getDropletMemoryCachedMetrics**
> Metrics getDropletMemoryCachedMetrics(hostId, start, end)

Get Droplet Cached Memory Metrics

To retrieve cached memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_cached&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletMemoryCachedMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletMemoryFreeMetrics"></a>
# **getDropletMemoryFreeMetrics**
> Metrics getDropletMemoryFreeMetrics(hostId, start, end)

Get Droplet Free Memory Metrics

To retrieve free memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_free&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletMemoryFreeMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDropletMemoryTotalMetrics"></a>
# **getDropletMemoryTotalMetrics**
> Metrics getDropletMemoryTotalMetrics(hostId, start, end)

Get Droplet Total Memory Metrics

To retrieve total memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_total&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let hostId = "hostId_example"; // String | The droplet ID.
let start = "start_example"; // String | Timestamp to start metric window.
let end = "end_example"; // String | Timestamp to end metric window.

apiInstance.getDropletMemoryTotalMetrics(hostId, start, end, (error, data, response) => {
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
 **hostId** | **String**| The droplet ID. | 
 **start** | **String**| Timestamp to start metric window. | 
 **end** | **String**| Timestamp to end metric window. | 

### Return type

[**Metrics**](Metrics.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAlertPolicies"></a>
# **listAlertPolicies**
> InlineResponse20040 listAlertPolicies(opts)

List Alert Policies

Returns all alert policies that are configured for the given account. To List all alert policies, send a GET request to &#x60;/v2/monitoring/alerts&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAlertPolicies(opts, (error, data, response) => {
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

[**InlineResponse20040**](InlineResponse20040.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateAlertPolicy"></a>
# **updateAlertPolicy**
> AlertPolicy updateAlertPolicy(body, alertUuid)

Update an Alert Policy

To update en existing policy, send a PUT request to &#x60;v2/monitoring/alerts/{alert_uuid}&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.MonitoringApi();
let body = new DigitalOceanApi.AlertPolicyRequest(); // AlertPolicyRequest | The 'type' field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the 'entities' array. If both the 'tags' array and 'entities' array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: <table><thead><tr><td>Type</td><td>Description</td><td>Valid Entity Type</td></tr></thead><tr><td>v1/insights/droplet/memory_utilization_percent</td><td>alert on the percent of memory utilization</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/disk_read</td><td>alert on the rate of disk read I/O in MBps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/load_5</td><td>alert on the 5 minute load average</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/load_15</td><td>alert on the 15 minute load average</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/disk_utilization_percent</td><td>alert on the percent of disk utilization</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/cpu</td><td>alert on the percent of CPU utilization</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/disk_write</td><td>alert on the rate of disk write I/O in MBps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/public_outbound_bandwidth</td><td>alert on the rate of public outbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/public_inbound_bandwidth</td><td>alert on the rate of public inbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/private_outbound_bandwidth</td><td>alert on the rate of private outbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/private_inbound_bandwidth</td><td>alert on the rate of private inbound bandwidth in Mbps</td><td>droplet ID</td></tr><tr><td>v1/insights/droplet/load_1</td><td>alert on the 1 minute load average</td><td>droplet ID</td></tr></table>
let alertUuid = "alertUuid_example"; // String | A unique identifier for an alert policy.

apiInstance.updateAlertPolicy(body, alertUuid, (error, data, response) => {
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
 **body** | [**AlertPolicyRequest**](AlertPolicyRequest.md)| The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt; | 
 **alertUuid** | **String**| A unique identifier for an alert policy. | 

### Return type

[**AlertPolicy**](AlertPolicy.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

