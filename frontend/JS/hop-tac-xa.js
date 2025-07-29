// JavaScript cho đăng ký hợp tác xã

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cooperativeRegistrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCooperativeRegistration();
        });
    }
});

function handleCooperativeRegistration() {
    // Lấy dữ liệu form
    const formData = {
        cooperativeName: document.getElementById('cooperativeName').value,
        cooperativeType: document.getElementById('cooperativeType').value,
        cooperativeAddress: document.getElementById('cooperativeAddress').value,
        businessScope: document.getElementById('businessScope').value,
        representativeName: document.getElementById('representativeName').value,
        representativePosition: document.getElementById('representativePosition').value,
        representativePhone: document.getElementById('representativePhone').value,
        representativeEmail: document.getElementById('representativeEmail').value,
        representativeIdCard: document.getElementById('representativeIdCard').value,
        representativeAddress: document.getElementById('representativeAddress').value,
        memberCount: document.getElementById('memberCount').value,
        foundingMemberCount: document.getElementById('foundingMemberCount').value,
        shareCapital: document.getElementById('shareCapital').value,
        charterCapital: document.getElementById('charterCapital').value,
        paidCapital: document.getElementById('paidCapital').value
    };
    
    // Validate dữ liệu
    if (!validateCooperativeForm(formData)) {
        return;
    }
    
    // Hiển thị loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Đơn đăng ký hợp tác xã đã được nộp thành công!\nMã hồ sơ: HTX' + Date.now());
        resetForm();
    }, 2000);
}

function validateCooperativeForm(data) {
    // Kiểm tra các trường bắt buộc
    const requiredFields = [
        { field: 'cooperativeName', message: 'Vui lòng nhập tên hợp tác xã' },
        { field: 'cooperativeType', message: 'Vui lòng chọn loại hình hợp tác xã' },
        { field: 'cooperativeAddress', message: 'Vui lòng nhập địa chỉ trụ sở' },
        { field: 'businessScope', message: 'Vui lòng mô tả ngành nghề hoạt động' },
        { field: 'representativeName', message: 'Vui lòng nhập tên người đại diện' },
        { field: 'representativePosition', message: 'Vui lòng chọn chức vụ người đại diện' },
        { field: 'representativePhone', message: 'Vui lòng nhập số điện thoại người đại diện' },
        { field: 'representativeIdCard', message: 'Vui lòng nhập CCCD/CMND người đại diện' },
        { field: 'representativeAddress', message: 'Vui lòng nhập địa chỉ người đại diện' },
        { field: 'memberCount', message: 'Vui lòng nhập số lượng thành viên' },
        { field: 'charterCapital', message: 'Vui lòng nhập vốn điều lệ' }
    ];
    
    for (let item of requiredFields) {
        if (!data[item.field] || data[item.field].trim() === '') {
            alert(item.message);
            document.getElementById(item.field).focus();
            return false;
        }
    }
    
    // Kiểm tra số lượng thành viên tối thiểu
    if (parseInt(data.memberCount) < 7) {
        alert('Hợp tác xã phải có tối thiểu 7 thành viên');
        document.getElementById('memberCount').focus();
        return false;
    }
    
    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(data.representativePhone)) {
        alert('Số điện thoại không hợp lệ');
        document.getElementById('representativePhone').focus();
        return false;
    }
    
    // Kiểm tra email nếu có
    if (data.representativeEmail && data.representativeEmail.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.representativeEmail)) {
            alert('Email không hợp lệ');
            document.getElementById('representativeEmail').focus();
            return false;
        }
    }
    
    // Kiểm tra vốn điều lệ
    if (parseInt(data.charterCapital) <= 0) {
        alert('Vốn điều lệ phải lớn hơn 0');
        document.getElementById('charterCapital').focus();
        return false;
    }
    
    return true;
}

function resetForm() {
    document.getElementById('cooperativeRegistrationForm').reset();
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