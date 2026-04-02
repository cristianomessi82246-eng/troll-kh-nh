let currentScreen = 0;
let score = 0;
let currentQuestion = 0;

const screens = document.querySelectorAll('.screen');

const questions = [
  {
    q: "Khi crush online đăng story:",
    answers: [
      {text: "Kệ mẹ nó", score: 0},
      {text: "Xem lén story", score: 1},
      {text: "Stalk like + comment gián tiếp", score: 2},
      {text: "Lập acc clone để tương tác", score: 4}
    ]
  },
  {
    q: "Bạn nghĩ gì về fake acc?",
    answers: [
      {text: "Không bao giờ làm", score: 0},
      {text: "Chỉ xem thôi", score: 1},
      {text: "Dùng để hóng drama", score: 2},
      {text: "Dùng để tán crush luôn", score: 4}
    ]
  },
  {
    q: "Khi bị crush ghost:",
    answers: [
      {text: "Buồn 1 ngày rồi thôi", score: 0},
      {text: "Nhắn tin hỏi han", score: 1},
      {text: "Tạo acc mới nhắn tiếp", score: 3},
      {text: "Làm luôn acc Tường Vi 🌸", score: 4}
    ]
  },
  {
    q: "Mục tiêu cao nhất của bạn trong drama:",
    answers: [
      {text: "Chỉ hóng", score: 0},
      {text: "Comment ẩn danh", score: 2},
      {text: "Troll nhẹ", score: 3},
      {text: "Tự làm nhân vật chính", score: 4}
    ]
  },
  {
    q: "Nếu biết acc Tường Vi bị lộ:",
    answers: [
      {text: "Xóa acc ngay", score: 0},
      {text: "Im lặng", score: 1},
      {text: "Tạo acc mới", score: 2},
      {text: "Vẫn tiếp tục vì drama là cuộc sống", score: 4}
    ]
  }
];

const results = [
  {max: 5, title: "Người vô tội 😇", desc: "Bạn sạch sẽ quá, không drama tí nào. Khánh ơi, mày copy paste profile người khác à?"},
  {max: 10, title: "Drama nhẹ 🌿", desc: "Chỉ hóng thôi, chưa đủ trình làm Tường Vi."},
  {max: 15, title: "Tường Vi tập sự 🌸", desc: "Gần đạt chuẩn nhưng còn non. Cố lên Khánh!"},
  {max: 20, title: "Boss cuối drama 🤡", desc: "Chúc mừng! Bạn chính là Hà Ngọc Khánh - Tường Vi bản gốc. Self-own max level 💀"}
];

// Loading
function startLoading() {
  let progress = 0;
  const bar = document.getElementById('progress');
  const text = document.getElementById('loading-text');

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    text.textContent = `Đang decrypt hồ sơ... ${Math.floor(progress)}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        switchScreen(1); // to landing
      }, 800);
    }
  }, 120);
}

// Switch screen
function switchScreen(n) {
  screens.forEach(s => s.classList.remove('active'));
  screens[n].classList.add('active');
  currentScreen = n;

  if (n === 5) startQuiz(); // quiz screen
}

// Plot twist effect
function triggerTwist() {
  const alertBox = document.getElementById('twist-alert');
  alertBox.classList.add('shake');
  document.body.style.background = '#440000';

  setTimeout(() => {
    document.body.style.background = '#0a0a0a';
  }, 1200);
}

// Quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('q-number').textContent = currentQuestion + 1;

  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  q.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans.text;
    btn.onclick = () => {
      score += ans.score;
      currentQuestion++;
      if (currentQuestion < questions.length) {
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

  let result;
  if (score <= 5) result = results[0];
  else if (score <= 10) result = results[1];
  else if (score <= 15) result = results[2];
  else result = results[3];

  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-desc').textContent = result.desc;
  document.getElementById('final-score').textContent = score;
}

// Secret button
document.getElementById('secret').onclick = () => {
  alert("Tao biết mày sẽ bấm mà 😏\n\nKhánh ơi, tự thú đi, acc Tường Vi là của ai?");
};

// Send to Discord (thay WEBHOOK_URL bằng webhook thật của bạn)
function sendResult(finalScore) {
  const webhook = "https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE"; // ← thay bằng webhook thật

  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `💀 **Khánh vừa làm quiz Tường Vi** 💀\nĐiểm: **${finalScore}/20** 🤡\nThời gian: ${new Date().toLocaleString('vi-VN')}`
    })
  }).catch(err => console.log("Không gửi được webhook"));
}

// Event listeners
document.getElementById('btn-access').onclick = () => switchScreen(2);
document.getElementById('btn-continue').onclick = () => switchScreen(3);
document.getElementById('btn-plot').onclick = () => {
  switchScreen(4);
  setTimeout(() => {
    triggerTwist();
  }, 600);
};
document.getElementById('btn-accept').onclick = () => switchScreen(5);

document.getElementById('btn-restart').onclick = () => location.reload();

// Bắt đầu
window.onload = () => {
  switchScreen(0);
  startLoading();
};
