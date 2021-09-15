/**
 * The DomainRecordMx model module.
 * @module model/DomainRecordMx
 * @version 2.0
 */
export class DomainRecordMx extends DomainRecord {
    /**
     * Constructs a new <code>DomainRecordMx</code>.
     * @alias module:model/DomainRecordMx
     * @class
     * @extends module:model/DomainRecord
     * @param type {} The type of the DNS record. For example: A, CNAME, TXT, ...
     * @param data {} Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.
     * @param priority {} The priority for SRV and MX records.
     */
    constructor(type: any, data: any, priority: any);
}
import { DomainRecord } from "./DomainRecord";
