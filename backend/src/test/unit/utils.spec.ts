import { generateFileName, generateToken, verifyToken } from '../../utils';

describe('Generate File Name Test', () => {
    it('Should return a fileName has 64 characters', () => {
        expect(generateFileName()).toHaveLength(64);
    });
});

describe('JWT Test', () => {
    it('Should be verifiable', () => {
        const data = {
            data: 'somerandomdata'
        };
        const token = generateToken(data);
        const verify: any = verifyToken(token);
        expect(verify?.data).toStrictEqual(data.data);
    });
});
