import { Schema, model, Model, ObjectId } from 'mongoose';
import { roleSchema } from './Role.model';

interface IUser {
    userName: string;
    password: string;
    role: ObjectId;
    firstName: string;
    lastName: string;
    gender: string;
    playlists: [ObjectId];
    favouriteTracks: [ObjectId];
    lastPlay: ObjectId;
    isDeleted: boolean;
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
            type: roleSchema,
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
        },
        lastPlay: {
            type: Schema.Types.ObjectId,
            ref: 'Track'
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
);

UserSchema.pre('find', function () {
    this.populate('favouriteTracks lastPlay playlists');
    this.where({ isDeleted: false });
});

UserSchema.pre('findOne', function () {
    this.populate('favouriteTracks lastPlay playlists');
    this.where({ isDeleted: false });
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export { User, IUser };
