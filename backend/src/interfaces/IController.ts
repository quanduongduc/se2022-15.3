/* eslint-disable @typescript-eslint/ban-types */
import { Response } from 'express';
import { FilterQuery, UpdateQuery } from 'mongoose';

export interface IController {
    res(res: Response, document: unknown): void;
    create(document: unknown, populate?: string): Promise<unknown>;
    findAll(excluded: string, populate?: string): Promise<unknown>;
    findById(
        documentId: string,
        excluded: string,
        populate?: string
    ): Promise<unknown>;
    findOne(
        documentFilter: FilterQuery<unknown>,
        excluded: string,
        populate?: string
    ): Promise<unknown>;
    findMany(
        documentFilter: FilterQuery<unknown>,
        excluded: string,
        sortOpions?: Object,
        limit?: number,
        populate?: string
    ): Promise<unknown>;
    updateById(
        documentId: string,
        document: UpdateQuery<unknown>,
        populate?: string
    ): Promise<unknown>;
    deleteById(documentId: string, softDelete: boolean): Promise<unknown>;
}
