import { expect, assert } from 'chai';
import bubbleSort from '../scripts/bubbleSort'
import genRanNum from '../scripts/genRanNum'

describe('Bubble Sort', () => {
  it('should be a function', () => {
    assert.isFunction(bubbleSort);
  });

  it('should sort an unsorted array', () => {
    const arr = [5, 4, 3, 2, 1];

    expect(bubbleSort(arr)).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('should sort an array of letters', () => {
    const arr = ['c', 'd', 'p', 'f', 'a'];

    expect(bubbleSort(arr)).to.deep.equal(['a', 'c', 'd', 'f', 'p']);
  });

  it('should move min number to front', () => {
    const randomArray = genRanNum(5)
    const min = Math.min(...randomArray);

    expect(bubbleSort(randomArray)[0]).to.equal(min);
  });

  it('should return the argument if it is not a valid array', () => {
    const str = 'test';

    expect(bubbleSort(str)).to.equal(`Error: ${str} is not a valid array.`);
  });

  it('should sort positive and negative numbers', () => {
    const arr = [-50000, -10, 100000000, -2, 5, 90, -90, 5]

    expect(bubbleSort(arr)).to.deep.equal(arr.sort((a, b) => a - b));
  });

  it('should sort large arrays', () => {
    const ranArray = genRanNum(3000);
    const compSorted = [...ranArray].sort((a, b) => a - b);

    expect(bubbleSort(ranArray)).to.deep.equal(compSorted);
  });
})
