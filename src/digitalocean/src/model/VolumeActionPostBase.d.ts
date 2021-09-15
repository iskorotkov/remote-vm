/**
 * The VolumeActionPostBase model module.
 * @module model/VolumeActionPostBase
 * @version 2.0
 */
export class VolumeActionPostBase {
    /**
     * Constructs a <code>VolumeActionPostBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VolumeActionPostBase} obj Optional instance to populate.
     * @return {module:model/VolumeActionPostBase} The populated <code>VolumeActionPostBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>VolumeActionPostBase</code>.
     * @alias module:model/VolumeActionPostBase
     * @class
     * @param type {module:model/VolumeActionPostBase.TypeEnum} The volume action to initiate.
     */
    constructor(type: any);
    type: any;
    /**
     * @member {module:model/RegionSlug} region
     */
    region: any;
}
export namespace VolumeActionPostBase {
    namespace TypeEnum {
        const attach: string;
        const detach: string;
        const resize: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
