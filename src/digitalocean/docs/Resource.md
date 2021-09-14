# DigitalOceanApi.Resource

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**urn** | [**Urn**](Urn.md) |  | [optional] 
**assignedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the project was created. | [optional] 
**links** | [**ResourceLinks**](ResourceLinks.md) |  | [optional] 
**status** | **String** | The status of assigning and fetching the resources. | [optional] 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `ok` (value: `"ok"`)
* `notFound` (value: `"not_found"`)
* `assigned` (value: `"assigned"`)
* `alreadyAssigned` (value: `"already_assigned"`)
* `serviceDown` (value: `"service_down"`)

