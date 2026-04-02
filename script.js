// script.js - HOÀN CHỈNH + XỊN ĐẸP
let score = 0;
let currentQuestionIndex = 0;

const screens = document.querySelectorAll('.screen');

const questions = [
  { q: "Khi crush online đăng story mới:", answers: [
    { text: "Kệ mẹ nó", score: 0 },
    { text: "Xem lén story", score: 1 },
    { text: "Stalk like + comment gián tiếp", score: 2 },
    { text: "Lập acc clone để tương tác ngay", score: 4 }
  ]},
  { q: "Bạn nghĩ gì về fake account?", answers: [
    { text: "Không bao giờ làm", score: 0 },
    { text: "Chỉ xem thôi", score: 1 },
    { text: "Dùng để hóng drama", score: 2 },
    { text: "Dùng để tán crush luôn", score: 4 }
  ]},
  { q: "Khi bị crush ghost?", answers: [
    { text: "Buồn 1 ngày rồi thôi", score: 0 },
    { text: "Nhắn tin hỏi han", score: 1 },
    { text: "Tạo acc mới nhắn tiếp", score: 3 },
    { text: "Làm luôn acc Tường Vi 🌸", score: 4 }
  ]},
  { q: "Mục tiêu cao nhất trong drama là gì?", answers: [
    { text: "Chỉ hóng thôi", score: 0 },
    { text: "Comment ẩn danh", score: 2 },
    { text: "Troll nhẹ nhàng", score: 3 },
    { text: "Tự làm nhân vật chính", score: 4 }
  ]},
  { q: "Nếu acc Tường Vi bị lộ?", answers: [
    { text: "Xóa acc ngay", score: 0 },
    { text: "Im lặng", score: 1 },
    { text: "Tạo acc mới", score: 2 },
    { text: "Vẫn tiếp tục vì drama là cuộc sống", score: 4 }
  ]}
];

const resultData = [
  { max: 5, title: "NGƯỜI VÔ TỘI 😇", desc: "Bạn sạch sẽ quá. Khánh ơi, copy profile người khác hả?" },
  { max: 10, title: "DRAMA NHẸ 🌿", desc: "Chỉ mới hóng thôi, chưa đủ trình làm Tường Vi." },
  { max: 15, title: "TƯỜNG VI TẬP SỰ 🌸", desc: "Gần đạt chuẩn nhưng còn non. Cố lên Khánh!" },
  { max: 20, title: "BOSS CUỐI DRAMA 🤡", desc: "CHÚC MỪNG! Bạn chính là Hà Ngọc Khánh - Tường Vi bản gốc. Self-own max level 💀" }
];

function startLoading() {
  let progress = 0;
  const bar = document.getElementById('progress');
  const text = document.getElementById('loading-text');

  const interval = setInterval(() => {
    progress += Math.random() * 22;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    text.textContent = `Decrypting Tường Vi profile... ${Math.floor(progress)}%`;
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => switchScreen(1), 800);
    }
  }, 65);
}

function switchScreen(n) {
  screens.forEach(s => s.classList.remove('active'));
  screens[n].classList.add('active');

  if (n === 5) startQuiz();
  if (n === 4) setTimeout(triggerTwist, 300);
}

function triggerTwist() {
  const alert = document.getElementById('alert-title');
  alert.classList.add('glitch');
  document.body.style.background = '#330000';
  setTimeout(() => document.body.style.background = '#0a0a0a', 1200);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('q-number').textContent = currentQuestionIndex + 1;
  document.getElementById('live-score').textContent = score;

  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  q.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans.text;
    btn.onclick = () => {
      score += ans.score;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    };
    answersDiv.appendChild(btn);
  });
}

function showResult() {
  switchScreen(6);

  let result = resultData[3];
  if (score <= 5) result = resultData[0];
  else if (score <= 10) result = resultData[1];
  else if (score <= 15) result = resultData[2];

  document.getElementById('result-title').innerHTML = result.title;
  document.getElementById('result-desc').innerHTML = result.desc;
  document.getElementById('final-score').textContent = score + "/20";

  if (score > 15) launchConfetti();
  sendToDiscord(score);
}

function launchConfetti() {
  const container = document.getElementById('confetti');
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '12px';
    confetti.style.height = '12px';
    confetti.style.background = ['#ff0033', '#ff66aa', '#00ffff'][Math.floor(Math.random()*3)];
    confetti.style.opacity = Math.random();
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    container.appendChild(confetti);

    const duration = Math.random() * 3000 + 2000;
    confetti.animate([
      { transform: `translateY(0) rotate(0deg)` },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random()*1200}deg)` }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    });

    setTimeout(() => confetti.remove(), duration);
  }
}

function sendToDiscord(finalScore) {
  const webhook = "https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE"; // ← THAY BẰNG WEBHOOK CỦA BẠN
  if (webhook.includes("YOUR_WEBHOOK")) return;

  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `💀 **Khánh vừa bị troll bởi CHIẾN DỊCH TƯỜNG VI** 💀\nĐiểm: **${finalScore}/20** 🤡\nThời gian: ${new Date().toLocaleString('vi-VN')}`
    })
  });
}

document.getElementById('secret').onclick = () => {
  alert("😂 Tao biết mày sẽ bấm mà!\n\nKhánh ơi, tự thú đi... acc Tường Vi là của ai?");
};

// BUTTON EVENTS
document.getElementById('btn-access').onclick = () => switchScreen(2);
document.getElementById('btn-continue').onclick = () => switchScreen(3);
document.getElementById('btn-plot').onclick = () => switchScreen(4);
document.getElementById('btn-accept').onclick = () => switchScreen(5);
document.getElementById('btn-restart').onclick = () => location.reload();

// KHỞI ĐỘNG
window.onload = () => {
  switchScreen(0);
  startLoading();
};
