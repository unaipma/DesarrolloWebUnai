const formLogin = document.getElementById("formLogin");
const userLogin = document.getElementById("userLogin");
const passLogin = document.getElementById("passLogin");

formLogin.addEventListener("submit", e => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No hay usuarios registrados.");
    return;
  }

  if (user.username === userLogin.value && user.password === passLogin.value) {
    window.location.href = "main.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
