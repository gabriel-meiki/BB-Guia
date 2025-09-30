function mostrarTela(id) {
  // Esconde todas
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  // Mostra a escolhida
  document.getElementById(id).classList.add("ativa");
}

// Simula carregamento -> vai para login
window.addEventListener("load", () => {
  setTimeout(() => mostrarTela("login"), 1500);
});
