document.getElementById('companyForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const responseMessage = document.getElementById('responseMessage');
  responseMessage.innerHTML = ''; // Clear message

  const companyName = document.getElementById('companyName').value.trim();
  const taxCode = document.getElementById('taxCode').value.trim();
  const address = document.getElementById('address').value.trim();
  const representative = document.getElementById('representative').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const note = document.getElementById('note').value.trim();
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  // Kiểm tra trường bắt buộc
  if (!companyName) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng nhập tên doanh nghiệp.</div>`;
    return;
  }
  if (!taxCode) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng nhập mã số thuế.</div>`;
    return;
  }
  if (!address) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng nhập địa chỉ trụ sở.</div>`;
    return;
  }
  if (!representative) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng nhập tên người đại diện.</div>`;
    return;
  }
  if (!phone) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng nhập số điện thoại.</div>`;
    return;
  }
  if (!email) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng nhập email liên hệ.</div>`;
    return;
  }
  if (!file) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ Vui lòng tải lên hồ sơ.</div>`;
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    responseMessage.innerHTML = `<div class="alert alert-danger">⚠️ File vượt quá 5MB. Vui lòng chọn file khác.</div>`;
    return;
  }

  const formData = new FormData();
  formData.append('companyName', companyName);
  formData.append('taxCode', taxCode);
  formData.append('address', address);
  formData.append('representative', representative);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('note', note);
  formData.append('file', file);

  fetch('http://localhost:3000/api/company/submit', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        responseMessage.innerHTML = `<div class="alert alert-success">✅ Gửi hồ sơ thành công! Mã hồ sơ: <strong>${data.id}</strong></div>`;
        document.getElementById('companyForm').reset();
      } else {
        responseMessage.innerHTML = `<div class="alert alert-danger">❌ Gửi hồ sơ thất bại: ${data.message || 'Lỗi không rõ.'}</div>`;
      }
    })
    .catch(err => {
      console.error("Lỗi:", err);
      responseMessage.innerHTML = `<div class="alert alert-danger">❌ Lỗi máy chủ hoặc mạng. Vui lòng thử lại.</div>`;
    });
});
