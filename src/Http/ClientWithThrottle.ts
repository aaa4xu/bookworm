import { Options } from 'request-promise-native';
import IHttpClient from './IHttpClient';

export default class ClientWithThrottle implements IHttpClient {
    private queue: Array<IClientWithThrottleDeferred<any>> = [];
    private inProcess: Array<IClientWithThrottleDeferred<any>> = [];
    private history: number[] = [];

    public constructor(
        private readonly httpClient: IHttpClient,
        private readonly options: IClientWithThrottleOptions,
    ) {}

    public get browserId() {
        return this.httpClient.browserId;
    }

    public execute<T = any>(options: Options): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const task: IClientWithThrottleDeferred<T> = {
                resolve: res => {
                    task.finishedAt = Date.now();
                    resolve(res);
                },
                reject: err => {
                    task.finishedAt = Date.now();
                    reject(err);
                },
                options,
                createdAt: Date.now(),
                startedAt: 0,
                finishedAt: 0,
            };
            this.queue.push(task);
            this.tick();
        });
    }

    public getU1(): string {
        return this.httpClient.getU1();
    }

    private async tick() {
        if (this.queue.length === 0) return;

        const now = Date.now();
        const frame = this.options.frame * 1000;
        this.history = this.history.filter(t => now - t <= frame);
        if (this.history.length >= this.options.limit) {
            // tslint:disable-next-line:insecure-random
            setTimeout(() => this.tick(), frame / (1.9 + Math.random() / 5));
            return;
        }

        const task = this.queue.shift();
        if (!task) return;

        task.startedAt = Date.now();
        this.inProcess.push(task);

        this.history.push(task.startedAt);
        try {
            task.resolve(await this.httpClient.execute(task.options));
        } catch (err) {
            task.reject(err);
        }
        this.inProcess = this.inProcess.filter(t => t !== task);
        this.tick();
    }
}

export interface IClientWithThrottleOptions {
    limit: number;
    frame: number;
}

interface IClientWithThrottleDeferred<T> {
    resolve: (res: T) => void;
    reject: (err: Error) => void;
    options: Options;
    createdAt: number;
    startedAt: number;
    finishedAt: number;
}
