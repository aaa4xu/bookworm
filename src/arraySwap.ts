export default function arraySwap(array: any[], index1: number, index2: number): void {
    const tmp = array[index1];
    array[index1] = array[index2];
    array[index2] = tmp;
}
