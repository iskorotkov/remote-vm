# DigitalOceanApi.LoadBalancerBase

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | A unique ID that can be used to identify and reference a load balancer. | [optional] 
**name** | **String** | A human-readable name for a load balancer instance. | [optional] 
**ip** | **String** | An attribute containing the public-facing IP address of the load balancer. | [optional] 
**size** | **String** | The size of the load balancer. The available sizes are &#x60;lb-small&#x60;, &#x60;lb-medium&#x60;, or &#x60;lb-large&#x60;. You can resize load balancers after creation up to once per hour. You cannot resize a load balancer within the first hour of its creation. | [optional] [default to &#x27;lb-small&#x27;]
**algorithm** | **String** | The load balancing algorithm used to determine which backend Droplet will be selected by a client. It must be either &#x60;round_robin&#x60; or &#x60;least_connections&#x60;. | [optional] [default to &#x27;round_robin&#x27;]
**status** | **String** | A status string indicating the current state of the load balancer. This can be &#x60;new&#x60;, &#x60;active&#x60;, or &#x60;errored&#x60;. | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the load balancer was created. | [optional] 
**forwardingRules** | [**[ForwardingRule]**](ForwardingRule.md) | An array of objects specifying the forwarding rules for a load balancer. | 
**healthCheck** | [**HealthCheck**](HealthCheck.md) |  | [optional] 
**stickySessions** | [**StickySessions**](StickySessions.md) |  | [optional] 
**redirectHttpToHttps** | **Boolean** | A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443. | [optional] [default to false]
**enableProxyProtocol** | **Boolean** | A boolean value indicating whether PROXY Protocol is in use. | [optional] [default to false]
**enableBackendKeepalive** | **Boolean** | A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets. | [optional] [default to false]
**vpcUuid** | **String** | A string specifying the UUID of the VPC to which the load balancer is assigned. | [optional] 

<a name="SizeEnum"></a>
## Enum: SizeEnum

* `small` (value: `"lb-small"`)
* `medium` (value: `"lb-medium"`)
* `large` (value: `"lb-large"`)


<a name="AlgorithmEnum"></a>
## Enum: AlgorithmEnum

* `roundRobin` (value: `"round_robin"`)
* `leastConnections` (value: `"least_connections"`)


<a name="StatusEnum"></a>
## Enum: StatusEnum

* `_new` (value: `"new"`)
* `active` (value: `"active"`)
* `errored` (value: `"errored"`)

