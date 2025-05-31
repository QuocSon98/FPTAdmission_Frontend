import React from 'react';

const Admission: React.FC = () => {

    const formInfo = [
        { id: 'fullname', label: 'Họ tên', type: 'text', placeholder: 'Nguyễn Văn A', pattern: ''},
        { id: 'email', label: 'Email', type: 'email', placeholder: 'example@gmail.com', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'},
        { id: 'phone', label: 'Số điện thoại', type: 'tel', placeholder: '0123456789', pattern: '^0[0-9]{9,10}$'},
    ];

    const addressList = [
        { value: '', label: 'Chọn tỉnh / thành phố' },
        { value: 'An Giang', label: 'An Giang' },
        { value: 'Bà Rịa - Vũng Tàu', label: 'Bà Rịa - Vũng Tàu' },
        { value: 'Bắc Giang', label: 'Bắc Giang' },
        { value: 'Bắc Kạn', label: 'Bắc Kạn' },
        { value: 'Bạc Liêu', label: 'Bạc Liêu' },
        { value: 'Bắc Ninh', label: 'Bắc Ninh' },
        { value: 'Bến Tre', label: 'Bến Tre' },
        { value: 'Bình Định', label: 'Bình Định' },
        { value: 'Bình Dương', label: 'Bình Dương' },
        { value: 'Bình Phước', label: 'Bình Phước' },
        { value: 'Bình Thuận', label: 'Bình Thuận' },
        { value: 'Cà Mau', label: 'Cà Mau' },
        { value: 'Cần Thơ', label: 'Cần Thơ' },
        { value: 'Cao Bằng', label: 'Cao Bằng' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Đắk Lắk', label: 'Đắk Lắk' },
        { value: 'Đắk Nông', label: 'Đắk Nông' },
        { value: 'Điện Biên', label: 'Điện Biên' },
        { value: 'Đồng Nai', label: 'Đồng Nai' },
        { value: 'Đồng Tháp', label: 'Đồng Tháp' },
        { value: 'Gia Lai', label: 'Gia Lai' },
        { value: 'Hà Giang', label: 'Hà Giang' },
        { value: 'Hà Nam', label: 'Hà Nam' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
        { value: 'Hải Dương', label: 'Hải Dương' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
        { value: 'Hậu Giang', label: 'Hậu Giang' },
        { value: 'Hòa Bình', label: 'Hòa Bình' },
        { value: 'Hưng Yên', label: 'Hưng Yên' },
        { value: 'Khánh Hòa', label: 'Khánh Hòa' },
        { value: 'Kiên Giang', label: 'Kiên Giang' },
        { value: 'Kon Tum', label: 'Kon Tum' },
        { value: 'Lai Châu', label: 'Lai Châu' },
        { value: 'Lâm Đồng', label: 'Lâm Đồng' },
        { value: 'Lạng Sơn', label: 'Lạng Sơn' },
        { value: 'Lào Cai', label: 'Lào Cai' },
        { value: 'Long An', label: 'Long An' },
        { value: 'Nam Định', label: 'Nam Định' },
        { value: 'Nghệ An', label: 'Nghệ An' },
        { value: 'Ninh Bình', label: 'Ninh Bình' },
        { value: 'Ninh Thuận', label: 'Ninh Thuận' },
        { value: 'Phú Thọ', label: 'Phú Thọ' },
        { value: 'Phú Yên', label: 'Phú Yên' },
        { value: 'Quảng Bình', label: 'Quảng Bình' },
        { value: 'Quảng Nam', label: 'Quảng Nam' },
        { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
        { value: 'Quảng Ninh', label: 'Quảng Ninh' },
        { value: 'Quảng Trị', label: 'Quảng Trị' },
        { value: 'Sóc Trăng', label: 'Sóc Trăng' },
        { value: 'Sơn La', label: 'Sơn La' },
        { value: 'Tây Ninh', label: 'Tây Ninh' },
        { value: 'Thái Bình', label: 'Thái Bình' },
        { value: 'Thái Nguyên', label: 'Thái Nguyên' },
        { value: 'Thanh Hóa', label: 'Thanh Hóa' },
        { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
        { value: 'Tiền Giang', label: 'Tiền Giang' },
        { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
        { value: 'Trà Vinh', label: 'Trà Vinh' },
        { value: 'Tuyên Quang', label: 'Tuyên Quang' },
        { value: 'Vĩnh Long', label: 'Vĩnh Long' },
        { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
        { value: 'Yên Bái', label: 'Yên Bái' }
    ];

    return (
        <>
            <div className='text-[40px] text-center'>
                <h1>Đăng kí tư vấn</h1>
            </div>
            <form className=''>
                {formInfo.map(({id, label, type, placeholder, pattern}) => (
                <div className='my-3'>
                    <label className='block text-[17px] font-bold my-2'>
                        {label}
                        <span className='text-red-700 mx-2'>*</span>
                    </label>
                    <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        pattern={pattern ? pattern : undefined}
                        required
                        className='rounded-md border w-full block border-gray-300 h-10 my-2 px-2'
                        // value={}
                        // onChange={} 
                    />
                </div>
                ))}
                <div className='my-3'>
                    <label className='block text-[17px] font-bold my-2'>
                        Tỉnh / Thành phố
                        <span className='text-red-700 mx-2'>*</span>
                    </label>
                    <select  
                    id='address'
                    required
                    // value={}
                    // onChange={}
                    className='rounded-md border w-full block border-gray-300 h-10 my-2 px-2'>
                        {addressList.map(({value, label}) => (
                            <option value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='my-3'>
                    <label className='block text-[17px] font-bold my-2'>
                        Nội dung
                    </label>
                    <textarea
                        id='content'
                        placeholder=''
                        className='rounded-md border w-full block border-gray-300 h-30 my-2 px-2'
                        rows={10}
                        cols={50}
                        maxLength={1000}

                        // value={}
                        // onChange={} 
                    ></textarea>
                </div>
                <div>
                    <button 
                    type="submit"
                    // onClick={}
                    className='rounded-md bg-[rgba(240_81_35)] text-white h-10 w-20 font-bold text-[17px] my-2' >
                        Gửi
                    </button>
                </div>
            </form>
        </>
    )

}

export default Admission;