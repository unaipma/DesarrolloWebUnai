// Validator module: devuelve objeto {ok,message} o funciones auxiliares
export function validateUsernameValue(value, blockedList = []) {
  if (!value || value.trim().length === 0)
    return { ok: false, message: "Introduce nombre usuario" };
  if (blockedList.includes(value))
    return { ok: false, message: "El usuario existe en nuestra BBDD 🎂" };
  return { ok: true };
}

export function validateNameValue(value) {
  if (!value || value.trim().length < 3)
    return {
      ok: false,
      message: "El nombre debe tener al menos 3 caracteres.",
    };
  return { ok: true };
}

export function validateEmailValue(value) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(value)
    ? { ok: true }
    : { ok: false, message: "Ingresa un correo electrónico válido." };
}

export function validatePhoneValue(value) {
  if (!value) return { ok: true };
  // aceptamos varios formatos básicos: dígitos, espacios, paréntesis, + y guiones
  const re = /^\+?[0-9()\-\s]{6,20}$/;
  return re.test(value)
    ? { ok: true }
    : {
        ok: false,
        message:
          "El teléfono debe contener sólo dígitos y símbolos: +() - y tener 6-20 caracteres",
      };
}

export function validatePasswordValue(value) {
  if (!value || value.length < 6)
    return {
      ok: false,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  return { ok: true };
}
