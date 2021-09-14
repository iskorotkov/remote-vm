# DigitalOceanApi.AppProposeResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**appIsStatic** | **Boolean** | Indicates whether the app is a static app. | [optional] 
**appNameAvailable** | **Boolean** | Indicates whether the app name is available. | [optional] 
**appNameSuggestion** | **String** | The suggested name if the proposed app name is unavailable. | [optional] 
**existingStaticApps** | **String** | The maximum number of free static apps the account can have. We will charge you for any additional static apps. | [optional] 
**spec** | [**AppSpec**](AppSpec.md) |  | [optional] 
**appCost** | **Number** | The monthly cost of the proposed app in USD using the next pricing plan tier. For example, if you propose an app that uses the Basic tier, the &#x60;app_tier_upgrade_cost&#x60; field displays the monthly cost of the app if it were to use the Professional tier. If the proposed app already uses the most expensive tier, the field is empty. | [optional] 
**appTierDowngradeCost** | **Number** | The monthly cost of the proposed app in USD using the previous pricing plan tier. For example, if you propose an app that uses the Professional tier, the &#x60;app_tier_downgrade_cost&#x60; field displays the monthly cost of the app if it were to use the Basic tier. If the proposed app already uses the lest expensive tier, the field is empty. | [optional] 
