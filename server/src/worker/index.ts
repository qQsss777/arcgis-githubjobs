const cron = require('node-cron');
import { fetchGithub } from './fetchGithub';

const startWorker = async (): Promise<void> => {
    try {
        await fetchGithub();
        cron.schedule('* 1 * * *', async () => {
            fetchGithub();
        })
        console.log('cron process started');
    } catch (e) {
        console.log('error in fetching data');
    }
};

export { startWorker };