# DigitalOceanApi.Size

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**slug** | **String** | A human-readable string that is used to uniquely identify each size. | 
**memory** | **Number** | The amount of RAM allocated to Droplets created of this size. The value is represented in megabytes. | 
**vcpus** | **Number** | The integer of number CPUs allocated to Droplets of this size. | 
**disk** | **Number** | The amount of disk space set aside for Droplets of this size. The value is represented in gigabytes. | 
**transfer** | **Number** | The amount of transfer bandwidth that is available for Droplets created in this size. This only counts traffic on the public interface. The value is given in terabytes. | 
**priceMonthly** | **Number** | This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. The value is measured in US dollars. | 
**priceHourly** | **Number** | This describes the price of the Droplet size as measured hourly. The value is measured in US dollars. | 
**regions** | **[String]** | An array containing the region slugs where this size is available for Droplet creates. | 
**available** | **Boolean** | This is a boolean value that represents whether new Droplets can be created with this size. | [default to true]
**description** | **String** | A string describing the class of Droplets created from this size. For example: Basic, General Purpose, CPU-Optimized, Memory-Optimized, or Storage-Optimized. | 
