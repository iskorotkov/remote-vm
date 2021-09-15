/**
 * *
 */
export type AppsDomainPhase = string;
export namespace AppsDomainPhase {
    const UNKNOWN: string;
    const PENDING: string;
    const CONFIGURING: string;
    const ACTIVE: string;
    const ERROR: string;
    function constructFromObject(object: any): any;
}
