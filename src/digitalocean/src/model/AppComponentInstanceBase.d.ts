/**
 * The AppComponentInstanceBase model module.
 * @module model/AppComponentInstanceBase
 * @version 2.0
 */
export class AppComponentInstanceBase {
    /**
     * Constructs a <code>AppComponentInstanceBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppComponentInstanceBase} obj Optional instance to populate.
     * @return {module:model/AppComponentInstanceBase} The populated <code>AppComponentInstanceBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The amount of instances that this component should be scaled to. Default: 1
     * @member {Number} instanceCount
     * @default 1
     */
    instanceCount: number;
    /**
     * The instance size to use for this component. Default: `basic-xxs`
     * @member {module:model/AppComponentInstanceBase.InstanceSizeSlugEnum} instanceSizeSlug
     * @default 'basic-xxs'
     */
    instanceSizeSlug: string;
}
export namespace AppComponentInstanceBase {
    namespace InstanceSizeSlugEnum {
        const basicXxs: string;
        const basicXs: string;
        const basicS: string;
        const basicM: string;
        const professionalXs: string;
        const professionalS: string;
        const professionalM: string;
        const professional1l: string;
        const professionalL: string;
        const professionalXl: string;
    }
    /**
     * *
     */
    type InstanceSizeSlugEnum = string;
}
