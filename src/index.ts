import { promises as fs } from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import Book from './Book';
import { exists } from './exists';
import HttpClient from './Http/Client';
import Login from './Http/Requests/Login';
import StartSession from './Http/Requests/StartSession';

const readJson = <T>(filename: string): Promise<T> => fs.readFile(filename, 'utf8').then(json => JSON.parse(json));
const writeJson = <T>(filename: string, content: T) => fs.writeFile(filename, JSON.stringify(content, null, 2));

const AUTH_DATA_PATH = './auth.json';
const BROWSER_ID_PATH = './browser-id.txt';
const STORAGE_PATH = './storage';

async function main() {
    const httpClient = new HttpClient();
    const browserId = process.env.BW_BROWSER_ID || (await fs.readFile(BROWSER_ID_PATH, 'utf8').catch(() => null));
    if (browserId) {
        console.log(`Browser ID is detected: ${browserId}`);
        httpClient.browserId = browserId;
    }

    let username, password;
    if (process.env.BW_USERNAME && process.env.BW_PASSWORD) {
        username = process.env.BW_USERNAME;
        password = process.env.BW_PASSWORD;
    } else {
        const auth = await readJson<IAuthData>(AUTH_DATA_PATH).catch(() => null);

        if (auth && auth.username && auth.password) {
            username = auth.username;
            password = auth.password;
        } else {
            username = readlineSync.question('Username: ');
            password = readlineSync.question('Password: ', { hideEchoBack: true });
        }
    }

    console.log(`Auth is detected: ${username}`);
    await new StartSession().execute(httpClient);
    if (!(await new Login(username, password).execute(httpClient))) {
        throw new Error('Incorrect username/password');
    }
    console.log('Session started');

    if (process.env.BW_DONT_SAVE_AUTH !== '1') {
        writeJson<IAuthData>(AUTH_DATA_PATH, { username, password })
            .then(() => {
                console.log(`Auth data saved to ${AUTH_DATA_PATH}`);
            })
            .catch(err => {
                console.warn(`Failed to save auth data to ${AUTH_DATA_PATH}:`, err.stack);
            });
    }

    const contentId = process.env.BW_CONTENT_ID || readlineSync.question('Content ID: ');
    const book = await Book.load(contentId, httpClient);
    console.log('Book loaded');

    const target = path.join(STORAGE_PATH, contentId);
    if (!(await exists(target))) await fs.mkdir(target);
    await book.download(target);
    console.log('Done!');

    await fs.writeFile(BROWSER_ID_PATH, httpClient.browserId);
}

main();

interface IAuthData {
    username: string;
    password: string;
}
