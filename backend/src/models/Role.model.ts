import { Schema, model } from 'mongoose';

interface IPermission {
    create: boolean;
    delete: boolean;
    update: boolean;
    read: boolean;
}

interface IRole {
    name: string;
    permission: IPermission;
}

const roleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            default: 'user'
        },
        permission: {
            create: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
            update: { type: Boolean, default: false },
            read: { type: Boolean, default: true }
        }
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
);

const Role = model<IRole>('Role', roleSchema);

export { IRole, Role, roleSchema };
