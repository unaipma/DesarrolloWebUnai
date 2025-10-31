function desaparecer(array1, array2) {
  array1.forEach((element) => {
    array2.forEach((element2) => {
      if (element === element2) {
        array1.splice(array1.indexOf(element2), 1);
      }
    });
  });
  return array1;
}

console.log(desaparecer([1, 2, 2, 2, 3], [2]));
