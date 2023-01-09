import app from '../app';
import _request from 'supertest';

jest.setTimeout(300000);
export const request = _request(app);
export const jsonHeaders = { 'Content-Type': 'application/json' };
