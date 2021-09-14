# DigitalOceanApi.AppVariableDefinition

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **String** | The variable name | 
**scope** | **String** | - RUN_TIME: Made available only at run-time - BUILD_TIME: Made available only at build-time - RUN_AND_BUILD_TIME: Made available at both build and run-time | [optional] [default to &#x27;RUN_AND_BUILD_TIME&#x27;]
**type** | **String** | - GENERAL: A plain-text environment variable - SECRET: A secret encrypted environment variable | [optional] [default to &#x27;GENERAL&#x27;]
**value** | **String** | The value. If the type is &#x60;SECRET&#x60;, the value will be encrypted on first submission. On following submissions, the encrypted value should be used. | [optional] 

<a name="ScopeEnum"></a>
## Enum: ScopeEnum

* `UNSET` (value: `"UNSET"`)
* `RUN_TIME` (value: `"RUN_TIME"`)
* `BUILD_TIME` (value: `"BUILD_TIME"`)
* `RUN_AND_BUILD_TIME` (value: `"RUN_AND_BUILD_TIME"`)


<a name="TypeEnum"></a>
## Enum: TypeEnum

* `GENERAL` (value: `"GENERAL"`)
* `SECRET` (value: `"SECRET"`)

