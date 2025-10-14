function numerobinarios(num) {
  let binario = num.toString(2);
  let cont = 0;
  let array = binario.split("");
  array.forEach((element) => {
    if (element == 1) {
      cont++;
    }
  });
  return cont;
}
console.log(numerobinarios(1234));
