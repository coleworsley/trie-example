function genRanNum (count) {
  let numArray = [];

  for (let i = 0; i < count; i++) {
    let ranNum = Math.floor(Math.random() * 100);

    numArray.push(ranNum);
  }

  return numArray;
}

export default genRanNum
