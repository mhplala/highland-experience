// ===== Highland Explorer App =====
(function() {
  'use strict';

  // ===== Data =====
  const TRIP_START = new Date('2026-03-20T23:45:00Z');
  const TRIP_ARRIVE = new Date('2026-03-21T07:30:00Z');

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
      id: 'glencoe', name: 'Glen Coe', tag: '必访', meta: '高地之心 · 壮丽峡谷',
      lat: 56.6823, lng: -5.1024, color: '#1a365d',
      cover: 'https://images.unsplash.com/photo-1564399579-41e7760209e2?w=600&q=80',
      gradient: 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
      subtitle: '苏格兰最戏剧性的峡谷',
      story: `Glen Coe（格伦科峡谷）是苏格兰高地最震撼人心的自然景观。这个U型冰川峡谷两侧是陡峭的山壁，云雾常年缭绕，仿佛走入了史诗电影的布景。\n\n1692年，这里发生了臭名昭著的"格伦科大屠杀"——坎贝尔氏族在此屠杀了麦克唐纳氏族38人。\n\n现在的Glen Coe是徒步者的天堂。"Lost Valley"是最经典的路线，穿过瀑布和巨石，到达一片隐秘的高山草甸。`,
      facts: [
        { icon: '🏔', value: '1,150m', label: '最高峰' },
        { icon: '🌧', value: '3,000mm', label: '年降水量' },
        { icon: '🎬', value: '007', label: '天幕杀机取景地' },
        { icon: '🥾', value: '4-6h', label: '经典徒步' }
      ]
    },
    {
      id: 'skye', name: 'Isle of Skye', tag: '梦幻之岛', meta: '天空岛 · 仙境般的地貌',
      lat: 57.2736, lng: -6.2155, color: '#312e81',
      cover: 'https://images.unsplash.com/photo-1519998370-a8dcac9ec0fb?w=600&q=80',
      gradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
      subtitle: '维京人称之为"云雾之岛"',
      story: `Isle of Skye（天空岛）是苏格兰最浪漫的存在。Old Man of Storr是岛上最标志性的地貌——一根50米高的玄武岩柱矗立在悬崖之上。Fairy Pools（仙女池）则是另一个奇迹，翡翠色的泉水在黑色岩石间流淌。`,
      facts: [
        { icon: '🌊', value: '1,656km²', label: '岛屿面积' },
        { icon: '🧚', value: 'Fairy Pools', label: '仙女池' },
        { icon: '🦅', value: '白尾海雕', label: '特色物种' },
        { icon: '🌈', value: '频繁', label: '彩虹指数' }
      ]
    },
    {
      id: 'lochness', name: 'Loch Ness', tag: '传说', meta: '尼斯湖 · 水怪的故乡',
      lat: 57.3229, lng: -4.4244, color: '#064e3b',
      cover: 'https://images.unsplash.com/photo-1580752527233-3928a13df98a?w=600&q=80',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
      subtitle: '世界上最神秘的湖泊',
      story: `Loch Ness（尼斯湖）全长37公里，最深处达230米，储水量比英格兰和威尔士所有湖泊的总和还要多。这片深邃的淡水湖因为尼斯湖水怪传说而闻名世界。`,
      facts: [
        { icon: '🐉', value: '1,000+', label: '目击报告' },
        { icon: '💧', value: '230m', label: '最深处' },
        { icon: '🏰', value: '13世纪', label: '城堡遗迹' },
        { icon: '📷', value: '声呐', label: '搜索手段' }
      ]
    },
    {
      id: 'edinburgh', name: 'Edinburgh', tag: '文化首都', meta: '爱丁堡 · 启蒙运动的摇篮',
      lat: 55.9533, lng: -3.1883, color: '#7c2d12',
      cover: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=600&q=80',
      gradient: 'linear-gradient(135deg, #7c2d12 0%, #451a03 100%)',
      subtitle: '亚当·斯密在这里写下了《国富论》',
      story: `Edinburgh（爱丁堡）是一座建在七座山丘上的城市。18世纪的苏格兰启蒙运动在这里达到顶峰——大卫·休谟在此质疑人类认知的本质，亚当·斯密写出了《国富论》。`,
      facts: [
        { icon: '📚', value: '1583', label: '大学创立' },
        { icon: '🎭', value: '最大', label: '艺术节' },
        { icon: '🏔', value: '251m', label: '亚瑟王座' },
        { icon: '🧙', value: 'HP', label: '创作之地' }
      ]
    },
    {
      id: 'bennevis', name: 'Ben Nevis', tag: '挑战', meta: '英国最高峰 · 1,345米',
      lat: 56.7969, lng: -5.0036, color: '#1e3a5f',
      cover: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0c1929 100%)',
      subtitle: '站在不列颠群岛之巅',
      story: `Ben Nevis（本尼维斯山）海拔1,345米，是不列颠群岛的最高峰。每年约有15万人尝试登顶。最常走的"Pony Track"路线全程约16公里，需要7-9小时。`,
      facts: [
        { icon: '⛰️', value: '1,345m', label: '海拔' },
        { icon: '⏱', value: '7-9h', label: '往返时间' },
        { icon: '🌡', value: '-17°C', label: '最低记录' },
        { icon: '👥', value: '15万/年', label: '攀登人数' }
      ]
    },
    {
      id: 'jacobite', name: 'Jacobite Steam Train', tag: '哈利波特', meta: '蒸汽火车 · Glenfinnan高架桥',
      lat: 56.8760, lng: -5.4386, color: '#991b1b',
      cover: 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=600&q=80',
      gradient: 'linear-gradient(135deg, #991b1b 0%, #450a0a 100%)',
      subtitle: '霍格沃茨特快的原型',
      story: `Jacobite Steam Train被誉为"世界上最伟大的铁路旅程"。旅程的高潮是穿越Glenfinnan Viaduct——一座建于1901年的21拱高架桥，就是《哈利·波特》电影中霍格沃茨特快列车驶过的那座桥。`,
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

  // ===== State =====
  let currentPage = 'home';
  let map = null;
  let trainMarker = null;
  let weatherData = null;
  let ws = null;
  let username = localStorage.getItem('highland-username') || '';
  let reconnectTimer = null;

  // ===== Init =====
  function init() {
    setTimeout(() => {
      document.querySelector('.splash').classList.add('hide');
      document.querySelector('.app').classList.add('active');
      setTimeout(() => document.querySelector('.splash')?.remove(), 800);
    }, 2200);

    setupNav();
    renderHome();
    renderSpots();
    renderSchedule();
    setupCountdown();
    fetchWeather();
    setupCamera();
    setupGestures();

    // Prompt for username then connect chat
    if (!username) {
      promptUsername();
    } else {
      connectChat();
    }

    loadPhotosFromServer();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    setInterval(updateTrainPosition, 5000);
    updateTrainPosition();
  }

  // ===== Username Prompt =====
  function promptUsername() {
    const name = prompt('请输入你的昵称（聊天中显示）：');
    if (name && name.trim()) {
      username = name.trim();
      localStorage.setItem('highland-username', username);
      connectChat();
    } else {
      username = '旅行者' + Math.floor(Math.random() * 1000);
      localStorage.setItem('highland-username', username);
      connectChat();
    }
  }

  // ===== WebSocket Chat =====
  function connectChat() {
    if (ws && ws.readyState <= 1) return;

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${proto}//${location.host}`;

    try {
      ws = new WebSocket(wsUrl);
    } catch (e) {
      console.error('WS connect failed:', e);
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      console.log('WS connected');
      ws.send(JSON.stringify({ type: 'join', username }));
      if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWsMessage(data);
      } catch (e) {
        console.error('WS parse error:', e);
      }
    };

    ws.onclose = () => {
      console.log('WS disconnected');
      scheduleReconnect();
    };

    ws.onerror = (e) => {
      console.error('WS error:', e);
    };
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connectChat();
    }, 3000);
  }

  function handleWsMessage(data) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;

    switch (data.type) {
      case 'history':
        msgs.innerHTML = '';
        data.messages.forEach(m => {
          addChatBubble(m.username, m.text, m.timestamp, false);
        });
        msgs.scrollTop = msgs.scrollHeight;
        break;

      case 'message':
        addChatBubble(data.username, data.text, data.timestamp, true);
        break;

      case 'system':
        // Skip system messages, only show user messages
        break;

      case 'users':
        // Skip online count display
        break;
    }
  }

  function addChatBubble(sender, text, timestamp, animate) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;

    const isMe = sender === username;
    const div = document.createElement('div');
    div.className = `chat-msg ${isMe ? 'outgoing' : 'incoming'}`;

    const time = timestamp ? new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '';

    if (isMe) {
      div.innerHTML = `${escapeHtml(text)}<div class="chat-msg-meta">${time}</div>`;
    } else {
      div.innerHTML = `<div style="font-size:0.7rem;font-weight:600;color:var(--accent);margin-bottom:0.2rem">${escapeHtml(sender)}</div>${escapeHtml(text)}<div class="chat-msg-meta">${time}</div>`;
    }

    if (!animate) div.style.animation = 'none';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addSystemBubble(text) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'chat-msg incoming';
    div.style.cssText = 'background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);max-width:100%;text-align:center;font-size:0.8rem';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function updateOnlineCount(count) {
    const el = document.querySelector('.chat-status');
    if (el) el.textContent = `● ${count}人在线`;
  }

  function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input?.value.trim();
    if (!text) return;
    if (!ws || ws.readyState !== 1) {
      showToast('⚠️ 聊天未连接，正在重连...');
      connectChat();
      return;
    }
    ws.send(JSON.stringify({ type: 'message', text }));
    input.value = '';
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== Photos (Server) =====
  async function loadPhotosFromServer() {
    try {
      const res = await fetch('/api/photos');
      const photos = await res.json();
      renderPhotoGrid(photos);
    } catch (e) {
      console.error('Failed to load photos:', e);
      renderPhotoGrid([]);
    }
  }

  function renderPhotoGrid(photos) {
    const container = document.getElementById('photo-timeline');
    if (!container) return;

    if (!photos || photos.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:3rem 1rem;color:var(--text-muted)">
          <div style="font-size:3rem;margin-bottom:1rem">📸</div>
          <div style="font-size:1.1rem;margin-bottom:0.5rem">还没有照片</div>
          <div style="font-size:0.85rem">点击右下角相机按钮开始记录高地之旅！</div>
        </div>
      `;
      return;
    }

    // Group by date
    const groups = {};
    photos.forEach(p => {
      const d = p.timestamp ? p.timestamp.slice(0, 10) : 'unknown';
      if (!groups[d]) groups[d] = [];
      groups[d].push(p);
    });

    const sortedDates = Object.keys(groups).sort().reverse();
    container.innerHTML = sortedDates.map(date => {
      const label = date !== 'unknown'
        ? new Date(date + 'T00:00:00').toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })
        : '未知日期';
      return `
        <div class="photo-day">
          <div class="photo-day-label">${label}</div>
          <div class="photo-grid">
            ${groups[date].map(p => `
              <div class="photo-thumb"
                style="background:url(${p.url}) center/cover"
                onclick="app.viewPhoto(${p.id})">
                <span class="photo-loc">📍 ${escapeHtml(p.location || p.uploader || '')}</span>
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
    fetch(`/api/photos/${id}`)
      .then(r => r.json())
      .then(photo => {
        viewer.querySelector('img').src = photo.url;
        const info = viewer.querySelector('.photo-viewer-info');
        if (info) {
          info.textContent = `📍 ${photo.location || '未知位置'} · ${photo.uploader || ''} · ${photo.caption || ''}`;
        }
        viewer.classList.add('active');
      })
      .catch(() => showToast('❌ 加载照片失败'));
  }

  function closePhotoViewer() {
    document.getElementById('photo-viewer')?.classList.remove('active');
  }

  // ===== Camera & Upload =====
  function setupCamera() {
    const captureBtn = document.querySelector('.photo-capture-btn');
    captureBtn?.addEventListener('click', openCameraOrPicker);
  }

  function openCameraOrPicker() {
    // Use file input for maximum compatibility (works on mobile + desktop)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Prefer rear camera on mobile
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      uploadPhoto(file);
    };
    input.click();
  }

  async function uploadPhoto(file) {
    showToast('📤 正在上传...');

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('uploader', username || '匿名');
    formData.append('caption', '');

    // Try to get location
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        formData.append('lat', pos.coords.latitude);
        formData.append('lng', pos.coords.longitude);
        formData.append('location', `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      } catch (e) {
        // Location unavailable, proceed without
      }
    }

    try {
      const res = await fetch('/api/photos', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      showToast('📸 照片已上传！');
      loadPhotosFromServer();
    } catch (e) {
      console.error('Upload error:', e);
      showToast('❌ 上传失败');
    }
  }

  // ===== Navigation =====
  function setupNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => navigateTo(item.dataset.page));
    });

    // Chat send
    document.getElementById('chat-send')?.addEventListener('click', sendChatMessage);
    document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
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
      void target.offsetHeight;
      target.classList.add('active');
    }

    const camBtn = document.querySelector('.photo-capture-btn');
    if (camBtn) camBtn.classList.toggle('visible', page === 'photos');

    if (page === 'map' && !map) setTimeout(initMap, 100);
    if (navigator.vibrate) navigator.vibrate(10);
  }

  // ===== Home =====
  function renderHome() {
    updateWeatherWidget();
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

  // ===== Weather (via backend proxy) =====
  async function fetchWeather() {
    try {
      const res = await fetch('/api/weather');
      weatherData = await res.json();
      updateWeatherWidget();
    } catch(e) {
      console.log('Weather fetch failed:', e);
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

    if (!weatherData || !weatherData.current) {
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
    if (now < TRIP_START) return -1;
    if (now > TRIP_ARRIVE) return 1.01;
    return (now - TRIP_START) / (TRIP_ARRIVE - TRIP_START);
  }

  function getTrainPosition(progress) {
    if (progress < 0) return TRAIN_ROUTE.from;
    if (progress > 1) return TRAIN_ROUTE.to;
    return {
      lat: TRAIN_ROUTE.from.lat + (TRAIN_ROUTE.to.lat - TRAIN_ROUTE.from.lat) * progress,
      lng: TRAIN_ROUTE.from.lng + (TRAIN_ROUTE.to.lng - TRAIN_ROUTE.from.lng) * progress
    };
  }

  function updateTrainPosition() {
    const progress = getTrainProgress();
    const bar = document.getElementById('train-progress');
    const status = document.getElementById('train-status');
    const info = document.getElementById('train-info');

    if (bar) bar.style.width = Math.max(0, Math.min(100, progress * 100)) + '%';

    if (status) {
      if (progress < 0) { status.textContent = '等待出发'; status.style.color = 'var(--highland-amber)'; }
      else if (progress > 1) { status.textContent = '已到达 Glasgow'; status.style.color = 'var(--highland-green)'; }
      else { status.textContent = '行驶中'; status.style.color = 'var(--highland-green)'; }
    }

    if (info) {
      const pos = getTrainPosition(Math.max(0, Math.min(1, progress)));
      const speed = progress >= 0 && progress <= 1 ? Math.round(80 + Math.random() * 40) : 0;
      const remaining = progress >= 0 && progress <= 1
        ? Math.round((1 - progress) * (TRIP_ARRIVE - TRIP_START) / 60000) : 0;
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

    map = L.map('map', { center: [56.8, -5.0], zoom: 7, zoomControl: false, attributionControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);

    SPOTS.forEach(spot => {
      L.circleMarker([spot.lat, spot.lng], {
        radius: 8, fillColor: '#3b82f6', color: '#1e40af', weight: 2, fillOpacity: 0.8
      }).addTo(map).bindPopup(`<div style="font-family:Inter,sans-serif;padding:0.25rem"><strong>${spot.name}</strong><br><span style="font-size:0.8rem;color:#666">${spot.meta}</span></div>`);
    });

    const routeCoords = [
      [TRAIN_ROUTE.from.lat, TRAIN_ROUTE.from.lng],
      ...TRAIN_ROUTE.waypoints.map(w => [w.lat, w.lng]),
      [TRAIN_ROUTE.to.lat, TRAIN_ROUTE.to.lng]
    ];
    L.polyline(routeCoords, { color: '#3b82f6', weight: 3, opacity: 0.6, dashArray: '8 8' }).addTo(map);

    const trainIcon = L.divIcon({
      html: '<div style="font-size:1.5rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">🚂</div>',
      className: '', iconSize: [30, 30], iconAnchor: [15, 15]
    });

    const progress = getTrainProgress();
    const pos = getTrainPosition(Math.max(0, Math.min(1, progress)));
    trainMarker = L.marker([pos.lat, pos.lng], { icon: trainIcon }).addTo(map);

    [TRAIN_ROUTE.from, TRAIN_ROUTE.to].forEach(s => {
      L.circleMarker([s.lat, s.lng], {
        radius: 6, fillColor: '#22c55e', color: '#166534', weight: 2, fillOpacity: 0.9
      }).addTo(map).bindPopup(`<strong>${s.name}</strong>`);
    });

    setTimeout(() => map.invalidateSize(), 200);

    // Show user's real-time location
    if (navigator.geolocation) {
      let userMarker = null;
      const userIcon = L.divIcon({
        html: '<div style="width:14px;height:14px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(59,130,246,0.6)"></div>',
        className: '', iconSize: [14, 14], iconAnchor: [7, 7]
      });

      navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          if (userMarker) {
            userMarker.setLatLng([lat, lng]);
          } else {
            userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
            userMarker.bindPopup('<strong>📍 我的位置</strong>');
            map.setView([lat, lng], 13);
          }
        },
        () => { /* location denied, ignore */ },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
      );
    }
  }

  // ===== Spots =====
  function renderSpots() {
    const grid = document.getElementById('spots-grid');
    if (!grid) return;

    grid.innerHTML = SPOTS.map(spot => `
      <div class="spot-card" data-id="${spot.id}" onclick="app.openSpot('${spot.id}')">
        <div class="spot-bg" style="background:${spot.cover ? `url(${spot.cover}) center/cover no-repeat` : spot.gradient}"></div>
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
    hero.style.background = spot.cover ? `url(${spot.cover}) center/cover no-repeat` : spot.gradient;

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

  // ===== 360° Viewer (Google Street View Embed) =====
  function open360(id) {
    const spot = SPOTS.find(s => s.id === id);
    if (!spot) return;
    closeModal();

    const viewer = document.getElementById('viewer-360');
    const scene = viewer.querySelector('.viewer-360-scene');
    const title = viewer.querySelector('.viewer-360-title');
    title.textContent = spot.name + ' · 360° 实景';

    // Google Maps embed with Street View at each location's coordinates
    const embedUrl = `https://www.google.com/maps/embed?pb=!4v0!6m8!1m7!1s!2m2!1d${spot.lat}!2d${spot.lng}!3f0!4f0!5f0.7820865974627469&maptype=streetview&layer=streetview&source=apiv3&center=${spot.lat},${spot.lng}&zoom=14`;

    // Use iframe for real 360° experience
    scene.innerHTML = `<iframe 
      src="https://www.google.com/maps?q=${spot.lat},${spot.lng}&z=15&layer=c&cbll=${spot.lat},${spot.lng}&cbp=11,0,0,0,0&output=svembed" 
      style="width:100%;height:100%;border:none;border-radius:12px" 
      allowfullscreen loading="lazy"></iframe>`;

    viewer.classList.add('active');
  }

  function close360() {
    document.getElementById('viewer-360').classList.remove('active');
  }

  // ===== Gestures =====
  function setupGestures() {
    let touchStartY = 0;
    const modal = document.getElementById('spot-modal');
    modal?.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
    modal?.addEventListener('touchend', (e) => { if (e.changedTouches[0].clientY - touchStartY > 100) closeModal(); });

    // Tab swipe disabled per user request
  }

  // ===== Toast =====
  function showToast(text) {
    let toast = document.querySelector('.toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== Export =====
  function exportPhotos() {
    fetch('/api/photos')
      .then(r => r.json())
      .then(photos => {
        const blob = new Blob([JSON.stringify(photos, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'highland-photos.json'; a.click();
        URL.revokeObjectURL(url);
        showToast('📦 照片数据已导出');
      });
  }

  // ===== Public API =====
  window.app = {
    openSpot, closeModal, open360, close360,
    viewPhoto, closePhotoViewer,
    exportPhotos, navigateTo
  };

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
