import "./styles.css";
console.log("TypeScript with Vite is working!");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  // Валидация при вводе
  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", onEmailInput); // при уходе с поля

  let isValidEmail = false; // Переменная для хранения состояния валидации
  let lastValidEmail = ""; // Сохраняем последний валидный email

  function clearError() {
    emailError.textContent = "";
    emailInput.classList.remove("error");
  }

  function onEmailInput() {
    // При каждом вводе сбрасываем состояние, если email изменился
    const currentEmail = emailInput.value.trim();
    if (currentEmail !== lastValidEmail) {
      isValidEmail = false;
      clearError();
    }
  }

  // Валидация при отправке формы
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем стандартную отправку

    if (validateEmail()) {
      alert("Email корректен! Форма может быть отправлена.");
    }
  });

  function validateEmail() {
    const email = emailInput.value.trim();
    // Если уже был валидным и email не изменился - возвращаем true
    if (isValidEmail && email === lastValidEmail) {
      return true;
    }
    // Сброс ошибки
    emailError.textContent = "";
    emailInput.classList.remove("error", "success");

    function validationError(errorText) {
      emailError.textContent = errorText;
      emailInput.classList.add("error");
      emailInput.focus();
      isValidEmail = false;
      return false;
    }
    // Проверка на пустое поле
    if (!email) {
     return validationError("Email обязателен для заполнения");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Проверка формата email
    if (!emailRegex.test(email)) {
     return validationError("Введите корректный email (например: user@example.com)");
    }
    // Проверка длины домена
    const domainPart = email.split("@")[1];
    if (!domainPart) {
        return validationError("Некорректный email");
    }
    const domainName = domainPart.split(".")[0];
    if (domainName.length < 2) {
        return validationError("Некорректное имя домена");
    }

    // Успешная валидация
    emailInput.classList.add("success");
    isValidEmail = true;
    lastValidEmail = email; // Сохраняем валидный email
    return true;
  }
});
