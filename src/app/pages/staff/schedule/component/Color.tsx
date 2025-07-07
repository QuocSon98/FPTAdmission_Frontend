// Hàm tạo màu ngẫu nhiên không trùng với statusColors
const getRandomColor = (appointmentId: string) => {
    // Danh sách các màu Tailwind thông dụng
    const colors = [
        'purple', 'orange', 'amber', 'fuchsia',
        'pink', 'indigo', 'teal', 'cyan', 'rose',
        'lime', 'emerald', 'sky', 'violet',
    ];

    // Sử dụng ID của appointment để chọn màu, đảm bảo cùng ID luôn cùng màu
    let asciiSum = 0;
    for (let i = 0; i < appointmentId.length; i++) {
        asciiSum += appointmentId.charCodeAt(i);
    }
    const colorIndex = asciiSum % colors.length;
    return colors[colorIndex] || colors[0];
};

// Hàm lấy màu text và background dựa trên màu chính
const getColorVariants = (color: string) => {
    return {
        color: `bg-${color}-500`,
        textColor: `text-${color}-700`,
        bgLight: `bg-${color}-50`
    };
};

export const getColor = (appointmentId: string) => {
    const color = getRandomColor(appointmentId);
    return getColorVariants(color);
};