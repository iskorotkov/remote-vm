/**
 * The SlackDetails model module.
 * @module model/SlackDetails
 * @version 2.0
 */
export class SlackDetails {
    /**
     * Constructs a <code>SlackDetails</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SlackDetails} obj Optional instance to populate.
     * @return {module:model/SlackDetails} The populated <code>SlackDetails</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>SlackDetails</code>.
     * @alias module:model/SlackDetails
     * @class
     * @param channel {String} Slack channel to notify of an alert trigger.
     * @param url {String} Slack Webhook URL.
     */
    constructor(channel: string, url: string);
    channel: string;
    url: string;
}
