/**
 * The DatabaseMaintenanceWindow model module.
 * @module model/DatabaseMaintenanceWindow
 * @version 2.0
 */
export class DatabaseMaintenanceWindow {
    /**
     * Constructs a <code>DatabaseMaintenanceWindow</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseMaintenanceWindow} obj Optional instance to populate.
     * @return {module:model/DatabaseMaintenanceWindow} The populated <code>DatabaseMaintenanceWindow</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseMaintenanceWindow</code>.
     * @alias module:model/DatabaseMaintenanceWindow
     * @class
     * @param day {String} The day of the week on which to apply maintenance updates.
     * @param hour {String} The hour in UTC at which maintenance updates will be applied in 24 hour format.
     */
    constructor(day: string, hour: string);
    day: string;
    hour: string;
    /**
     * A boolean value indicating whether any maintenance is scheduled to be performed in the next window.
     * @member {Boolean} pending
     */
    pending: any;
    /**
     * A list of strings, each containing information about a pending maintenance update.
     * @member {Array.<String>} description
     */
    description: any;
}
