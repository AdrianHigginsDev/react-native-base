import System from '../../config/environment.json';

class Request {

    private baseUrl: string;
    private authenticationToken: string;
    private headers: any;

    constructor() {
        this.baseUrl              = System.mode == 'development' ? System.local_base_url : System.prod_base_url;
        this.authenticationToken  = null;

        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    public authenticate(): Request {

        this.authenticationToken      = System.authentication_token;
        this.headers['Authorization'] = 'Bearer ' + this.authenticationToken;

        return this;
    }

    public addHeaders(obj: object): Request {
        Object.keys(obj).forEach((key) => {
            this.headers[key] = obj[key];
        });

        return this;
    }

    public get(endPoint: string, params: object): Promise<object> {

        let parameter_map: string = "";

        if(Object.keys(params).length > 0) {
            parameter_map += "?req_method=GET";
            Object.keys(params).forEach((key) => {
                parameter_map += "&"+key+"="+params[key];
            })
        }

        const url = this.url_builder(endPoint) + parameter_map;

        return fetch(url , {
            method: 'GET',
            headers: this.headers
        }).then((res) => res.json());
    }

    public post(endPoint: string, body: object): Promise<object> {

        const url = this.url_builder(endPoint);

        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body),
        }).then((res) => res.json());
    }
    
    public put(endPoint: string, id: number, body: object): Promise<object> {

        const url = this.url_builder(endPoint, id);

        return fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body),
        }).then((res) => res.json());
    }

    public delete(endPoint: string, id: number, body: object): Promise<object> {

        const url = this.url_builder(endPoint, id);

        return fetch(url, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(body),
        }).then((res) => res.json());
    }

    private url_builder(endPoint: string, id: number = null): string {

        let baseUrl = this.baseUrl;

        if(baseUrl[baseUrl.length - 1] !== "/") {
            baseUrl += "/";
        }

        if(endPoint[0] === "/") {
            endPoint = endPoint.substr(1);
        }

        if(endPoint[endPoint.length - 1] !== "/") {
            endPoint += "/";
        }

        if(id !== null) {
            endPoint += id;
        }

        return baseUrl + endPoint;

    }
}

export default new Request();