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
