function numeromenor(array) {
  const mapa = new Map();

  for (let i = 0; i < array.length; i++) {
    if (mapa.has(array[i])) {
      mapa.set(array[i], mapa.get(array[i]) + 1);
    } else {
      mapa.set(array[i], 1);
    }
  }
  let numero = mapa.keys().next().value;
  let numeroMasRepetido = mapa.get(numero);
  mapa.forEach((value, key) => {
    if (value > numeroMasRepetido) {
      numeroMasRepetido = value;
      numero = key;
    } else if (value === numeroMasRepetido) {
      numero = Math.min(numero, key);
      numeroMasRepetido = mapa.get(key);
    }
  });
  return numero;
}
console.log(numeromenor([34, 15, 88, 2, 34, 2, 3, 34, 15, 2, 3, 3]));
