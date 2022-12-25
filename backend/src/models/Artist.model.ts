import { Schema, model, ObjectId } from 'mongoose';

interface IArtist {
    name: string;
    location?: string;
    gender: string;
    tracks: [ObjectId];
}

const ArtistSchema = new Schema<IArtist>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        location: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'undefined']
        },
        tracks: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Track'
                }
            ],
            default: []
        }
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
);

const Artist = model<IArtist>('Artist', ArtistSchema);

export { IArtist, Artist };
