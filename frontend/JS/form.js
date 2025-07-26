document.getElementById('companyForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const responseMessage = document.getElementById('responseMessage');
  responseMessage.innerHTML = '';

  const formData = new FormData();
  formData.append('TenDoanhNghiep', document.getElementById('companyName').value.trim());
  formData.append('MaSoThue', document.getElementById('taxCode').value.trim());
  formData.append('DiaChiTruSo', document.getElementById('address').value.trim());
  formData.append('NguoiDaiDien', document.getElementById('representative').value.trim());
  formData.append('SoDienThoai', document.getElementById('phone').value.trim());
  formData.append('EmailLienHe', document.getElementById('email').value.trim());
  formData.append('GhiChu', document.getElementById('note').value.trim());
  formData.append('file', document.getElementById('file').files[0]);

  fetch('http://localhost:5229/api/DangKy/nop', {
    method: 'POST',
    body: formData
  })
    .then(res => {
      if (!res.ok) return res.json().then(err => { throw err });
      return res.json();
    })
    .then(data => {
      responseMessage.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
      document.getElementById('companyForm').reset();
    })
    .catch(err => {
      console.error("Lỗi server:", err);
      if (err && err.errors) {
        let messages = Object.entries(err.errors).map(([field, msgs]) => `<li>${field}: ${msgs.join(', ')}</li>`).join('');
        responseMessage.innerHTML = `<div class="alert alert-danger"><ul>${messages}</ul></div>`;
      } else {
        responseMessage.innerHTML = `<div class="alert alert-danger">❌ Lỗi máy chủ hoặc mạng. Vui lòng thử lại.</div>`;
      }
    });
});
