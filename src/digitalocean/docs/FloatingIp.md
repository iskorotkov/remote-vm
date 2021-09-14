# DigitalOceanApi.FloatingIp

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ip** | **String** | The public IP address of the floating IP. It also serves as its identifier. | [optional] 
**region** | **AllOffloatingIpRegion** |  | [optional] 
**droplet** | **AnyOffloatingIpDroplet** | The Droplet that the floating IP has been assigned to. When you query a floating IP, if it is assigned to a Droplet, the entire Droplet object will be returned. If it is not assigned, the value will be null. | [optional] 
**locked** | **Boolean** | A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted. | [optional] 
