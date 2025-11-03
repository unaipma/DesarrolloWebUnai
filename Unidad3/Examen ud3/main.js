function countGoodPairs(arr) {
  let cont = 0;
  for (let index = 0; index < arr.length; index++) {
    for (let j = index + 1; j < arr.length; j++) { // simplificado
      if (arr[index] == arr[j]) {
        cont++;
      }
    }
  }
  console.log(cont);
  return cont;
}

const btnSubmit = document.getElementsByClassName("inputSubmit")[0];
btnSubmit.addEventListener("click", (event) => {
  const texto = document.getElementById("numeros").value;
  let array = texto.split(",").filter(e => e !== "").map(Number);

  let resul = countGoodPairs(array);

  const p = document.createElement("p");
  p.textContent = `Input: [${array}] => Output: ${resul}`;
  document.getElementById("historicSection").prepend(p);
});
