/**
 * The NodeStatus model module.
 * @module model/NodeStatus
 * @version 2.0
 */
export class NodeStatus {
    /**
     * Constructs a <code>NodeStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NodeStatus} obj Optional instance to populate.
     * @return {module:model/NodeStatus} The populated <code>NodeStatus</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A string indicating the current status of the node.
     * @member {module:model/NodeStatus.StateEnum} state
     */
    state: any;
}
export namespace NodeStatus {
    namespace StateEnum {
        const provisioning: string;
        const running: string;
        const draining: string;
        const deleting: string;
    }
    /**
     * *
     */
    type StateEnum = string;
}
