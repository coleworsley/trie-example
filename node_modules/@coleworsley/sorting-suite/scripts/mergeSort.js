function mergeSort( array ) {
  if ( array.length <= 1) {
    return array;
  }
  let a = array.splice(0, Math.floor(array.length / 2));
  let b = array;

  return merge(mergeSort(a), mergeSort(b));
}

function merge( a, b ) {
  let array = [];

  while ((a.length || 0) + (b.length || 0) > 0) {
    if (a.length > 0 && a[0] < b[0] || b.length === 0) {
      array.push(a.shift());
    } else {
      array.push(b.shift());
    }
  }
  return array;
}

export { merge, mergeSort };
