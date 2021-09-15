/**
 * The FirewallRule model module.
 * @module model/FirewallRule
 * @version 2.0
 */
export class FirewallRule {
    /**
     * Constructs a <code>FirewallRule</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallRule} obj Optional instance to populate.
     * @return {module:model/FirewallRule} The populated <code>FirewallRule</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FirewallRule</code>.
     * @alias module:model/FirewallRule
     * @class
     * @param type {module:model/FirewallRule.TypeEnum} The type of resource that the firewall rule allows to access the database cluster.
     * @param value {String} The ID of the specific resource, the name of a tag applied to a group of resources, or the IP address that the firewall rule allows to access the database cluster.
     */
    constructor(type: any, value: string);
    type: any;
    value: string;
    /**
     * A unique ID for the firewall rule itself.
     * @member {String} uuid
     */
    uuid: any;
    /**
     * A unique ID for the database cluster to which the rule is applied.
     * @member {String} clusterUuid
     */
    clusterUuid: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the firewall rule was created.
     * @member {Date} createdAt
     */
    createdAt: any;
}
export namespace FirewallRule {
    namespace TypeEnum {
        const droplet: string;
        const k8s: string;
        const ipAddr: string;
        const tag: string;
        const app: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
