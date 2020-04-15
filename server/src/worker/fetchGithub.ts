import { URLSearchParams } from "url";
import { GitHubResult } from "../interfaces";
import RedisCache from "../cache/Cache";
import { createCipher } from "crypto";

const fetch = require('node-fetch');
const config = require('../../config.json')

export const fetchGithub = async (): Promise<any> => {
    try {
        //clear redis
        const cache = new RedisCache();
        await cache.flushAll();

        //url de recherche
        const baseUrl: string = config.github.baseUrl;
        const params = new URLSearchParams();
        params.append('location', config.github.location);
        params.append('description', '');
        params.append('page', '1');

        let pageNumber: number = 1;
        let increment: number = 1;
        let results: any[] = [];

        while (increment > 0) {
            params.set('page', pageNumber.toString());
            const response = await fetch(baseUrl + params);
            const json: GitHubResult[] = await response.json();
            if (json.length > 0) {
                results.push(json);
                pageNumber++;
            } else {
                increment = 0;
            }
        }
        //push to redis
        const results2cacge = results.flat(1);
        await cache.setAsync('github', JSON.stringify(results2cacge));
    } catch (e) {
        console.log(e)
    }
}