import { Schema, model, Model, ObjectId } from 'mongoose';

interface IPlaylist {
    title: string;
    tracks: [ObjectId];
}

const PlaylistSchema = new Schema<IPlaylist>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
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

PlaylistSchema.pre('find', function (next) {
    this.populate('tracks');
    next();
});

PlaylistSchema.pre('findOne', function (next) {
    this.populate('tracks');
    next();
});

const Playlist: Model<IPlaylist> = model<IPlaylist>('Playlist', PlaylistSchema);

export { Playlist, IPlaylist };
