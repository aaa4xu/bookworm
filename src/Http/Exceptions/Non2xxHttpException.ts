import { Response } from 'request';
import { Options } from 'request-promise-native';
import HttpException from './HttpException';

export class Non2xxHttpException extends HttpException {
    constructor(options: Options, response: Response) {
        super(`Unexpected non-2xx HTTP status: ${response.statusCode}`, options, response);
    }
}
