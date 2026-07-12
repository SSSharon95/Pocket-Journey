(function() {
  // 10 個常用旅遊場景的翻譯數據
  const baliTranslations = [
    { category: "日常問候", ch: "你好，早安 / 午安！", id: "Halo, Selamat pagi! / Selamat siang!", pronounce: "哈囉，斯拉媽 巴吉 / 斯拉媽 ㄒㄧㄤ" },
    { category: "客氣答謝", ch: "非常感謝你！", id: "Terima kasih banyak!", pronounce: "德利馬 卡希 辦呀！" },
    { category: "詢問價格", ch: "請問這個多少錢？", id: "Berapa harganya ini?", pronounce: "波拉巴 哈爾嘎惹 伊尼？" },
    { category: "殺價議價", ch: "可以便宜一點嗎？", id: "Bisa kurang sedikit?", pronounce: "比沙 枯浪 斯迪格？" },
    { category: "點餐飲食", ch: "我想點這個，不要太辣。", id: "Saya mau pesan ini, tidak terlalu pedas.", pronounce: "沙呀 貓 波散 伊尼，底達 德拉魯 玻達斯。" },
    { category: "結帳付款", ch: "請幫我結帳。", id: "Minta tagihan, tolong.", pronounce: "民答 大吉漢，多隆。" },
    { category: "交通乘車", ch: "請載我到這個地址。", id: "Tolong antar saya ke alamat ini.", pronounce: "多隆 安達 沙呀 刻 阿拉媽 伊尼。" },
    { category: "尋找洗手間", ch: "請問洗手間在哪裡？", id: "Permisi, di mana toilet?", pronounce: "波爾米西，底 媽拿 脫伊勒？" },
    { category: "購物袋索取", ch: "請問有提供塑膠袋嗎？", id: "Apakah ada kantong plastik?", pronounce: "阿巴卡 阿達 看痛 普拉士滴？" },
    { category: "緊急求助", ch: "請幫幫我，我的東西不見了！", id: "Tolong bantu saya, barang saya hilang!", pronounce: "多隆 辦度 沙呀，巴浪 沙呀 希浪！" }
  ];

  window.addEventListener('DOMContentLoaded', () => {
    
    // ----------------- 天氣功能 -----------------
    const dateInput = document.getElementById('weatherDate');
    const queryBtn = document.getElementById('queryWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');

    if (dateInput && queryBtn && weatherResult) {
      // 預設填入今日日期
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;

      function getPrediction(dateStr) {
        if (!dateStr) return;
        const selectedDate = new Date(dateStr);
        const month = selectedDate.getMonth() + 1;
        
        let info = {};
        if (month >= 4 && month <= 10) {
          info = {
            condition: "☀️ 晴朗乾爽 (乾季)",
            temp: "29°C",
            humidity: "62%",
            rainChance: "15%",
            wind: "14 km/h 東南風",
            tip: "巴里島目前正處乾季。天氣舒適、降雨機率低，極度適合潛水與各類戶外探險活動。"
          };
        } else {
          info = {
            condition: "⛈️ 局部雷陣雨 (雨季)",
            temp: "31°C",
            humidity: "84%",
            rainChance: "75%",
            wind: "18 km/h 西風",
            tip: "巴里島正值雨季。午後常伴隨突發強降雨，建議出門隨身攜帶雨具，或多安排 SPA、景觀餐廳等雨備室內行程。"
          };
        }

        weatherResult.innerHTML = `
          <div class="weather-report">
            <div class="weather-report-header">
              <span>${dateStr} 預估氣候</span>
              <span class="weather-report-badge">${info.condition}</span>
            </div>
            <div class="weather-report-temp">${info.temp}</div>
            <div class="weather-report-grid">
              <div><span>預測降雨：</span><strong>${info.rainChance}</strong></div>
              <div><span>相對濕度：</span><strong>${info.humidity}</strong></div>
              <div><span>風向預測：</span><strong>${info.wind}</strong></div>
              <div><span>出行推薦：</span><strong>${month >= 4 && month <= 10 ? '非常推薦戶外' : '建議搭配雨備'}</strong></div>
            </div>
            <div class="weather-report-tips">
              💡 ${info.tip}
            </div>
          </div>
        `;
      }

      getPrediction(dateInput.value);
      queryBtn.addEventListener('click', () => {
        getPrediction(dateInput.value);
      });
    }

    // ----------------- 翻譯功能 -----------------
    const transSearch = document.getElementById('transSearch');
    const transList = document.getElementById('translationList');

    if (transList) {
      function renderTranslations(filter = '') {
        transList.innerHTML = '';
        const filtered = baliTranslations.filter(item => {
          return item.ch.includes(filter) || 
                 item.category.includes(filter) || 
                 item.id.toLowerCase().includes(filter.toLowerCase());
        });

        if (filtered.length === 0) {
          transList.innerHTML = `<p style="text-align: center; color: #666; font-size: 0.8rem; padding: 12px;">無符合的翻譯語句 🔍</p>`;
          return;
        }

        filtered.forEach(item => {
          const div = document.createElement('div');
          div.className = 'trans-card-item';
          div.innerHTML = `
            <span class="trans-card-tag">${item.category}</span>
            <button class="trans-copy-btn" title="複製印尼文" data-text="${item.id}">📋</button>
            <div class="trans-card-ch">${item.ch}</div>
            <div class="trans-card-id">${item.id}</div>
            <div class="trans-card-pronounce"><strong>諧音：</strong>${item.pronounce}</div>
          `;
          transList.appendChild(div);
        });

        // 複製按鈕監聽
        const btns = transList.querySelectorAll('.trans-copy-btn');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-text');
            navigator.clipboard.writeText(text).then(() => {
              btn.textContent = '✅';
              setTimeout(() => { btn.textContent = '📋'; }, 1200);
            }).catch(err => console.error(err));
          });
        });
      }

      renderTranslations();

      if (transSearch) {
        transSearch.addEventListener('input', (e) => {
          renderTranslations(e.target.value.trim());
        });
      }
    }

    // ----------------- 分享功能 -----------------
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: '🌴 Bali Trip 2026',
            text: '來看看我的巴里島旅遊隨身助手！',
            url: window.location.href
          }).catch(err => console.log(err));
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            alert('連結已複製到剪貼簿，快分享給旅伴吧！');
          });
        }
      });
    }
  });
})();        
        let prediction = {};
        // 4月至10月為乾季，11月至隔年3月為雨季
        if (month >= 4 && month <= 10) {
          prediction = {
            condition: "☀️ 晴朗乾爽 (乾季)",
            temp: "29°C",
            humidity: "62%",
            rainChance: "15%",
            wind: "14 km/h 東南風",
            tip: "巴里島此時正處乾季。天氣舒適、降雨機率低，極適合安排各類水上活動、海灘放鬆與戶外行程。"
          };
        } else {
          prediction = {
            condition: "⛈️ 局部雷陣雨 (雨季)",
            temp: "31°C",
            humidity: "84%",
            rainChance: "75%",
            wind: "18 km/h 西風",
            tip: "巴里島此時處於雨季。濕度偏高，午後容易出現突發短暫強降雨。建議隨身攜帶雨具，並保持行程彈性。"
          };
        }

        weatherResult.innerHTML = `
          <div class="weather-res-header">
            <div>
              <strong style="font-size: 0.85rem;">${dateStr} 預估</strong>
            </div>
            <span class="weather-res-badge">${prediction.condition}</span>
          </div>
          <div class="weather-res-temp">${prediction.temp}</div>
          <div class="weather-res-grid">
            <div><span>降雨率</span><strong>${prediction.rainChance}</strong></div>
            <div><span>相對濕度</span><strong>${prediction.humidity}</strong></div>
            <div><span>預測風速</span><strong>${prediction.wind}</strong></div>
            <div><span>體感狀況</span><strong>${month >= 4 && month <= 10 ? '極其舒適' : '稍顯悶熱'}</strong></div>
          </div>
          <div class="weather-res-tips">
            💡 ${prediction.tip}
          </div>
        `;
      }

      // 首次載入執行
      calculateWeather(dateInput.value);
      // 點擊查詢按鈕執行
      queryBtn.addEventListener('click', () => {
        calculateWeather(dateInput.value);
      });
    }

    // ----------------- 隨身翻譯檢索與過濾 -----------------
    const transSearch = document.getElementById('transSearch');
    const transList = document.getElementById('translationList');

    if (transList) {
      function renderList(filter = '') {
        transList.innerHTML = '';
        const filtered = baliTranslations.filter(item => {
          return item.ch.includes(filter) || 
                 item.category.includes(filter) || 
                 item.id.toLowerCase().includes(filter.toLowerCase());
        });

        if (filtered.length === 0) {
          transList.innerHTML = `<p style="text-align: center; color: var(--text-muted, #717171); font-size: 0.8rem; padding: 15px;">無符合的翻譯語句 🔍</p>`;
          return;
        }

        filtered.forEach(item => {
          const div = document.createElement('div');
          div.className = 'trans-item';
          div.innerHTML = `
            <span class="trans-category-tag">${item.category}</span>
            <button class="trans-copy-button" title="複製印尼文" data-text="${item.id}">📋</button>
            <div class="trans-chinese">${item.ch}</div>
            <div class="trans-indonesian">${item.id}</div>
            <div class="trans-pronounce-guide"><strong>擬音：</strong>${item.pronounce}</div>
          `;
          transList.appendChild(div);
        });

        // 綁定複製事件
        const btns = transList.querySelectorAll('.trans-copy-button');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-text');
            navigator.clipboard.writeText(text).then(() => {
              btn.textContent = '✅';
              setTimeout(() => { btn.textContent = '📋'; }, 1200);
            }).catch(err => {
              console.error('複製失敗', err);
            });
          });
        });
      }

      // 首次渲染
      renderList();

      // 搜尋事件
      if (transSearch) {
        transSearch.addEventListener('input', (e) => {
          renderList(e.target.value.trim());
        });
      }
    }

    // ----------------- 分享行程功能 -----------------
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: '🌴 Bali Trip 2026',
            text: '來看看我的巴里島旅遊隨身助手！包含今日行程、天氣預報與實用旅遊翻譯。',
            url: window.location.href
          }).catch(err => console.log(err));
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            alert('連結已複製到剪貼簿，快分享給旅伴吧！');
          });
        }
      });
    }
  });
})();
