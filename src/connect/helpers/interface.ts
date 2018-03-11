import { RequestConfig } from "spiel-request";

/**
 * The type for the method functions
 */
export type RequestFunction = (params?: IParamsConnect | null,
                               body?: object | null,
                               query?: object | string) => Promise<any>;

export interface IParamsConnect {
    [key: string]: any;
}

export interface IRouterConnect {
    name: string;
    props: IPropsConnect[];
}

export interface IPropsConnect {
    method: string;
    name: string;
    path: string;
}

/**
 * Request options
 */
export interface IRequestConfigConnect extends RequestConfig {
    // the domains of the server to connect
    domain: string;
}
