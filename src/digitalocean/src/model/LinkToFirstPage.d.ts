/**
 * The LinkToFirstPage model module.
 * @module model/LinkToFirstPage
 * @version 2.0
 */
export class LinkToFirstPage {
    /**
     * Constructs a <code>LinkToFirstPage</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LinkToFirstPage} obj Optional instance to populate.
     * @return {module:model/LinkToFirstPage} The populated <code>LinkToFirstPage</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * URI of the first page of the results.
     * @member {String} first
     */
    first: any;
}
