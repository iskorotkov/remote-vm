/**
 * The Cluster model module.
 * @module model/Cluster
 * @version 2.0
 */
export class Cluster {
    /**
     * Constructs a <code>Cluster</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Cluster} obj Optional instance to populate.
     * @return {module:model/Cluster} The populated <code>Cluster</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Cluster</code>.
     * @alias module:model/Cluster
     * @class
     * @param name {String} A human-readable name for a Kubernetes cluster.
     * @param region {String} The slug identifier for the region where the Kubernetes cluster is located.
     * @param version {String} The slug identifier for the version of Kubernetes used for the cluster. If set to a minor version (e.g. \"1.14\"), the latest version within it will be used (e.g. \"1.14.6-do.1\"); if set to \"latest\", the latest published version will be used. See the `/v2/kubernetes/options` endpoint to find all currently available versions.
     * @param nodePools {Array.<module:model/KubernetesNodePool>} An object specifying the details of the worker nodes available to the Kubernetes cluster.
     */
    constructor(name: string, region: string, version: string, nodePools: Array<NodeModule>);
    name: string;
    region: string;
    version: string;
    nodePools: NodeModule[];
    /**
     * A unique ID that can be used to identify and reference a Kubernetes cluster.
     * @member {String} id
     */
    id: any;
    /**
     * The range of IP addresses in the overlay network of the Kubernetes cluster in CIDR notation.
     * @member {String} clusterSubnet
     */
    clusterSubnet: any;
    /**
     * The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation.
     * @member {String} serviceSubnet
     */
    serviceSubnet: any;
    /**
     * A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.
     * @member {String} vpcUuid
     */
    vpcUuid: any;
    /**
     * The public IPv4 address of the Kubernetes master node.
     * @member {String} ipv4
     */
    ipv4: any;
    /**
     * The base URL of the API server on the Kubernetes master node.
     * @member {String} endpoint
     */
    endpoint: any;
    /**
     * An array of tags applied to the Kubernetes cluster. All clusters are automatically tagged `k8s` and `k8s:$K8S_CLUSTER_ID`.
     * @member {Array.<String>} tags
     */
    tags: any;
    /**
     * @member {module:model/MaintenancePolicy} maintenancePolicy
     */
    maintenancePolicy: any;
    /**
     * A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window.
     * @member {Boolean} autoUpgrade
     * @default false
     */
    autoUpgrade: boolean;
    /**
     * @member {module:model/ClusterStatus} status
     */
    status: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated.
     * @member {Date} updatedAt
     */
    updatedAt: any;
    /**
     * A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. Surge upgrade makes cluster upgrades fast and reliable by bringing up new nodes before destroying the outdated nodes.
     * @member {Boolean} surgeUpgrade
     * @default false
     */
    surgeUpgrade: boolean;
    /**
     * A read-only boolean value indicating if a container registry is integrated with the cluster.
     * @member {Boolean} registryEnabled
     */
    registryEnabled: any;
}
