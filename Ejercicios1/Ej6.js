function persistenciamultiplicativa(num, contador) {
  const stringNumber = num.toString();
  let resultado = 1;
  for (let index = 0; index < stringNumber.length; index++) {
    resultado = resultado * parseInt(stringNumber[index]);
  }
  if (resultado > 9) {
    persistenciamultiplicativa(resultado, contador);
  } else {
    console.log(
      `la persistencia es ${resultado} y ha necesito ${contador} pasos`
    );
    return;
  }
  contador++;
}

persistenciamultiplicativa(999, 1);
