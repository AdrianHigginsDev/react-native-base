import System from '../../config/environment.json';

class Request {

    private baseUrl: string;

    constructor() {
        this.baseUrl = System.mode == 'development' ? System.local_base_url : System.prod_base_url;
    }

    get(endpoint: String, params: any): Promise<any> {
        return fetch(this.baseUrl + endpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json());
    }

    post(endpoint: String, body: any): Promise<any> {
        return fetch(this.baseUrl + endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((res) => res.json());
    }
}

export default new Request();