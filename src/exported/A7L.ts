import { TA8jResult, v_qmi } from './index';
import processContentStep from './processContentStep';

export default (filenameKey: number[], [content, contentLength, key1, key2, key3]: TA8jResult): TA8jResult => {
    const i = (contentLength | 1) - 2;
    const key = v_qmi(filenameKey, key1, key2);

    return processContentStep([content, contentLength, key1, key2, key3], key, i);
};
