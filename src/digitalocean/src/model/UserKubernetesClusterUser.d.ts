/**
 * The UserKubernetesClusterUser model module.
 * @module model/UserKubernetesClusterUser
 * @version 2.0
 */
export class UserKubernetesClusterUser {
    /**
     * Constructs a <code>UserKubernetesClusterUser</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserKubernetesClusterUser} obj Optional instance to populate.
     * @return {module:model/UserKubernetesClusterUser} The populated <code>UserKubernetesClusterUser</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The username for the cluster admin user.
     * @member {String} username
     */
    username: any;
    /**
     * A list of in-cluster groups that the user belongs to.
     * @member {Array.<String>} groups
     */
    groups: any;
}
