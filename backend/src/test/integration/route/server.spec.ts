import { request } from '../../helpers';

describe('Checking server healthy', () => {
    it('Server entry point', async () => {
        const response = await request.get('/');
        expect(response.body).toEqual({ message: 'healthy' });
        expect(response.statusCode).toEqual(200);
    });
});
