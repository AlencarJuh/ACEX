const tema = document.getElementById("tema");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.toggle('tema-escuro');
}

tema.addEventListener("click", () => {
    document.documentElement.classList.toggle('tema-escuro');
});