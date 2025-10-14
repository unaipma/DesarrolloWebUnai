function aparecenImpar(array) {
  const mapa = new Map();
  for (let i = 0; i < array.length; i++) {
    if (mapa.has(array[i])) {
      mapa.set(array[i], mapa.get(array[i]) + 1);
    } else {
      mapa.set(array[i], 1);
    }
  }
  array = [];
  mapa.forEach((value, key) => {
    if (value % 2 !== 0) {
      array.push(key);
    }
  });
  return array;
}
console.log(aparecenImpar([20, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8]));
