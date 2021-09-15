/**
 * The Account model module.
 * @module model/Account
 * @version 2.0
 */
export class Account {
    /**
     * Constructs a <code>Account</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Account} obj Optional instance to populate.
     * @return {module:model/Account} The populated <code>Account</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Account</code>.
     * @alias module:model/Account
     * @class
     * @param dropletLimit {Number} The total number of Droplets current user or team may have active at one time.
     * @param floatingIpLimit {Number} The total number of Floating IPs the current user or team may have.
     * @param email {String} The email address used by the current user to register for DigitalOcean.
     * @param uuid {String} The unique universal identifier for the current user.
     * @param emailVerified {Boolean} If true, the user has verified their account via email. False otherwise.
     * @param status {module:model/Account.StatusEnum} This value is one of \"active\", \"warning\" or \"locked\".
     * @param statusMessage {String} A human-readable message giving more details about the status of the account.
     */
    constructor(dropletLimit: number, floatingIpLimit: number, email: string, uuid: string, emailVerified: boolean, status: any, statusMessage: string);
    dropletLimit: number;
    floatingIpLimit: number;
    email: string;
    uuid: string;
    emailVerified: boolean;
    status: any;
    statusMessage: string;
}
export namespace Account {
    namespace StatusEnum {
        const active: string;
        const warning: string;
        const locked: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
