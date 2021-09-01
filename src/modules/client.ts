import axios from "axios";

const client = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/' : 'https://teriser.codrest.com',
    withCredentials: true
});

export interface ClientResponse<T> {
    success: boolean;
    response: T | null;
    error: ClientError | null;
}

export interface ClientError {
    message: string;
    status: number;
}

export interface LoginResult {
    token: string;
    name: string;
    email: string;
}

export const register = (name: string, email: string) => client.post('/developers/account', {name, email});
export const login = (email: string, loginToken: string) => client.post('/developers/sign', {email, loginToken});
export const logout = () => client.delete('/developers/sign');

export function setBearer(token?: string) {
    client.defaults.headers.common['X-TERISER-AUTH'] = token ? `Bearer ${token}` : undefined;
}

export interface ProjectRequest {
    title: string;
}

export const findAllProjects = () => client.get('/projects');
export const findProjectById = (id: number) => client.get(`/projects/${id}`);
export const addProject = (request: ProjectRequest) => client.post('/projects', request);
export const editProject = (id: number, request: ProjectRequest) => client.patch(`/project/${id}`, request);
export const removeProject = (id: number) => client.delete(`/project/${id}`);

export interface Item {
    seq: number;
    name: string;
    price: number;
}

export const findAllItems = () => client.get('/store/items');
export const findItemById = (id: number) => client.get(`/store/items/${id}`);

export interface PointCard {
    seq: number;
    name: string;
    point: number;
    price: number;
    available: boolean;
}

export const findAllPointCards = () => client.get('/store/point');

export interface Payment {
    buyer: string;
    orderId: string;
    method: PaymentMethod;
    name: string;
    amount: number;
    status: PaymentStatus;
    createAt: string;
    paidAt: string;
    failedAt: string;
    cancelledAmount: number;
    cancelledAt: string;
}

export type PaymentMethod = 'card' | 'trans' | 'vbank' | 'phone';
export type PaymentStatus = 'ready' | 'paid' | 'failed' | 'cancelled';

export interface PaymentPointCard {
    id: number;
    quantity: number;
}

export const requestPayment = (request: Array<PaymentPointCard>) => client.post('/store/payments', request);

export interface PointRequest {
    receiptId: string;
    orderId: string;
}

export interface Point {
    owner: string;
    name: string;
    amount: number;
    balance: number;
    createAt: string;
}

export const chargePoint = (request: PointRequest) => client.put('/store/point', request);

export default client;
