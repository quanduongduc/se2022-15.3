import { Schema, model, Model, ObjectId } from 'mongoose';

interface ITrack {
    title: string;
    url: string;
    artists: [ObjectId];
    duration: number;
}

const TrackSchema = new Schema<ITrack>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        url: {
            type: String,
            required: true,
            trim: true
        },
        artists: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Artist'
                }
            ],
            minLength: 1,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
);

const Track: Model<ITrack> = model<ITrack>('Track', TrackSchema);

export { ITrack, Track };
