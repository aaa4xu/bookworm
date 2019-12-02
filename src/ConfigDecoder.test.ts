import { expect } from 'chai';
import { promises as fs } from 'fs';
import path from 'path';
import ConfigDecoder from './ConfigDecoder';

// tslint:disable:non-literal-fs-path
// tslint:disable:mocha-no-side-effect-code

const createConfigurationPackTest = (filename: string) => {
    it(`should correct parse ${filename}`, async () => {
        const decoder = new ConfigDecoder();
        const encoded = await fs.readFile(path.join(__dirname, '__fixtures__', `${filename}-encoded.json`), 'utf8');
        const decoded = await fs.readFile(path.join(__dirname, '__fixtures__', `${filename}-decoded.json`), 'utf8');

        const actual = decoder.process(encoded, 'configuration_pack.json');
        expect(actual).be.deep.equal(JSON.parse(decoded));
    });
};

describe('ConfigDecoder', () => {
    createConfigurationPackTest('configuration_pack-001');
    createConfigurationPackTest('configuration_pack-002');
});
