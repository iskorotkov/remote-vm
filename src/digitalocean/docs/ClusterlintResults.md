# DigitalOceanApi.ClusterlintResults

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**runId** | **String** | Id of the clusterlint run that can be used later to fetch the diagnostics. | [optional] 
**requestedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the schedule clusterlint run request was made. | [optional] 
**completedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the schedule clusterlint run request was completed. | [optional] 
**diagnostics** | [**[ClusterlintResultsDiagnostics]**](ClusterlintResultsDiagnostics.md) | An array of diagnostics reporting potential problems for the given cluster. | [optional] 
