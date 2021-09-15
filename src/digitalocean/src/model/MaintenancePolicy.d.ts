/**
 * The MaintenancePolicy model module.
 * @module model/MaintenancePolicy
 * @version 2.0
 */
export class MaintenancePolicy {
    /**
     * Constructs a <code>MaintenancePolicy</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MaintenancePolicy} obj Optional instance to populate.
     * @return {module:model/MaintenancePolicy} The populated <code>MaintenancePolicy</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The start time in UTC of the maintenance window policy in 24-hour clock format / HH:MM notation (e.g., `15:00`).
     * @member {String} startTime
     */
    startTime: any;
    /**
     * The duration of the maintenance window policy in human-readable format.
     * @member {String} duration
     */
    duration: any;
    /**
     * The day of the maintenance window policy. May be one of `monday` through `sunday`, or `any` to indicate an arbitrary week day.
     * @member {module:model/MaintenancePolicy.DayEnum} day
     */
    day: any;
}
export namespace MaintenancePolicy {
    namespace DayEnum {
        const any: string;
        const monday: string;
        const tuesday: string;
        const wednesday: string;
        const thursday: string;
        const friday: string;
        const saturday: string;
        const sunday: string;
    }
    /**
     * *
     */
    type DayEnum = string;
}
