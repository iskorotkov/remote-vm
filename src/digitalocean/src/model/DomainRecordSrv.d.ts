/**
 * The DomainRecordSrv model module.
 * @module model/DomainRecordSrv
 * @version 2.0
 */
export class DomainRecordSrv extends DomainRecord {
    /**
     * Constructs a new <code>DomainRecordSrv</code>.
     * @alias module:model/DomainRecordSrv
     * @class
     * @extends module:model/DomainRecord
     * @param type {} The type of the DNS record. For example: A, CNAME, TXT, ...
     * @param name {} The host name, alias, or service being defined by the record.
     * @param data {} Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.
     * @param priority {} The priority for SRV and MX records.
     * @param port {} The port for SRV records.
     * @param flags {} An unsigned integer between 0-255 used for CAA records.
     * @param tag {} The parameter tag for CAA records. Valid values are \"issue\", \"issuewild\", or \"iodef\"
     */
    constructor(type: any, name: any, data: any, priority: any, port: any, flags: any, tag: any);
}
import { DomainRecord } from "./DomainRecord";
