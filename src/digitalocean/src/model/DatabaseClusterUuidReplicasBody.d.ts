/**
 * The DatabaseClusterUuidReplicasBody model module.
 * @module model/DatabaseClusterUuidReplicasBody
 * @version 2.0
 */
export class DatabaseClusterUuidReplicasBody extends DatabaseReplica {
    /**
     * Constructs a new <code>DatabaseClusterUuidReplicasBody</code>.
     * @alias module:model/DatabaseClusterUuidReplicasBody
     * @class
     * @extends module:model/DatabaseReplica
     * @param name {} The name to give the read-only replicating
     * @param size {} A slug identifier representing the size of the node for the read-only replica. The size of the replica must be at least as large as the node size for the database cluster from which it is replicating.
     */
    constructor(name: any, size: any);
}
import { DatabaseReplica } from "./DatabaseReplica";
