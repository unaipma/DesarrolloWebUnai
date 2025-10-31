function ordenarNumeros(numero) {
  if (numero < 0) {
    return -1;
  }
  let array = numero.split("");
  array.sort((a, b) => b - a);
  array = array.join("");
  return array;
}
console.log(ordenarNumeros("3245976"));
