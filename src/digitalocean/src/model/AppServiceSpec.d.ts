/**
 * The AppServiceSpec model module.
 * @module model/AppServiceSpec
 * @version 2.0
 */
export class AppServiceSpec extends AppComponentBase {
    /**
     * Constructs a new <code>AppServiceSpec</code>.
     * @alias module:model/AppServiceSpec
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
     * @member {module:model/AppServiceSpec.InstanceSizeSlugEnum} instanceSizeSlug
     * @default 'basic-xxs'
     */
    instanceSizeSlug: string;
    /**
     * @member {module:model/AppsCorsPolicy} cors
     */
    cors: any;
    /**
     * @member {module:model/AppServiceSpecHealthCheck} healthCheck
     */
    healthCheck: any;
    /**
     * The internal port on which this service's run command will listen. Default: 8080 If there is not an environment variable with the name `PORT`, one will be automatically added with its value set to the value of this field.
     * @member {Number} httpPort
     */
    httpPort: any;
    /**
     * The ports on which this service will listen for internal traffic.
     * @member {Array.<Number>} internalPorts
     */
    internalPorts: any;
    /**
     * A list of HTTP routes that should be routed to this component.
     * @member {Array.<module:model/AppRouteSpec>} routes
     */
    routes: any;
}
export namespace AppServiceSpec {
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
