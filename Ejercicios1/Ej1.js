function contar(palabra) {
  let contador = 0;
  for (let i = 0; i < palabra.length; i++) {
    if (
      palabra[i] === "a" ||
      palabra[i] === "A" ||
      palabra[i] === "e" ||
      palabra[i] === "E" ||
      palabra[i] === "i" ||
      palabra[i] === "I" ||
      palabra[i] === "o" ||
      palabra[i] === "O" ||
      palabra[i] === "u" ||
      palabra[i] === "U"
    ) {
      contador++;
    }
  }
  return contador;
}

console.log(contar("Hola Mundo"));
