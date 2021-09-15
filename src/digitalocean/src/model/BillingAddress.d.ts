/**
 * The BillingAddress model module.
 * @module model/BillingAddress
 * @version 2.0
 */
export class BillingAddress {
    /**
     * Constructs a <code>BillingAddress</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BillingAddress} obj Optional instance to populate.
     * @return {module:model/BillingAddress} The populated <code>BillingAddress</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Street address line 1
     * @member {String} addressLine1
     */
    addressLine1: any;
    /**
     * Street address line 2
     * @member {String} addressLine2
     */
    addressLine2: any;
    /**
     * City
     * @member {String} city
     */
    city: any;
    /**
     * Region
     * @member {String} region
     */
    region: any;
    /**
     * Postal code
     * @member {String} postalCode
     */
    postalCode: any;
    /**
     * Country (ISO2) code
     * @member {String} countryIso2Code
     */
    countryIso2Code: any;
    /**
     * Timestamp billing address was created
     * @member {String} createdAt
     */
    createdAt: any;
    /**
     * Timestamp billing address was updated
     * @member {String} updatedAt
     */
    updatedAt: any;
}
