/**
 * The AssociatedResourceStatusResources model module.
 * @module model/AssociatedResourceStatusResources
 * @version 2.0
 */
export class AssociatedResourceStatusResources {
    /**
     * Constructs a <code>AssociatedResourceStatusResources</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssociatedResourceStatusResources} obj Optional instance to populate.
     * @return {module:model/AssociatedResourceStatusResources} The populated <code>AssociatedResourceStatusResources</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/DestroyedAssociatedResource>} snapshots
     */
    snapshots: any;
    /**
     * @member {Array.<module:model/DestroyedAssociatedResource>} volumes
     */
    volumes: any;
    /**
     * @member {Array.<module:model/DestroyedAssociatedResource>} volumeSnapshots
     */
    volumeSnapshots: any;
}
