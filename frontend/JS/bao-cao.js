// Báo cáo điện tử JavaScript

// Dữ liệu mẫu
const sampleData = {
    'doanh-nghiep-moi': [
        { id: 1, ten: 'Công ty TNHH ABC', maSoThue: '0123456789', ngayDangKy: '2025-01-15', trangThai: 'Hoạt động', diaChi: 'Hà Nội' },
        { id: 2, ten: 'Công ty CP XYZ', maSoThue: '0987654321', ngayDangKy: '2025-01-20', trangThai: 'Hoạt động', diaChi: 'TP.HCM' },
        { id: 3, ten: 'Doanh nghiệp tư nhân DEF', maSoThue: '0111222333', ngayDangKy: '2025-01-25', trangThai: 'Hoạt động', diaChi: 'Đà Nẵng' }
    ],
    'doanh-nghiep-giai-the': [
        { id: 4, ten: 'Công ty TNHH GHI', maSoThue: '0444555666', ngayDangKy: '2020-05-10', trangThai: 'Giải thể', diaChi: 'Hà Nội' },
        { id: 5, ten: 'Công ty CP JKL', maSoThue: '0777888999', ngayDangKy: '2019-03-15', trangThai: 'Giải thể', diaChi: 'TP.HCM' }
    ],
    'doanh-nghiep-tam-ngung': [
        { id: 6, ten: 'Công ty TNHH MNO', maSoThue: '0222333444', ngayDangKy: '2022-08-20', trangThai: 'Tạm ngừng', diaChi: 'Hải Phòng' }
    ],
    'doanh-nghiep-quay-lai': [
        { id: 7, ten: 'Công ty CP PQR', maSoThue: '0555666777', ngayDangKy: '2021-12-05', trangThai: 'Hoạt động', diaChi: 'Cần Thơ' }
    ]
};

let currentChart = null;

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    // Thiết lập ngày mặc định
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    document.getElementById('fromDate').value = firstDay.toISOString().split('T')[0];
    document.getElementById('toDate').value = today.toISOString().split('T')[0];
}

function setupEventListeners() {
    // Xử lý form báo cáo
    document.getElementById('reportFilterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        generateReport();
    });
    
    // Xử lý thay đổi khoảng thời gian
    document.getElementById('timeRange').addEventListener('change', function() {
        handleTimeRangeChange(this.value);
    });
}

function handleTimeRangeChange(value) {
    const fromDate = document.getElementById('fromDate');
    const toDate = document.getElementById('toDate');
    const today = new Date();
    
    switch(value) {
        case 'thang-hien-tai':
            const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            fromDate.value = firstDayMonth.toISOString().split('T')[0];
            toDate.value = today.toISOString().split('T')[0];
            fromDate.disabled = true;
            toDate.disabled = true;
            break;
            
        case 'quy-hien-tai':
            const quarter = Math.floor(today.getMonth() / 3);
            const firstDayQuarter = new Date(today.getFullYear(), quarter * 3, 1);
            fromDate.value = firstDayQuarter.toISOString().split('T')[0];
            toDate.value = today.toISOString().split('T')[0];
            fromDate.disabled = true;
            toDate.disabled = true;
            break;
            
        case 'nam-hien-tai':
            const firstDayYear = new Date(today.getFullYear(), 0, 1);
            fromDate.value = firstDayYear.toISOString().split('T')[0];
            toDate.value = today.toISOString().split('T')[0];
            fromDate.disabled = true;
            toDate.disabled = true;
            break;
            
        case 'tuy-chinh':
            fromDate.disabled = false;
            toDate.disabled = false;
            break;
            
        default:
            fromDate.disabled = false;
            toDate.disabled = false;
    }
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const timeRange = document.getElementById('timeRange').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    
    if (!reportType) {
        alert('Vui lòng chọn loại báo cáo!');
        return;
    }
    
    if (!timeRange) {
        alert('Vui lòng chọn khoảng thời gian!');
        return;
    }
    
    // Hiển thị loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        const data = getReportData(reportType);
        displayReport(data, reportType);
        hideLoading();
    }, 1000);
}

function getReportData(reportType) {
    if (reportType === 'tong-hop') {
        // Tổng hợp tất cả dữ liệu
        let allData = [];
        Object.values(sampleData).forEach(typeData => {
            allData = allData.concat(typeData);
        });
        return allData;
    }
    
    return sampleData[reportType] || [];
}

function displayReport(data, reportType) {
    // Hiển thị kết quả
    document.getElementById('reportResults').style.display = 'block';
    
    // Tạo biểu đồ
    createChart(data, reportType);
    
    // Tạo thống kê tóm tắt
    createSummaryStats(data, reportType);
    
    // Tạo bảng dữ liệu
    createDataTable(data);
    
    // Cuộn đến kết quả
    document.getElementById('reportResults').scrollIntoView({ behavior: 'smooth' });
}

function createChart(data, reportType) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    
    // Hủy biểu đồ cũ nếu có
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Tạo dữ liệu cho biểu đồ
    const chartData = processChartData(data, reportType);
    
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Số lượng doanh nghiệp',
                data: chartData.values,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: getChartTitle(reportType)
                }
            }
        }
    });
}

function processChartData(data, reportType) {
    if (reportType === 'tong-hop') {
        // Nhóm theo trạng thái
        const statusCount = {};
        data.forEach(item => {
            statusCount[item.trangThai] = (statusCount[item.trangThai] || 0) + 1;
        });
        
        return {
            labels: Object.keys(statusCount),
            values: Object.values(statusCount)
        };
    } else {
        // Nhóm theo tháng
        const monthCount = {};
        data.forEach(item => {
            const month = new Date(item.ngayDangKy).getMonth() + 1;
            const monthKey = `Tháng ${month}`;
            monthCount[monthKey] = (monthCount[monthKey] || 0) + 1;
        });
        
        return {
            labels: Object.keys(monthCount),
            values: Object.values(monthCount)
        };
    }
}

function getChartTitle(reportType) {
    const titles = {
        'doanh-nghiep-moi': 'Thống kê doanh nghiệp thành lập mới',
        'doanh-nghiep-giai-the': 'Thống kê doanh nghiệp giải thể',
        'doanh-nghiep-tam-ngung': 'Thống kê doanh nghiệp tạm ngừng',
        'doanh-nghiep-quay-lai': 'Thống kê doanh nghiệp quay trở lại',
        'tong-hop': 'Báo cáo tổng hợp theo trạng thái'
    };
    
    return titles[reportType] || 'Biểu đồ thống kê';
}

function createSummaryStats(data, reportType) {
    const container = document.getElementById('summaryStats');
    container.innerHTML = '';
    
    // Tổng số doanh nghiệp
    const totalCard = createStatCard('Tổng số', data.length, 'primary');
    container.appendChild(totalCard);
    
    if (reportType === 'tong-hop') {
        // Thống kê theo trạng thái
        const statusStats = {};
        data.forEach(item => {
            statusStats[item.trangThai] = (statusStats[item.trangThai] || 0) + 1;
        });
        
        Object.entries(statusStats).forEach(([status, count]) => {
            const color = getStatusColor(status);
            const card = createStatCard(status, count, color);
            container.appendChild(card);
        });
    } else {
        // Thống kê theo tháng gần nhất
        const recentMonth = getRecentMonthCount(data);
        const card = createStatCard('Tháng này', recentMonth, 'success');
        container.appendChild(card);
    }
}

function createStatCard(label, value, color) {
    const div = document.createElement('div');
    div.className = 'col-md-6 col-lg-3';
    div.innerHTML = `
        <div class="card text-white bg-${color} h-100">
            <div class="card-body text-center">
                <div class="report-stat-number">${value}</div>
                <div class="report-stat-label">${label}</div>
            </div>
        </div>
    `;
    return div;
}

function getStatusColor(status) {
    const colors = {
        'Hoạt động': 'success',
        'Giải thể': 'danger',
        'Tạm ngừng': 'warning',
        'Chờ duyệt': 'info'
    };
    return colors[status] || 'secondary';
}

function getRecentMonthCount(data) {
    const currentMonth = new Date().getMonth() + 1;
    return data.filter(item => {
        const itemMonth = new Date(item.ngayDangKy).getMonth() + 1;
        return itemMonth === currentMonth;
    }).length;
}

function createDataTable(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';
    
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.ten}</td>
            <td>${item.maSoThue}</td>
            <td>${formatDate(item.ngayDangKy)}</td>
            <td><span class="status-badge ${getStatusClass(item.trangThai)}">${item.trangThai}</span></td>
            <td>${item.diaChi}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewDetail(${item.id})">
                    👁️ Xem
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Tạo phân trang (đơn giản)
    createPagination(data.length);
}

function getStatusClass(status) {
    const classes = {
        'Hoạt động': 'status-active',
        'Giải thể': 'status-inactive',
        'Tạm ngừng': 'status-suspended'
    };
    return classes[status] || 'status-active';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function createPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return;
    
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === 1 ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
}

function changePage(page) {
    // Cập nhật active page
    document.querySelectorAll('.page-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.parentElement.classList.add('active');
    
    // Tải dữ liệu trang mới (implement theo nhu cầu)
    console.log('Chuyển đến trang:', page);
}

function generateQuickReport(type) {
    const reportTypes = {
        'monthly': 'tong-hop',
        'quarterly': 'tong-hop',
        'yearly': 'tong-hop',
        'comparison': 'tong-hop'
    };
    
    const timeRanges = {
        'monthly': 'thang-hien-tai',
        'quarterly': 'quy-hien-tai',
        'yearly': 'nam-hien-tai',
        'comparison': 'nam-hien-tai'
    };
    
    // Thiết lập form
    document.getElementById('reportType').value = reportTypes[type];
    document.getElementById('timeRange').value = timeRanges[type];
    
    // Tự động tạo báo cáo
    handleTimeRangeChange(timeRanges[type]);
    generateReport();
}

function exportReport(format) {
    const reportType = document.getElementById('reportType').value;
    const timeRange = document.getElementById('timeRange').value;
    
    if (!reportType) {
        alert('Vui lòng tạo báo cáo trước khi xuất!');
        return;
    }
    
    // Simulate export
    const fileName = `bao-cao-${reportType}-${new Date().toISOString().split('T')[0]}.${format}`;
    
    if (format === 'excel') {
        alert(`Đang xuất file Excel: ${fileName}`);
        // Implement Excel export logic
    } else if (format === 'pdf') {
        alert(`Đang xuất file PDF: ${fileName}`);
        // Implement PDF export logic
    }
}

function viewDetail(id) {
    alert(`Xem chi tiết doanh nghiệp ID: ${id}`);
    // Implement view detail logic
}

function showLoading() {
    const button = document.querySelector('#reportFilterForm button[type="submit"]');
    button.innerHTML = '<span class="loading-spinner"></span> Đang tạo báo cáo...';
    button.disabled = true;
}

function hideLoading() {
    const button = document.querySelector('#reportFilterForm button[type="submit"]');
    button.innerHTML = '<i class="fas fa-search"></i> Tạo báo cáo';
    button.disabled = false;
}