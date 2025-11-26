// Мобильное меню
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Валидация формы
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Простая валидация
    if (!name) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }
    
    if (!message) {
        alert('Пожалуйста, введите сообщение');
        return;
    }
    
    alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

// Функционал загрузки фото
const fileInput = document.getElementById('file-input');
const selectBtn = document.getElementById('select-btn');
const uploadArea = document.getElementById('upload-area');
const previewContainer = document.getElementById('preview-container');

// Открыть диалог выбора файлов при клике на кнопку или область загрузки
selectBtn.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('click', () => fileInput.click());

// Предотвратить открытие диалога при клике внутри области загрузки
uploadArea.addEventListener('click', (e) => e.stopPropagation());

// Обработка выбора файлов
fileInput.addEventListener('change', function() {
    handleFiles(this.files);
});

// Поддержка drag and drop
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '#e8f4fc';
    this.style.borderColor = '#2980b9';
});

uploadArea.addEventListener('dragleave', function() {
    this.style.backgroundColor = '';
    this.style.borderColor = '#3498db';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '';
    this.style.borderColor = '#3498db';
    
    if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
    }
});

// Обработка загруженных файлов
function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Проверка типа файла
        if (!file.type.match('image.*')) {
            alert('Пожалуйста, загружайте только изображения (JPG, PNG, GIF)');
            continue;
        }
        
        // Проверка размера файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert(`Файл "${file.name}" слишком большой. Максимальный размер: 5MB`);
            continue;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Создание элемента превью
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Загруженное фото';
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.title = 'Удалить фото';
            removeBtn.onclick = function() {
                previewContainer.removeChild(previewItem);
            };
            
            previewItem.appendChild(img);
            previewItem.appendChild(removeBtn);
            previewContainer.appendChild(previewItem);
        };
        
        reader.onerror = function() {
            alert(`Ошибка при чтении файла: ${file.name}`);
        };
        
        reader.readAsDataURL(file);
    }
    
    // Сброс input для возможности повторной загрузки тех же файлов
    fileInput.value = '';
}

// Плавная прокрутка для всех внутренних ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Добавление класса при скролле для header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
