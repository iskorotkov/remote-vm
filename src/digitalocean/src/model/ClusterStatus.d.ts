/**
 * The ClusterStatus model module.
 * @module model/ClusterStatus
 * @version 2.0
 */
export class ClusterStatus {
    /**
     * Constructs a <code>ClusterStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterStatus} obj Optional instance to populate.
     * @return {module:model/ClusterStatus} The populated <code>ClusterStatus</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A string indicating the current status of the cluster.
     * @member {module:model/ClusterStatus.StateEnum} state
     */
    state: any;
    /**
     * An optional message providing additional information about the current cluster state.
     * @member {String} message
     */
    message: any;
}
export namespace ClusterStatus {
    namespace StateEnum {
        const running: string;
        const provisioning: string;
        const degraded: string;
        const error: string;
        const deleted: string;
        const upgrading: string;
        const deleting: string;
    }
    /**
     * *
     */
    type StateEnum = string;
}
