# DigitalOceanApi.Action

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | A unique numeric ID that can be used to identify and reference an action. | [optional] 
**status** | **String** | The current status of the action. This can be \&quot;in-progress\&quot;, \&quot;completed\&quot;, or \&quot;errored\&quot;. | [optional] [default to &#x27;in-progress&#x27;]
**type** | **String** | This is the type of action that the object represents. For example, this could be \&quot;transfer\&quot; to represent the state of an image transfer action. | [optional] 
**startedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the action was initiated. | [optional] 
**completedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the action was completed. | [optional] 
**resourceId** | **Number** | A unique identifier for the resource that the action is associated with. | [optional] 
**resourceType** | **String** | The type of resource that the action is associated with. | [optional] 
**region** | [**Region**](Region.md) |  | [optional] 
**regionSlug** | **AllOfactionRegionSlug** |  | [optional] 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `inProgress` (value: `"in-progress"`)
* `completed` (value: `"completed"`)
* `errored` (value: `"errored"`)

