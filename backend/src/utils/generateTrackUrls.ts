import { getObjectSignedUrl } from './s3';

export const generateTrackUrls = async (
    audioStorageName: string,
    themeStorageName: string
) => {
    try {
        const trackUrlPromise = getObjectSignedUrl(audioStorageName);
        const themeUrlPromise = getObjectSignedUrl(themeStorageName);
        const [trackUrl, themeUrl] = await Promise.all([
            trackUrlPromise,
            themeUrlPromise
        ]);
        return {
            trackUrl,
            themeUrl
        };
    } catch (error) {
        console.log(error);
    }
};
