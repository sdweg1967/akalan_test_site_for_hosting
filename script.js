document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const appointmentBtn = document.getElementById('appointmentBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const appointmentForm = document.getElementById('appointmentForm');
    
    // Открытие модального окна
    appointmentBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие по клику вне модального окна
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Отправка формы (здесь нужно настроить на ваш сервис)
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString()
        };
        
        // ВАЖНО: Здесь нужно настроить отправку данных на ваш сервис
        // Пример для Formspree (бесплатный сервис отправки форм):
        // 1. Зарегистрируйтесь на formspree.io
        // 2. Создайте форму и получите endpoint
        // 3. Замените action формы в HTML на ваш endpoint
        
        // Пример для Telegram бота (нужно создать бота через @BotFather):
        // 1. Создайте бота и получите токен
        // 2. Получите chat_id (можно через @userinfobot)
        // 3. Используйте код ниже, раскомментировав его
        
        
        const botToken = '8242419469:AAHftp2x3w5IBaM40m9yQ5z7WMTmcRdK8lw';
        const chatId = '8242419469';
        const message = `Новая заявка от ${formData.name}%0AТелефон: ${formData.phone}%0AEmail: ${formData.email}%0AУслуга: ${formData.service}%0AСообщение: ${formData.message}`;
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=HTML`)
            .then(response => response.json())
            .then(data => {
                alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                modalOverlay.classList.remove('active');
                appointmentForm.reset();
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
            });
        
        
        // Временное решение - показываем сообщение
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время. На реальном сайте здесь будет отправка на ваш сервис.');
        modalOverlay.classList.remove('active');
        appointmentForm.reset();
        document.body.style.overflow = 'auto';
        
        // Для быстрого старта можно использовать Google Forms:
        // 1. Создайте форму в Google Forms
        // 2. Настройте вопросы
        // 3. В настройках формы получите ссылку для отправки
        // 4. Замените action формы в HTML на эту ссылку
    });
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navLinks.style.gap = '15px';
        }
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
    
    // Анимация при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .stat-item, .benefit');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Устанавливаем начальные стили для анимации
    document.querySelectorAll('.service-card, .feature, .stat-item, .benefit').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Запускаем сразу при загрузке
    animateOnScroll();
    
    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement && currentYear > 2023) {
        yearElement.textContent = yearElement.textContent.replace('2023', `2023-${currentYear}`);
    }
    
    // Интерактивные карточки услуг
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});