/**
 * The Pagination model module.
 * @module model/Pagination
 * @version 2.0
 */
export class Pagination {
    /**
     * Constructs a <code>Pagination</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Pagination} obj Optional instance to populate.
     * @return {module:model/Pagination} The populated <code>Pagination</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/PageLinks} links
     */
    links: any;
}
