/**
 * The AppsStringMatch model module.
 * @module model/AppsStringMatch
 * @version 2.0
 */
export class AppsStringMatch {
    /**
     * Constructs a <code>AppsStringMatch</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsStringMatch} obj Optional instance to populate.
     * @return {module:model/AppsStringMatch} The populated <code>AppsStringMatch</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Exact string match. Only 1 of `exact`, `prefix`, or `regex` must be set.
     * @member {String} exact
     */
    exact: any;
    /**
     * Prefix-based match. Only 1 of `exact`, `prefix`, or `regex` must be set.
     * @member {String} prefix
     */
    prefix: any;
    /**
     * RE2 style regex-based match. Only 1 of `exact`, `prefix`, or `regex` must be set. For more information about RE2 syntax, see: https://github.com/google/re2/wiki/Syntax
     * @member {String} regex
     */
    regex: any;
}
