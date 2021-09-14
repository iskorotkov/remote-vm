# DigitalOceanApi.AlertPolicy

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**alerts** | [**Alerts**](Alerts.md) |  | 
**compare** | **String** |  | 
**description** | **String** |  | 
**enabled** | **Boolean** |  | 
**entities** | **[String]** |  | 
**tags** | **[String]** |  | 
**type** | **String** |  | 
**uuid** | **String** |  | 
**value** | **Number** |  | 
**window** | **String** |  | 

<a name="CompareEnum"></a>
## Enum: CompareEnum

* `greaterThan` (value: `"GreaterThan"`)
* `lessThan` (value: `"LessThan"`)


<a name="TypeEnum"></a>
## Enum: TypeEnum

* `load1` (value: `"v1/insights/droplet/load_1"`)
* `load5` (value: `"v1/insights/droplet/load_5"`)
* `load15` (value: `"v1/insights/droplet/load_15"`)
* `memoryUtilizationPercent` (value: `"v1/insights/droplet/memory_utilization_percent"`)
* `diskUtilizationPercent` (value: `"v1/insights/droplet/disk_utilization_percent"`)
* `cpu` (value: `"v1/insights/droplet/cpu"`)
* `diskRead` (value: `"v1/insights/droplet/disk_read"`)
* `diskWrite` (value: `"v1/insights/droplet/disk_write"`)
* `publicOutboundBandwidth` (value: `"v1/insights/droplet/public_outbound_bandwidth"`)
* `publicInboundBandwidth` (value: `"v1/insights/droplet/public_inbound_bandwidth"`)
* `privateOutboundBandwidth` (value: `"v1/insights/droplet/private_outbound_bandwidth"`)
* `privateInboundBandwidth` (value: `"v1/insights/droplet/private_inbound_bandwidth"`)


<a name="WindowEnum"></a>
## Enum: WindowEnum

* `_5m` (value: `"5m"`)
* `_10m` (value: `"10m"`)
* `_30m` (value: `"30m"`)
* `_1h` (value: `"1h"`)

