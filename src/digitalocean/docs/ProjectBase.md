# DigitalOceanApi.ProjectBase

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The unique universal identifier of this project. | [optional] 
**ownerUuid** | **String** | The unique universal identifier of the project owner. | [optional] 
**ownerId** | **Number** | The integer id of the project owner. | [optional] 
**name** | **String** | The human-readable name for the project. The maximum length is 175 characters and the name must be unique. | [optional] 
**description** | **String** | The description of the project. The maximum length is 255 characters. | [optional] 
**purpose** | **String** | The purpose of the project. The maximum length is 255 characters. It can have one of the following values:  - Just trying out DigitalOcean - Class project / Educational purposes - Website or blog - Web Application - Service or API - Mobile Application - Machine learning / AI / Data processing - IoT - Operational / Developer tooling  If another value for purpose is specified, for example, \&quot;your custom purpose\&quot;, your purpose will be stored as &#x60;Other: your custom purpose&#x60;.  | [optional] 
**environment** | **String** | The environment of the project&#x27;s resources. | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the project was created. | [optional] 
**updatedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the project was updated. | [optional] 

<a name="EnvironmentEnum"></a>
## Enum: EnvironmentEnum

* `development` (value: `"Development"`)
* `staging` (value: `"Staging"`)
* `production` (value: `"Production"`)

