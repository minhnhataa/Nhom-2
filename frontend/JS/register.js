document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirmPassword").value;

  // Kiểm tra xác nhận mật khẩu
  if (password !== confirmPassword) {
    alert("❌ Mật khẩu và xác nhận mật khẩu không khớp.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5229/api/NguoiDung/dangky", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        matKhau: password,
        xacNhanMatKhau: confirmPassword
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Đăng ký thất bại.");
    }

    const result = await res.json();
    alert(result.message || "✅ Đăng ký thành công!");
    window.location.href = "login.html"; // chuyển về trang đăng nhập
  } catch (err) {
    alert("❌ Đăng ký lỗi: " + err.message);
    console.error(err);
  }
});
