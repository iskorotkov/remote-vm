/**
 * The LinkToNextPage model module.
 * @module model/LinkToNextPage
 * @version 2.0
 */
export class LinkToNextPage {
    /**
     * Constructs a <code>LinkToNextPage</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LinkToNextPage} obj Optional instance to populate.
     * @return {module:model/LinkToNextPage} The populated <code>LinkToNextPage</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * URI of the next page of the results.
     * @member {String} next
     */
    next: any;
}
