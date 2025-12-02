document.addEventListener("DOMContentLoaded", () => {
  // --- PLAYGROUND DE EVENTOS ---

  // 1. Click y Doble Click
  const btnClick = document.getElementById("btn-click");
  const btnDblClick = document.getElementById("btn-dblclick");
  const clickFeedback = document.getElementById("click-feedback");

  btnClick.addEventListener("click", () => {
    clickFeedback.textContent = "¡Hiciste Click!";
    clickFeedback.style.color = "#4ade80";
    setTimeout(() => (clickFeedback.style.color = ""), 1000);
  });

  btnDblClick.addEventListener("dblclick", () => {
    clickFeedback.textContent = "¡Hiciste Doble Click!";
    clickFeedback.style.color = "#a855f7";
    setTimeout(() => (clickFeedback.style.color = ""), 1000);
  });

  // 2. Mouse Events (mouseenter, mouseleave, mousemove)
  const mouseBox = document.getElementById("mouse-box");
  const mouseFeedback = document.getElementById("mouse-feedback");

  mouseBox.addEventListener("mouseenter", () => {
    mouseBox.style.backgroundColor = "#475569";
    mouseBox.textContent = "¡Dentro!";
  });

  mouseBox.addEventListener("mouseleave", () => {
    mouseBox.style.backgroundColor = "#334155";
    mouseBox.textContent = "Pasa el ratón por aquí";
    mouseFeedback.textContent = "Coordenadas: -";
  });

  mouseBox.addEventListener("mousemove", (e) => {
    // Coordenadas relativas a la caja
    const rect = mouseBox.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    mouseFeedback.textContent = `X: ${x}, Y: ${y}`;
  });

  // 3. Teclado (keydown, keyup)
  const inputKeyboard = document.getElementById("input-keyboard");
  const keyboardFeedback = document.getElementById("keyboard-feedback");

  inputKeyboard.addEventListener("keydown", (e) => {
    keyboardFeedback.textContent = `Presionando: ${e.key}`;
    keyboardFeedback.style.color = "#eab308";
  });

  inputKeyboard.addEventListener("keyup", (e) => {
    keyboardFeedback.textContent = `Soltaste: ${e.key}`;
    keyboardFeedback.style.color = "#94a3b8";
  });

  // 4. Focus y Blur
  const inputFocus = document.getElementById("input-focus");
  const inputBlur = document.getElementById("input-blur");
  const focusFeedback = document.getElementById("focus-feedback");

  const handleFocus = (e) => {
    focusFeedback.textContent = `Foco en: ${e.target.placeholder}`;
    focusFeedback.style.color = "#22c55e";
  };

  const handleBlur = (e) => {
    focusFeedback.textContent = `Perdió foco: ${e.target.placeholder}`;
    focusFeedback.style.color = "#ef4444";
  };

  inputFocus.addEventListener("focus", handleFocus);
  inputFocus.addEventListener("blur", handleBlur);
  inputBlur.addEventListener("focus", handleFocus);
  inputBlur.addEventListener("blur", handleBlur);

  // 5. Event Delegation & Target
  const delegationList = document.getElementById("delegation-list");
  const targetFeedback = document.getElementById("target-feedback");

  delegationList.addEventListener("click", (e) => {
    // e.target es el elemento clickeado (li)
    // e.currentTarget es el elemento que tiene el listener (ul)

    if (e.target.tagName === "LI") {
      targetFeedback.textContent = `Target: ${e.target.textContent}`;
      targetFeedback.style.color = "#a855f7";

      // Efecto visual temporal
      const originalBg = e.target.style.backgroundColor;
      e.target.style.backgroundColor = "#475569";
      setTimeout(() => {
        e.target.style.backgroundColor = originalBg;
      }, 300);
    } else {
      targetFeedback.textContent =
        "Click en la lista (UL), pero no en un item (LI)";
      targetFeedback.style.color = "#94a3b8";
    }
  });

  // 6. Context Menu (Click Derecho)
  const contextBox = document.getElementById("context-box");
  const contextFeedback = document.getElementById("context-feedback");

  contextBox.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Evita el menú del navegador
    contextFeedback.textContent = "¡Menú contextual bloqueado!";
    contextFeedback.style.color = "#eab308";
    contextBox.style.borderColor = "#ef4444";

    setTimeout(() => {
      contextFeedback.textContent = "Estado: Normal";
      contextFeedback.style.color = "#94a3b8";
      contextBox.style.borderColor = "#eab308";
    }, 2000);
  });

  // 7. Copy & Paste
  const clipboardArea = document.getElementById("clipboard-area");
  const clipboardFeedback = document.getElementById("clipboard-feedback");

  clipboardArea.addEventListener("copy", () => {
    clipboardFeedback.textContent = "¡Texto copiado al portapapeles!";
    clipboardFeedback.style.color = "#22c55e";
  });

  clipboardArea.addEventListener("paste", () => {
    clipboardFeedback.textContent = "¡Texto pegado!";
    clipboardFeedback.style.color = "#3b82f6";
  });

  // 8. Wheel (Rueda del ratón)
  const wheelBox = document.getElementById("wheel-box");
  const wheelFeedback = document.getElementById("wheel-feedback");
  let scale = 1;

  wheelBox.addEventListener("wheel", (e) => {
    e.preventDefault(); // Evita scroll de la página si es necesario

    // e.deltaY > 0 es scroll abajo, < 0 es scroll arriba
    if (e.deltaY < 0) {
      scale += 0.1;
    } else {
      scale = Math.max(0.5, scale - 0.1);
    }

    wheelBox.style.transform = `scale(${scale})`;
    wheelFeedback.textContent = `Zoom: ${scale.toFixed(1)}x`;
  });

  // 9. Drag & Drop
  const draggable = document.getElementById("draggable");
  const dropzone = document.getElementById("dropzone");
  const dragFeedback = document.getElementById("drag-feedback");

  draggable.addEventListener("dragstart", (e) => {
    dragFeedback.textContent = "Arrastrando...";
    e.dataTransfer.setData("text/plain", "Este es el elemento arrastrado");
    draggable.style.opacity = "0.5";
  });

  draggable.addEventListener("dragend", () => {
    draggable.style.opacity = "1";
    dragFeedback.textContent = "Arrastre finalizado";
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necesario para permitir el drop
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    const data = e.dataTransfer.getData("text/plain");
    dropzone.textContent = "¡Soltado!";
    dropzone.style.backgroundColor = "rgba(34, 197, 94, 0.2)";
    dropzone.style.borderColor = "#22c55e";
    dragFeedback.textContent = "¡Elemento soltado con éxito!";
  });

  // --- FILTRO POKEMON ---

  const pokemons = [
    {
      name: "Bulbasaur",
      type: "grass",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },
    {
      name: "Charmander",
      type: "fire",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    },
    {
      name: "Squirtle",
      type: "water",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    },
    {
      name: "Bellsprout",
      type: "grass",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png",
    },
    {
      name: "Pikachu",
      type: "electric",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
  ];

  const searchInput = document.getElementById("poke-search");
  const grid = document.getElementById("pokemon-grid");

  // Función para renderizar tarjetas
  function renderPokemons(filterText = "") {
    DOMBuilder.limpiarContenedor(grid); // Limpiar grid

    const filtered = pokemons.filter((poke) =>
      poke.name.toLowerCase().startsWith(filterText.trim().toLowerCase())
    );

    if (filtered.length === 0) {
      const mensaje = DOMBuilder.crearElemento(
        "p",
        [],
        "No se encontraron Pokemons :(",
        { style: "grid-column: 1/-1; text-align: center; color: #94a3b8;" }
      );
      grid.appendChild(mensaje);
      return;
    }

    filtered.forEach((poke) => {
      const card = DOMBuilder.crearElemento("div", "poke-card");

      const img = DOMBuilder.crearElemento("img", "poke-img", "", {
        src: poke.img,
        alt: poke.name,
      });

      const name = DOMBuilder.crearElemento("div", "poke-name", poke.name);

      const type = DOMBuilder.crearElemento(
        "div",
        ["poke-type", `type-${poke.type}`],
        poke.type
      );

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(type);

      grid.appendChild(card);
    });
  }

  // Render inicial
  renderPokemons();

  // Event Listener para el filtro
  searchInput.addEventListener("input", (e) => {
    const text = e.target.value;
    renderPokemons(text);
  });
});
