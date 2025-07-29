document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return; // Tránh lỗi nếu không ở trang login

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5123/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, matKhau: password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", "da_dang_nhap"); // Hoặc data.token nếu API trả token
        window.location.href = "index.html";
      } else {
        const errorText = await response.text();
        alert("Đăng nhập thất bại: " + errorText);
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  });
});
