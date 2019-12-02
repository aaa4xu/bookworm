import { TA8jResult, v_smi } from './index';

export default (filenameKey: number[], [content, contentLength, key1, key2, key3]: TA8jResult): TA8jResult => {
    key3 = v_smi(key3, key2, key1, filenameKey);
    key2 = v_smi(key2, key1, filenameKey, key3);
    key1 = v_smi(key1, filenameKey, key3, key2);

    return [content, contentLength, key1, key2, key3];
};
