import { httpRequest, HttpRequest, RequestConfig } from "spiel-request";
import { IParamsConnect, IPropsConnect, IRouterConnect, IRouterResponse } from "./helpers";

class Connect {
    private endPoints: any;

    constructor(server: string) {
        const options: RequestConfig = {
            domain: server,
        };

        this.getEndpoints(options);
    }

    private async getEndpoints(options: RequestConfig) {
        const router: IRouterResponse = await httpRequest.sendRequest({method: "GET", url: "/"});

        httpRequest.setRequest(options);
        this.endPoints = this.setRouter(router);
    }

    private setRouter(router: IRouterResponse) {
        const endPoints: any = {};

        router.routes.forEach((route: IRouterConnect) => {
            endPoints[route.name] = {};
            route.props.forEach((prop: IPropsConnect) => {
                endPoints[route.name][prop.name] = (params?: IParamsConnect, query?: object) => {
                    let path: string = "";
                    if (params) {
                        path = this.setParams(prop.path, params);
                    }

                    if (query) {
                        path = `${(path) ?
                                path :
                                prop.path}?${(typeof query === "object") ?
                                    encodeURIComponent(JSON.stringify(query)) :
                                    query}`;
                    }

                    httpRequest.sendRequest({method: prop.method, url: path || prop.path});
                };
            });
        });

        return endPoints;
    }

    private setParams(path: string, params: IParamsConnect): string {
        Object.keys(params).forEach((key: string) => {
            const reg = new RegExp(`#${key}|$${key}`);
            path = path.replace(reg, params[key]);
        });

        return path;
    }
}
