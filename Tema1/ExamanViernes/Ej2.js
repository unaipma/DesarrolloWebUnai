function mediaindice(array) {
  if (array.length != 1) {
    let resultotal = [];

    for (let index = 0; index < array.length; index++) {
      if (index === array.length - 1) {
        let desesperado = 0;
        array.forEach((element) => {
          desesperado += element;
        });
        resultotal.push(Math.abs(Math.floor(desesperado / array.length)));
      } else {
        let primer = 0;
        let segundo = 0;
        let resul1 = 0;
        let resul2 = 0;
        for (let index2 = 0; index2 < index + 1; index2++) {
          primer += array[index2];
        }
        resul1 = Math.floor(primer / (index + 1));

        for (let index3 = index + 1; index3 < array.length; index3++) {
          segundo += array[index3];
        }

        resul2 = Math.floor(segundo / (array.length - (index + 1)));
        resultotal.push(Math.abs(resul1 - resul2));
      }
    }

    let min = resultotal[0];
    let resul = 1;
    for (let index = 0; index < resultotal.length; index++) {
      if (resultotal[index] < min) {
        min = resultotal[index];
        resul = index;
      }
    }
    console.log("El indice es");
    console.log(resul);
    return resultotal;
  } else {
    console.log("El indice es 0");
  }
}

mediaindice([2, 5, 3, 9, 5, 3]);
