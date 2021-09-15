/**
 * The V2DatabasesBody model module.
 * @module model/V2DatabasesBody
 * @version 2.0
 */
export class V2DatabasesBody extends DatabaseCluster {
    /**
     * Constructs a new <code>V2DatabasesBody</code>.
     * @alias module:model/V2DatabasesBody
     * @class
     * @extends module:model/DatabaseCluster
     * @param name {} A unique, human-readable name referring to a database cluster.
     * @param engine {} A slug representing the database engine used for the cluster. The possible values are: \"pg\" for PostgreSQL, \"mysql\" for MySQL, \"redis\" for Redis, and \"mongodb\" for MongoDB.
     * @param numNodes {} The number of nodes in the database cluster.
     * @param size {} The slug identifier representing the size of the nodes in the database cluster.
     * @param region {} The slug identifier for the region where the database cluster is located.
     */
    constructor(name: any, engine: any, numNodes: any, size: any, region: any);
    /**
     * @member {module:model/DatabaseBackup} backupRestore
     */
    backupRestore: any;
}
import { DatabaseCluster } from "./DatabaseCluster";
