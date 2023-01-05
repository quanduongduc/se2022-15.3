import { IController } from '../interfaces';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Response } from 'express';
import { HttpStatus } from '../utils';

export class BaseController implements IController {
    public model: Model<any>;
    public updateOption = { useFindAndModify: false, new: true };

    constructor(model: Model<any>) {
        this.model = model;
    }

    res(res: Response, document: unknown) {
        res.status(HttpStatus.OK).send(document);
    }

    public create = async (document: unknown) => {
        try {
            const data: Document = await this.model.create(document);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     *  find all document of a model
     * @param res
     * @param populate
     * @param errMsg
     */

    public findAll = async (excluded = '', populate?: string) => {
        try {
            const populateFunc = async (populate: string) => {
                return await this.model
                    .find({})
                    .populate(populate)
                    .select(excluded)
                    .exec();
            };

            const unpopulateFunc = async () => {
                return await this.model.find({}).select(excluded).exec();
            };
            return this.populateResolve(populateFunc, unpopulateFunc, populate);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * find a document by id
     * @param res
     * @param documentId
     * @param populate
     * @param errMsg
     */

    public findById = async (
        documentId: string,
        excluded = '',
        populate?: string
    ) => {
        try {
            const populateFunc = async (populate: string) => {
                return await this.model
                    .findById(documentId)
                    .populate(populate)
                    .select(excluded)
                    .exec();
            };

            const unpopulateFunc = async () => {
                return await this.model
                    .findById(documentId)
                    .select(excluded)
                    .exec();
            };
            return this.populateResolve(populateFunc, unpopulateFunc, populate);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * find a document matches conditions
     * @param res
     * @param documentId
     * @param populate
     * @param errMsg
     */

    public findOne = async (
        documentFilter: FilterQuery<unknown>,
        excluded = '',
        populate?: string
    ) => {
        try {
            const populateFunc = async (populate: string) => {
                return this.model
                    .findOne(documentFilter)
                    .populate(populate)
                    .select(excluded)
                    .exec();
            };

            const unpopulateFunc = async () => {
                return this.model
                    .findOne(documentFilter)
                    .select(excluded)
                    .exec();
            };
            return this.populateResolve(populateFunc, unpopulateFunc, populate);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Find documents matches conditions
     * @param documentFilter
     * @param populate
     * @returns
     */

    public findMany = async (
        documentFilter: FilterQuery<unknown>,
        excluded = '',
        sortOpions = {},
        limit: number,
        populate?: string
    ) => {
        try {
            const populateFunc = async (populate: string) => {
                return await this.model
                    .find(documentFilter)
                    .populate(populate)
                    .select(excluded)
                    .limit(limit)
                    .sort(sortOpions)
                    .exec();
            };

            const unpopulateFunc = async () => {
                return this.model
                    .find(documentFilter)
                    .select(excluded)
                    .limit(limit)
                    .sort(sortOpions)
                    .exec();
            };
            return this.populateResolve(populateFunc, unpopulateFunc, populate);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * update a document by id
     * @param res
     * @param documentId
     * @param document
     * @param populate
     * @param errMsg
     */

    public updateById = async (
        documentId: string,
        document: UpdateQuery<unknown>,
        populate?: string
    ) => {
        const populateFunc = async (populate: string) => {
            return this.model
                .findByIdAndUpdate(documentId, document, this.updateOption)
                .populate(populate)
                .exec();
        };

        const unpopulateFunc = async () => {
            return this.model
                .findByIdAndUpdate(documentId, document, this.updateOption)
                .exec();
        };
        return this.populateResolve(populateFunc, unpopulateFunc, populate);
    };

    public deleteById = async (documentId: string, softDelete = false) => {
        if (softDelete) {
            return await this.model
                .findByIdAndDelete(documentId, {
                    isDeleted: true
                })
                .exec();
        } else {
            return await this.model.findByIdAndDelete(documentId).exec();
        }
    };

    private async populateResolve(
        populateFunc: (populate: string) => unknown,
        unpopulateFunc: () => unknown,
        populate?: string
    ) {
        if (populate) {
            return await populateFunc(populate);
        } else {
            return await unpopulateFunc();
        }
    }
}
