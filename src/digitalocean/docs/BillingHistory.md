# DigitalOceanApi.BillingHistory

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **String** | Description of the billing history entry. | [optional] 
**amount** | **String** | Amount of the billing history entry. | [optional] 
**invoiceId** | **String** | ID of the invoice associated with the billing history entry, if  applicable. | [optional] 
**invoiceUuid** | **String** | UUID of the invoice associated with the billing history entry, if  applicable. | [optional] 
**_date** | **Date** | Time the billing history entry occured. | [optional] 
**type** | **String** | Type of billing history entry. | [optional] 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `aCHFailure` (value: `"ACHFailure"`)
* `adjustment` (value: `"Adjustment"`)
* `attemptFailed` (value: `"AttemptFailed"`)
* `chargeback` (value: `"Chargeback"`)
* `credit` (value: `"Credit"`)
* `creditExpiration` (value: `"CreditExpiration"`)
* `invoice` (value: `"Invoice"`)
* `payment` (value: `"Payment"`)
* `refund` (value: `"Refund"`)
* `reversal` (value: `"Reversal"`)

