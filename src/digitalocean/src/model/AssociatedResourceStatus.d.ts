/**
 * The AssociatedResourceStatus model module.
 * @module model/AssociatedResourceStatus
 * @version 2.0
 */
export class AssociatedResourceStatus {
    /**
     * Constructs a <code>AssociatedResourceStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssociatedResourceStatus} obj Optional instance to populate.
     * @return {module:model/AssociatedResourceStatus} The populated <code>AssociatedResourceStatus</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/DestroyedAssociatedResource} droplet
     */
    droplet: any;
    /**
     * @member {module:model/AssociatedResourceStatusResources} resources
     */
    resources: any;
    /**
     * A time value given in ISO8601 combined date and time format indicating when the requested action was completed.
     * @member {Date} completedAt
     */
    completedAt: any;
    /**
     * A count of the associated resources that failed to be destroyed, if any.
     * @member {Number} failures
     */
    failures: any;
}
