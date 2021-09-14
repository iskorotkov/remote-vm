# DigitalOceanApi.AppServiceSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**instanceCount** | **Number** | The amount of instances that this component should be scaled to. Default: 1 | [optional] [default to 1]
**instanceSizeSlug** | **String** | The instance size to use for this component. Default: &#x60;basic-xxs&#x60; | [optional] [default to &#x27;basic-xxs&#x27;]
**cors** | [**AppsCorsPolicy**](AppsCorsPolicy.md) |  | [optional] 
**healthCheck** | [**AppServiceSpecHealthCheck**](AppServiceSpecHealthCheck.md) |  | [optional] 
**httpPort** | **Number** | The internal port on which this service&#x27;s run command will listen. Default: 8080 If there is not an environment variable with the name &#x60;PORT&#x60;, one will be automatically added with its value set to the value of this field. | [optional] 
**internalPorts** | **[Number]** | The ports on which this service will listen for internal traffic. | [optional] 
**routes** | [**[AppRouteSpec]**](AppRouteSpec.md) | A list of HTTP routes that should be routed to this component. | [optional] 

<a name="InstanceSizeSlugEnum"></a>
## Enum: InstanceSizeSlugEnum

* `basicXxs` (value: `"basic-xxs"`)
* `basicXs` (value: `"basic-xs"`)
* `basicS` (value: `"basic-s"`)
* `basicM` (value: `"basic-m"`)
* `professionalXs` (value: `"professional-xs"`)
* `professionalS` (value: `"professional-s"`)
* `professionalM` (value: `"professional-m"`)
* `professional1l` (value: `"professional-1l"`)
* `professionalL` (value: `"professional-l"`)
* `professionalXl` (value: `"professional-xl"`)

