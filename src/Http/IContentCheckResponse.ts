import IContentAuth from './IContentAuth';

export default interface IContentCheckResponse {
    status: string;
    url: string;
    cti: string;
    lp: number;
    cty: number;
    lin: number;
    lpd: number;
    bs: number;
    ms: number;
    auth_info: IContentAuth;
    tri: string;
}
