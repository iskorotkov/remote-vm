# DigitalOceanApi.BillingApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCustomerBalance**](BillingApi.md#getCustomerBalance) | **GET** /v2/customers/my/balance | Get Customer Balance
[**getInvoiceByUuid**](BillingApi.md#getInvoiceByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid} | Retrieve an Invoice by UUID
[**getInvoiceCsvByUuid**](BillingApi.md#getInvoiceCsvByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid}/csv | Retrieve an Invoice CSV by UUID
[**getInvoicePdfByUuid**](BillingApi.md#getInvoicePdfByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid}/pdf | Retrieve an Invoice PDF by UUID
[**getInvoiceSummaryByUuid**](BillingApi.md#getInvoiceSummaryByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid}/summary | Retrieve an Invoice Summary by UUID
[**listBillingHistory**](BillingApi.md#listBillingHistory) | **GET** /v2/customers/my/billing_history | List Billing History
[**listInvoices**](BillingApi.md#listInvoices) | **GET** /v2/customers/my/invoices | List All Invoices

<a name="getCustomerBalance"></a>
# **getCustomerBalance**
> Balance getCustomerBalance()

Get Customer Balance

To retrieve the balances on a customer&#x27;s account, send a GET request to &#x60;/v2/customers/my/balance&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
apiInstance.getCustomerBalance((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Balance**](Balance.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getInvoiceByUuid"></a>
# **getInvoiceByUuid**
> InlineResponse20010 getInvoiceByUuid(invoiceUuid)

Retrieve an Invoice by UUID

To retrieve the invoice items for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
let invoiceUuid = "invoiceUuid_example"; // String | UUID of the invoice

apiInstance.getInvoiceByUuid(invoiceUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invoiceUuid** | **String**| UUID of the invoice | 

### Return type

[**InlineResponse20010**](InlineResponse20010.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getInvoiceCsvByUuid"></a>
# **getInvoiceCsvByUuid**
> &#x27;String&#x27; getInvoiceCsvByUuid(invoiceUuid)

Retrieve an Invoice CSV by UUID

To retrieve a CSV for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID/csv&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
let invoiceUuid = "invoiceUuid_example"; // String | UUID of the invoice

apiInstance.getInvoiceCsvByUuid(invoiceUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invoiceUuid** | **String**| UUID of the invoice | 

### Return type

**&#x27;String&#x27;**

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/csv, application/json

<a name="getInvoicePdfByUuid"></a>
# **getInvoicePdfByUuid**
> &#x27;Blob&#x27; getInvoicePdfByUuid(invoiceUuid)

Retrieve an Invoice PDF by UUID

To retrieve a PDF for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID/pdf&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
let invoiceUuid = "invoiceUuid_example"; // String | UUID of the invoice

apiInstance.getInvoicePdfByUuid(invoiceUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invoiceUuid** | **String**| UUID of the invoice | 

### Return type

**&#x27;Blob&#x27;**

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/pdf, application/json

<a name="getInvoiceSummaryByUuid"></a>
# **getInvoiceSummaryByUuid**
> InvoiceSummary getInvoiceSummaryByUuid(invoiceUuid)

Retrieve an Invoice Summary by UUID

To retrieve a summary for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID/summary&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
let invoiceUuid = "invoiceUuid_example"; // String | UUID of the invoice

apiInstance.getInvoiceSummaryByUuid(invoiceUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invoiceUuid** | **String**| UUID of the invoice | 

### Return type

[**InvoiceSummary**](InvoiceSummary.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listBillingHistory"></a>
# **listBillingHistory**
> InlineResponse2008 listBillingHistory()

List Billing History

To retrieve a list of all billing history entries, send a GET request to &#x60;/v2/customers/my/billing_history&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
apiInstance.listBillingHistory((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listInvoices"></a>
# **listInvoices**
> InlineResponse2009 listInvoices()

List All Invoices

To retrieve a list of all invoices, send a GET request to &#x60;/v2/customers/my/invoices&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.BillingApi();
apiInstance.listInvoices((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse2009**](InlineResponse2009.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

