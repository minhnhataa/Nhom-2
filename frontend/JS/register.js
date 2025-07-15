document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (!email || !password || !confirmPassword) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp.");
    return;
  }

  fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Đăng ký thành công!");
      window.location.href = "login.html";
    } else {
      alert("Đăng ký thất bại: " + data.message);
    }
  })
  .catch(err => {
    console.error("Lỗi khi đăng ký:", err);
    alert("Lỗi máy chủ hoặc mạng.");
  });
});
