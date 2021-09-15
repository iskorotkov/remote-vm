/**
 * The LinkToLastPage model module.
 * @module model/LinkToLastPage
 * @version 2.0
 */
export class LinkToLastPage {
    /**
     * Constructs a <code>LinkToLastPage</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LinkToLastPage} obj Optional instance to populate.
     * @return {module:model/LinkToLastPage} The populated <code>LinkToLastPage</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * URI of the last page of the results.
     * @member {String} last
     */
    last: any;
}
