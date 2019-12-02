import { TA8jResult, v_qmi } from './index';

export default (filenameKey: number[], [content, contentLength, key1, key2, key3]: TA8jResult): TA8jResult => {
    const key = v_qmi(key2, filenameKey, key3);

    for (let offset = 0, v_omi = 0; offset < contentLength; v_omi %= 256) {
        content[offset++] ^= key[v_omi++];
    }

    return [content, contentLength, key1, key2, key3];
};
