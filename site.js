// Small site glue: stage buttons for demo, download functionality
(function(){
  const stageList = document.getElementById('stage-list');
  const uiCoins = document.getElementById('ui-coins');
  const uiSpeed = document.getElementById('ui-speed');

  // Stage buttons -> UIデモ（iframeがない想定）
  stageList.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const stage = Number(b.dataset.stage);
    if (!Number.isFinite(stage)) return;
    
    // 視覚フィードバック
    document.querySelectorAll('#stage-list button').forEach(btn => btn.classList.remove('active'));
    b.classList.add('active');
    
    // デモ用 UI 更新
    uiCoins.textContent = `コイン: ${Math.floor(Math.random() * 100)}`;
    const speeds = ['通常', '速い', '非常に速い'];
    uiSpeed.textContent = `速度: ${speeds[stage % speeds.length]}`;
  });

  // デモ用リーダーボード
  const updateLeaderboard = () => {
    const lb = document.querySelector('#leaderboard ol');
    const demoScores = [
      { name: 'Player1', score: 9500 },
      { name: 'Player2', score: 8200 },
      { name: 'Player3', score: 7800 }
    ];
    
    lb.innerHTML = '';
    demoScores.forEach(s => {
      const li = document.createElement('li');
      li.textContent = `${s.name} — ${s.score}`;
      lb.appendChild(li);
    });
  };

  // 初期データ設定
  updateLeaderboard();
  // ゲームボタンの特別効果
  document.querySelectorAll('.game-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      createAdvancedParticles(btn, 'explosion');
    });

    btn.addEventListener('click', (e) => {
      // クリック時のフィードバック
      createAdvancedParticles(btn, 'fireworks');
      btn.style.transform = 'scale(0.95) rotate(2deg)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
      
      // 成功メッセージ
      const message = document.createElement('div');
      message.textContent = 'ゲームを起動中...';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: bold;
      `;
      document.body.appendChild(message);
      
      setTimeout(() => message.remove(), 2000);
    });
  });

})();