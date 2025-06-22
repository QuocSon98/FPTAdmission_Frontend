import {
    faShieldAlt,
    faLock,
    faServer,
    faUserShield,
    faCode,
    faLaptopCode,
    faBrain,
    faUsers,
    faCar,
    faShip,
    faGears,
    faRobot,
    faPaintBrush,
    faMicrochip
} from '@fortawesome/free-solid-svg-icons';
import type { MajorData } from '../major/IMajor';

export const ITMajorsData: Record<string, MajorData> = {
    informationSecurity: {
        id: 'informationSecurity',
        name: 'An toàn thông tin',
        bannerImage: '/src/app/assets/img03.png',
        description: ' Chương trình đào tạo chuyên ngành An toàn thông tin tại Trường Đại học FPT được thiết kế để đáp ứng nhu cầu cao của thị trường, khẳng định vị thế dẫn đầu trong lĩnh vực Cyber Security. Chương trình liên tục cập nhật xu hướng mới và kết nối chặt chẽ với Tập đoàn FPT, đảm bảo kiến thức chuyên sâu cùng những trải nghiệm thực tế phong phú, sinh viên tự tin bước vào một trong những ngành nghề hấp dẫn và đầy tiềm năng hiện nay.',
        careers: [
            { position: 'Chuyên viên phân tích bảo mật', role: 'Security Analyst' },
            { position: 'Chuyên gia bảo mật mạng', role: 'Network Security Specialist' },
            { position: 'Quản lý rủi ro an ninh mạng', role: 'Cybersecurity Risk Manager' },
            { position: 'Kỹ sư bảo mật ứng dụng', role: 'Application Security Engineer' },
            { position: 'Chuyên viên bảo mật đám mây', role: 'Cloud Security Specialist' },
            { position: 'Chuyên viên kiểm thử xâm nhập', role: 'Penetration Tester' },
            { position: 'Chuyên gia ứng phó sự cố', role: 'Incident Responder' },
            { position: 'Chuyên viên mã hóa', role: 'Cryptography Specialist' },
            { position: 'Chuyên viên bảo mật dữ liệu', role: 'Data Security Analyst' },
            { position: 'Chuyên viên kiểm toán bảo mật', role: 'Security Auditor' }
        ],
        qualities: [
            { icon: faShieldAlt, title: 'Tư duy logic và giải quyết vấn đề' },
            { icon: faLock, title: 'Đam mê công nghệ' },
            { icon: faServer, title: 'Yêu thích công việc giải quyết vấn đề, phân tích, điều tra' },
            { icon: faUserShield, title: 'Tinh thần chính nghĩa' }
        ]
    },
    softwareEngineering: {
        id: 'softwareEngineering',
        name: 'Kỹ thuật phần mềm',
        bannerImage: '/src/app/assets/img03.png',
        description: 'Chương trình đào tạo ngành Kỹ thuật phần mềm tại Đại học FPT được thiết kế nhằm trang bị cho sinh viên nền tảng kiến thức vững chắc và kỹ năng thực tiễn trong lĩnh vực phát triển phần mềm. Sinh viên không chỉ học các môn chuyên sâu như lập trình, thiết kế hệ thống, kiểm thử phần mềm mà còn được rèn luyện kỹ năng làm việc nhóm, tư duy phản biện và khả năng giao tiếp chuyên nghiệp. Với mô hình đào tạo sát với nhu cầu doanh nghiệp và cơ hội thực tập tại các công ty công nghệ hàng đầu, sinh viên tốt nghiệp có thể tự tin gia nhập thị trường lao động toàn cầu.',
        careers: [
            { position: 'Lập trình viên Full-stack', role: 'Full-stack Developer' },
            { position: 'Lập trình viên Front-end', role: 'Front-end Developer' },
            { position: 'Lập trình viên Back-end', role: 'Back-end Developer' },
            { position: 'Lập trình viên di động', role: 'Mobile Developer' },
            { position: 'Lập trình viên game', role: 'Game Developer' },
            { position: 'Chuyên viên phân tích nghiệp vụ', role: 'Business Analyst (BA)' },
            { position: 'Kỹ sư kiểm thử phần mềm', role: 'Software Tester' },
            { position: 'Chuyên viên tư vấn SAP', role: 'SAP Consultant' },
            { position: 'Lập trình viên SAP', role: 'SAP Developer' },
            { position: 'Kỹ sư cầu nối phần mềm (tiếng Nhật/Hàn)', role: 'Bridge Software Engineer (Japanese/Korean)' }
        ],
        qualities: [
            { icon: faCode, title: 'Tư duy lập trình và giải quyết vấn đề' },
            { icon: faLaptopCode, title: 'Khả năng tự học và cập nhật công nghệ' },
            { icon: faBrain, title: 'Tư duy logic và sáng tạo' },
            { icon: faUsers, title: 'Kỹ năng làm việc nhóm' }
        ]
    },
    digitalCarTechnology: {
        id: 'digitalCarTechnology',
        name: 'Công nghệ ô tô số',
        bannerImage: '/src/app/assets/img03.png',
        description: 'Chương trình Công nghệ ô tô số tại Đại học FPT là sự hòa quyện sáng tạo giữa công nghệ thông tin hiện đại và kỹ thuật ô tô truyền thống. Sinh viên được đào tạo bài bản về hệ thống điều khiển điện tử, phần mềm nhúng, cảm biến, và trí tuệ nhân tạo ứng dụng trong ngành ô tô. Bên cạnh nền tảng kỹ thuật vững chắc, chương trình còn chú trọng phát triển kỹ năng thực hành thông qua các dự án thực tế và mô phỏng công nghệ cao, giúp sinh viên sẵn sàng thích nghi với xu hướng.',
        careers: [
            { position: 'Chuyên gia C++', role: '(Lập trình viên, Trưởng nhóm kỹ thuật, Kiến trúc sư) (C++ Expert (Developer, Technical Lead, Architect)' },
            { position: 'Chuyên gia Embedded C', role: 'Lập trình viên, Trưởng nhóm kỹ thuật, Kiến trúc sư) (Embedded C Expert, Developer, Technical Lead, Architect' },
            { position: 'Chuyên gia tư vấn công nghệ ô tô số', role: 'IndustryX Automotive Software-Defined Vehicles Consulting Expert' },
            { position: 'Kỹ sư kiểm tra tự động hóa', role: 'Automation Tester – Python' },
            { position: 'Kỹ sư Autosar nhúng', role: 'Embedded Autosar Engineer' },
            { position: 'Kỹ sư trải nghiệm phần mềm xe định nghĩa bằng phần mềm', role: 'IndustryX Automotive Software-Defined Vehicles Consulting Expert' }
        ],
        qualities: [
            { icon: faCar, title: 'Đam mê công nghệ ô tô' },
            { icon: faShip, title: 'Hiểu biết về IoT và hệ thống nhúng' },
            { icon: faGears, title: 'Tư duy kỹ thuật và sáng tạo' },
            { icon: faRobot, title: 'Khả năng tích hợp AI và tự động hóa' }
        ]
    },
    digitalConversion: {
        id: 'digitalConversion',
        name: 'Chuyển đổi số',
        bannerImage: '/src/app/assets/img03.png',
        description: 'Trong bối cảnh chuyển đổi số đang là trụ cột phát triển của nền kinh tế và xã hội, Nghị quyết 57-NQ/TW năm 2024 của Bộ Chính trị đã khẳng định rõ vai trò chiến lược của nguồn nhân lực chất lượng cao trong các lĩnh vực như trí tuệ nhân tạo (AI), dữ liệu số, công nghệ lõi và công nghiệp bán dẫn.Chuyên ngành Chuyển đổi số tại Trường Đại học FPT chính là một phần trong lời giải cho chiến lược nhân lực này. Chương trình được thiết kế để đào tạo ra những nhân lực chiến lược thực thụ – không chỉ am hiểu công nghệ mà còn có khả năng tổ chức, tích hợp giải pháp số và dẫn dắt quá trình chuyển đổi trong doanh nghiệp, tổ chức và cộng đồng.',
        careers: [
            { position: 'Chuyên viên chuyển đổi số', role: '' },
            { position: 'Quản lý dự án công nghệ;', role: '' },
            { position: 'Phân tích dữ liệu, phát triển giải pháp số', role: '' },
            { position: 'Chuyên viên UX/UI, marketing số', role: '' },
            { position: 'Quản trị hệ thống Công nghệ thông tin', role: '' },
            { position: 'Marketing số', role: '' },
            { position: 'Chuyên gia tư vấn chuyển đổi số', role: '' },
        ],
        qualities: [
            { icon: faBrain, title: 'Tư duy chiến lược và tầm nhìn tổng thể' },
            { icon: faCode, title: 'Hiểu biết về công nghệ số' },
            { icon: faUsers, title: 'Kỹ năng quản lý và lãnh đạo' },
            { icon: faGears, title: 'Khả năng thích ứng với thay đổi' }
        ]
    },
    digitalDesign: {
        id: 'digitalDesign',
        name: 'Thiết kế mỹ thuật số',
        bannerImage: '/src/app/assets/img03.png',
        description: 'Chương trình Thiết kế mỹ thuật số tại Đại học FPT mang đến một môi trường học tập năng động, nơi sinh viên được phát triển tư duy sáng tạo và khả năng ứng dụng công nghệ hiện đại vào nghệ thuật. Với sự kết hợp giữa thiết kế truyền thống và công nghệ số như đồ họa 2D/3D, thiết kế giao diện người dùng (UI/UX), và hoạt hình kỹ thuật số, sinh viên được đào tạo toàn diện để trở thành những nhà thiết kế đa năng. Thông qua các dự án thực tế và trải nghiệm doanh nghiệp, sinh viên không chỉ rèn luyện kỹ năng chuyên môn mà còn được khuyến khích thể hiện cá tính nghệ thuật trong từng sản phẩm sáng tạo.',
        careers: [
            { position: 'Nhà thiết kế đồ họa (Graphic Designer)', role: 'Thiết kế giao diện người dùng (UI/UX), đồ họa 2D/3D, và thiết kế game' },
            { position: 'Nhà thiết kế quảng cáo và bao bì (Packaging and Advertising Designer)', role: 'Tạo thiết kế bao bì sản phẩm và chiến dịch quảng cáo' },
            { position: 'Nhà thiết kế đồ họa động (Motion Graphics Designer)', role: 'Phát triển hình ảnh động cho video, quảng cáo và game tương tác' },
            { position: 'Giám đốc sáng tạo hoặc Giám đốc nghệ thuật (Creative Director hoặc Art Director)', role: 'Quản lý và điều hành các dự án thiết kế lớn' },
            { position: 'Nhà giáo dục hoặc nhà nghiên cứu (Educator/Researcher)', role: 'Giảng dạy hoặc nghiên cứu trong lĩnh vực thiết kế' }
        ],
        qualities: [
            { icon: faPaintBrush, title: 'Năng khiếu nghệ thuật và thẩm mỹ' },
            { icon: faLaptopCode, title: 'Kỹ năng sử dụng công cụ thiết kế số' },
            { icon: faBrain, title: 'Tư duy sáng tạo' },
            { icon: faUsers, title: 'Khả năng làm việc theo nhóm' }
        ]
    },
    semiconductorDesign: {
        id: 'semiconductorDesign',
        name: 'Thiết kế vi mạch bán dẫn',
        bannerImage: '/src/app/assets/img03.png',
        description: 'Chương trình Thiết kế vi mạch bán dẫn tại Đại học FPT mang đến nền tảng kiến thức chuyên sâu về lĩnh vực thiết kế và phát triển các vi mạch tích hợp (IC), một trong những ngành công nghệ mũi nhọn hiện nay. Sinh viên sẽ được tiếp cận với các môn học về kiến trúc hệ thống số, thiết kế logic, mô phỏng và kiểm thử vi mạch, cũng như nắm vững quy trình sản xuất chip bán dẫn từ thiết kế đến chế tạo. Với sự kết hợp giữa lý thuyết và thực hành trong môi trường phòng lab hiện đại, chương trình hướng đến việc đào tạo những kỹ sư vi mạch có khả năng tham gia vào chuỗi cung ứng toàn cầu trong lĩnh vực công nghiệp bán dẫn đầy tiềm năng.',
        careers: [
            { position: 'Kỹ sư Thiết kế RTL ', role: 'RTL Design Engineer' },
            { position: 'Kỹ sư Kiểm tra Thiết kế', role: 'Design Verification Engineer' },
            { position: 'Kỹ sư Thiết kế vật lý', role: 'Physical Design Engineer' },
            { position: 'Kỹ sư Thiết kế chức năng kiểm tra ', role: 'DFT Engineer' },
            { position: 'Kỹ sư Thiết kế vi mạch', role: 'LSI Engineer' },
            { position: 'Kỹ sư Thiết kế Layout IC', role: 'Digital IC Design Engineer' },
        ],
        qualities: [
            { icon: faMicrochip, title: 'Kiến thức về vi điện tử' },
            { icon: faCode, title: 'Kỹ năng lập trình phần cứng' },
            { icon: faBrain, title: 'Tư duy logic và phân tích' },
            { icon: faGears, title: 'Khả năng giải quyết vấn đề phức tạp' }
        ]
    },
    artificialIntelligence: {
        id: 'artificialIntelligence',
        name: 'Trí tuệ nhân tạo',
        bannerImage: '/src/app/assets/img03.png',
        description: 'Chương trình Trí tuệ nhân tạo tại Đại học FPT được thiết kế nhằm đào tạo những chuyên gia có khả năng làm chủ công nghệ AI hiện đại và ứng dụng vào thực tiễn. Sinh viên sẽ được học các kiến thức từ căn bản đến chuyên sâu về trí tuệ nhân tạo, học máy (machine learning), học sâu (deep learning), và xử lý dữ liệu lớn (big data). Ngoài ra, chương trình còn chú trọng phát triển kỹ năng phân tích, giải quyết vấn đề và triển khai các hệ thống AI trong các lĩnh vực như tài chính, y tế, sản xuất và thương mại điện tử. Với định hướng gắn kết học tập và thực tiễn, sinh viên tốt nghiệp sẽ sẵn sàng trở thành lực lượng tiên phong trong cuộc cách mạng công nghệ 4.0.',
        careers: [
           { position: 'Kỹ sư học máy', role: 'Machine Learning Engineer' },
           { position: 'Kỹ sư siêu dữ liệu lớn', role: 'Big Data Engineer' },
           { position: 'Kỹ sư ngôn ngữ lớn', role: 'LLM Engineer' },
           { position: 'Chuyên gia nghiên cứu AI', role: 'AI Researcher' },
           { position: 'Kỹ sư xử lý ngôn ngữ tự nhiên', role: 'NLP Engineer' },
           { position: 'Chuyên gia phân tích dữ liệu', role: 'Data Scientist' }
        ],
        qualities: [
            { icon: faBrain, title: 'Tư duy toán học và thuật toán' },
            { icon: faCode, title: 'Kỹ năng lập trình nâng cao' },
            { icon: faServer, title: 'Khả năng xử lý dữ liệu lớn' },
            { icon: faRobot, title: 'Đam mê nghiên cứu và đổi mới' }
        ]
    },
};