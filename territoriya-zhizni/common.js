/* Общая часть всех шаблонов кузовного ремонта.
   Данные компании приходят из data.js (window.COMPANY), тексты по умолчанию — ниже (DEFAULTS).
   Любое поле из DEFAULTS можно переопределить в companies/<папка>/site.json. */
(function () {
  const DEFAULTS = {
    heroTitle: 'Кузовной ремонт, после которого не видно ремонта',
    servicesText: 'Металл, пластик, покраска и полировка — всё делаем сами. Цену называем до начала работ.',
    heroTitle3: 'Вернём кузову <em>заводской</em> вид',  // заголовок варианта 3 (слово в <em> — оранжевое)
    heroText: 'Покраска, рихтовка, полировка и восстановление геометрии. Пришлите фото повреждения — оценим стоимость за 15 минут.',
    services: [
      { t: 'Покраска элемента', d: 'Подбор цвета по коду краски, покраска бампера, двери, крыла, капота.' },
      { t: 'Локальный ремонт', d: 'Исправляем скол или царапину точечно, без покраски всей детали.' },
      { t: 'Рихтовка и вмятины', d: 'Вытягиваем вмятины, восстанавливаем форму металла.' },
      { t: 'Ремонт бамперов', d: 'Пайка пластика, восстановление креплений, покраска.' },
      { t: 'Полировка кузова', d: 'Убираем мелкие царапины и мутность, возвращаем блеск.' },
      { t: 'Геометрия кузова', d: 'Восстановление после ДТП на стапеле, замеры по контрольным точкам.' },
      { t: 'Сварочные работы', d: 'Ремонт порогов, арок, днища, замена кузовных элементов.' },
      { t: 'Полировка фар', d: 'Возвращаем прозрачность фарам — светят как новые.' },
    ],
    steps: [
      { t: 'Фото в WhatsApp', d: 'Сфотографируйте повреждение и отправьте нам.' },
      { t: 'Оценка за 15 минут', d: 'Назовём примерную стоимость и сроки.' },
      { t: 'Ремонт', d: 'Согласуем день, работаем аккуратно и в срок.' },
      { t: 'Выдача', d: 'Принимаете работу при дневном свете — без сюрпризов.' },
    ],
    advantages: [
      { n: '15 мин', t: 'оценка по фото' },
      { n: 'по коду', t: 'подбор краски' },
      { n: '1 день', t: 'на мелкий ремонт' },
    ],
    faq: [
      { q: 'Сколько стоит ремонт?', a: 'Зависит от повреждения. Пришлите фото в WhatsApp — назовём цену до приезда.' },
      { q: 'Сколько времени занимает?', a: 'Мелкий ремонт и покраска одного элемента — обычно 1–2 дня. Точный срок скажем после осмотра.' },
      { q: 'Цвет будет отличаться?', a: 'Подбираем краску по коду и проверяем на выкраске, чтобы оттенок совпал с кузовом.' },
      { q: 'Нужно записываться?', a: 'Лучше заранее — позвоните или напишите, подберём удобное время.' },
    ],
    footerText: 'Кузовной ремонт и покраска',
    pageTitle: '',  // заголовок вкладки; пусто — «<название> — кузовной ремонт во Владивостоке»
    manifest: 'Мы не просто красим детали. <span>Мы возвращаем машине вид, будто удара никогда и не было.</span>',  // вариант 8
    damageTypes: ['Царапина', 'Вмятина', 'Скол', 'После ДТП', 'Ржавчина', 'Полировка'],
    parts: ['Бампер', 'Дверь', 'Крыло', 'Капот', 'Багажник', 'Порог', 'Крыша', 'Несколько деталей'],
  };

  const C = Object.assign({}, DEFAULTS, window.COMPANY || {});
  C.hero = C.hero || (C.photos && C.photos[0] && C.photos[0].file);
  C.gallery = C.gallery || (C.photos || []).map(p => p.file);
  C.gallery = C.gallery.filter(f => f !== C.hero);  // главное фото не повторяем в галерее

  const digits = s => String(s || '').replace(/\D/g, '');
  const fmtPhone = p => {
    const d = digits(p);
    return d.length === 11 ? `+7 ${d.slice(1, 4)} ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}` : p;
  };
  const S = {
    data: C,
    phone: fmtPhone(C.phone),
    tel: 'tel:+' + digits(C.phone),
    wa: (text) => 'https://wa.me/' + digits(C.whatsapp || C.phone) +
      '?text=' + encodeURIComponent(text || `Здравствуйте! Пишу с сайта ${C.name}. Хочу узнать стоимость ремонта, фото пришлю.`),
    hasWa: !!C.whatsapp,
    map: `https://yandex.ru/map-widget/v1/?ll=${C.lon},${C.lat}&z=16&pt=${C.lon},${C.lat},pm2dgl`,
    route: `https://yandex.ru/maps/?rtext=~${C.lat},${C.lon}&rtt=auto`,
    rating: C.rating ? Number(C.rating).toFixed(1).replace('.', ',') : '',
    reviewsWord: n => {
      const a = n % 10, b = n % 100;
      return a === 1 && b !== 11 ? 'отзыв' : a >= 2 && a <= 4 && (b < 10 || b >= 20) ? 'отзыва' : 'отзывов';
    },
    date: d => new Date(d).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
    esc: s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch])),
    initials: n => n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    stars: (n = 5) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)),
    // Заполняет все элементы [data-f="поле"] текстом из данных
    fill(root = document) {
      root.querySelectorAll('[data-f]').forEach(el => {
        const v = el.dataset.f.split('.').reduce((o, k) => (o || {})[k], S.extra || C);
        if (v !== undefined && v !== null) el.textContent = v;
      });
      root.querySelectorAll('[data-href=tel]').forEach(a => (a.href = S.tel));
      root.querySelectorAll('[data-href=wa]').forEach(a => {
        if (S.hasWa) return (a.href = S.wa(a.dataset.text));
        // Нет WhatsApp — кнопка превращается в звонок
        if (a.parentElement && a.parentElement.querySelector('[data-href=tel]')) return a.remove();
        a.href = S.tel; a.removeAttribute('target');
        if (/whatsapp|фото/i.test(a.textContent)) a.textContent = 'Позвонить';
      });
      root.querySelectorAll('[data-href=route]').forEach(a => (a.href = S.route));
      root.querySelectorAll('[data-href=gis]').forEach(a => (a.href = C.url2gis));
      root.querySelectorAll('[data-phone]').forEach(el => (el.textContent = S.phone));
      root.querySelectorAll('[data-map]').forEach(f => (f.src = S.map));
      root.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));
      document.title = C.pageTitle || `${C.name} — кузовной ремонт во Владивостоке`;
    },
    // Плавное появление блоков при прокрутке
    reveal(selector = '.reveal') {
      const items = document.querySelectorAll(selector);
      if (/shot/.test(location.search)) {  // режим для скриншотов: всё видно сразу, высота экрана 900px
        document.head.insertAdjacentHTML('beforeend', '<style>.hero{min-height:900px!important}.strip{height:630px!important}.hero .pic{min-height:900px}</style>');
        return items.forEach(i => i.classList.add('in'));
      }
      if (!('IntersectionObserver' in window)) return items.forEach(i => i.classList.add('in'));
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach(i => io.observe(i));
    },
    // Убирает блоки, для которых у компании мало данных (и пункты меню на них)
    prune() {
      const drop = id => {
        const el = document.getElementById(id); if (el) el.remove();
        document.querySelectorAll(`a[href="#${id}"]`).forEach(a => a.remove());
      };
      if (!(C.reviews || []).length) drop('reviews');
      if (C.gallery.length < 3) drop('works');
    },
    // Сообщение для WhatsApp из мини-калькулятора
    quoteText(damage, part, car) {
      return `Здравствуйте! Пишу с сайта ${C.name}.\nПовреждение: ${damage || '—'}\nДеталь: ${part || '—'}\nАвто: ${car || '—'}\nФото сейчас пришлю.`;
    },
  };
  window.SITE = S;

  // Защита от неоплаты (поля в site.json):
  //   "paid": true      — клиент заплатил, плашки «Демо» нет;
  //   "disabled": true  — сайт выключен: вместо него «Сайт в разработке».
  document.addEventListener('DOMContentLoaded', () => {
    if (C.disabled) {
      document.title = 'Сайт в разработке';
      document.body.innerHTML = '<div style="min-height:100vh;display:grid;place-items:center;font:500 18px/1.5 system-ui,sans-serif;color:#6e6e73;background:#f5f5f7;text-align:center;padding:24px">Сайт в разработке</div>';
      return;
    }
    if (C.paid) return;
    const bar = document.createElement('div');
    bar.textContent = 'Демо-версия сайта';
    bar.setAttribute('style', 'position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:9999;' +
      'padding:4px 12px;border-radius:0 0 10px 10px;background:rgba(20,20,22,.78);color:#e5e5ea;' +
      'font:500 11px/1.3 system-ui,-apple-system,sans-serif;letter-spacing:.04em;backdrop-filter:blur(8px);pointer-events:none');
    document.body.appendChild(bar);
  });
})();
