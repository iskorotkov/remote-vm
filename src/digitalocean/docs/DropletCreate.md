# DigitalOceanApi.DropletCreate

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**region** | **String** | The slug identifier for the region that you wish to deploy the Droplet in. | 
**size** | **String** | The slug identifier for the size that you wish to select for this Droplet. | 
**image** | **OneOfdropletCreateImage** | The image ID of a public or private image or the slug identifier for a public image. This image will be the base image for your Droplet. | 
**sshKeys** | **[AnyOfdropletCreateSshKeysItems]** | An array containing the IDs or fingerprints of the SSH keys that you wish to embed in the Droplet&#x27;s root account upon creation. | [optional] 
**backups** | **Boolean** | A boolean indicating whether automated backups should be enabled for the Droplet. | [optional] [default to false]
**ipv6** | **Boolean** | A boolean indicating whether to enable IPv6 on the Droplet. | [optional] [default to false]
**monitoring** | **Boolean** | A boolean indicating whether to install the DigitalOcean agent for monitoring. | [optional] [default to false]
**tags** | **[String]** | A flat array of tag names as strings to apply to the Droplet after it is created. Tag names can either be existing or new tags. | [optional] 
**userData** | **String** | A string containing &#x27;user data&#x27; which may be used to configure the Droplet on first boot, often a &#x27;cloud-config&#x27; file or Bash script. It must be plain text and may not exceed 64 KiB in size. | [optional] 
**privateNetworking** | **Boolean** | This parameter has been deprecated. Use &#x60;vpc_uuid&#x60; instead to specify a VPC network for the Droplet. If no &#x60;vpc_uuid&#x60; is provided, the Droplet will be placed in your account&#x27;s default VPC for the region. | [optional] [default to false]
**vpcUuid** | **String** | A string specifying the UUID of the VPC to which the Droplet will be assigned. If excluded, the Droplet will be assigned to your account&#x27;s default VPC for the region. | [optional] 
**withDropletAgent** | **Boolean** | A boolean indicating whether to install the DigitalOcean agent used for providing access to the Droplet web console in the control panel. By default, the agent is installed on new Droplets but installation errors (i.e. OS not supported) are ignored. To prevent it from being installed, set to &#x60;false&#x60;. To make installation errors fatal, explicitly set it to &#x60;true&#x60;. | [optional] 
