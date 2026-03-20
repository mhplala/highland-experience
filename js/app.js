// ===== Highland Explorer App =====
(function() {
  'use strict';

  // ===== Data =====
  const TRIP_START = new Date('2026-03-20T23:45:00Z'); // Departure from London Euston
  const TRIP_ARRIVE = new Date('2026-03-21T07:30:00Z'); // Arrival Glasgow

  const TRAIN_ROUTE = {
    from: { name: 'London Euston', lat: 51.5284, lng: -0.1331 },
    to: { name: 'Glasgow Central', lat: 55.8592, lng: -4.2584 },
    waypoints: [
      { name: 'Crewe', lat: 53.0886, lng: -2.4319, time: 0.2 },
      { name: 'Preston', lat: 53.7580, lng: -2.7041, time: 0.35 },
      { name: 'Carlisle', lat: 54.8924, lng: -2.9349, time: 0.55 },
      { name: 'Motherwell', lat: 55.7890, lng: -3.9951, time: 0.85 }
    ]
  };

  const SPOTS = [
    {
      id: 'glencoe',
      name: 'Glen Coe',
      tag: '必访',
      meta: '高地之心 · 壮丽峡谷',
      lat: 56.6823, lng: -5.1024,
      color: '#1a365d',
      gradient: 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
      subtitle: '苏格兰最戏剧性的峡谷',
      story: `Glen Coe（格伦科峡谷）是苏格兰高地最震撼人心的自然景观。这个U型冰川峡谷两侧是陡峭的山壁，云雾常年缭绕，仿佛走入了史诗电影的布景。\n\n1692年，这里发生了臭名昭著的"格伦科大屠杀"——坎贝尔氏族在此屠杀了麦克唐纳氏族38人。这段血腥的历史为这片土地增添了悲壮的色彩。\n\n现在的Glen Coe是徒步者的天堂。"Lost Valley"（失落山谷）是最经典的路线，穿过瀑布和巨石，到达一片隐秘的高山草甸。站在山顶，你会理解为什么苏格兰人说"自由是无价的"。`,
      facts: [
        { icon: '🏔', value: '1,150m', label: '最高峰' },
        { icon: '🌧', value: '3,000mm', label: '年降水量' },
        { icon: '🎬', value: '007', label: '天幕杀机取景地' },
        { icon: '🥾', value: '4-6h', label: '经典徒步' }
      ]
    },
    {
      id: 'skye',
      name: 'Isle of Skye',
      tag: '梦幻之岛',
      meta: '天空岛 · 仙境般的地貌',
      lat: 57.2736, lng: -6.2155,
      color: '#312e81',
      gradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
      subtitle: '维京人称之为"云雾之岛"',
      story: `Isle of Skye（天空岛）是苏格兰最浪漫的存在。维京人最早发现这座岛时，因为它常年被云雾笼罩，便称之为"Skuyö"——云雾之岛。\n\nOld Man of Storr是岛上最标志性的地貌——一根50米高的玄武岩柱矗立在悬崖之上，像一位永恒的守望者。Fairy Pools（仙女池）则是另一个奇迹，翡翠色的泉水在黑色岩石间流淌，据说夜间会有精灵在此沐浴。\n\n天空岛的天气瞬息万变——可能五分钟内经历阳光、暴雨、彩虹和冰雹。当地人说：如果你不喜欢现在的天气，等五分钟就好。这种不可预测性正是它的魅力。`,
      facts: [
        { icon: '🌊', value: '1,656km²', label: '岛屿面积' },
        { icon: '🧚', value: 'Fairy Pools', label: '仙女池' },
        { icon: '🦅', value: '白尾海雕', label: '特色物种' },
        { icon: '🌈', value: '频繁', label: '彩虹指数' }
      ]
    },
    {
      id: 'lochness',
      name: 'Loch Ness',
      tag: '传说',
      meta: '尼斯湖 · 水怪的故乡',
      lat: 57.3229, lng: -4.4244,
      color: '#064e3b',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
      subtitle: '世界上最神秘的湖泊',
      story: `Loch Ness（尼斯湖）全长37公里，最深处达230米，储水量比英格兰和威尔士所有湖泊的总和还要多。这片深邃的淡水湖因为一个传说而闻名世界——尼斯湖水怪。\n\n最早的记录可以追溯到公元565年，爱尔兰修道士圣科伦巴据称在湖中遇见了一只巨大的水怪。1933年的一张模糊照片（后被证明是恶作剧）让"Nessie"成为了全球最著名的密码动物学话题。\n\n不管水怪存不存在，尼斯湖本身就足够令人敬畏。湖水因为泥炭的缘故呈现深邃的墨色，能见度几乎为零。站在湖畔的Urquhart Castle废墟上远眺，你会感到一种原始的、不可名状的力量。`,
      facts: [
        { icon: '🐉', value: '1,000+', label: '目击报告' },
        { icon: '💧', value: '230m', label: '最深处' },
        { icon: '🏰', value: '13世纪', label: '城堡遗迹' },
        { icon: '📷', value: '声呐', label: '搜索手段' }
      ]
    },
    {
      id: 'edinburgh',
      name: 'Edinburgh',
      tag: '文化首都',
      meta: '爱丁堡 · 启蒙运动的摇篮',
      lat: 55.9533, lng: -3.1883,
      color: '#7c2d12',
      gradient: 'linear-gradient(135deg, #7c2d12 0%, #451a03 100%)',
      subtitle: '亚当·斯密在这里写下了《国富论》',
      story: `Edinburgh（爱丁堡）是一座建在七座山丘上的城市。旧城的Royal Mile从Edinburgh Castle一路延伸到Holyrood Palace，每一块石头都写满了故事。\n\n18世纪的苏格兰启蒙运动在这里达到顶峰——大卫·休谟在此质疑人类认知的本质，亚当·斯密写出了改变世界的《国富论》。这座城市当时被称为"北方的雅典"。\n\nArthur's Seat是爱丁堡的制高点，一座位于城市中心的古火山。站在山顶，你可以看到整座城市铺展在脚下——古老的尖塔、现代的新城、远处的福斯湾。黄昏时分，整座城市被金色的光芒笼罩，你会明白为什么J.K.罗琳选择在这里写《哈利·波特》。`,
      facts: [
        { icon: '📚', value: '1583', label: '大学创立' },
        { icon: '🎭', value: '最大', label: '艺术节' },
        { icon: '🏔', value: '251m', label: "亚瑟王座" },
        { icon: '🧙', value: 'HP', label: '创作之地' }
      ]
    },
    {
      id: 'bennevis',
      name: 'Ben Nevis',
      tag: '挑战',
      meta: '英国最高峰 · 1,345米',
      lat: 56.7969, lng: -5.0036,
      color: '#1e3a5f',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0c1929 100%)',
      subtitle: '站在不列颠群岛之巅',
      story: `Ben Nevis（本尼维斯山）海拔1,345米，是不列颠群岛的最高峰。每年约有15万人尝试登顶，但不要因此低估它的难度——山顶一年中有300天被云雾覆盖，天气可以在几分钟内从晴朗变为暴风雪。\n\n最常走的"Pony Track"路线全程约16公里，需要7-9小时。路线看似温和，但越往上走，风越大、温度越低。在夏天的山脚可能是20度，而山顶可能接近零度。\n\n登顶的那一刻——如果天气允许你看到风景的话——是令人终生难忘的。你的视野所及是整个苏格兰高地的山峦起伏，远处是大西洋的银色光芒。每一步都是对自我的征服。`,
      facts: [
        { icon: '⛰️', value: '1,345m', label: '海拔' },
        { icon: '⏱', value: '7-9h', label: '往返时间' },
        { icon: '🌡', value: '-17°C', label: '最低记录' },
        { icon: '👥', value: '15万/年', label: '攀登人数' }
      ]
    },
    {
      id: 'jacobite',
      name: 'Jacobite Steam Train',
      tag: '哈利波特',
      meta: '蒸汽火车 · Glenfinnan高架桥',
      lat: 56.8760, lng: -5.4386,
      color: '#991b1b',
      gradient: 'linear-gradient(135deg, #991b1b 0%, #450a0a 100%)',
      subtitle: '霍格沃茨特快的原型',
      story: `Jacobite Steam Train被誉为"世界上最伟大的铁路旅程"。这趟蒸汽火车从Fort William出发，穿越苏格兰高地最壮美的风景，终点站是渔港小镇Mallaig。\n\n旅程的高潮是穿越Glenfinnan Viaduct——一座建于1901年的21拱高架桥。没错，这就是《哈利·波特》电影中霍格沃茨特快列车驶过的那座桥。当火车缓缓驶上弧形的桥面，两侧是苍翠的山谷和远处闪光的湖面，蒸汽在桥拱间弥漫……这个画面你一定在电影里见过，但亲眼所见，震撼程度翻倍。\n\nGlenfinnan纪念碑矗立在湖畔，纪念的是1745年邦尼查理王子在此升起的詹姆斯党旗帜——一段浪漫而悲壮的反叛史。`,
      facts: [
        { icon: '🚂', value: '1901', label: '桥梁建成' },
        { icon: '🌉', value: '21拱', label: '高架桥' },
        { icon: '⚡', value: 'HP', label: '电影取景地' },
        { icon: '🎫', value: '84英里', label: '全程距离' }
      ]
    }
  ];

  const SCHEDULE = [
    { time: '3/20 周五 23:45', title: '🌙 卧铺夜车出发', desc: 'London Euston → Glasgow Central · Coach M, Room 8/9/10', status: 'done' },
    { time: '3/21 周六 07:30', title: '🌅 抵达格拉斯哥', desc: '与包车司机碰头', status: 'active' },
    { time: '3/21 周六 09:00', title: '🏞️ 罗蒙湖 Luss 小镇', desc: '湖畔散步 + 热咖啡', status: '' },
    { time: '3/21 周六 11:30', title: '⛰️ 格伦科峡谷 Glencoe', desc: '三姐妹山拍照 + 客栈简餐', status: '' },
    { time: '3/21 周六 15:00', title: '🏰 Isle of Eriska', desc: '跨私人小桥登岛 · 泳池/水疗/森林步道', status: '' },
    { time: '3/21 周六 19:00', title: '🍽️ 古堡晚宴', desc: '米其林推荐', status: '' },
    { time: '3/22 周日 09:00', title: '☀️ 苏格兰全套早餐', desc: '自然醒，悠闲退房', status: '' },
    { time: '3/22 周日 11:00', title: '🦞 Oban 海鲜之都', desc: 'Seafood Hut 生蚝/扇贝/龙虾', status: '' },
    { time: '3/22 周日 14:15', title: '🏚️ Kilchurn Castle', desc: 'Loch Awe 湖畔废墟拍照', status: '' },
    { time: '3/22 周日 18:00', title: '🍻 Glasgow 晚餐', desc: '市中心晚餐', status: '' },
    { time: '3/22 周日 23:15', title: '🚂 回程卧铺', desc: 'Club Twin升级版 · Coach L, Room 2/3/4', status: '' },
    { time: '3/23 周一 07:00', title: '💪 满血复活', desc: '抵达 London Euston，吃早餐，上班！', status: '' }
  ];

  const CHAT_MESSAGES = [
    { from: 'system', text: '🏔 苏格兰高地探险队 · 3月20-23日', time: '' },
    { from: 'wz', name: '王泽', text: '哥哥们，大家带好自己洗漱用品，酒店除了提供床之外，毛都不给', time: '19:30' },
    { from: 'wz', name: '王泽', text: '10:30 PM 在 Euston 车站集合！', time: '21:00' },
    { from: 'clc', name: '蔡李超', text: '我到了，在大厅等', time: '22:20' },
    { from: 'jxr', name: '靳雪荣', text: '出发了 差不多22:30到', time: '22:25' },
    { from: 'steve', name: 'Steve', text: '我2234', time: '22:26' },
    { from: 'wz', name: '王泽', text: '我还在洗澡…马上到！', time: '22:30' },
    { from: 'james', name: 'James', text: '记得带护照！', time: '22:31' },
    { from: 'cj', name: '蔡骏', text: '我在 Burger King', time: '22:35' },
    { from: 'clc', name: '蔡李超', text: '我买好牌了 🃏', time: '22:37' },
  ];

  // ===== State =====
  let currentPage = 'home';
  let map = null;
  let trainMarker = null;
  let photos = JSON.parse(localStorage.getItem('highland-photos') || '[]');
  let weatherData = null;

  // ===== Init =====
  function init() {
    // Splash screen
    setTimeout(() => {
      document.querySelector('.splash').classList.add('hide');
      document.querySelector('.app').classList.add('active');
      setTimeout(() => document.querySelector('.splash').remove(), 800);
    }, 2200);

    setupNav();
    renderHome();
    renderSpots();
    renderChat();
    renderPhotos();
    setupCountdown();
    fetchWeather();
    setupCamera();
    setupGestures();

    // PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    // Periodic train update
    setInterval(updateTrainPosition, 5000);
  }

  // ===== Navigation =====
  function setupNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        navigateTo(page);
      });
    });
  }

  function navigateTo(page) {
    if (page === currentPage) return;
    currentPage = page;

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    const target = document.querySelector(`.page-${page}`);
    if (target) {
      target.style.display = 'block';
      // Force reflow for animation
      void target.offsetHeight;
      target.classList.add('active');
    }

    // Show camera button only on photos page
    const camBtn = document.querySelector('.photo-capture-btn');
    if (camBtn) {
      camBtn.classList.toggle('visible', page === 'photos');
    }

    // Init map when switching to map page
    if (page === 'map' && !map) {
      setTimeout(initMap, 100);
    }

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(10);
  }

  // ===== Home Page =====
  function renderHome() {
    updateWeatherWidget();
    renderSchedule();
  }

  function renderSchedule() {
    const container = document.getElementById('schedule-timeline');
    if (!container) return;
    container.innerHTML = SCHEDULE.map(item => `
      <div class="timeline-item ${item.status}">
        <div class="timeline-dot"></div>
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      </div>
    `).join('');
  }

  // ===== Countdown =====
  function setupCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = TRIP_START - now;

    const el = document.getElementById('countdown');
    if (!el) return;

    if (diff <= 0) {
      // Trip started, show arrival countdown or elapsed
      const arrDiff = TRIP_ARRIVE - now;
      if (arrDiff > 0) {
        const h = Math.floor(arrDiff / 3600000);
        const m = Math.floor((arrDiff % 3600000) / 60000);
        el.innerHTML = `
          <div class="countdown-item"><div class="countdown-num">${h}</div><div class="countdown-label">小时</div></div>
          <div class="countdown-item"><div class="countdown-num">${String(m).padStart(2,'0')}</div><div class="countdown-label">分钟</div></div>
          <div class="countdown-item" style="background:rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.2)"><div class="countdown-num" style="color:var(--highland-green)">🚂</div><div class="countdown-label">途中</div></div>
        `;
      } else {
        el.innerHTML = `<div class="countdown-item" style="background:rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.2);min-width:auto;padding:0.6rem 1.5rem"><div class="countdown-num" style="color:var(--highland-green)">✓</div><div class="countdown-label">旅程进行中</div></div>`;
      }
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.innerHTML = `
      <div class="countdown-item"><div class="countdown-num">${d}</div><div class="countdown-label">天</div></div>
      <div class="countdown-item"><div class="countdown-num">${String(h).padStart(2,'0')}</div><div class="countdown-label">小时</div></div>
      <div class="countdown-item"><div class="countdown-num">${String(m).padStart(2,'0')}</div><div class="countdown-label">分钟</div></div>
      <div class="countdown-item"><div class="countdown-num">${String(s).padStart(2,'0')}</div><div class="countdown-label">秒</div></div>
    `;
  }

  // ===== Weather =====
  async function fetchWeather() {
    try {
      // Use Open-Meteo free API for Glasgow/Highland area
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=56.82&longitude=-5.10&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/London&forecast_days=5');
      weatherData = await res.json();
      updateWeatherWidget();
    } catch(e) {
      console.log('Weather fetch failed, using fallback');
      weatherData = {
        current: { temperature_2m: 8, weather_code: 3, wind_speed_10m: 25, relative_humidity_2m: 78 },
        daily: {
          time: ['2026-04-10','2026-04-11','2026-04-12','2026-04-13','2026-04-14'],
          weather_code: [3, 61, 2, 80, 1],
          temperature_2m_max: [10, 9, 12, 8, 13],
          temperature_2m_min: [4, 3, 5, 2, 6],
          precipitation_probability_max: [20, 70, 30, 80, 15]
        }
      };
      updateWeatherWidget();
    }
  }

  function getWeatherEmoji(code) {
    if (code <= 1) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 57) return '🌧️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '🌨️';
    if (code <= 82) return '🌦️';
    if (code <= 86) return '❄️';
    return '⛈️';
  }

  function getWeatherDesc(code) {
    if (code <= 1) return '晴朗';
    if (code <= 3) return '多云';
    if (code <= 48) return '雾';
    if (code <= 57) return '毛毛雨';
    if (code <= 67) return '降雨';
    if (code <= 77) return '降雪';
    if (code <= 82) return '阵雨';
    if (code <= 86) return '暴风雪';
    return '雷暴';
  }

  function updateWeatherWidget() {
    const widget = document.getElementById('weather-widget');
    const alert = document.getElementById('weather-alert');
    if (!widget) return;

    if (!weatherData) {
      widget.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem">🌍 正在获取高地天气...</div>';
      return;
    }

    const c = weatherData.current;
    const d = weatherData.daily;
    widget.innerHTML = `
      <div class="weather-icon">${getWeatherEmoji(c.weather_code)}</div>
      <div>
        <div class="weather-temp">${Math.round(c.temperature_2m)}°C</div>
        <div class="weather-details">
          ${getWeatherDesc(c.weather_code)} · 风速 ${c.wind_speed_10m}km/h<br>
          湿度 ${c.relative_humidity_2m}% · Glen Coe地区
        </div>
      </div>
    `;

    // 5-day forecast strip
    if (d && d.time) {
      const forecastEl = document.getElementById('weather-forecast');
      if (forecastEl) {
        forecastEl.innerHTML = d.time.map((t, i) => {
          const day = new Date(t).toLocaleDateString('zh-CN', { weekday: 'short' });
          return `
            <div style="text-align:center;min-width:60px">
              <div style="font-size:0.7rem;color:var(--text-muted)">${day}</div>
              <div style="font-size:1.5rem;margin:0.25rem 0">${getWeatherEmoji(d.weather_code[i])}</div>
              <div style="font-size:0.75rem">${d.temperature_2m_max[i]}° / ${d.temperature_2m_min[i]}°</div>
              ${d.precipitation_probability_max[i] > 50 ? `<div style="font-size:0.65rem;color:var(--highland-amber)">💧${d.precipitation_probability_max[i]}%</div>` : ''}
            </div>
          `;
        }).join('');
      }
    }

    // Weather alert
    if (alert && d) {
      const rainIdx = d.precipitation_probability_max.findIndex(p => p > 60);
      if (rainIdx >= 0) {
        const day = new Date(d.time[rainIdx]).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
        alert.innerHTML = `⚠️ <span>${day} 降雨概率 ${d.precipitation_probability_max[rainIdx]}%，建议携带防水装备</span>`;
        alert.style.display = 'flex';
      } else {
        alert.style.display = 'none';
      }
    }
  }

  // ===== Train Tracker =====
  function getTrainProgress() {
    const now = new Date();
    if (now < TRIP_START) return -1; // Not departed
    if (now > TRIP_ARRIVE) return 1.01; // Arrived
    return (now - TRIP_START) / (TRIP_ARRIVE - TRIP_START);
  }

  function getTrainPosition(progress) {
    if (progress < 0) return TRAIN_ROUTE.from;
    if (progress > 1) return TRAIN_ROUTE.to;
    const from = TRAIN_ROUTE.from;
    const to = TRAIN_ROUTE.to;
    return {
      lat: from.lat + (to.lat - from.lat) * progress,
      lng: from.lng + (to.lng - from.lng) * progress
    };
  }

  function updateTrainPosition() {
    const progress = getTrainProgress();
    const bar = document.getElementById('train-progress');
    const status = document.getElementById('train-status');
    const info = document.getElementById('train-info');

    if (bar) {
      const pct = Math.max(0, Math.min(100, progress * 100));
      bar.style.width = pct + '%';
    }

    if (status) {
      if (progress < 0) {
        status.textContent = '等待出发';
        status.style.color = 'var(--highland-amber)';
      } else if (progress > 1) {
        status.textContent = '已到达 Glasgow';
        status.style.color = 'var(--highland-green)';
      } else {
        status.textContent = '行驶中';
        status.style.color = 'var(--highland-green)';
      }
    }

    if (info) {
      const pos = getTrainPosition(Math.max(0, Math.min(1, progress)));
      const speed = progress >= 0 && progress <= 1 ? Math.round(80 + Math.random() * 40) : 0;
      const remaining = progress >= 0 && progress <= 1
        ? Math.round((1 - progress) * (TRIP_ARRIVE - TRIP_START) / 60000)
        : 0;
      const remH = Math.floor(remaining / 60);
      const remM = remaining % 60;

      info.innerHTML = `
        <div class="train-info-item">
          <div class="train-info-value">${speed} km/h</div>
          <div class="train-info-label">当前速度</div>
        </div>
        <div class="train-info-item">
          <div class="train-info-value">${progress > 1 ? '已到达' : progress < 0 ? '待出发' : remH + 'h ' + remM + 'm'}</div>
          <div class="train-info-label">预计剩余</div>
        </div>
        <div class="train-info-item">
          <div class="train-info-value">${pos.lat.toFixed(2)}°N</div>
          <div class="train-info-label">纬度</div>
        </div>
        <div class="train-info-item">
          <div class="train-info-value">${Math.abs(pos.lng).toFixed(2)}°W</div>
          <div class="train-info-label">经度</div>
        </div>
      `;
    }

    // Update map marker
    if (map && trainMarker && progress >= 0 && progress <= 1) {
      const pos = getTrainPosition(progress);
      trainMarker.setLatLng([pos.lat, pos.lng]);
    }
  }

  // ===== Map =====
  function initMap() {
    if (map) return;
    const container = document.getElementById('map');
    if (!container) return;

    map = L.map('map', {
      center: [56.8, -5.0],
      zoom: 7,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18
    }).addTo(map);

    // Add spot markers
    SPOTS.forEach(spot => {
      const marker = L.circleMarker([spot.lat, spot.lng], {
        radius: 8,
        fillColor: '#3b82f6',
        color: '#1e40af',
        weight: 2,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;padding:0.25rem">
          <strong>${spot.name}</strong><br>
          <span style="font-size:0.8rem;color:#666">${spot.meta}</span>
        </div>
      `);
    });

    // Train route line
    const routeCoords = [
      [TRAIN_ROUTE.from.lat, TRAIN_ROUTE.from.lng],
      ...TRAIN_ROUTE.waypoints.map(w => [w.lat, w.lng]),
      [TRAIN_ROUTE.to.lat, TRAIN_ROUTE.to.lng]
    ];
    L.polyline(routeCoords, {
      color: '#3b82f6', weight: 3,
      opacity: 0.6, dashArray: '8 8'
    }).addTo(map);

    // Train marker
    const trainIcon = L.divIcon({
      html: '<div style="font-size:1.5rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">🚂</div>',
      className: '', iconSize: [30, 30], iconAnchor: [15, 15]
    });

    const progress = getTrainProgress();
    const pos = getTrainPosition(Math.max(0, Math.min(1, progress)));
    trainMarker = L.marker([pos.lat, pos.lng], { icon: trainIcon }).addTo(map);

    // Station markers
    [TRAIN_ROUTE.from, TRAIN_ROUTE.to].forEach(s => {
      L.circleMarker([s.lat, s.lng], {
        radius: 6, fillColor: '#22c55e',
        color: '#166534', weight: 2, fillOpacity: 0.9
      }).addTo(map).bindPopup(`<strong>${s.name}</strong>`);
    });

    setTimeout(() => map.invalidateSize(), 200);
  }

  // ===== Spots =====
  function renderSpots() {
    const grid = document.getElementById('spots-grid');
    if (!grid) return;

    grid.innerHTML = SPOTS.map(spot => `
      <div class="spot-card" data-id="${spot.id}" onclick="app.openSpot('${spot.id}')">
        <div class="spot-bg" style="background:${spot.gradient}"></div>
        <div class="spot-overlay"></div>
        <div class="spot-360" onclick="event.stopPropagation();app.open360('${spot.id}')">360°</div>
        <div class="spot-content">
          <span class="spot-tag">${spot.tag}</span>
          <div class="spot-name">${spot.name}</div>
          <div class="spot-meta">${spot.meta}</div>
        </div>
      </div>
    `).join('');
  }

  function openSpot(id) {
    const spot = SPOTS.find(s => s.id === id);
    if (!spot) return;

    const modal = document.getElementById('spot-modal');
    const content = modal.querySelector('.modal-body');
    const hero = modal.querySelector('.modal-hero');

    hero.style.background = spot.gradient;

    content.innerHTML = `
      <div class="modal-title">${spot.name}</div>
      <div class="modal-subtitle">${spot.subtitle}</div>
      <div class="modal-text">${spot.story.replace(/\n\n/g, '</p><p class="modal-text">')}</div>
      <div class="modal-facts">
        ${spot.facts.map(f => `
          <div class="modal-fact">
            <div class="modal-fact-icon">${f.icon}</div>
            <div class="modal-fact-value">${f.value}</div>
            <div class="modal-fact-label">${f.label}</div>
          </div>
        `).join('')}
      </div>
      <div class="flex gap-sm">
        <button class="btn btn-primary" onclick="app.open360('${spot.id}')">🔄 360°全景</button>
        <button class="btn btn-ghost" onclick="app.closeModal()">关闭</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('spot-modal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== 360° Viewer =====
  function open360(id) {
    const spot = SPOTS.find(s => s.id === id);
    if (!spot) return;

    closeModal();
    const viewer = document.getElementById('viewer-360');
    const scene = viewer.querySelector('.viewer-360-scene');
    const title = viewer.querySelector('.viewer-360-title');

    title.textContent = spot.name;

    // Real panoramic images from Wikimedia Commons (public domain / CC)
    const panoramaUrls = {
      glencoe: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Glencoe_panorama.jpg/2560px-Glencoe_panorama.jpg',
      skye: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Old_Man_of_Storr%2C_Isle_of_Skye%2C_Scotland_-_Diliff.jpg/2560px-Old_Man_of_Storr%2C_Isle_of_Skye%2C_Scotland_-_Diliff.jpg',
      lochness: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Loch_Ness_from_A82_road.jpg/2560px-Loch_Ness_from_A82_road.jpg',
      edinburgh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Edinburgh_from_Arthur%27s_Seat.jpg/2560px-Edinburgh_from_Arthur%27s_Seat.jpg',
      bennevis: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Ben_Nevis_from_Banavie.jpg/2560px-Ben_Nevis_from_Banavie.jpg',
      jacobite: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Glenfinnan_Viaduct.jpg/2560px-Glenfinnan_Viaduct.jpg'
    };

    const imgUrl = panoramaUrls[spot.id];
    if (imgUrl) {
      scene.style.backgroundImage = `url(${imgUrl})`;
      scene.style.backgroundSize = 'auto 100%';
      scene.style.backgroundRepeat = 'repeat-x';
      scene.style.backgroundPosition = '0% 50%';
    } else {
      scene.style.background = spot.gradient;
      scene.style.backgroundSize = '200% 200%';
    }

    // Drag to pan panorama
    let dragging = false, startX = 0, startY = 0, bgX = 0, bgY = 50;

    const onMove = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      bgX += (clientX - startX) * 0.3;
      bgY += (clientY - startY) * 0.1;
      bgY = Math.max(20, Math.min(80, bgY));
      scene.style.backgroundPosition = `${bgX}px ${bgY}%`;
      startX = clientX; startY = clientY;
    };

    const onStart = (e) => {
      dragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
    };

    const onEnd = () => { dragging = false; };

    scene.onmousedown = onStart; scene.ontouchstart = onStart;
    document.onmousemove = onMove; document.ontouchmove = onMove;
    document.onmouseup = onEnd; document.ontouchend = onEnd;

    viewer.classList.add('active');
  }

  function close360() {
    document.getElementById('viewer-360').classList.remove('active');
  }

  // ===== Chat =====
  function renderChat() {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;

    // Render existing messages
    CHAT_MESSAGES.forEach(msg => addChatMessage(msg, false));
    msgs.scrollTop = msgs.scrollHeight;

    // Send button
    const sendBtn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');

    sendBtn?.addEventListener('click', () => sendChatMessage());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });

    // Voice recording
    const voiceBtn = document.getElementById('chat-voice');
    voiceBtn?.addEventListener('click', toggleVoiceRecording);
  }

  function addChatMessage(msg, animate = true) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;

    const div = document.createElement('div');

    if (msg.from === 'system') {
      div.className = 'chat-msg incoming';
      div.style.background = 'rgba(59,130,246,0.1)';
      div.style.border = '1px solid rgba(59,130,246,0.2)';
      div.style.maxWidth = '100%';
      div.style.textAlign = 'center';
      div.style.fontSize = '0.8rem';
      div.innerHTML = msg.text;
    } else if (msg.from === 'me') {
      div.className = 'chat-msg outgoing';
      div.innerHTML = `${msg.text}<div class="chat-msg-meta">${msg.time}</div>`;
    } else {
      div.className = 'chat-msg incoming';
      div.innerHTML = `<div style="font-size:0.7rem;font-weight:600;color:var(--accent);margin-bottom:0.2rem">${msg.name}</div>${msg.text}<div class="chat-msg-meta">${msg.time}</div>`;
    }

    if (!animate) div.style.animation = 'none';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input?.value.trim();
    if (!text) return;

    const now = new Date();
    const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');

    addChatMessage({ from: 'me', text, time });
    input.value = '';

    // Simulate response
    setTimeout(() => {
      const responses = [
        { from: 'wz', name: '王泽', text: '收到！大家记得带护照 🛂' },
        { from: 'james', name: 'James', text: '好的好的 👍' },
        { from: 'clc', name: '蔡李超', text: '了解！🃏' },
        { from: 'jxr', name: '靳雪荣', text: '在路上了 🚶' },
        { from: 'cj', name: '蔡骏', text: 'OK 收到 ✅' },
        { from: 'steve', name: 'Steve', text: '👍' },
      ];
      const resp = responses[Math.floor(Math.random() * responses.length)];
      resp.time = time;
      addChatMessage(resp);
    }, 1000 + Math.random() * 2000);
  }

  // Voice Recording
  let mediaRecorder = null;
  let audioChunks = [];

  function toggleVoiceRecording() {
    const btn = document.getElementById('chat-voice');
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      btn.classList.remove('recording');
      return;
    }

    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          const now = new Date();
          const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
          addChatMessage({ from: 'me', text: '🎙️ [语音消息 ' + Math.round(audioChunks.length * 0.5) + 's]', time });
          showToast('🎙️ 语音消息已发送');
        };
        mediaRecorder.start(500);
        btn.classList.add('recording');
        showToast('🎙️ 录音中...');
      })
      .catch(() => showToast('❌ 无法访问麦克风'));
  }

  // ===== Photos =====
  function renderPhotos() {
    const container = document.getElementById('photo-timeline');
    if (!container) return;

    // Only real photos (user-captured)
    const allPhotos = [...photos];

    // Group by date
    const groups = {};
    allPhotos.forEach(p => {
      const d = p.date || new Date().toISOString().slice(0,10);
      if (!groups[d]) groups[d] = [];
      groups[d].push(p);
    });

    const sortedDates = Object.keys(groups).sort().reverse();

    if (sortedDates.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:3rem 1rem;color:var(--text-muted)">
          <div style="font-size:3rem;margin-bottom:1rem">📸</div>
          <div style="font-size:1.1rem;margin-bottom:0.5rem">还没有照片</div>
          <div style="font-size:0.85rem">点击右下角相机按钮开始记录高地之旅！</div>
        </div>
      `;
      return;
    }

    container.innerHTML = sortedDates.map(date => {
      const label = new Date(date + 'T00:00:00').toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
      return `
        <div class="photo-day">
          <div class="photo-day-label">${label}</div>
          <div class="photo-grid">
            ${groups[date].map(p => `
              <div class="photo-thumb" 
                style="background:${p.src ? `url(${p.src})` : p.color || '#333'}" 
                onclick="app.viewPhoto('${p.id}')">
                <span class="photo-loc">📍 ${p.location || '未知'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function viewPhoto(id) {
    const viewer = document.getElementById('photo-viewer');
    if (!viewer) return;
    // For demo, show a placeholder
    viewer.querySelector('img').src = 'data:image/svg+xml,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#1a365d"/><text x="400" y="300" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">📸 ${id}</text></svg>`
    );
    viewer.classList.add('active');
  }

  function closePhotoViewer() {
    document.getElementById('photo-viewer')?.classList.remove('active');
  }

  // ===== Camera =====
  function setupCamera() {
    const captureBtn = document.querySelector('.photo-capture-btn');
    captureBtn?.addEventListener('click', openCamera);
  }

  function openCamera() {
    const modal = document.getElementById('camera-modal');
    const video = modal?.querySelector('video');
    if (!modal || !video) return;

    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        video.srcObject = stream;
        video.play();
        modal.classList.add('active');

        // Shutter
        const shutter = modal.querySelector('.camera-shutter');
        shutter.onclick = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

          // Save
          const photo = {
            id: 'photo_' + Date.now(),
            src: dataUrl,
            date: new Date().toISOString().slice(0,10),
            time: new Date().toTimeString().slice(0,5),
            location: '当前位置'
          };
          photos.push(photo);
          try { localStorage.setItem('highland-photos', JSON.stringify(photos)); } catch(e) {}

          // Flash effect
          const flash = document.createElement('div');
          flash.style.cssText = 'position:fixed;inset:0;background:white;z-index:999;animation:fadeIn 0.1s ease reverse';
          document.body.appendChild(flash);
          setTimeout(() => flash.remove(), 150);

          showToast('📸 照片已保存');
          renderPhotos();
          closeCamera();
        };
      })
      .catch(() => showToast('❌ 无法访问相机'));
  }

  function closeCamera() {
    const modal = document.getElementById('camera-modal');
    const video = modal?.querySelector('video');
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach(t => t.stop());
      video.srcObject = null;
    }
    modal?.classList.remove('active');
  }

  // ===== Gestures =====
  function setupGestures() {
    let touchStartY = 0;
    const modal = document.getElementById('spot-modal');

    modal?.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    modal?.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientY - touchStartY;
      if (diff > 100) closeModal();
    });

    // Swipe between pages
    let swipeStartX = 0;
    const pages = ['home', 'map', 'explore', 'chat', 'photos'];

    document.addEventListener('touchstart', (e) => {
      swipeStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - swipeStartX;
      if (Math.abs(diff) < 80) return;
      const idx = pages.indexOf(currentPage);
      if (diff > 0 && idx > 0) navigateTo(pages[idx - 1]);
      if (diff < 0 && idx < pages.length - 1) navigateTo(pages[idx + 1]);
    }, { passive: true });
  }

  // ===== Toast =====
  function showToast(text) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== Export photos =====
  function exportPhotos() {
    const data = JSON.stringify(photos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'highland-photos.json';
    a.click(); URL.revokeObjectURL(url);
    showToast('📦 照片数据已导出');
  }

  // ===== Public API =====
  window.app = {
    openSpot, closeModal, open360, close360,
    viewPhoto, closePhotoViewer, closeCamera,
    exportPhotos, navigateTo
  };

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
