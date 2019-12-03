export default (pageId: string, key1: number[], key2: number[], key3: number[]): string => {
    const p1: ILocalThis = {
        B0G: pageId,
        url: pageId + '/0.jpeg',
        B0H: '.jpeg',
        fileName: '0',
    };

    const p2: IB9gInput = {
        b9W: v_hdf(key1, key2, key3),
        configuration: {
            'file-name-version': '1.0',
        },
    };

    return typeof p2.configuration['file-name-version'] === 'string'
        ? p1.B0G + '/' + v_jdf(p1.fileName) + v_ndf(p2, p1) + p1.B0H
        : p1.url;
};

function v_jdf(filename: string) {
    const v_ldf = parseInt(filename, 10);

    if (!isNaN(v_ldf) && v_ldf >= 0 && v_ldf <= 1152921504606847000) {
        const v_mdf = v_ldf.toString(16);
        return v_mdf.length.toString(16) + v_mdf;
    }

    return '0' + filename;
}

function v_ndf(p1: IB9gInput, self: ILocalThis) {
    const parentFolder = self.B0G + '/',
        pathLength = parentFolder.length + self.fileName.length,
        v_bef = (1 + pathLength) << 1,
        v_cef = new Array(v_bef),
        v_def = String.prototype.charCodeAt.bind(parentFolder + self.fileName);

    v_cef[0] = 0;
    v_cef[1] = 59;
    for (let v_pdf = 2, v_odf = 0; v_odf < pathLength; v_odf++) {
        const v_sdf = v_def(v_odf);
        v_cef[v_pdf++] = v_sdf >>> 8;
        v_cef[v_pdf++] = v_sdf % 256;
    }

    let v_fef = 3;
    for (let v_eef = (self.fileName.length << 1) + v_bef + v_bef; v_eef < 256; v_fef++) v_eef += v_bef;

    let v_jef = 1670739,
        v_kef = 1282576,
        v_lef = 2237221;

    for (let i = (1 + parentFolder.length) << 1, j = 0, k = 0; k < v_fef; k++, i = 0) {
        for (; i < v_bef; ) {
            v_lef ^= v_cef[i++] ^ p1.b9W[j++];
            const v_ief = 435 * v_lef;
            const v_hef = 435 * v_kef + ((v_lef & 7) << 18) + (v_ief >>> 22);
            const v_gef = 435 * v_jef + ((v_kef & 3) << 19) + ((v_lef & 4194296) >>> 3) + (v_hef >>> 21);
            v_lef = v_ief & 4194303;
            v_kef = v_hef & 2097151;
            v_jef = v_gef & 2097151;
            j >= p1.b9W.length && (j = 0);
        }
    }

    const v_mef = new Array(16);
    for (let i = 0; i < v_mef.length; i += 2) {
        switch (i) {
            case 0:
                pval(v_mef, i, (v_jef >>> 13) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 2:
                pval(v_mef, i, ((v_jef >>> 5) & 255) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 4:
                pval(v_mef, i, (((v_jef & 31) << 3) | (v_kef >>> 18)) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 6:
                pval(v_mef, i, ((v_kef >>> 10) & 255) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 8:
                pval(v_mef, i, ((v_kef >>> 2) & 255) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 10:
                pval(v_mef, i, (((v_kef & 3) << 6) | (v_lef >>> 16)) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 12:
                pval(v_mef, i, ((v_lef >>> 8) & 255) ^ p1.b9W[Math.floor(i / 2)]);
                break;
            case 14:
                pval(v_mef, i, (v_lef & 255) ^ p1.b9W[Math.floor(i / 2)]);
                break;
        }
    }

    return String.fromCharCode(...v_mef);
}

const vval = (value: number) => (value < 10 ? 48 : 87) + value;

const pval = (arr: number[], index: number, value: number) => {
    arr[index] = vval(value >>> 4);
    arr[index + 1] = vval(value & 15);
};

function v_hdf(key1: number[], key2: number[], key3: number[]): number[] {
    const v_idf: number[] = [];
    v_edf(v_idf, key1);
    v_edf(v_idf, key2);
    v_edf(v_idf, key3);

    return v_idf;
}

function v_edf(target: number[], key: number[]) {
    for (let index = 0; index < key.length; index++) {
        target[index] ^= key[index];
    }
}

interface IB9gInput {
    configuration: {
        'file-name-version'?: string;
    };
    b9W: any;
}

interface ILocalThis {
    fileName: string;
    url: string;
    B0G: string;
    B0H: string;
}
