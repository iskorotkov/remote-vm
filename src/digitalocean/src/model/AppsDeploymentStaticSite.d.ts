/**
 * The AppsDeploymentStaticSite model module.
 * @module model/AppsDeploymentStaticSite
 * @version 2.0
 */
export class AppsDeploymentStaticSite {
    /**
     * Constructs a <code>AppsDeploymentStaticSite</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentStaticSite} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentStaticSite} The populated <code>AppsDeploymentStaticSite</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} name
     */
    name: any;
    /**
     * @member {String} sourceCommitHash
     */
    sourceCommitHash: any;
}
