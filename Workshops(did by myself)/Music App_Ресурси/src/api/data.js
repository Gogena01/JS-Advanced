import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    catalog: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    details: (id) => `/data/albums/${id}`,
    delete: (id) => `/data/albums/${id}`,
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
};


export async function getAllItems() {
    return api.get(endpoints.catalog);
}

export async function getById(id) {
    return api.get(endpoints.details(id));
}

export async function searchItem(query) {
    return api.get(endpoints.search(query))
}

export async function createMeme(data) {
    return api.post(endpoints.create, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.details(id), data)
}

export async function deleteItem(id) {
    return api.del(endpoints.delete(id))
}
