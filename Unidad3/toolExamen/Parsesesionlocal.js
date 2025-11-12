// --- Convertidor entre sessionStorage y localStorage ---

// Pasar TODO de sessionStorage → localStorage
function sessionToLocal() {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);

    // Evita sobrescribir datos ya existentes
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, value);
    }
  }
  console.log("✅ Datos copiados de sessionStorage a localStorage");
}

// Pasar TODO de localStorage → sessionStorage
function localToSession() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, value);
    }
  }
  console.log("✅ Datos copiados de localStorage a sessionStorage");
}

// --- Opcional: borrar el origen después de copiar (modo 'mover') ---
// Usa estos si quieres que los datos se eliminen del origen tras copiarse:

function moveSessionToLocal() {
  sessionToLocal();
  sessionStorage.clear();
  console.log("♻️ Datos movidos de sessionStorage a localStorage (borrado el origen)");
}

function moveLocalToSession() {
  localToSession();
  localStorage.clear();
  console.log("♻️ Datos movidos de localStorage a sessionStorage (borrado el origen)");
}


sessionToLocal(); // Copia todo el sessionStorage al localStorage
localToSession(); // Copia todo el localStorage al sessionStorage
moveSessionToLocal(); // Mueve (copia y borra del session)
moveLocalToSession(); // Mueve (copia y borra del local)
