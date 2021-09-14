# DigitalOceanApi.AppComponentBase

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The name. Must be unique across all components within the same app. | [optional] 
**git** | [**AppsGitSourceSpec**](AppsGitSourceSpec.md) |  | [optional] 
**github** | [**AppsGithubSourceSpec**](AppsGithubSourceSpec.md) |  | [optional] 
**gitlab** | [**AppsGitlabSourceSpec**](AppsGitlabSourceSpec.md) |  | [optional] 
**image** | [**AppsImageSourceSpec**](AppsImageSourceSpec.md) |  | [optional] 
**dockerfilePath** | **String** | The path to the Dockerfile relative to the root of the repo. If set, it will be used to build this component. Otherwise, App Platform will attempt to build it using buildpacks. | [optional] 
**buildCommand** | **String** | An optional build command to run while building this component from source. | [optional] 
**runCommand** | **String** | An optional run command to override the component&#x27;s default. | [optional] 
**sourceDir** | **String** | An optional path to the working directory to use for the build. For Dockerfile builds, this will be used as the build context. Must be relative to the root of the repo. | [optional] 
**envs** | [**[AppVariableDefinition]**](AppVariableDefinition.md) | A list of environment variables made available to the component. | [optional] 
**environmentSlug** | **String** | An environment slug describing the type of this app. For a full list, please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/). | [optional] 
