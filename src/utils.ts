import { createHash } from "crypto";

export function md5(value: string): string {
    return createHash('md5').update(value, 'utf8').digest('hex').toLowerCase();
}

export function sha1(value: string): string {
    return createHash('sha1').update(value, 'utf8').digest('hex').toLowerCase();
}

export function uniq<T>(items: T[]) {
    return items.filter((value, index, self) => self.indexOf(value) === index);
}

export function uniqByProperty<T>(items: T[], prop: keyof T): T[] {
    const map: { [index: string]: any } = {}
    const list: T[] = []

    for (let item of items) {
        if (map[(<any>item)[prop]] === undefined) {
            map[(<any>item)[prop]] = 1;
            list.push(item)
        }
    }

    return list;
}

export async function mapPromise<T, R>(keys: T[], callback: (key: T) => Promise<R>):
    Promise<Map<T, R>> {
    const tasks = keys.map(key => callback(key).then(result => ({ key, result })));

    const results = await Promise.all(tasks);
    const response: Map<T, R> = new Map();
    for (let item of results) {
        response.set(item.key, item.result);
    }
    return response;
}

/**
 * The maximum is exclusive and the minimum is inclusive
 * @param min Minimum number inclusive
 * @param max Maximum number explusive
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * The maximum is inclusive and the minimum is inclusive
 * @param min Minimum number inclusive
 * @param max Maximum number inclusive
 */
export function getRandomIntInclusive(min: number, max: number) {
    return getRandomInt(min, max + 1);
}

export function unixTime(date?: Date) {
    date = date || new Date();

    return Math.floor(date.getTime() / 1000);
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
