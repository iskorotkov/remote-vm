/**
 * The DomainRecordTxt model module.
 * @module model/DomainRecordTxt
 * @version 2.0
 */
export class DomainRecordTxt extends DomainRecord {
    /**
     * Constructs a new <code>DomainRecordTxt</code>.
     * @alias module:model/DomainRecordTxt
     * @class
     * @extends module:model/DomainRecord
     * @param type {} The type of the DNS record. For example: A, CNAME, TXT, ...
     * @param name {} The host name, alias, or service being defined by the record.
     * @param data {} Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.
     * @param flags {} An unsigned integer between 0-255 used for CAA records.
     * @param tag {} The parameter tag for CAA records. Valid values are \"issue\", \"issuewild\", or \"iodef\"
     */
    constructor(type: any, name: any, data: any, flags: any, tag: any);
}
import { DomainRecord } from "./DomainRecord";
