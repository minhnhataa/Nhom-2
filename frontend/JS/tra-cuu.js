document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lookupForm');
  const resultArea = document.getElementById('resultArea');
  const resultContent = document.getElementById('resultContent');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const input = document.getElementById('searchInput').value.trim();
    if (!input) {
      alert("Vui lòng nhập thông tin tra cứu.");
      return;
    }

    resultContent.innerHTML = `<em>Đang tra cứu...</em>`;
    resultArea.style.display = 'block';

    try {
      // 🔁 Mô phỏng kết quả (hoặc thay bằng fetch thực tế)
      await new Promise(resolve => setTimeout(resolve, 1000));
      resultContent.innerHTML = `
        <p><strong>Tên doanh nghiệp:</strong> Công ty TNHH ABC</p>
        <p><strong>Mã số thuế:</strong> 0312345678</p>
        <p><strong>Trạng thái:</strong> Đang hoạt động</p>
        <p><strong>Địa chỉ:</strong> 123 Đường Lê Lợi, Q.1, TP.HCM</p>
      `;

      // 📡 Nếu dùng API thực:
      /*
      const response = await fetch(`https://your-api.com/lookup?query=${encodeURIComponent(input)}`);
      const data = await response.json();
      if (data.success) {
        resultContent.innerHTML = `
          <p><strong>Tên:</strong> ${data.name}</p>
          <p><strong>MST:</strong> ${data.tax_code}</p>
          <p><strong>Địa chỉ:</strong> ${data.address}</p>
          <p><strong>Trạng thái:</strong> ${data.status}</p>
        `;
      } else {
        resultContent.innerHTML = "<p class='text-danger'>Không tìm thấy doanh nghiệp phù hợp.</p>";
      }
      */
    } catch (err) {
      resultContent.innerHTML = "<p class='text-danger'>Có lỗi xảy ra khi tra cứu.</p>";
      console.error(err);
    }
  });
});
