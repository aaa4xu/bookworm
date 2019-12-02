import { expect } from 'chai';
// @ts-ignore
import B2y from './B2y';

describe('exported.B2y', () => {
    it('should work', () => {
        const instance = new B2y();
        instance.b9es(64, 5);
        instance.B0o(2059062983);

        let s = instance.b4K(65536);
        s += instance.b4K(65536) * 65536;
        s += instance.b4K(512) * 4294967296;

        expect(s).be.equal(2196019683744);
    });
});
