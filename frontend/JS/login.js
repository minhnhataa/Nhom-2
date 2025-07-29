document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  fetch('http://localhost:5229/api/Auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Email: email,         // Viết hoa đúng như backend yêu cầu
      Password: password
    })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.message || "Lỗi đăng nhập");
        });
      }
      return res.json();
    })
    .then(data => {
      alert("✅ Đăng nhập thành công!");
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("❌ " + err.message);
      console.error(err);
    });
});