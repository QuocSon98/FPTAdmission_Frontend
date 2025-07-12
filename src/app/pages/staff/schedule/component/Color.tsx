// Hàm tạo màu ngẫu nhiên không trùng với statusColors
const getRandomColor = (appointmentId: string) => {
    // Danh sách các màu Tailwind thông dụng
    const colors = [
        // can show color
        'blue', 'red', 'green', 'purple', 'orange', 'emerald', 'gray',
        // not show color
        // 'yellow', 'amber', 'fuchsia', 'pink', 'indigo', 'teal', 'cyan', 
        // 'rose', 'lime', 'sky', 'violet', 'slate', 'zinc', 'neutral', 'stone'
    ];

    // Sử dụng ID của appointment để chọn màu, đảm bảo cùng ID luôn cùng màu
    let asciiSum = 0;
    for (let i = 0; i < appointmentId.length; i++) {
        asciiSum += appointmentId.charCodeAt(i);
    }
    const colorIndex = asciiSum % colors.length;
    console.log(colorIndex)
    return colors[colorIndex] || colors[0];
    // return 'stone'; // Mặc định là 'blue' nếu không tìm thấy màu
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