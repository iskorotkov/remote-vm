# DigitalOceanApi.HealthCheck

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**protocol** | **String** | The protocol used for health checks sent to the backend Droplets. The possible values are &#x60;http&#x60;, &#x60;https&#x60;, or &#x60;tcp&#x60;. | [optional] [default to &#x27;http&#x27;]
**port** | **Number** | An integer representing the port on the backend Droplets on which the health check will attempt a connection. | [optional] [default to 80]
**path** | **String** | The path on the backend Droplets to which the load balancer instance will send a request. | [optional] [default to &#x27;/&#x27;]
**checkIntervalSeconds** | **Number** | The number of seconds between between two consecutive health checks. | [optional] [default to 10]
**responseTimeoutSeconds** | **Number** | The number of seconds the load balancer instance will wait for a response until marking a health check as failed. | [optional] [default to 5]
**unhealthyThreshold** | **Number** | The number of times a health check must fail for a backend Droplet to be marked \&quot;unhealthy\&quot; and be removed from the pool. | [optional] [default to 5]
**healthyThreshold** | **Number** | The number of times a health check must pass for a backend Droplet to be marked \&quot;healthy\&quot; and be re-added to the pool. | [optional] [default to 3]

<a name="ProtocolEnum"></a>
## Enum: ProtocolEnum

* `http` (value: `"http"`)
* `https` (value: `"https"`)
* `tcp` (value: `"tcp"`)

