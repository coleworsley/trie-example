import { expect, assert } from 'chai';
import insertionSort from '../scripts/insertionSort'
import genRanNum from '../scripts/genRanNum'

describe('Insertion Sort', () => {
  it('should be a function', () => {
    assert.isFunction(insertionSort);
  });

  it('should sort an unsorted array', () => {
    const arr = [5, 4, 3, 2, 1];

    expect(insertionSort(arr)).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('should sort an array of letters', () => {
    const arr = ['c', 'd', 'p', 'f', 'a'];

    expect(insertionSort(arr)).to.deep.equal(['a', 'c', 'd', 'f', 'p']);
  });

  it('should move min number to front', () => {
    const randomArray = genRanNum(5)
    const min = Math.min(...randomArray);

    expect(insertionSort(randomArray)[0]).to.equal(min);
  });

  it('should sort positive and negative numbers', () => {
    const arr = [-50000, -10, 100000000, -2, 5, 90, -90, 5]

    expect(insertionSort(arr)).to.deep.equal(arr.sort((a, b) => a - b));
  });

  it('should sort large arrays', () => {
    const ranArray = genRanNum(15000);
    const compSorted = [...ranArray].sort((a, b) => a - b);

    expect(insertionSort(ranArray)).to.deep.equal(compSorted);
  });
})
