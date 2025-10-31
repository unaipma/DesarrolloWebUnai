function binario(num1, num2) {
  let contfinal = 0;
  for (let index = num1; index <= num2; index++) {
    let binario = index.toString(2);
    let array = binario.split("");

    let cont = 0;

    for (let j = 0; j < array.length; j++) {
      if (array[j] == 1) {
        cont++;
      }
    }

    if (primo(cont)) {
      contfinal++;
    }
  }
  return contfinal;
}

function primo(numero) {
  if (numero != 1) {
    for (let index = 1; index < numero; index++) {
      if (numero % index == 0 && index != 1 && index != numero) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
console.log(binario(10, 15));
