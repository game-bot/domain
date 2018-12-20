export interface IDictionary<V> {
    [key: string]: V
}

export type BaseEntityId = string;

export interface IBaseEntity {
    id: BaseEntityId
}
