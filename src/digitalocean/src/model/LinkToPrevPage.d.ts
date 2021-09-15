/**
 * The LinkToPrevPage model module.
 * @module model/LinkToPrevPage
 * @version 2.0
 */
export class LinkToPrevPage {
    /**
     * Constructs a <code>LinkToPrevPage</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LinkToPrevPage} obj Optional instance to populate.
     * @return {module:model/LinkToPrevPage} The populated <code>LinkToPrevPage</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * URI of the previous page of the results.
     * @member {String} prev
     */
    prev: any;
}
