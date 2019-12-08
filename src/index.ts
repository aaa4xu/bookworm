import { promises as fs } from 'fs';
import Book from './Book';
import HttpClient from './Http/Client';
import Login from './Http/Requests/Login';
import StartSession from './Http/Requests/StartSession';

async function main() {
    if (!process.env.BW_USERNAME || !process.env.BW_PASSWORD) {
        throw new Error('BW_USERNAME or BW_PASSWORD is empty');
    }

    // My Library > Read this book
    // https://member.bookwalker.jp/app/03/webstore/cooperation?r=BROWSER_VIEWER/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/https%3A%2F%2Fglobal.bookwalker.jp%2FholdBooks%2F
    const contentId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

    const httpClient = new HttpClient();

    await new StartSession().execute(httpClient);
    if (!(await new Login(process.env.BW_USERNAME, process.env.BW_PASSWORD).execute(httpClient))) {
        throw new Error('Incorrect username/password');
    }
    console.log('Session started');

    const book = await Book.load(contentId, httpClient);
    console.log('Book loaded');

    await book.download('./storage/dl');
    console.log('Done!');

    await fs.writeFile('./browser-id.txt', httpClient.browserId);
}

main();
