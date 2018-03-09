import { httpRequest, HttpRequest, RequestConfig } from "spiel-request";
import { IParamsConnect, IPropsConnect, IRouterConnect } from "./helpers";

export class Connect {
    private endPoints: any;
    private options: RequestConfig;

    constructor(server: string) {
        this.options = {
            domain: server
        };
    }

    public async getEndpoints() {
        httpRequest.setRequest(this.options);
        let endPoints;
        try {
            const router: IRouterConnect[] = await httpRequest.sendRequest({method: "GET", url: "/"});
            endPoints = this.setRouter(router);
            return endPoints;
        } catch(error) {
            console.log(error);
        }
    }

    private setRouter(router: IRouterConnect[]) {
        const endPoints: any = {};

        router.forEach((route: IRouterConnect) => {
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

                    return httpRequest.sendRequest({method: prop.method, url: path || prop.path});
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
