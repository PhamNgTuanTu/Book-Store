import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Yêu Em Bằng Mắt, Giữ Em Bằng Tim",
            slug: "yeu-em-bang-mat-giu-em-bang-tim",
            category: 1,
            image: "https://www.vinabook.com/images/thumbnails/product/240x/366437_p93863mnxbtredocyeuembangmatgiuembangtimpage001.jpg",
            description: "Phương đã từng có một tình yêu trong trẻo tinh khôi ở tuổi 18 với Trung - người trợ lý tài giỏi, trung thành của bà nội. Nhưng họ sớm bị chia cắt khi Phương qua Pháp đoàn tụ với mẹ, và mất liên lạc trong 10 năm ròng rã. Định mệnh cuối cùng cũng cho họ gặp nhau, giải tỏa những hiểu lầm và nối lại mối duyên xưa. Nhưng thách thức vẫn chưa hết. Một lần nữa, Phương và Trung phải đứng trước lựa chọn nắm tay hoặc buông nhau ra... Truyện diễn ra với bối cảnh Pháp và Việt Nam, với những phân đoạn tả cảnh tả tình lãng mạn bay bổng, những phút bên nhau đầy say đắm, nhưng cũng không thiếu những gai góc có thể chia rẽ mọi đôi tình nhân - cho dù họ đã có một khởi đầu đẹp đẽ như thế nào chăng nữa. Vì yêu nhau rõ ràng là từ ánh mắt, nhưng muốn ở bên nhau trọn đời, cần phải có một con tim rộng mở, bao dung...",
            author: 1,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 1750000,
            discount: 6,
            count: 120
        },
        {
            id: 2,
            name: "Sách - Thất Lạc Cõi Người",
            slug: "sach-that-lac-coi-nguoi",
            category: 2,
            image: 'https://www.vinabook.com/images/thumbnails/product/240x/218540_p69404mbt.jpg',
            description: "Thất Lạc Cõi Người là một tác phẩm kinh điển nổi tiếng của văn học Nhật Bản hiện đại và là cuốn tiểu thuyết cuối cùng của Dazai Osamu. Thất Lạc Cõi Người mang nhiều nét tự thuật, là một tiểu thuyết tự truyện. Sau khi hoàn thành tác phẩm này, Dazai cùng với người tình là Tomie trầm mình tự sát ở hồ nước ngọt Tamagawa, chấm dứt cuộc đời 39 năm ngắn ngủi. Cuộc đời của Dazai là cuộc đời đau thương và vỡ mộng. Tự sát đến năm lần, nghiện rượu, nghiện thuốc giảm đau, vào bệnh viện tâm thần, ly dị vợ, tái hôn, một con trai tật nguyền, đường văn chương lận đận. Tất cả những điều này in dấu trong tác phẩm của ông, làm nên nét độc đáo và mang lại vinh quang cho Dazai Osamu. Thất Lạc Cõi Người được thể hiện dưới dạng ghi chép của chàng trai trẻ Oba Yozo được một người lạ mặt tìm thấy từ một người phụ nữ từng ở quán bar, gồm 3 quyển sổ.",
            author: 2,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 99000,
            discount: 16,
            count: 120
        },
        {
            id: 3,
            name: "Yêu Em Bằng Mắt, Giữ Em Bằng Tiền",
            slug: "yeu-em-bang-mat-giu-em-bang-tien",
            category: 3,
            image: "https://www.vinabook.com/images/thumbnails/product/240x/366437_p93863mnxbtredocyeuembangmatgiuembangtimpage001.jpg",
            description: "Phương đã từng có một tình yêu trong trẻo tinh khôi ở tuổi 18 với Trung - người trợ lý tài giỏi, trung thành của bà nội. Nhưng họ sớm bị chia cắt khi Phương qua Pháp đoàn tụ với mẹ, và mất liên lạc trong 10 năm ròng rã. Định mệnh cuối cùng cũng cho họ gặp nhau, giải tỏa những hiểu lầm và nối lại mối duyên xưa. Nhưng thách thức vẫn chưa hết. Một lần nữa, Phương và Trung phải đứng trước lựa chọn nắm tay hoặc buông nhau ra... Truyện diễn ra với bối cảnh Pháp và Việt Nam, với những phân đoạn tả cảnh tả tình lãng mạn bay bổng, những phút bên nhau đầy say đắm, nhưng cũng không thiếu những gai góc có thể chia rẽ mọi đôi tình nhân - cho dù họ đã có một khởi đầu đẹp đẽ như thế nào chăng nữa. Vì yêu nhau rõ ràng là từ ánh mắt, nhưng muốn ở bên nhau trọn đời, cần phải có một con tim rộng mở, bao dung...",
            author: 3,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 160000,
            discount: 10,
            count: 120
        },
        {
            id: 4,
            name: "Lì Quá Để Nói Quài",
            slug: "li-qua-de-noi-hoai",
            category: 4,
            image: 'https://www.vinabook.com/images/thumbnails/product/240x/366428_p93859mz2457193695989fd0bbcba7812d5fdebaf10dec13a8b29.jpg',
            description: "Anh Cầm Fact là fanpage đại diện bởi một anh chàng khó ở, sẵn sàng nói hộ tiếng lòng của mọi người về những vấn đề khó đỡ trong cuộc sống. Dù mới ra đời đầu năm 2020, Anh Cầm Fact đã có một lượng tương tác khủng nhờ những hình ảnh và câu quote mặn mòi cùng lối chơi chữ vô cùng duyên dáng. Sở hữu hơn 250, 000 lượt theo dõi trên Facebook, hình ảnh Anh Cầm Fact đã trở nên quen thuộc với những bài post với hàng chục ngàn lượt thích và chia sẻ. Cuộc sống mà, ở đâu cũng có những đứa lì lợm thích làm theo ý mình. 7H đi chơi mà 9H nằng nặc đòi về. Đợi nó cúng story rồi mới được ăn. Không nhận ảnh qua airdrop mà phải gửi Zalo HD nha. Và ti tỉ những hành động khác khiến ta quạu cọ, khó ở. Thay vì dồn nén, hãy mở ngay Lì Quá Để Nói Quài - cuốn sách nhỏ xinh định nghĩa những điều không giống ai nhưng đọc xong lại khiến mấy đứa lì cảm thấy “nhột nhột”. Bận rộn(tính từ): Tôi có vài đơn hàng, tuy không nhiều nhưng xuống lấy cũng mất cả ngày. Não cá vàng(danh từ): Mua đồ 6 triệu mới nhớ lương 5 triệu. Người chơi hệ cao su(cụm danh từ): Đợi xíu sắp tới là khi nào tới? Có những định nghĩa đọc xong phải chờ một lúc mới “nhảy số” rồi tủm tỉm cười. Có những định nghĩa đọc xong lại thấy “tưng tức cái ngực”. Nếu bạn đang không định nghĩa nổi những hành động của mình và những người xung quanh, cuốn sách này chính là dành cho bạn. Nếu bạn có đứa bạn nhắc mãi nó vẫn cứ “lì” ra, cuốn sách này dành cho bạn của bạn.Và bạn yên tâm, Lì Quá Để Nói Quài luôn sẵn sàng nói hộ tiếng lòng của bạn về những vấn đề “khó đỡ” trong cuộc sống.",
            author: 4,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 160000,
            discount: 22,
            count: 120
        },
        {
            id: 5,
            name: "Nguồn Gốc Dịch Bệnh",
            slug: "nguon-goc-dich-benh",
            category: 5,
            image: 'https://www.vinabook.com/images/thumbnails/product/240x/365454_p93451mimage221903.jpg',
            description: "một cuốn sách phi thường. David Quammen đã dệt lên một câu chuyện đặc biệt, một tiểu thuyết trinh thám với những kẻ sát nhân rất khác biệt, nhưng cũng rất chân thực. Chúng là virus, vi khuẩn và những sinh vật đơn bào gây bệnh trên động vật; nhưng đôi khi, chúng sẽ thay đổi mục tiêu.",
            author: 5,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 160000,
            discount: 60,
            count: 120
        },
        {
            id: 6,
            name: "Nguồn Gốc Văn Minh",
            slug: "nguon-goc-van-minh",
            category: 6,
            image: 'https://www.vinabook.com/images/thumbnails/product/240x/23972_30429.jpg',
            description: "Xét chung thì văn minh chỉ là sự sáng tạo văn hoá nhờ một trật tự xã hội gây ra và kích thích. Nó gồm bốn yếu tố căn bản: sự phòng xa về kinh tế, sự tổ chức chính trị, như những truyền thống luân lí, và sự tăng tiến tri thức, phát triển nghệ thuật. Chỉ khi nào không còn sự hỗn độn, sự bất an nữa thì văn minh mới phát sinh được. Vì chỉ khi nào không còn sợ sệt nữa thì con người mới được thanh thản, tha hồ tò mò tìm hiểu hoặc sáng tạo, theo cái bản năng học hỏi thêm và tô điểm thêm cuộc sống của mình.",
            author: 6,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 306000,
            discount: 66,
            count: 120
        },
        {
            id: 7,
            name: "Nguồn gốc của muôn loài",
            slug: "nguon-goc-cua-muon-loai",
            category: 6,
            image: 'https://www.vinabook.com/images/thumbnails/product/240x/10532_p16703.jpg',
            description: "Xét chung thì văn minh chỉ là sự sáng tạo văn hoá nhờ một trật tự xã hội gây ra và kích thích. Nó gồm bốn yếu tố căn bản: sự phòng xa về kinh tế, sự tổ chức chính trị, như những truyền thống luân lí, và sự tăng tiến tri thức, phát triển nghệ thuật. Chỉ khi nào không còn sự hỗn độn, sự bất an nữa thì văn minh mới phát sinh được. Vì chỉ khi nào không còn sợ sệt nữa thì con người mới được thanh thản, tha hồ tò mò tìm hiểu hoặc sáng tạo, theo cái bản năng học hỏi thêm và tô điểm thêm cuộc sống của mình.",
            author: 6,
            NXB: "nxb Trẻ",
            NPH: "nxb Trẻ",
            price: 306000,
            discount: 99,
            count: 120
        },
    ])
    const [categorys, setCategorys] = useState([
        {
            "id": "1",
            "name": "Tiểu Thuyết",
            "slug": "tieu-thuyet",
        },
        {
            "id": "2",
            "name": "Nghệ Thuật",
            "slug": "nghe-thuat",
        },
        {
            "id": "3",
            "name": "Kinh Tế",
            "slug": "kinh-te",
        },
        {
            "id": "4",
            "name": "Văn Học",
            "slug": "van-hoc",
        },
        {
            "id": "5",
            "name": "Truyện Tranh",
            "slug": "truyen-tranh",
        },
        {
            "id": "6",
            "name": "Triết Lý",
            "slug": "triet-ly",
        },
    ])

    const [authors, setAuthors] = useState([
        {
            "id": "1",
            "name": "Dương Thụy",
            "slug": "duong-thuy",
            "image": "https://images.gr-assets.com/authors/1305180830p5/4749583.jpg",
            "content": "Dương Thụy",
        },
        {
            "id": "2",
            "name": "Dazai Osamu",
            "slug": "dazai-osamu",
            "image": "https://i.pinimg.com/originals/f8/79/57/f87957254c16183074cb3831ab8d4bf4.jpg",
            "content": "Dazai Osamu",
        },
        {
            "id": "3",
            "name": "Nguyên Phong",
            "slug": "nguyen-phong",
            "image": "http://thuvienhoasen.org/images/file/NgVkR9EF1AgBAOUh/john-vu-nguyen-phong.jpg",
            "content": "Nguyên Phong",
        },
        {
            "id": "4",
            "name": "Tú Trầm Cảm",
            "slug": "tu-tram-cam",
            "image": "https://maybomruaxe.net/wp-content/uploads/2021/06/nezuko-chan-la-ai.jpg",
            "content": "Tú Trầm Cảm",

        },
        {
            "id": "5",
            "name": "Kimochi",
            "slug": "Kimochi",
            "image": "https://i.pinimg.com/originals/bf/0a/3e/bf0a3ebc040ba080f701280f6cf3de35.jpg",
            "content": "Kimochi",

        },
        {
            "id": "6",
            "name": "Kimochi Warui",
            "slug": "kimochi-warui",
            "image": "https://www.1999.co.jp/itbig68/10686907a_m.jpg",
            "content": "Kimochi Warui",
        },
    ])


    const value = {
        products: [products, setProducts],
        categorys: [categorys, setCategorys],
        authors: [authors, setAuthors],
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}
