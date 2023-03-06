import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    memes: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    details: '/data/memes/',
    delete: '/data/memes/',
    myProfile: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};


export async function getAllMemes() {
    return api.get(endpoints.memes);
}

export async function getById(id) {
    return api.get(endpoints.details + id);
}

export async function getMyItems(userId) {
    return api.get(endpoints.myProfile(userId));
}

export async function createMeme(data) {
    return api.post(endpoints.create, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.details + id, data)
}

export async function deleteItem(id) {
    return api.del(endpoints.delete + id)
}
