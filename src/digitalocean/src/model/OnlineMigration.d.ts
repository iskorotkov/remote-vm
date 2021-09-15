/**
 * The OnlineMigration model module.
 * @module model/OnlineMigration
 * @version 2.0
 */
export class OnlineMigration {
    /**
     * Constructs a <code>OnlineMigration</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OnlineMigration} obj Optional instance to populate.
     * @return {module:model/OnlineMigration} The populated <code>OnlineMigration</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The ID of the currently running migration.
     * @member {String} id
     */
    id: any;
    /**
     * The current status of the migration.
     * @member {String} status
     */
    status: any;
    /**
     * The time the migration was initiated, in ISO 8601 format.
     * @member {String} createdAt
     */
    createdAt: any;
}
