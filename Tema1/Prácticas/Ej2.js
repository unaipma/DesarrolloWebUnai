function pines(pin) {
  if (pin.length == 4 || pin.length == 6) {
    if (pin instanceof Number) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

console.log(pines("hola"));
