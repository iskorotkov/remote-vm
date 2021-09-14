# DigitalOceanApi.InvoiceItem

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**product** | **String** | Name of the product being billed in the invoice item. | [optional] 
**resourceUuid** | **String** | UUID of the resource billing in the invoice item if available. | [optional] 
**resourceId** | **String** | ID of the resource billing in the invoice item if available. | [optional] 
**groupDescription** | **String** | Description of the invoice item when it is a grouped set of usage, such  as DOKS or databases. | [optional] 
**description** | **String** | Description of the invoice item. | [optional] 
**amount** | **String** | Billed amount of this invoice item. Billed in USD. | [optional] 
**duration** | **String** | Duration of time this invoice item was used and subsequently billed. | [optional] 
**durationUnit** | **String** | Unit of time for duration. | [optional] 
**startTime** | **String** | Time the invoice item began to be billed for usage. | [optional] 
**endTime** | **String** | Time the invoice item stoped being billed for usage. | [optional] 
**projectName** | **String** | Name of the DigitalOcean Project this resource belongs to. | [optional] 
