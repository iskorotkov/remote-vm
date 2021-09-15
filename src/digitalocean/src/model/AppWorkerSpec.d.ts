/**
 * The AppWorkerSpec model module.
 * @module model/AppWorkerSpec
 * @version 2.0
 */
export class AppWorkerSpec extends AppComponentBase {
    /**
     * Constructs a new <code>AppWorkerSpec</code>.
     * @alias module:model/AppWorkerSpec
     * @class
     * @extends module:model/AppComponentBase
     * @param name {} The name. Must be unique across all components within the same app.
     */
    constructor(name: any);
    /**
     * The amount of instances that this component should be scaled to. Default: 1
     * @member {Number} instanceCount
     * @default 1
     */
    instanceCount: number;
    /**
     * The instance size to use for this component. Default: `basic-xxs`
     * @member {module:model/AppWorkerSpec.InstanceSizeSlugEnum} instanceSizeSlug
     * @default 'basic-xxs'
     */
    instanceSizeSlug: string;
}
export namespace AppWorkerSpec {
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
import { AppComponentBase } from "./AppComponentBase";
