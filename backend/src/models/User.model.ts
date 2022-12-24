import { Schema, model, Model, ObjectId } from 'mongoose';

interface IUser {
    userName: string;
    password: string;
    role: ObjectId;
    firstName: string;
    lastName: string;
    gender: string;
    playlists: [ObjectId];
    favouriteTracks: [ObjectId];
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'undefined']
        },
        playlists: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Playlist'
                }
            ]
        },
        favouriteTracks: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Track'
                }
            ]
        }
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
);

const User: Model<IUser> = model<IUser>('User', UserSchema);

export { User };
