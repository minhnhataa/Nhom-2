// JavaScript cho đăng ký kinh doanh

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('businessRegistrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBusinessRegistration();
        });
    }
});

function handleBusinessRegistration() {
    // Lấy dữ liệu form
    const formData = {
        ownerName: document.getElementById('ownerName').value,
        ownerPhone: document.getElementById('ownerPhone').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        ownerIdCard: document.getElementById('ownerIdCard').value,
        ownerAddress: document.getElementById('ownerAddress').value,
        businessName: document.getElementById('businessName').value,
        businessType: document.getElementById('businessType').value,
        businessAddress: document.getElementById('businessAddress').value,
        businessScope: document.getElementById('businessScope').value,
        initialCapital: document.getElementById('initialCapital').value,
        expectedRevenue: document.getElementById('expectedRevenue').value
    };
    
    // Validate dữ liệu
    if (!validateBusinessForm(formData)) {
        return;
    }
    
    // Hiển thị loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Đơn đăng ký kinh doanh đã được nộp thành công!\nMã hồ sơ: KD' + Date.now());
        resetForm();
    }, 2000);
}

function validateBusinessForm(data) {
    // Kiểm tra các trường bắt buộc
    const requiredFields = [
        { field: 'ownerName', message: 'Vui lòng nhập họ tên chủ kinh doanh' },
        { field: 'ownerPhone', message: 'Vui lòng nhập số điện thoại' },
        { field: 'ownerIdCard', message: 'Vui lòng nhập số CCCD/CMND' },
        { field: 'ownerAddress', message: 'Vui lòng nhập địa chỉ thường trú' },
        { field: 'businessName', message: 'Vui lòng nhập tên cửa hàng' },
        { field: 'businessType', message: 'Vui lòng chọn loại hình kinh doanh' },
        { field: 'businessAddress', message: 'Vui lòng nhập địa chỉ kinh doanh' },
        { field: 'businessScope', message: 'Vui lòng mô tả ngành nghề kinh doanh' }
    ];
    
    for (let item of requiredFields) {
        if (!data[item.field] || data[item.field].trim() === '') {
            alert(item.message);
            document.getElementById(item.field).focus();
            return false;
        }
    }
    
    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(data.ownerPhone)) {
        alert('Số điện thoại không hợp lệ');
        document.getElementById('ownerPhone').focus();
        return false;
    }
    
    // Kiểm tra email nếu có
    if (data.ownerEmail && data.ownerEmail.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.ownerEmail)) {
            alert('Email không hợp lệ');
            document.getElementById('ownerEmail').focus();
            return false;
        }
    }
    
    return true;
}

function resetForm() {
    document.getElementById('businessRegistrationForm').reset();
}

function showLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang xử lý...';
    submitBtn.disabled = true;
}

function hideLoading() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '📤 Nộp đơn đăng ký';
    submitBtn.disabled = false;
}

function showSuccessMessage(message) {
    alert(message);
}