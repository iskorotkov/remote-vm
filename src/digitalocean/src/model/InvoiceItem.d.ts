/**
 * The InvoiceItem model module.
 * @module model/InvoiceItem
 * @version 2.0
 */
export class InvoiceItem {
    /**
     * Constructs a <code>InvoiceItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvoiceItem} obj Optional instance to populate.
     * @return {module:model/InvoiceItem} The populated <code>InvoiceItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Name of the product being billed in the invoice item.
     * @member {String} product
     */
    product: any;
    /**
     * UUID of the resource billing in the invoice item if available.
     * @member {String} resourceUuid
     */
    resourceUuid: any;
    /**
     * ID of the resource billing in the invoice item if available.
     * @member {String} resourceId
     */
    resourceId: any;
    /**
     * Description of the invoice item when it is a grouped set of usage, such  as DOKS or databases.
     * @member {String} groupDescription
     */
    groupDescription: any;
    /**
     * Description of the invoice item.
     * @member {String} description
     */
    description: any;
    /**
     * Billed amount of this invoice item. Billed in USD.
     * @member {String} amount
     */
    amount: any;
    /**
     * Duration of time this invoice item was used and subsequently billed.
     * @member {String} duration
     */
    duration: any;
    /**
     * Unit of time for duration.
     * @member {String} durationUnit
     */
    durationUnit: any;
    /**
     * Time the invoice item began to be billed for usage.
     * @member {String} startTime
     */
    startTime: any;
    /**
     * Time the invoice item stoped being billed for usage.
     * @member {String} endTime
     */
    endTime: any;
    /**
     * Name of the DigitalOcean Project this resource belongs to.
     * @member {String} projectName
     */
    projectName: any;
}
