/**
 * The DropletNextBackupWindow model module.
 * @module model/DropletNextBackupWindow
 * @version 2.0
 */
export class DropletNextBackupWindow {
    /**
     * Constructs a <code>DropletNextBackupWindow</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DropletNextBackupWindow} obj Optional instance to populate.
     * @return {module:model/DropletNextBackupWindow} The populated <code>DropletNextBackupWindow</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A time value given in ISO8601 combined date and time format specifying the start of the Droplet's backup window.
     * @member {Date} start
     */
    start: any;
    /**
     * A time value given in ISO8601 combined date and time format specifying the end of the Droplet's backup window.
     * @member {Date} end
     */
    end: any;
}
