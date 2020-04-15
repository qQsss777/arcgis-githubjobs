import RedisCache from "../cache/Cache";
import { isNull } from "util";
import { GitHubResult } from "../interfaces";

export const getData = async (): Promise<GitHubResult[] | string> => {
    try {
        const cache = new RedisCache();
        const data: GitHubResult[] = JSON.parse(await cache.getAsync('github'));
        if (isNull(data)) {
            return 'Can\'t retrieve data from redis';
        } else {
            return data
        }
    } catch (e) {
        return 'Can\'t retrieve data from redis';
    }
}