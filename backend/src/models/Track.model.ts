import { Schema, model, Model, ObjectId } from 'mongoose';
import { Artist } from './Artist.model';

interface ITrack {
    title: string;
    storageName: string;
    artists: [ObjectId];
    duration: number;
    theme: string;
    description: string;
}

const TrackSchema = new Schema<ITrack>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        storageName: {
            type: String,
            required: true,
            trim: true
        },
        theme: {
            type: String,
            required: true,
            trim: true
        },
        description: {
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
            default: []
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

TrackSchema.post('save', async function (doc) {
    const artistIds = doc.artists;
    Promise.all(
        artistIds.map(async (id) => {
            return await Artist.findByIdAndUpdate(id, {
                $push: { tracks: doc._id }
            });
        })
    );
});

TrackSchema.pre('find', function (next) {
    this.populate('artists');
    next();
});

TrackSchema.pre('findOne', function (next) {
    this.populate('artists');
    next();
});

const Track: Model<ITrack> = model<ITrack>('Track', TrackSchema);

export { ITrack, Track };
