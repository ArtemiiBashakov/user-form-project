import './styles.css';
console.log('TypeScript with Vite is working!');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Валидация при вводе
    emailInput.addEventListener('input', function() {
        validateEmail();
    });

    // Валидация при отправке формы
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault(); // Отменяем стандартную отправку
        
    //     if (validateEmail()) {
    //         alert('Email корректен! Форма может быть отправлена.');
    //         // form.submit(); // Раскомментируйте для реальной отправки
    //     }
    // });

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Сброс ошибки
        emailError.textContent = '';
        emailInput.classList.remove('error');
        
        // Проверка на пустое поле
        if (!email) {
            emailError.textContent = 'Email обязателен для заполнения';
            emailInput.classList.add('error');
            return false;
        }
        
        // Проверка формата email
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Введите корректный email (например: user@example.com)';
            emailInput.classList.add('error');
            return false;
        }
        
        // Проверка длины домена
        const domainPart = email.split('@')[1];
        if (domainPart.split('.')[0].length < 2) {
            emailError.textContent = 'Некорректное имя домена';
            emailInput.classList.add('error');
            return false;
        }
        
        // Успешная валидация
        emailInput.classList.add('success');
        return true;
    }
});