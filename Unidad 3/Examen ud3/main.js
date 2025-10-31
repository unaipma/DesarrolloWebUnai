function countGoodPairs(arr) {
  let cont = 0;
  for (let index = 0; index < arr.length; index++) {
    for (let j = 0; j < arr.length; j++) {
      if (index != j && index < j) {
        if (arr[index] == arr[j]) {
          cont++;
        }
      }
    }
  }
  console.log(cont);
  return cont;
}

//countGoodPairs([1, 2, 3, 1, 1, 3]);

const btnSubmit = document.getElementsByClassName("inputSubmit")[0];
btnSubmit.addEventListener("click", (event) => {
  const texto = document.getElementById("numeros").value;
  let array = texto.split(",");
  array.forEach((element) => {
    if (element == "") {
    }
  });
  //falta meter el metodo con el array split y imprimirlo, no me imprime no se porque
  countGoodPairs(array.split(","));
  const p = document.createElement("p");
  p.innerHTML = `
    
    Resultado: ${texto} <br>
    
  `;
  document.getElementById("historicSection").prepend(p);
});
