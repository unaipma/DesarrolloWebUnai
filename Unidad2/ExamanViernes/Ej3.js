function cadena(pal, abra) {
  let array1 = pal.split("");
  let array2 = abra.split("");
  let map = new Map();
  let map2 = new Map();
  if (pal.length != abra.length) {
    return false;
  } else {
    array1.forEach((element) => {
      if (map.get(element) != null) {
        map.set(element, map.get(element) + 1);
      }
    });
    array2.forEach((element) => {
      if (map2.get(element) != null) {
        map2.set(element, map2.get(element) + 1);
      }
    });

    if (map == map2) {
      return true;
    } else {
      return false;
    }
  }
}

console.log(cadena("aa", "aa"));
