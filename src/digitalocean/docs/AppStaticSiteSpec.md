# DigitalOceanApi.AppStaticSiteSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**indexDocument** | **String** | The name of the index document to use when serving this static site. Default: index.html | [optional] [default to &#x27;index.html&#x27;]
**errorDocument** | **String** | The name of the error document to use when serving this static site. Default: 404.html. If no such file exists within the built assets, App Platform will supply one. | [optional] [default to &#x27;404.html&#x27;]
**catchallDocument** | **String** | The name of the document to use as the fallback for any requests to documents that are not found when serving this static site. Only 1 of &#x60;catchall_document&#x60; or &#x60;error_document&#x60; can be set. | [optional] 
**outputDir** | **String** | An optional path to where the built assets will be located, relative to the build context. If not set, App Platform will automatically scan for these directory names: &#x60;_static&#x60;, &#x60;dist&#x60;, &#x60;public&#x60;, &#x60;build&#x60;. | [optional] 
**cors** | [**AppsCorsPolicy**](AppsCorsPolicy.md) |  | [optional] 
**routes** | [**[AppRouteSpec]**](AppRouteSpec.md) | A list of HTTP routes that should be routed to this component. | [optional] 
