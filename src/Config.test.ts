import { expect } from 'chai';
import { promises as fs } from 'fs';
import path from 'path';
import Config from './Config';

// tslint:disable:mocha-no-side-effect-code

const createConfigurationPackTest = (filename: string) => {
    it(`should correct parse ${filename}`, async () => {
        const encoded = await fs.readFile(path.join(__dirname, '__fixtures__', `${filename}-encoded.json`), 'utf8');
        const decoded = await fs.readFile(path.join(__dirname, '__fixtures__', `${filename}-decoded.json`), 'utf8');

        const config = new Config(encoded, 'configuration_pack.json');
        const actual = config.decode();
        expect(actual).be.deep.equal(JSON.parse(decoded));
    });
};

describe('Config', () => {
    createConfigurationPackTest('configuration_pack-001');
    createConfigurationPackTest('configuration_pack-002');
});
