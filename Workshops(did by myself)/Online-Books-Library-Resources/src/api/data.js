import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    like: '/data/likes',
    details: (id) => `/data/books/${id}`,
    profile: (id) => `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    total: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    own: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getCatalog() {
    return api.get(endpoints.catalog);
}

export async function getDetails(id) {
    return api.get(endpoints.details(id));
}

export async function getMyProfile(id) {
    return api.get(endpoints.profile(id));
}

export async function getTotal(bookId) {
    return api.get(endpoints.total(bookId));
}

export async function likeItem(bookId) {
    return api.post(endpoints.like, {bookId})
}

export async function getOwn(bookId, userId) {
    return api.get(endpoints.own(bookId, userId));
}

export async function createItem(data) {
    return api.post(endpoints.create, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.details(id), data)
}

export async function deleteItem(id) {
    return api.del(endpoints.details(id))
}
