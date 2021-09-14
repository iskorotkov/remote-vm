# DigitalOceanApi.MaintenancePolicy

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**startTime** | **String** | The start time in UTC of the maintenance window policy in 24-hour clock format / HH:MM notation (e.g., &#x60;15:00&#x60;). | [optional] 
**duration** | **String** | The duration of the maintenance window policy in human-readable format. | [optional] 
**day** | **String** | The day of the maintenance window policy. May be one of &#x60;monday&#x60; through &#x60;sunday&#x60;, or &#x60;any&#x60; to indicate an arbitrary week day. | [optional] 

<a name="DayEnum"></a>
## Enum: DayEnum

* `any` (value: `"any"`)
* `monday` (value: `"monday"`)
* `tuesday` (value: `"tuesday"`)
* `wednesday` (value: `"wednesday"`)
* `thursday` (value: `"thursday"`)
* `friday` (value: `"friday"`)
* `saturday` (value: `"saturday"`)
* `sunday` (value: `"sunday"`)

