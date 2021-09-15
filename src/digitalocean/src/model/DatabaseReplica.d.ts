/**
 * The DatabaseReplica model module.
 * @module model/DatabaseReplica
 * @version 2.0
 */
export class DatabaseReplica {
    /**
     * Constructs a <code>DatabaseReplica</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseReplica} obj Optional instance to populate.
     * @return {module:model/DatabaseReplica} The populated <code>DatabaseReplica</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseReplica</code>.
     * @alias module:model/DatabaseReplica
     * @class
     * @param name {String} The name to give the read-only replicating
     */
    constructor(name: string);
    name: string;
    /**
     * A slug identifier for the region where the read-only replica will be located. If excluded, the replica will be placed in the same region as the cluster.
     * @member {String} region
     */
    region: any;
    /**
     * A slug identifier representing the size of the node for the read-only replica. The size of the replica must be at least as large as the node size for the database cluster from which it is replicating.
     * @member {String} size
     */
    size: any;
    /**
     * A string representing the current status of the database cluster.
     * @member {module:model/DatabaseReplica.StatusEnum} status
     */
    status: any;
    /**
     * A flat array of tag names as strings to apply to the read-only replica after it is created. Tag names can either be existing or new tags.
     * @member {Array.<String>} tags
     */
    tags: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the database cluster was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * A string specifying the UUID of the VPC to which the read-only replica will be assigned. If excluded, the replica will be assigned to your account's default VPC for the region.
     * @member {String} privateNetworkUuid
     */
    privateNetworkUuid: any;
    /**
     * @member {Object} connection
     */
    connection: any;
    /**
     * @member {Object} privateConnection
     */
    privateConnection: any;
}
export namespace DatabaseReplica {
    namespace StatusEnum {
        const creating: string;
        const online: string;
        const resizing: string;
        const migrating: string;
        const forking: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
