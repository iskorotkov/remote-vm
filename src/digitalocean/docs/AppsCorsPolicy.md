# DigitalOceanApi.AppsCorsPolicy

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowOrigins** | [**[AppsStringMatch]**](AppsStringMatch.md) | The set of allowed CORS origins. | [optional] 
**allowMethods** | **[String]** | The set of allowed HTTP methods. This configures the &#x60;Access-Control-Allow-Methods&#x60; header. | [optional] 
**allowHeaders** | **[String]** | The set of allowed HTTP request headers. This configures the &#x60;Access-Control-Allow-Headers&#x60; header. | [optional] 
**exposeHeaders** | **[String]** | The set of HTTP response headers that browsers are allowed to access. This configures the &#x60;Access-Control-Expose-Headers&#x60; header. | [optional] 
**maxAge** | **String** | An optional duration specifying how long browsers can cache the results of a preflight request. This configures the &#x60;Access-Control-Max-Age&#x60; header. | [optional] 
**allowCredentials** | **Boolean** | Whether browsers should expose the response to the client-side JavaScript code when the request’s credentials mode is include. This configures the &#x60;Access-Control-Allow-Credentials&#x60; header. | [optional] 
