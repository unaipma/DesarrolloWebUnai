// Dashboard: solo lógica del tablero (asume que login se hizo por login.html)
if (!localStorage.getItem("mulweb_logged")) {
  // no autenticado -> volver al login
  location.href = "login.html";
} else {
  document.addEventListener("DOMContentLoaded", () => {
    const stage = document.getElementById("stage");
    const controls = document.getElementById("controls");

    // Layout similar a la imagen
    const layoutSpec = [
      { x: 20, y: 20, w: 80, h: 80, color: "#ffffff" },
      { x: 120, y: 20, w: 80, h: 80, color: "#000000" },
      { x: 230, y: 20, w: 120, h: 80, color: "#ffc0cb" },
      { x: 370, y: 20, w: 60, h: 80, color: "#1e90ff" },
      { x: 20, y: 130, w: 120, h: 120, color: "#ffc0cb" },
      { x: 170, y: 150, w: 50, h: 70, color: "#6f93c6" },
      { x: 260, y: 120, w: 120, h: 120, color: "#808080" },
      { x: 410, y: 120, w: 60, h: 160, color: "#ffdd00" },
    ];

    function createSquaresFromLayout() {
      stage.innerHTML = "";
      layoutSpec.forEach((spec, i) => {
        const s = document.createElement("div");
        s.className = "square";
        s.dataset.index = i;
        s.style.position = "absolute";
        s.style.left = spec.x + "px";
        s.style.top = spec.y + "px";
        s.style.width = spec.w + "px";
        s.style.height = spec.h + "px";
        s.style.background = spec.color;
        s.style.borderWidth = "8px";
        s.tabIndex = 0;
        stage.appendChild(s);
      });
      attachSquareHandlers();
    }
    function createSquaresFromLayout(layout) {
      stage.innerHTML = "";
      const arr = layout && layout.length ? layout : layoutSpec;
      arr.forEach((spec, i) => {
        const s = document.createElement("div");
        s.className = "square";
        s.dataset.index = i;
        s.style.position = "absolute";
        s.style.left = (spec.x || 0) + "px";
        s.style.top = (spec.y || 0) + "px";
        s.style.width = (spec.w || 80) + "px";
        s.style.height = (spec.h || 60) + "px";
        s.style.background = spec.color || "#ffffff";
        s.style.borderWidth = spec.borderWidth || "8px";
        s.tabIndex = 0;
        // label indice
        const lbl = document.createElement("span");
        lbl.className = "idx-label";
        lbl.textContent = i;
        s.appendChild(lbl);
        stage.appendChild(s);
      });
      attachSquareHandlers();
    }

    function randomColorFromPalette(i) {
      const palette = [
        "#ffd1dc",
        "#4da6ff",
        "#b3b3b3",
        "#ffeb99",
        "#ffb3d9",
        "#a9a9f5",
        "#ffe0b3",
      ];
      return palette[i % palette.length];
    }

    const buttonsSpec = [
      { label: "Poner texto", action: putText },
      { label: "Cambiar color", action: changeColor },
      { label: "Color texto", action: changeTextColor },
      { label: "Alternar borde", action: toggleBorder },
      { label: "Aumentar", action: increaseSize },
      { label: "Reducir", action: decreaseSize },
      { label: "Girar", action: rotateSquare },
      { label: "Mover arriba", action: moveUp },
      { label: "Mover abajo", action: moveDown },
      { label: "Reset", action: resetSquare },
      { label: "Limpiar textos", action: clearTexts },
      { label: "Añadir cuadrado", action: addSquare },
      { label: "Eliminar último", action: removeSquare },
    ];

    function revealButtonsDynamically() {
      controls.innerHTML = "";
      let i = 0;
      const id = setInterval(() => {
        if (i >= buttonsSpec.length) {
          clearInterval(id);
          return;
        }
        const spec = buttonsSpec[i];
        const btn = document.createElement("button");
        btn.className = "control-btn small";
        btn.textContent = spec.label;
        btn.addEventListener("click", spec.action);
        controls.appendChild(btn);
        i++;
      }, 550);
    }

    // Selection and actions
    let selected = null;

    function attachSquareHandlers() {
      stage.querySelectorAll(".square").forEach((s) => {
        s.addEventListener("click", () => selectSquare(s));
        s.addEventListener("keydown", (e) => {
          if (e.key === "Enter") selectSquare(s);
        });
      });
    }
    function attachSquareHandlers() {
      stage.querySelectorAll(".square").forEach((s) => {
        s.addEventListener("click", () => selectSquare(s));
        s.addEventListener("keydown", (e) => {
          if (e.key === "Enter") selectSquare(s);
        });
        makeDraggable(s);
      });
    }

    function selectSquare(el) {
      if (selected) selected.classList.remove("selected");
      selected = el;
      if (selected) selected.classList.add("selected");
    }
    function selectSquare(el) {
      if (selected) selected.classList.remove("selected");
      selected = el;
      if (selected) selected.classList.add("selected");
      // actualizar panel
      updatePanelFor(selected);
    }

    // Panel controls
    const ctrlText = document.getElementById("ctrl-text");
    const ctrlBg = document.getElementById("ctrl-bg");
    const ctrlColor = document.getElementById("ctrl-color");
    const ctrlW = document.getElementById("ctrl-width");
    const ctrlH = document.getElementById("ctrl-height");
    const ctrlRotate = document.getElementById("ctrl-rotate");
    const ctrlX = document.getElementById("ctrl-x");
    const ctrlY = document.getElementById("ctrl-y");
    const selIndex = document.getElementById("sel-index");

    function updatePanelFor(sq) {
      if (!sq) {
        selIndex.textContent = "—";
        ctrlText.value = "";
        ctrlBg.value = "#ffffff";
        ctrlColor.value = "#000000";
        ctrlW.value = 100;
        ctrlH.value = 80;
        ctrlRotate.value = 0;
        ctrlX.value = 0;
        ctrlY.value = 0;
        return;
      }
      selIndex.textContent = sq.dataset.index;
      ctrlText.value = sq.textContent || "";
      // background color => convert rgb to hex if needed
      ctrlBg.value =
        rgbToHex(getComputedStyle(sq).backgroundColor) || "#ffffff";
      ctrlColor.value = rgbToHex(getComputedStyle(sq).color) || "#000000";
      ctrlW.value = parseInt(getComputedStyle(sq).width);
      ctrlH.value = parseInt(getComputedStyle(sq).height);
      const rot = sq.dataset.rotate ? parseInt(sq.dataset.rotate) : 0;
      ctrlRotate.value = rot;
      ctrlX.value = parseInt(sq.style.left || 0);
      ctrlY.value = parseInt(sq.style.top || 0);
    }

    function rgbToHex(rgb) {
      if (!rgb) return null;
      const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return null;
      return (
        "#" +
        [1, 2, 3]
          .map((i) => parseInt(m[i]).toString(16).padStart(2, "0"))
          .join("")
      );
    }

    // Bind panel events
    [
      ctrlText,
      ctrlBg,
      ctrlColor,
      ctrlW,
      ctrlH,
      ctrlRotate,
      ctrlX,
      ctrlY,
    ].forEach((el) => {
      el &&
        el.addEventListener("input", () => {
          if (!selected) return;
          applyPanelToSelected();
        });
    });

    function applyPanelToSelected() {
      if (!selected) return;
      selected.textContent = ctrlText.value;
      // re-add label
      let lbl = selected.querySelector(".idx-label");
      if (lbl) {
        selected.removeChild(lbl);
      }
      lbl = document.createElement("span");
      lbl.className = "idx-label";
      lbl.textContent = selected.dataset.index;
      selected.appendChild(lbl);
      selected.style.background = ctrlBg.value;
      selected.style.color = ctrlColor.value;
      selected.style.width = (parseInt(ctrlW.value) || 10) + "px";
      selected.style.height = (parseInt(ctrlH.value) || 10) + "px";
      selected.dataset.rotate = ctrlRotate.value;
      selected.style.transform = `rotate(${ctrlRotate.value}deg)`;
      selected.style.left = (parseInt(ctrlX.value) || 0) + "px";
      selected.style.top = (parseInt(ctrlY.value) || 0) + "px";
      saveLayoutToStorage();
    }

    // persistence
    const LS_KEY = "mulweb_layout_v1";
    function saveLayoutToStorage() {
      const arr = Array.from(stage.querySelectorAll(".square")).map((s) => ({
        x: parseInt(s.style.left) || 0,
        y: parseInt(s.style.top) || 0,
        w: parseInt(getComputedStyle(s).width) || 80,
        h: parseInt(getComputedStyle(s).height) || 60,
        color: s.style.background || getComputedStyle(s).backgroundColor,
        text: s.textContent || "",
        rotate: s.dataset.rotate || 0,
      }));
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    }

    function loadLayoutFromStorage() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }

    // export/import buttons
    const btnSave = document.getElementById("btn-save-layout");
    const btnReset = document.getElementById("btn-reset-all");
    const btnExport = document.getElementById("btn-export");
    const btnImport = document.getElementById("btn-import");
    const exportArea = document.getElementById("export-area");

    btnSave.addEventListener("click", () => {
      saveLayoutToStorage();
      alert("Layout guardado");
    });
    btnReset.addEventListener("click", () => {
      localStorage.removeItem(LS_KEY);
      createSquaresFromLayout();
      alert("Reset hecho");
    });
    btnExport.addEventListener("click", () => {
      exportArea.value = localStorage.getItem(LS_KEY) || "";
      alert("Copiado al área de texto");
    });
    btnImport.addEventListener("click", () => {
      try {
        const data = JSON.parse(exportArea.value);
        if (!Array.isArray(data)) throw new Error("JSON no válido");
        createSquaresFromLayout(data);
        saveLayoutToStorage();
        alert("Importado OK");
      } catch (err) {
        alert("Error importando JSON: " + err.message);
      }
    });

    // logout
    document.getElementById("btn-logout").addEventListener("click", () => {
      localStorage.removeItem("mulweb_logged");
      location.href = "login.html";
    });

    // drag implementation
    function makeDraggable(el) {
      let dragging = false,
        startX = 0,
        startY = 0,
        origX = 0,
        origY = 0;
      el.addEventListener("pointerdown", (ev) => {
        el.setPointerCapture(ev.pointerId);
        dragging = true;
        startX = ev.clientX;
        startY = ev.clientY;
        origX = parseInt(el.style.left || 0);
        origY = parseInt(el.style.top || 0);
      });
      el.addEventListener("pointermove", (ev) => {
        if (!dragging) return;
        const dx = ev.clientX - startX,
          dy = ev.clientY - startY;
        el.style.left = origX + dx + "px";
        el.style.top = origY + dy + "px";
      });
      el.addEventListener("pointerup", (ev) => {
        if (dragging) {
          dragging = false;
          saveLayoutToStorage();
          updatePanelFor(el);
        }
      });
      el.addEventListener("pointercancel", () => {
        dragging = false;
      });
    }

    function getTargetSquare() {
      if (selected) return selected;
      const idx = prompt("Índice del cuadrado (0..):");
      if (idx === null) return null;
      return stage.querySelector(`.square[data-index="${idx}"]`);
    }

    function putText() {
      const sq = getTargetSquare();
      if (!sq) return;
      const text = prompt("Texto a colocar:");
      if (text === null) return;
      sq.textContent = text;
    }
    function changeColor() {
      const sq = getTargetSquare();
      if (!sq) return;
      const color = prompt("Color CSS (nombre o hex):", "#ffffff");
      if (color === null) return;
      sq.style.background = color;
    }
    function changeTextColor() {
      const sq = getTargetSquare();
      if (!sq) return;
      const color = prompt("Color de texto CSS (nombre o hex):", "#000000");
      if (color === null) return;
      sq.style.color = color;
    }
    function toggleBorder() {
      const sq = getTargetSquare();
      if (!sq) return;
      const cur = parseInt(getComputedStyle(sq).borderWidth) || 0;
      sq.style.borderWidth = (cur > 8 ? 8 : 16) + "px";
    }
    function increaseSize() {
      const sq = getTargetSquare();
      if (!sq) return;
      const w = sq.offsetWidth + 20;
      const h = sq.offsetHeight + 20;
      sq.style.width = w + "px";
      sq.style.height = h + "px";
    }
    function decreaseSize() {
      const sq = getTargetSquare();
      if (!sq) return;
      const w = Math.max(30, sq.offsetWidth - 20);
      const h = Math.max(20, sq.offsetHeight - 20);
      sq.style.width = w + "px";
      sq.style.height = h + "px";
    }
    function rotateSquare() {
      const sq = getTargetSquare();
      if (!sq) return;
      const cur = sq.dataset.rotate ? parseInt(sq.dataset.rotate) : 0;
      const next = (cur + 15) % 360;
      sq.dataset.rotate = next;
      sq.style.transform = `rotate(${next}deg)`;
    }
    function moveUp() {
      const sq = getTargetSquare();
      if (!sq) return;
      const top = parseInt(sq.style.top || 0);
      sq.style.top = Math.max(0, top - 20) + "px";
    }
    function moveDown() {
      const sq = getTargetSquare();
      if (!sq) return;
      const top = parseInt(sq.style.top || 0);
      sq.style.top = top + 20 + "px";
    }
    function resetSquare() {
      const sq = getTargetSquare();
      if (!sq) return;
      const idx = parseInt(sq.dataset.index, 10);
      const spec = layoutSpec[idx];
      if (!spec) return;
      sq.style.left = spec.x + "px";
      sq.style.top = spec.y + "px";
      sq.style.width = spec.w + "px";
      sq.style.height = spec.h + "px";
      sq.style.background = spec.color;
      sq.style.transform = "none";
      sq.style.color = "#000";
      sq.dataset.rotate = 0;
    }
    function addSquare() {
      const count = stage.querySelectorAll(".square").length;
      const s = document.createElement("div");
      s.className = "square";
      s.dataset.index = count;
      s.style.position = "absolute";
      s.style.left = 10 + count * 10 + "px";
      s.style.top = 10 + count * 10 + "px";
      s.style.width = "80px";
      s.style.height = "60px";
      s.style.background = randomColorFromPalette(count);
      stage.appendChild(s);
      attachSquareHandlers();
    }
    function removeSquare() {
      const nodes = stage.querySelectorAll(".square");
      if (nodes.length === 0) return;
      const last = nodes[nodes.length - 1];
      last.remove();
    }
    function clearTexts() {
      stage.querySelectorAll(".square").forEach((s) => (s.textContent = ""));
    }

    // iniciar
    createSquaresFromLayout();
    revealButtonsDynamically();
  });
}
