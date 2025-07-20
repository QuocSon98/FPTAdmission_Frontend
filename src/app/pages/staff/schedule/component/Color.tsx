// Hàm tạo màu ngẫu nhiên không trùng với statusColors
const getRandomColor = (appointmentId: string) => {
    // Danh sách các màu Tailwind thông dụng
    const colors = [
        // can show color
        'blue', 'red', 'green', 'yellow', 'orange', 'emerald', 'gray', 'indigo',
        // not show color
        //  'amber', 'fuchsia', 'pink', 'teal', 'cyan', 'purple',
        // 'rose', 'lime', 'sky', 'violet', 'slate', 'zinc', 'neutral', 'stone'
    ];

    // Sử dụng ID của appointment để chọn màu, đảm bảo cùng ID luôn cùng màu
    let asciiSum = 0;
    for (let i = 0; i < appointmentId.length; i++) {
        asciiSum += appointmentId.charCodeAt(i);
    }
    const colorIndex = asciiSum % colors.length;
    return colors[colorIndex] || colors[0];
    // return 'stone'; // Mặc định là 'blue' nếu không tìm thấy màu
    // return colors[0]; // Mặc định là 'blue' nếu không tìm thấy màu
};

// Hàm lấy màu text và background dựa trên màu chính
const getColorVariants = (color: string) => {
    return {
        color: `bg-${color}-100`,
        textColor: `text-${color}-700`,
        bgLight: `bg-${color}-50`
    };
};

export const getColor = (appointmentId: string) => {
    const color = getRandomColor(appointmentId);
    return getColorVariants(color);
};