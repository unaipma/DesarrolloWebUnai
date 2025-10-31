const form = document.getElementById("formulario");
const historial = document.getElementById("historial");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const numero = document.getElementById("numero").valueAsNumber;
  const rango = document.getElementById("rango").valueAsNumber;

  // Recoger el resto de los valores
  const texto = document.getElementById("texto").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const checkbox = document.getElementById("checkbox").checked;
  const radio = document.querySelector('input[name="opcion"]:checked').value;
  const fecha = document.getElementById("fecha").value;
  const color = document.getElementById("color").value;
  const archivo = document.getElementById("archivo").files[0];

  // --- Cálculos matemáticos básicos ---
  const suma = sumar(numero, rango);
  const producto = multiplicar(numero, rango);
  const random = aleatorio(rango);
  const raizNum = raiz(numero);

  // --- Funciones "manuales" ---
  const fact = factorial(numero);
  const multSuma = multiplicarPorSuma(numero, rango);
  const potSuma = potenciaPorSuma(numero, 3);
  const divResta = dividirPorResta(numero, rango);
  const restoResta = restoPorResta(numero, rango);

  // --- Funciones avanzadas ---
  const fib = fibonacci(numero);
  const hipotenusa = pitagoras(numero, rango);
  const primo = esPrimo(numero);
  const maxDiv = mcd(numero, rango);
  const minMul = mcm(numero, rango);
  const teocua = teoremaCuadrados(numero, rango, 5);

  // --- Mostrar todo en el historial ---
  const p = document.createElement("p");
  p.innerHTML = `
    Número: ${numero} <br>
    Texto: ${texto} <br>
    Correo: ${correo} <br>
    Contraseña: ${password} <br>
    Checkbox: ${checkbox} <br>
    Radio: ${radio} <br>
    Fecha: ${fecha} <br>
    Color: ${color} <br>
    Rango: ${rango} <br>
    Archivo: ${archivo ? archivo.name : "Ninguno"} <br><br>

    <strong>🧮 Resultados matemáticos:</strong><br>
    Suma (número + rango): ${suma} <br>
    Multiplicación directa: ${producto} <br>
    Raíz cuadrada del número: ${raizNum} <br>
    Número aleatorio entre 0 y rango: ${random} <br><br>

    <strong>🧠 Operaciones manuales:</strong><br>
    Factorial(${numero}) = ${fact} <br>
    Multiplicación por sumas (${numero} × ${rango}) = ${multSuma} <br>
    Potencia por sumas (${numero}³) = ${potSuma} <br>
    División por restas (${numero} ÷ ${rango}) = ${divResta} <br>
    Resto por restas (${numero} % ${rango}) = ${restoResta} <br><br>

    <strong>🔢 Funciones avanzadas:</strong><br>
    Fibonacci(${numero}) = ${fib} <br>
    Hipotenusa (catetos: ${numero}, ${rango}) = ${hipotenusa.toFixed(2)} <br>
    ¿Es primo ${numero}? → ${primo ? "Sí ✅" : "No ❌"} <br>
    MCD(${numero}, ${rango}) = ${maxDiv} <br>
    MCM(${numero}, ${rango}) = ${minMul} <br>
    Teorema de los cuadrados (${numero}, ${rango}, 5) = ${teocua}
  `;

  historial.prepend(p);
});

// === Funciones matemáticas ===
function sumar(numero, rango) {
  return numero + rango;
}
function restar(numero, rango) {
  return numero - rango;
}
function multiplicar(numero, rango) {
  return numero * rango;
}
function dividir(numero, rango) {
  return rango !== 0 ? numero / rango : "No se puede dividir entre 0";
}
function potencia(base, exponente) {
  return Math.pow(base, exponente);
}
function raiz(numero) {
  return numero >= 0 ? Math.sqrt(numero) : "No existe raíz real";
}
function aleatorio(rango) {
  return Math.floor(Math.random() * (rango + 1));
}

// === Funciones manuales ===
function factorial(n) {
  if (n < 0) return "No existe factorial negativo";
  let resultado = 1;
  for (let i = 1; i <= n; i++) resultado *= i;
  return resultado;
}

function multiplicarPorSuma(a, b) {
  let resultado = 0;
  const positivo = b >= 0;
  const veces = Math.abs(b);
  for (let i = 0; i < veces; i++) resultado += a;
  return positivo ? resultado : -resultado;
}

function potenciaPorSuma(base, exponente) {
  if (exponente < 0) return "No se admiten exponentes negativos";
  if (exponente === 0) return 1;
  let resultado = base;
  for (let i = 1; i < exponente; i++) {
    resultado = multiplicarPorSuma(resultado, base);
  }
  return resultado;
}

function dividirPorResta(dividendo, divisor) {
  if (divisor === 0) return "No se puede dividir entre 0";
  let cociente = 0;
  let resto = Math.abs(dividendo);
  const divisorAbs = Math.abs(divisor);
  while (resto >= divisorAbs) {
    resto -= divisorAbs;
    cociente++;
  }
  if ((dividendo < 0 && divisor > 0) || (dividendo > 0 && divisor < 0))
    cociente = -cociente;
  return cociente;
}

function restoPorResta(dividendo, divisor) {
  if (divisor === 0) return "No se puede dividir entre 0";
  let resto = Math.abs(dividendo);
  const divisorAbs = Math.abs(divisor);
  while (resto >= divisorAbs) resto -= divisorAbs;
  return resto;
}

// === Funciones avanzadas ===
function fibonacci(n) {
  if (n < 0) return "No existe Fibonacci negativo";
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0,
    b = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

function pitagoras(cateto1, cateto2) {
  return Math.sqrt(cateto1 * cateto1 + cateto2 * cateto2);
}

function esPrimo(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
}

function mcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function mcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / mcd(a, b);
}

function teoremaCuadrados(a, b, c) {
  return a * a + b * b - c * c;
}
