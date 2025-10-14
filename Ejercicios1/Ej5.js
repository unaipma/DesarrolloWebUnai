function sinrepetidos(array) {
  arrayfinal = [];
  array.forEach((element) => {
    if (!arrayfinal.includes(element)) {
      arrayfinal.push(element);
    }
  });
  return arrayfinal;
}
console.log(sinrepetidos(["holaquetalholabbbb", 12, "hola", "hola", 12]));
