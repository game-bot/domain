import { IBaseEntity, BaseEntityId } from "./entities";
import { IRepository, RepositoryUpdateData, RepositoryAccessOptions } from "./repository";
import { IEntityValidator } from "./entity-validator";

export abstract class BaseRepository<T extends IBaseEntity> implements IRepository<T> {
    constructor(protected validator: IEntityValidator<T>) { }

    async create(data: T) {
        data = this.beforeCreate(data);
        return this.innerCreate(data);
    }
    async update(data: RepositoryUpdateData<T>) {
        data = this.beforeUpdate(data);
        return this.innerUpdate(data);
    }

    protected beforeCreate(data: T) {
        return this.validator.onCreate(data);
    }

    protected beforeUpdate(data: RepositoryUpdateData<T>) {
        return this.validator.onUpdate(data);
    }

    abstract innerCreate(data: T): Promise<T>
    abstract innerUpdate(data: RepositoryUpdateData<T>): Promise<T>
    abstract delete(id: BaseEntityId): Promise<boolean>

    abstract getById(id: BaseEntityId, options?: RepositoryAccessOptions<T>): Promise<T | null>
    abstract getByIds(ids: BaseEntityId[], options?: RepositoryAccessOptions<T>): Promise<T[]>
    abstract exists(id: BaseEntityId): Promise<boolean>

    abstract deleteStorage(): Promise<void>
    abstract createStorage(): Promise<void>
}
