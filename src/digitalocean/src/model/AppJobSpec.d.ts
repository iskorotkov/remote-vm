/**
 * The AppJobSpec model module.
 * @module model/AppJobSpec
 * @version 2.0
 */
export class AppJobSpec extends AppComponentBase {
    /**
     * Constructs a new <code>AppJobSpec</code>.
     * @alias module:model/AppJobSpec
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
     * @member {module:model/AppJobSpec.InstanceSizeSlugEnum} instanceSizeSlug
     * @default 'basic-xxs'
     */
    instanceSizeSlug: string;
    /**
     * - UNSPECIFIED: Default job type, will auto-complete to POST_DEPLOY kind. - PRE_DEPLOY: Indicates a job that runs before an app deployment. - POST_DEPLOY: Indicates a job that runs after an app deployment. - FAILED_DEPLOY: Indicates a job that runs after a component fails to deploy.
     * @member {module:model/AppJobSpec.KindEnum} kind
     * @default 'UNSPECIFIED'
     */
    kind: string;
}
export namespace AppJobSpec {
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
    namespace KindEnum {
        const UNSPECIFIED: string;
        const PRE_DEPLOY: string;
        const POST_DEPLOY: string;
        const FAILED_DEPLOY: string;
    }
    /**
     * *
     */
    type KindEnum = string;
}
import { AppComponentBase } from "./AppComponentBase";
