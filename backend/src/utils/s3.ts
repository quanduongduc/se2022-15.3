import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../configs';
import { generateFileName } from './generateFileName';

const bucketName = config.AWS_BUCKET_NAME;
const region = config.AWS_BUCKET_REGION;
const accessKey = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: region
});

export const uploadToS3 = async (file?: Express.Multer.File) => {
    try {
        const fileName = generateFileName();
        const uploadParams = {
            Bucket: bucketName,
            Body: file?.buffer,
            Key: fileName,
            ContentType: file?.mimetype
        };
        const response = await s3.send(new PutObjectCommand(uploadParams));
        return {
            key: fileName,
            response
        };
    } catch (error) {
        console.log(error);
    }
};

export const downloadFromS3 = async (storageFileName: string) => {
    try {
        const downloadParams = {
            Key: storageFileName,
            Bucket: bucketName
        };
        return await s3.send(new GetObjectCommand(downloadParams));
    } catch (error) {
        console.log(error);
    }
};

export async function getObjectSignedUrl(key: string) {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    const command = new GetObjectCommand(params);
    const hour = 3600;
    const url = await getSignedUrl(s3, command, { expiresIn: hour });

    return url;
}
