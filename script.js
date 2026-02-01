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
    
 // Отправка формы в Telegram
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        date: new Date().toLocaleString('ru-RU')
    };
    
    // ВАШ chat_id (ЗАМЕНИТЕ НА СВОЙ!)
    const botToken = '8071734177:AAGFaOJqJLdtPSRj-zQQfk7mkiLsplFXUTE';
    const chatId = '-5063887745'; // ← ЗАМЕНИТЕ ЭТО!
    
    // Формируем сообщение
    const message = `🎯 НОВАЯ ЗАЯВКА С САЙТА АКАЛАН
📅 ${formData.date}
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email}
💼 Услуга: ${formData.service}
📝 Сообщение: ${formData.message || 'Не указано'}`;
    
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`;
    
    // Показываем индикатор загрузки
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Отправляем в Telegram
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в течение 24 часов.');
                modalOverlay.classList.remove('active');
                appointmentForm.reset();
                document.body.style.overflow = 'auto';
            } else {
                throw new Error(data.description || 'Ошибка отправки');
            }
        })
        .catch(error => {
            console.error('Ошибка Telegram:', error);
            
            // Резервный вариант - отправка на почту
            const mailtoLink = `mailto:akalan.HQ@yandex.ru?subject=Заявка с сайта&body=${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
            
            alert('📧 Если сообщение не отправилось автоматически, скопируйте данные и отправьте на почту: akalan.HQ@yandex.ru');
            
            // Закрываем модалку
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        })
        .finally(() => {
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
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
