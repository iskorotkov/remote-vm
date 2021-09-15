/**
 * The ClusterlintResultsObject model module.
 * @module model/ClusterlintResultsObject
 * @version 2.0
 */
export class ClusterlintResultsObject {
    /**
     * Constructs a <code>ClusterlintResultsObject</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterlintResultsObject} obj Optional instance to populate.
     * @return {module:model/ClusterlintResultsObject} The populated <code>ClusterlintResultsObject</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Name of the object
     * @member {String} name
     */
    name: any;
    /**
     * The kind of Kubernetes API object
     * @member {String} kind
     */
    kind: any;
    /**
     * The namespace the object resides in the cluster.
     * @member {String} namespace
     */
    namespace: any;
}
