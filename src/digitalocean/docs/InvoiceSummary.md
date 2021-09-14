# DigitalOceanApi.InvoiceSummary

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**invoiceUuid** | **String** | UUID of the invoice | [optional] 
**billingPeriod** | **String** | Billing period of usage for which the invoice is issued, in &#x60;YYYY-MM&#x60;  format. | [optional] 
**amount** | **String** | Total amount of the invoice, in USD.  This will reflect month-to-date usage in the invoice preview. | [optional] 
**userName** | **String** | Name of the DigitalOcean customer being invoiced. | [optional] 
**userBillingAddress** | **AllOfinvoiceSummaryUserBillingAddress** |  | [optional] 
**userCompany** | **String** | Company of the DigitalOcean customer being invoiced, if set. | [optional] 
**userEmail** | **String** | Email of the DigitalOcean customer being invoiced. | [optional] 
**productCharges** | **AllOfinvoiceSummaryProductCharges** |  | [optional] 
**overages** | **AllOfinvoiceSummaryOverages** |  | [optional] 
**taxes** | **AllOfinvoiceSummaryTaxes** |  | [optional] 
**creditsAndAdjustments** | **AllOfinvoiceSummaryCreditsAndAdjustments** |  | [optional] 
