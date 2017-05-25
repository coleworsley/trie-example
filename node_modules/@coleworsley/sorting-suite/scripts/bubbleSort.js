const bubbleSort = (array) => {
  if (!(array instanceof Array)) {
    return `Error: ${array} is not a valid array.`;
  }
  let swap = true;

  for (let i = 0; swap; i++) {
    swap = false;
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        [ array[j], array[j + 1] ] = [ array[j + 1], array[j] ];
        swap = true;
      }
    }
  }
  return array;
}

export default bubbleSort;
