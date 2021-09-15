/**
 * The Alerts model module.
 * @module model/Alerts
 * @version 2.0
 */
export class Alerts {
    /**
     * Constructs a <code>Alerts</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Alerts} obj Optional instance to populate.
     * @return {module:model/Alerts} The populated <code>Alerts</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Alerts</code>.
     * @alias module:model/Alerts
     * @class
     * @param email {Array.<String>} An email to notify on an alert trigger.
     * @param slack {Array.<module:model/SlackDetails>} Slack integration details.
     */
    constructor(email: Array<string>, slack: Array<NodeModule>);
    email: string[];
    slack: NodeModule[];
}
