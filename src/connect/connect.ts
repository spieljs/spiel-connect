import { httpRequest, HttpRequest, RequestConfig } from "spiel-request";
import { IParamsConnect, IPropsConnect, IRequestConfigConnect, IRouterConnect } from "./helpers";

/**
 * Class to set the endpoints requests
 */
export class Connect {
    private options: RequestConfig;
    private path?: string;

    /**
     * @param requestOptions Request options like spiel-request but domain is required in this case
     * @param path Alternative path to get all the enpoints
     */
    constructor(requestOptions: IRequestConfigConnect, path?: string) {
        this.options = requestOptions;
        this.path = path;
    }

    /**
     * It get the endpoints with its methods
     */
    public async getEndpoints() {
        httpRequest.setRequest(this.options);
        let endPoints;
        try {
            const router: IRouterConnect[] = await httpRequest.sendRequest({method: "GET",
                                                                            url: this.path || "/"});
            endPoints = this.setRouter(router);
            return endPoints;
        } catch (error) {
            throw new Error(error);
        }
    }

    private setRouter(router: IRouterConnect[]) {
        const endPoints: any = {};

        router.forEach((route: IRouterConnect) => {
            endPoints[route.name] = {};
            route.props.forEach((prop: IPropsConnect) => {
                endPoints[route.name][prop.name] = (params?: IParamsConnect | null,
                                                    query?: object | string | null,
                                                    body?: object | null) => {
                    let path: string = "";
                    if (params) {
                        path = this.setParams(prop.path, params);
                    }

                    if (query) {
                        path = `${(path) ?
                                path :
                                prop.path}?response=${(typeof query === "object") ?
                                    encodeURIComponent(JSON.stringify(query)) :
                                    query}`;
                    }

                    return httpRequest.sendRequest({method: prop.method, body, url: path || prop.path});
                };
            });
        });

        return endPoints;
    }

    private setParams(path: string, params: IParamsConnect): string {
        Object.keys(params).forEach((key: string) => {
            const reg = new RegExp(`#${key}|$${key}|:${key}`);
            path = path.replace(reg, params[key]);
        });

        return path;
    }
}
