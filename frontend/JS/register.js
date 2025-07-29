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

  fetch('http://localhost:5229/api/Auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(async res => {
    const contentType = res.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      throw new Error(typeof data === 'string' ? data : (data.message || "Đăng ký thất bại."));
    }

    alert("✅ Đăng ký thành công!");
    console.log("Phản hồi từ server:", data);
    window.location.href = "login.html"; // Chuyển sang trang login
  })
  .catch(error => {
    console.error("Lỗi:", error);
    alert("❌ " + error.message);
  });
});
