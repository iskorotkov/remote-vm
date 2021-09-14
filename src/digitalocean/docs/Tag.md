# DigitalOceanApi.Tag

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.  **Note:** Tag names are case stable, which means the capitalization you use when you first create a tag is canonical.  When working with tags in the API, you must use the tag&#x27;s canonical capitalization. For example, if you create a tag named \&quot;PROD\&quot;, the URL to add that tag to a resource would be &#x60;https://api.digitalocean.com/v2/tags/PROD/resources&#x60; (not &#x60;/v2/tags/prod/resources&#x60;).  Tagged resources in the control panel will always display the canonical capitalization. For example, if you create a tag named \&quot;PROD\&quot;, you can tag resources in the control panel by entering \&quot;prod\&quot;. The tag will still display with its canonical capitalization, \&quot;PROD\&quot;.  | [optional] 
**resources** | **AllOftagResources** | An embedded object containing key value pairs of resource type and resource statistics. It also includes a count of the total number of resources tagged with the current tag as well as a &#x60;last_tagged_uri&#x60; attribute set to the last resource tagged with the current tag. | [optional] 
