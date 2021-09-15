/**
 * The Balance model module.
 * @module model/Balance
 * @version 2.0
 */
export class Balance {
    /**
     * Constructs a <code>Balance</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Balance} obj Optional instance to populate.
     * @return {module:model/Balance} The populated <code>Balance</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Balance as of the `generated_at` time.  This value includes the `account_balance` and `month_to_date_usage`.
     * @member {String} monthToDateBalance
     */
    monthToDateBalance: any;
    /**
     * Current balance of the customer's most recent billing activity.  Does not reflect `month_to_date_usage`.
     * @member {String} accountBalance
     */
    accountBalance: any;
    /**
     * Amount used in the current billing period as of the `generated_at` time.
     * @member {String} monthToDateUsage
     */
    monthToDateUsage: any;
    /**
     * The time at which balances were most recently generated.
     * @member {Date} generatedAt
     */
    generatedAt: any;
}
