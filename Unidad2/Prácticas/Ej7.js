function indice(array) {
  let indice1;
  let indice2;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      indice1 += array[j];
    }
    for (let k = i + 1; k < array.length; k++) {
      indice2 += array[k];
    }
    if (indice1 === indice2) {
      return i;
    }
    indice1 = 0;
    indice2 = 0;
  }
}
console.log(indice([1, 2, 3, 4, 3, 2, 1]));
