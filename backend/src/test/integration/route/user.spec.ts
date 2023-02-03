import { HttpStatus } from '../../../utils';
import { jsonHeaders, request } from '../../helpers';
import { connectDB } from '../../../configs';
import mongoose from 'mongoose';
import { Role, User } from '../../../models';

describe('User route test', () => {
    let userId = '';
    beforeAll(async () => {
        await connectDB();
        const res = await User.create({
            userName: 'testUserName',
            password: 'aStrongPassWord1!',
            firstName: 'testFirstName',
            lastName: 'testLastName',
            gender: 'undefined',
            role: new Role()
        });
        userId = res._id.toString();
    });

    afterAll(async () => {
        await User.remove({ _id: userId });
        await mongoose.disconnect();
    });

    describe('GET /user', () => {
        it('Should return a json response containing all users ', async () => {
            try {
                const res = await request
                    .get('/api/user')
                    .set(jsonHeaders)
                    .expect('Content-Type', /json/)
                    .expect(HttpStatus.OK);
                expect(res.body.users).not.toBeFalsy();
            } catch (error: any) {
                expect(error.message).toBe(
                    'Some error Occour please try again'
                );
            }
        });
    });

    describe('GET /user/:id', () => {
        it('Should return user as json ', async () => {
            try {
                const res = await request
                    .get(`/api/user/${userId}`)
                    .set(jsonHeaders)
                    .expect('Content-Type', /json/)
                    .expect(HttpStatus.OK);
                expect(res.body.user._id).toEqual(userId);
            } catch (error: any) {
                expect(error.message).toBe(
                    'Some error Occour please try again'
                );
            }
        });

        it('Should return error response', async () => {
            try {
                await request
                    .get(`/api/user/${new mongoose.Types.ObjectId()}`)
                    .set(jsonHeaders)
                    .expect('Content-Type', /json/)
                    .expect(HttpStatus.BAD_REQUEST);
            } catch (error: any) {
                expect(error.message).toBe(
                    'Some error Occour please try again'
                );
            }
        });

        it('Should return error response', async () => {
            try {
                await request
                    .get(`/api/user/aaaa`)
                    .set(jsonHeaders)
                    .expect('Content-Type', /json/)
                    .expect(HttpStatus.BAD_REQUEST);
            } catch (error: any) {
                expect(error.message).toBe(
                    'Some error Occour please try again'
                );
            }
        });
    });
});
