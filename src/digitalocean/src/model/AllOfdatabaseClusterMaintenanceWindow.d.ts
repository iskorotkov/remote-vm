/**
 * The AllOfdatabaseClusterMaintenanceWindow model module.
 * @module model/AllOfdatabaseClusterMaintenanceWindow
 * @version 2.0
 */
export class AllOfdatabaseClusterMaintenanceWindow extends DatabaseMaintenanceWindow {
    /**
     * Constructs a new <code>AllOfdatabaseClusterMaintenanceWindow</code>.
     * @alias module:model/AllOfdatabaseClusterMaintenanceWindow
     * @class
     * @extends module:model/DatabaseMaintenanceWindow
     * @param day {} The day of the week on which to apply maintenance updates.
     * @param hour {} The hour in UTC at which maintenance updates will be applied in 24 hour format.
     */
    constructor(day: any, hour: any);
}
import { DatabaseMaintenanceWindow } from "./DatabaseMaintenanceWindow";
