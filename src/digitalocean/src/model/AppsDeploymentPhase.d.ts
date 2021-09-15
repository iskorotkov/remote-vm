/**
 * *
 */
export type AppsDeploymentPhase = string;
export namespace AppsDeploymentPhase {
    const UNKNOWN: string;
    const PENDING_BUILD: string;
    const BUILDING: string;
    const PENDING_DEPLOY: string;
    const DEPLOYING: string;
    const ACTIVE: string;
    const SUPERSEDED: string;
    const ERROR: string;
    const CANCELED: string;
    function constructFromObject(object: any): any;
}
