/**
 * The User model module.
 * @module model/User
 * @version 2.0
 */
export class User {
    /**
     * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/User} obj Optional instance to populate.
     * @return {module:model/User} The populated <code>User</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/UserKubernetesClusterUser} kubernetesClusterUser
     */
    kubernetesClusterUser: any;
}
