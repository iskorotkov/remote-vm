/**
 * The DomainRecordSoa model module.
 * @module model/DomainRecordSoa
 * @version 2.0
 */
export class DomainRecordSoa extends DomainRecord {
    /**
     * Constructs a new <code>DomainRecordSoa</code>.
     * @alias module:model/DomainRecordSoa
     * @class
     * @extends module:model/DomainRecord
     * @param type {} The type of the DNS record. For example: A, CNAME, TXT, ...
     * @param ttl {} This value is the time to live for the record, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.
     */
    constructor(type: any, ttl: any);
}
import { DomainRecord } from "./DomainRecord";
