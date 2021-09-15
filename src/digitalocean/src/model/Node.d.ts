/**
 * The Node model module.
 * @module model/Node
 * @version 2.0
 */
export class Node {
    /**
     * Constructs a <code>Node</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Node} obj Optional instance to populate.
     * @return {module:model/Node} The populated <code>Node</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique ID that can be used to identify and reference the node.
     * @member {String} id
     */
    id: any;
    /**
     * An automatically generated, human-readable name for the node.
     * @member {String} name
     */
    name: any;
    /**
     * @member {module:model/NodeStatus} status
     */
    status: any;
    /**
     * The ID of the Droplet used for the worker node.
     * @member {String} dropletId
     */
    dropletId: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the node was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the node was last updated.
     * @member {Date} updatedAt
     */
    updatedAt: any;
}
