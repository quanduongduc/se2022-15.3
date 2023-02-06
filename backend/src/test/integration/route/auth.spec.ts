import { HttpStatus } from '../../../utils';
import { jsonHeaders, request } from '../../helpers';
import { connectTestDB } from '../../helpers';
import mongoose from 'mongoose';
import { User } from '../../../models';

describe('Auth route test', () => {
    let token = '';
    beforeAll(async () => {
        await connectTestDB();
        await User.remove({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Post /auth/register', () => {
        it('Should return a json response containing accessToken ', async () => {
            try {
                const res = await request
                    .post('/api/auth/register')
                    .send({
                        userName: 'testUserName',
                        password: 'aStrongPassWord1!',
                        firstName: 'testFirstName',
                        lastName: 'testLastName',
                        gender: 'undefined'
                    })
                    .set(jsonHeaders)
                    .expect(HttpStatus.OK);
                expect(res.headers['set-cookie']).not.toBeFalsy();
                expect(res.body.accessToken).not.toBeFalsy();
                token = res.body.accessToken;
            } catch (error: any) {
                console.log(error);
                expect(error.message).toEqual(
                    'Some error Occour please try again'
                );
            }
        });

        it('Should return register error response ', async () => {
            try {
                const res = await request
                    .post('/api/auth/register')
                    .send({})
                    .set(jsonHeaders)
                    .expect(HttpStatus.BAD_REQUEST);
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Some error Occour please try again'
                );
            }
        });
    });

    describe('Post /auth/login', () => {
        it('Should return json response contain accessToken ', async () => {
            try {
                const res = await request
                    .post(`/api/auth/login`)
                    .send({
                        userName: 'testUserName',
                        password: 'aStrongPassWord1!'
                    })
                    .set(jsonHeaders)
                    .expect(HttpStatus.OK);
                expect(res.headers['set-cookie']).not.toBeFalsy();
                expect(res.body.accessToken).not.toBeFalsy();
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Some error Occour please try again'
                );
            }
        });

        it('Should return error response ', async () => {
            try {
                const res = await request
                    .get(`/api/auth/login`)
                    .set(jsonHeaders)
                    .expect(HttpStatus.NOT_FOUND);
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Some error Occour please try again'
                );
            }
        });
    });

    describe('GET /auth', () => {
        it('Should return json response contain accessToken ', async () => {
            try {
                const res = await request
                    .get(`/api/auth`)
                    .set('Cookie', [`accessToken=${token}`])
                    .set(jsonHeaders)
                    .expect('Content-Type', /json/)
                    .expect(HttpStatus.OK);
                expect(res.body.user).not.toBeFalsy();
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Some error Occour please try again'
                );
            }
        });

        it('Should return auth error response', async () => {
            try {
                await request
                    .get(`/api/auth`)
                    .expect('Content-Type', /json/)
                    .expect(HttpStatus.UNAUTHORIZED_ERROR);
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Some error Occour please try again'
                );
            }
        });
    });
});
