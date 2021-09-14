# DigitalOceanApi.AppServiceSpecHealthCheck

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**failureThreshold** | **Number** | The number of failed health checks before considered unhealthy. | [optional] 
**httpPath** | **String** | The route path used for the HTTP health check ping. If not set, the HTTP health check will be disabled and a TCP health check used instead. | [optional] 
**initialDelaySeconds** | **Number** | The number of seconds to wait before beginning health checks. | [optional] 
**periodSeconds** | **Number** | The number of seconds to wait between health checks. | [optional] 
**successThreshold** | **Number** | The number of successful health checks before considered healthy. | [optional] 
**timeoutSeconds** | **Number** | The number of seconds after which the check times out. | [optional] 
