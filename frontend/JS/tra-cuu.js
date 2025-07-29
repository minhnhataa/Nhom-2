document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lookupForm');
  if (!form) return; // Tránh lỗi khi không ở trang có form tra cứu

  const resultArea = document.getElementById('resultArea');
  const resultContent = document.getElementById('resultContent');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const input = document.getElementById('searchInput').value.trim();
    if (!input) {
      alert("Vui lòng nhập thông tin tra cứu.");
      return;
    }

    resultContent.innerHTML = `<em>Đang tra cứu...</em>`;
    resultArea.style.display = 'block';

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      resultContent.innerHTML = `
        <p><strong>Tên doanh nghiệp:</strong> Công ty TNHH ABC</p>
        <p><strong>Mã số thuế:</strong> 0312345678</p>
        <p><strong>Trạng thái:</strong> Đang hoạt động</p>
        <p><strong>Địa chỉ:</strong> 123 Đường Lê Lợi, Q.1, TP.HCM</p>
      `;
    } catch (err) {
      resultContent.innerHTML = "<p class='text-danger'>Có lỗi xảy ra khi tra cứu.</p>";
      console.error(err);
    }
  });
});
