import * as redis from 'redis';
import { promisify } from 'util';
const config = require("../../config.json");

export default class RedisCache {
    port: number;
    _client: redis.RedisClient;
    static instance: any;

    constructor() {
        RedisCache.instance ? RedisCache.instance : null;
        RedisCache.instance = this;
        this.port = config.redis.port;
        this._client = redis.createClient(this.port);
    }

    async getAsync(key: string): Promise<any> {
        const getAsync = promisify(this._client.get).bind(this._client);
        try {
            const value = await getAsync(key);
            return value;
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async setAsync(key: string, data: string): Promise<any> {
        const setAsync = promisify(this._client.set).bind(this._client);
        try {
            const value = await setAsync(key, data);
            return value;
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async pushAsync(key: string, data: Array<any>): Promise<any> {
        const pushAsync = promisify(this._client.lpush).bind(this._client);
        try {
            const value = await pushAsync(key, data);
            return value;
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async rangeAsync(key: string, start: number, end: number): Promise<any> {
        const rangeAsync = promisify(this._client.lrange).bind(this._client);
        try {
            const value = await rangeAsync(key, start, end);
            return value;
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async existsAsync(key: string): Promise<any> {
        const existsAsync = promisify(this._client.exists.bind(this._client));
        try {
            const value = await existsAsync(key);
            return value;
        }
        catch (e) {
            throw new Error(e)
        }
    }

    delete(key: string): boolean {
        return this._client.del(key);
    }

    async flushAll(): Promise<any> {
        return this._client.flushall()
    }

    end(): void {
        return this._client.end(true);
    }
}