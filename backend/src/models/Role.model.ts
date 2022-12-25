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

const permissionSchema = new Schema<IPermission>({
    create: { type: Boolean, required: true },
    delete: { type: Boolean, required: true },
    update: { type: Boolean, required: true },
    read: { type: Boolean, default: true }
});

const roleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            default: 'user'
        },
        permission: {
            type: permissionSchema,
            require: true
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
