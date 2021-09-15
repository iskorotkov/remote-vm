/**
 * The AssociatedResource model module.
 * @module model/AssociatedResource
 * @version 2.0
 */
export class AssociatedResource {
    /**
     * Constructs a <code>AssociatedResource</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssociatedResource} obj Optional instance to populate.
     * @return {module:model/AssociatedResource} The populated <code>AssociatedResource</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The unique identifier for the resource associated with the Droplet.
     * @member {String} id
     */
    id: any;
    /**
     * The name of the resource associated with the Droplet.
     * @member {String} name
     */
    name: any;
    /**
     * The cost of the resource in USD per month if the resource is retained after the Droplet is destroyed.
     * @member {String} cost
     */
    cost: any;
}
