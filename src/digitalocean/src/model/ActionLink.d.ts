/**
 * The ActionLink model module.
 * @module model/ActionLink
 * @version 2.0
 */
export class ActionLink {
    /**
     * Constructs a <code>ActionLink</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ActionLink} obj Optional instance to populate.
     * @return {module:model/ActionLink} The populated <code>ActionLink</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique numeric ID that can be used to identify and reference an action.
     * @member {Number} id
     */
    id: any;
    /**
     * A string specifying the type of the related action.
     * @member {String} rel
     */
    rel: any;
    /**
     * A URL that can be used to access the action.
     * @member {String} href
     */
    href: any;
}
