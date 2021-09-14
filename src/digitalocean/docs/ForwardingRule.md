# DigitalOceanApi.ForwardingRule

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**entryProtocol** | **String** | The protocol used for traffic to the load balancer. The possible values are: &#x60;http&#x60;, &#x60;https&#x60;, &#x60;http2&#x60;, or &#x60;tcp&#x60;.  | 
**entryPort** | **Number** | An integer representing the port on which the load balancer instance will listen. | 
**targetProtocol** | **String** | The protocol used for traffic from the load balancer to the backend Droplets. The possible values are: &#x60;http&#x60;, &#x60;https&#x60;, &#x60;http2&#x60;, or &#x60;tcp&#x60;.  | 
**targetPort** | **Number** | An integer representing the port on the backend Droplets to which the load balancer will send traffic. | 
**certificateId** | **String** | The ID of the TLS certificate used for SSL termination if enabled. | [optional] 
**tlsPassthrough** | **Boolean** | A boolean value indicating whether SSL encrypted traffic will be passed through to the backend Droplets. | [optional] 

<a name="EntryProtocolEnum"></a>
## Enum: EntryProtocolEnum

* `http` (value: `"http"`)
* `https` (value: `"https"`)
* `http2` (value: `"http2"`)
* `tcp` (value: `"tcp"`)


<a name="TargetProtocolEnum"></a>
## Enum: TargetProtocolEnum

* `http` (value: `"http"`)
* `https` (value: `"https"`)
* `http2` (value: `"http2"`)
* `tcp` (value: `"tcp"`)

