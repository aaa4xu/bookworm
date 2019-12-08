import { Response } from 'request';
import { Options } from 'request-promise-native';

export default class HttpError extends Error {
    public constructor(message: string, public readonly options: Options, public readonly response: Response) {
        super(message);
    }
}
