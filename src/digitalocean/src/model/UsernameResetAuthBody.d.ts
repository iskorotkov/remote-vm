/**
 * The UsernameResetAuthBody model module.
 * @module model/UsernameResetAuthBody
 * @version 2.0
 */
export class UsernameResetAuthBody {
    /**
     * Constructs a <code>UsernameResetAuthBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UsernameResetAuthBody} obj Optional instance to populate.
     * @return {module:model/UsernameResetAuthBody} The populated <code>UsernameResetAuthBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/MysqlSettings} mysqlSettings
     */
    mysqlSettings: any;
}
