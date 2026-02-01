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
    
// Простая отправка формы на почту
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim(),
        date: new Date().toLocaleString('ru-RU')
    };
    
    // Telegram данные
    const botToken = '8160715153:AAHuMwJCCKuqiiyUhfJY93CPHWtq9NlWZlM';
    const chatId = '-1003316496578';
    
    // 1. Отправляем в Telegram
    const telegramMessage = `
🎯 НОВАЯ ЗАЯВКА С САЙТА АКАЛАН
📅 ${formData.date}

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email}
💼 Услуга: ${formData.service || 'Не указана'}
📝 Сообщение: ${formData.message || 'Не указано'}

📍 akalan.ru
    `.trim();
    
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(telegramMessage)}`;
    
    // 2. Открываем почтовый клиент
    const mailtoLink = `mailto:akalan.HQ@yandex.ru?subject=Заявка с сайта от ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Новая заявка с сайта АКАЛАН

Дата: ${formData.date}
Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email}
Услуга: ${formData.service || 'Не указана'}
Сообщение: ${formData.message || 'Не указано'}

---
Отправлено с сайта akalan.ru`)}`;
    
    // Показываем индикатор
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Сначала отправляем в Telegram
    fetch(telegramUrl)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('✅ Сообщение в Telegram отправлено');
                
                // Затем открываем почтовый клиент
                setTimeout(() => {
                    window.location.href = mailtoLink;
                    
                    // Показываем сообщение
                    alert('✅ Заявка отправлена!\n\n1. Сообщение отправлено в Telegram группу\n2. Откроется почтовый клиент - нажмите "Отправить"\n\nМы свяжемся с вами в течение 24 часов!');
                    
                    modalOverlay.classList.remove('active');
                    appointmentForm.reset();
                    document.body.style.overflow = 'auto';
                }, 1000);
            } else {
                // Если Telegram не сработал, все равно открываем почту
                window.location.href = mailtoLink;
                alert('✅ Открывается почтовый клиент. Заполните письмо и нажмите "Отправить".');
                
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        })
        .catch(error => {
            // Если ошибка, все равно открываем почту
            window.location.href = mailtoLink;
            alert('📧 Заполните письмо и нажмите "Отправить".');
            
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
