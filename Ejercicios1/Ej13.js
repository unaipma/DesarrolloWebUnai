function triangulo(cadena) {
  let array = [];
  for (let i = 0; i < cadena.length - 1; i++) {
    if (i === cadena.length) {
      array.push(cadena[i]);
    } else {
      array.push(comprobar(cadena[i], cadena[i + 1]));
    }
  }
  if (array.length > 1) {
    triangulo(array);
  } else {
    console.log(array[0]);
  }
}

function comprobar(let, ra) {
  let letras = let + ra;
  if (letras === "GG") {
    return "G";
  } else if (letras === "GB" || letras === "BG") {
    return "R";
  } else if (letras === "BB") {
    return "B";
  } else if (letras === "GR" || letras === "RG") {
    return "B";
  } else if (letras === "RR") {
    return "R";
  } else if (letras === "BR" || letras === "RB") {
    return "G";
  }
}

triangulo("RRGBRGBB");
