/**
 * The DomainRecordA model module.
 * @module model/DomainRecordA
 * @version 2.0
 */
export class DomainRecordA extends DomainRecord {
    /**
     * Constructs a new <code>DomainRecordA</code>.
     * @alias module:model/DomainRecordA
     * @class
     * @extends module:model/DomainRecord
     * @param type {} The type of the DNS record. For example: A, CNAME, TXT, ...
     * @param name {} The host name, alias, or service being defined by the record.
     * @param data {} Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.
     */
    constructor(type: any, name: any, data: any);
}
import { DomainRecord } from "./DomainRecord";
