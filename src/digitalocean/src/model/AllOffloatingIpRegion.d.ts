/**
 * The AllOffloatingIpRegion model module.
 * @module model/AllOffloatingIpRegion
 * @version 2.0
 */
export class AllOffloatingIpRegion extends Region {
    /**
     * Constructs a new <code>AllOffloatingIpRegion</code>.
     * @alias module:model/AllOffloatingIpRegion
     * @class
     * @extends module:model/Region
     * @param name {} The display name of the region.  This will be a full name that is used in the control panel and other interfaces.
     * @param slug {} A human-readable string that is used as a unique identifier for each region.
     * @param features {} This attribute is set to an array which contains features available in this region
     * @param available {} This is a boolean value that represents whether new Droplets can be created in this region.
     * @param sizes {} This attribute is set to an array which contains the identifying slugs for the sizes available in this region.
     */
    constructor(name: any, slug: any, features: any, available: any, sizes: any);
}
import { Region } from "./Region";
