# DigitalOceanApi.AppJobSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**instanceCount** | **Number** | The amount of instances that this component should be scaled to. Default: 1 | [optional] [default to 1]
**instanceSizeSlug** | **String** | The instance size to use for this component. Default: &#x60;basic-xxs&#x60; | [optional] [default to &#x27;basic-xxs&#x27;]
**kind** | **String** | - UNSPECIFIED: Default job type, will auto-complete to POST_DEPLOY kind. - PRE_DEPLOY: Indicates a job that runs before an app deployment. - POST_DEPLOY: Indicates a job that runs after an app deployment. - FAILED_DEPLOY: Indicates a job that runs after a component fails to deploy. | [optional] [default to &#x27;UNSPECIFIED&#x27;]

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


<a name="KindEnum"></a>
## Enum: KindEnum

* `UNSPECIFIED` (value: `"UNSPECIFIED"`)
* `PRE_DEPLOY` (value: `"PRE_DEPLOY"`)
* `POST_DEPLOY` (value: `"POST_DEPLOY"`)
* `FAILED_DEPLOY` (value: `"FAILED_DEPLOY"`)

