/**
 * The FirewallPendingChanges model module.
 * @module model/FirewallPendingChanges
 * @version 2.0
 */
export class FirewallPendingChanges {
    /**
     * Constructs a <code>FirewallPendingChanges</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallPendingChanges} obj Optional instance to populate.
     * @return {module:model/FirewallPendingChanges} The populated <code>FirewallPendingChanges</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} dropletId
     */
    dropletId: any;
    /**
     * @member {Boolean} removing
     */
    removing: any;
    /**
     * @member {String} status
     */
    status: any;
}
