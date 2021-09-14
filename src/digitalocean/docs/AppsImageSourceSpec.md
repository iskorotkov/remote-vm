# DigitalOceanApi.AppsImageSourceSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**registry** | **String** | The registry name. Must be left empty for the &#x60;DOCR&#x60; registry type. | [optional] 
**registryType** | **String** | - DOCKER_HUB: The DockerHub container registry type. - DOCR: The DigitalOcean container registry type. | [optional] 
**repository** | **String** | The repository name. | [optional] 
**tag** | **String** | The repository tag. Defaults to &#x60;latest&#x60; if not provided. | [optional] [default to &#x27;latest&#x27;]

<a name="RegistryTypeEnum"></a>
## Enum: RegistryTypeEnum

* `DOCKER_HUB` (value: `"DOCKER_HUB"`)
* `DOCR` (value: `"DOCR"`)

