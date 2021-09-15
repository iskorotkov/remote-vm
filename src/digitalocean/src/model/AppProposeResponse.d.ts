/**
 * The AppProposeResponse model module.
 * @module model/AppProposeResponse
 * @version 2.0
 */
export class AppProposeResponse {
    /**
     * Constructs a <code>AppProposeResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppProposeResponse} obj Optional instance to populate.
     * @return {module:model/AppProposeResponse} The populated <code>AppProposeResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Indicates whether the app is a static app.
     * @member {Boolean} appIsStatic
     */
    appIsStatic: any;
    /**
     * Indicates whether the app name is available.
     * @member {Boolean} appNameAvailable
     */
    appNameAvailable: any;
    /**
     * The suggested name if the proposed app name is unavailable.
     * @member {String} appNameSuggestion
     */
    appNameSuggestion: any;
    /**
     * The maximum number of free static apps the account can have. We will charge you for any additional static apps.
     * @member {String} existingStaticApps
     */
    existingStaticApps: any;
    /**
     * @member {module:model/AppSpec} spec
     */
    spec: any;
    /**
     * The monthly cost of the proposed app in USD using the next pricing plan tier. For example, if you propose an app that uses the Basic tier, the `app_tier_upgrade_cost` field displays the monthly cost of the app if it were to use the Professional tier. If the proposed app already uses the most expensive tier, the field is empty.
     * @member {Number} appCost
     */
    appCost: any;
    /**
     * The monthly cost of the proposed app in USD using the previous pricing plan tier. For example, if you propose an app that uses the Professional tier, the `app_tier_downgrade_cost` field displays the monthly cost of the app if it were to use the Basic tier. If the proposed app already uses the lest expensive tier, the field is empty.
     * @member {Number} appTierDowngradeCost
     */
    appTierDowngradeCost: any;
}
