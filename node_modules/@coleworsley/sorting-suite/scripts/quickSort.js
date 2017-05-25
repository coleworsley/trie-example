function quickSort(arr) {
  let increment = 1;
  let p = arr.length - 1;
  let arrayRight = [];
  let arrayLeft = [];

  if (arr.length <= 1) {
    return arr;
  }

  for (let i = 0; i !== p; i += increment) {
    if ((arr[p] < arr[i] && p > i) ||
        (arr[p] > arr[i] && p < i)) {

      [arr[p], arr[i], i, p] = [arr[i], arr[p], p, i];
      increment = increment * -1;
    }
  }

  arrayLeft.push(...arr.splice(0, p));
  arrayRight.push(...arr.splice(1));

  return quickSort(arrayLeft).concat(arr[0], quickSort(arrayRight));
}

export default quickSort;
