import { TA8jResult } from './index';

export default ([content, contentLength, key1, key2, key3]: TA8jResult): TA8jResult => {
    const v_dmi = Math.min(32, contentLength);
    let v_6mi: number, v_7mi: number;

    for (let i = 0; i < v_dmi; i++) {
        const v_8mi = content[i] ^ key1[i] ^ key2[i] ^ key3[i];

        switch (v_8mi & 12) {
            case 0:
                v_6mi = key1[i];
                break;
            case 4:
                v_6mi = key2[i];
                break;
            case 8:
                v_6mi = key3[i];
                break;
            case 12:
                v_6mi = content[i];
        }
        switch (v_8mi & 3) {
            case 0:
                v_7mi = key1[i];
                key1[i] = v_6mi!;
                break;
            case 1:
                v_7mi = key2[i];
                key2[i] = v_6mi!;
                break;
            case 2:
                v_7mi = key3[i];
                key3[i] = v_6mi!;
                break;
            case 3:
                v_7mi = content[i];
                content[i] = v_6mi!;
        }
        switch (v_8mi & 12) {
            case 0:
                key1[i] = v_7mi!;
                break;
            case 4:
                key2[i] = v_7mi!;
                break;
            case 8:
                key3[i] = v_7mi!;
                break;
            case 12:
                content[i] = v_7mi!;
        }
        switch (v_8mi & 192) {
            case 0:
                v_6mi = key1[i];
                break;
            case 64:
                v_6mi = key2[i];
                break;
            case 128:
                v_6mi = key3[i];
                break;
            case 192:
                v_6mi = content[i];
        }
        switch (v_8mi & 48) {
            case 0:
                v_7mi = key1[i];
                key1[i] = v_6mi!;
                break;
            case 16:
                v_7mi = key2[i];
                key2[i] = v_6mi!;
                break;
            case 32:
                v_7mi = key3[i];
                key3[i] = v_6mi!;
                break;
            case 48:
                v_7mi = content[i];
                content[i] = v_6mi!;
        }
        switch (v_8mi & 192) {
            case 0:
                key1[i] = v_7mi!;
                break;
            case 64:
                key2[i] = v_7mi!;
                break;
            case 128:
                key3[i] = v_7mi!;
                break;
            case 192:
                content[i] = v_7mi!;
        }
    }
    return [content, contentLength, key1, key2, key3];
};
