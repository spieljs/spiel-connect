import { RequestConfig } from "spiel-request";

/**
 * The type for the method functions
 * @see <a href="https://github.com/spieljs/spiel-connect#make-a-request-with-spiel-connect" target="_blank">
 * Make a request with Spiel Connect</a>
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
 * @see <a href="https://github.com/spieljs/spiel-connect#config-the-server-connection" target="_blank">
 * Config the server connection</a>
 */
export interface IRequestConfigConnect extends RequestConfig {
    // the domains of the server to connect
    domain: string;
}
