const BASE_URL = 'http://192.168.1.6:3333/api';

export default class Api {

    static async post(url, object, token) {
        return await this.saveOrUpdate(url, object, 'POST', token);
    }

    static async get(url, token) {
        const res = await fetch(`${BASE_URL}/${url}`);
        return await res.json();
    }


    static async put(url, object, token) {
        return this.saveOrUpdate(url, object, 'PUT', token);
    }

    static async saveOrUpdate(url, object, method, token) {
        const res = await fetch(`${BASE_URL}/${url}`, {
            method,
            headers: this.getHeaders(token),
            body: JSON.stringify(object),
        });
        return await res.json();
    }

    static getHeaders(token) {
        const header = new Headers();
        header.append('Content-Type', 'application/json')

        if (token) {
            header.append('Authorization', `Bearer ${token}`)
        }

        return header;
    }

}
