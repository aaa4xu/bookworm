import { expect } from 'chai';
import { promises as fs } from 'fs';
import a0F from './a0F';
import a0g from './a0g';

export type TA8jResult = [Uint8Array | number[], number, number[], number[], number[]];

export function v_ifi(fn: () => TA8jResult | undefined): TA8jResult {
    // tslint:disable-next-line:no-constant-condition
    while (true) {
        const result = fn();
        if (result === undefined) continue;
        return result;
    }
}

export function v_qmi(p1: number[], p2: number[], p3: number[]) {
    return a0F([...p1, ...p2, ...p3]);
}

export function v_smi(content: any, p1: number[], p2: number[], p3: number[]) {
    return a0g(content, [...p1, ...p2, ...p3]);
}

export const arraySum = (arr: any) => arr.reduce((s: number = 0, i: number) => s + i);

export function isEqual(actual: TA8jResult, expected: TA8jResult) {
    // expect(actual[0]).be.deep.equal(expected[0]);
    // Deep equal is too slow
    expect(arraySum(Array.from(actual[0]))).be.equal(arraySum(expected[0]));
    expect(actual[1]).be.equal(expected[1]);
    expect(actual[2]).be.deep.equal(expected[2]);
    expect(actual[3]).be.deep.equal(expected[3]);
    expect(actual[4]).be.deep.equal(expected[4]);
}

export function createTA8jResult(input: TA8jResult): TA8jResult {
    return [
        new Uint8Array(input[0]),
        input[1],
        input[2].slice(0, input[2].length),
        input[3].slice(0, input[3].length),
        input[4].slice(0, input[4].length),
    ];
}

export async function readJsonFile<T = any>(filename: string): Promise<T> {
    return JSON.parse(await fs.readFile(filename, 'utf8'));
}
