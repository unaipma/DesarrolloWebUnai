function persistenciaMultiplicativa(num) {
  let contador = 0;

  while (num >= 10) {
    let producto = 1;
    for (const digito of num.toString()) {
      producto *= parseInt(digito);
    }
    num = producto;
    contador++;
  }
  return contador;
}

persistenciamultiplicativa(999, 1);
