/**
 * The Size model module.
 * @module model/Size
 * @version 2.0
 */
export class Size {
    /**
     * Constructs a <code>Size</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Size} obj Optional instance to populate.
     * @return {module:model/Size} The populated <code>Size</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Size</code>.
     * @alias module:model/Size
     * @class
     * @param slug {String} A human-readable string that is used to uniquely identify each size.
     * @param memory {Number} The amount of RAM allocated to Droplets created of this size. The value is represented in megabytes.
     * @param vcpus {Number} The integer of number CPUs allocated to Droplets of this size.
     * @param disk {Number} The amount of disk space set aside for Droplets of this size. The value is represented in gigabytes.
     * @param transfer {Number} The amount of transfer bandwidth that is available for Droplets created in this size. This only counts traffic on the public interface. The value is given in terabytes.
     * @param priceMonthly {Number} This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. The value is measured in US dollars.
     * @param priceHourly {Number} This describes the price of the Droplet size as measured hourly. The value is measured in US dollars.
     * @param regions {Array.<String>} An array containing the region slugs where this size is available for Droplet creates.
     * @param available {Boolean} This is a boolean value that represents whether new Droplets can be created with this size.
     * @param description {String} A string describing the class of Droplets created from this size. For example: Basic, General Purpose, CPU-Optimized, Memory-Optimized, or Storage-Optimized.
     */
    constructor(slug: string, memory: number, vcpus: number, disk: number, transfer: number, priceMonthly: number, priceHourly: number, regions: Array<string>, available: boolean, description: string);
    slug: string;
    memory: number;
    vcpus: number;
    disk: number;
    transfer: number;
    priceMonthly: number;
    priceHourly: number;
    regions: string[];
    available: boolean;
    description: string;
}
