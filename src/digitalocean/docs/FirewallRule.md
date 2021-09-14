# DigitalOceanApi.FirewallRule

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uuid** | **String** | A unique ID for the firewall rule itself. | [optional] 
**clusterUuid** | **String** | A unique ID for the database cluster to which the rule is applied. | [optional] 
**type** | **String** | The type of resource that the firewall rule allows to access the database cluster. | 
**value** | **String** | The ID of the specific resource, the name of a tag applied to a group of resources, or the IP address that the firewall rule allows to access the database cluster. | 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the firewall rule was created. | [optional] 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `droplet` (value: `"droplet"`)
* `k8s` (value: `"k8s"`)
* `ipAddr` (value: `"ip_addr"`)
* `tag` (value: `"tag"`)
* `app` (value: `"app"`)

