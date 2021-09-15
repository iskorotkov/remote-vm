/**
 * The Model1ClickCreate model module.
 * @module model/Model1ClickCreate
 * @version 2.0
 */
export class Model1ClickCreate {
    /**
     * Constructs a <code>Model1ClickCreate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Model1ClickCreate} obj Optional instance to populate.
     * @return {module:model/Model1ClickCreate} The populated <code>Model1ClickCreate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Model1ClickCreate</code>.
     * @alias module:model/Model1ClickCreate
     * @class
     * @param addonSlugs {Array.<String>} An array of 1-Click Application slugs to be installed to the Kubernetes cluster.
     * @param clusterUuid {String} A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed.
     */
    constructor(addonSlugs: Array<string>, clusterUuid: string);
    addonSlugs: string[];
    clusterUuid: string;
}
