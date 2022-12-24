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
    read: { type: Boolean, required: true }
});

const Permission = model<IPermission>('Permission', permissionSchema);

const roleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            require: true
        },
        permission: {
            type: Permission,
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

export { IRole, Role };
