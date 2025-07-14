document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Đăng nhập thành công!");
      localStorage.setItem('token', data.token);
      window.location.href = "index.html";
    } else {
      alert("Đăng nhập thất bại: " + data.message);
    }
  })
  .catch(err => {
    console.error("Lỗi khi đăng nhập:", err);
    alert("Lỗi máy chủ hoặc kết nối.");
  });
});
