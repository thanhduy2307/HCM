/**
 * Dữ liệu 9 cột mốc lịch sử và trọn bộ 27 câu hỏi trắc nghiệm (3 câu / mốc)
 * Thiết kế bám sát bố cục poster gốc: Hành trình tư tưởng qua các bước ngoặt lịch sử
 */

const HCM_DATA_VERSION = "2.2";

const DEFAULT_STAGES_DATA = [
  {
    id: 1,
    title: "Từ Làng Sen - Nghệ An",
    period: "1890 – 1911",
    stickyTag: "Start",
    locationTag: "Nghệ An",
    mainImage: "làng_sen.jpg",
    gallery: [
      { src: "làng_sen.jpg", caption: "Ngôi nhà tranh quê nội Bác Hồ tại Làng Sen (Kim Liên, Nam Đàn, Nghệ An)" }
    ],
    bulletPoints: [
      "Chứng kiến cảnh nước mất, nhà tan, nhân dân lầm than.",
      "Hình thành lòng yêu nước, ý chí cứu nước từ sớm."
    ],
    milestoneType: "Nhận thức ban đầu",
    milestoneText: "Cần tìm một con đường mới để cứu nước.",
    quote: "Sinh ra và lớn lên trong nỗi đau mất nước, Người nuôi dưỡng khát vọng tìm đường giải phóng dân tộc.",
    questions: [
      {
        id: "q1",
        questionNumber: 1,
        questionText: "Chủ tịch Hồ Chí Minh (tên khai sinh là Nguyễn Sinh Cung) sinh ngày tháng năm nào và ở đâu?",
        options: [
          "Ngày 19/05/1890 tại xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An.",
          "Ngày 05/06/1911 tại thị xã Vinh, huyện Hưng Nguyên, tỉnh Nghệ An.",
          "Ngày 19/05/1888 tại xã Đức Thọ, huyện Hương Sơn, tỉnh Hà Tĩnh.",
          "Ngày 19/05/1895 tại huyện Nam Trực, tỉnh Nam Định, vùng Bắc Bộ."
        ],
        correctIndex: 0,
        explanation: "Người sinh ngày 19/5/1890 tại quê ngoại (làng Hoàng Trù) và sống thời niên thiếu ở quê nội (làng Sen), đều thuộc xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An."
      },
      {
        id: "q2",
        questionNumber: 2,
        questionText: "Yếu tố gia đình và quê hương Nghệ An đóng vai trò gì trong việc hình thành tư tưởng Hồ Chí Minh giai đoạn 1890 – 1911?",
        options: [
          "Trực tiếp học tập lý luận Mác - Lênin và cách mạng vô sản từ nhỏ.",
          "Bồi đắp lòng yêu nước nồng nàn, tinh thần thương dân sâu sắc.",
          "Định hướng tham gia phong trào Đông Du của cụ Phan Bội Châu.",
          "Trực tiếp xây dựng Cương lĩnh chính trị cho cách mạng Việt Nam."
        ],
        correctIndex: 1,
        explanation: "Quê hương Nghệ An giàu truyền thống chống ngoại xâm cùng gia đình nhà nho yêu nước đã đặt nền móng tình cảm yêu nước và thương dân sâu sắc cho Người."
      },
      {
        id: "q3",
        questionNumber: 3,
        questionText: "Khi chứng kiến các phong trào yêu nước đầu thế kỷ XX (Cần Vương, Đông Du, Duy Tân, Yên Thế), Nguyễn Tất Thành có thái độ ra sao?",
        options: [
          "Tán thành phương pháp bạo động xin viện trợ Nhật của Phan Bội Châu.",
          "Ủng hộ phương pháp cải lương 'xin Pháp rủ lòng thương' của Phan Châu Trinh.",
          "Khâm phục lòng yêu nước nhưng nhận thấy các con đường đó đều bế tắc.",
          "Gia nhập nghĩa quân Yên Thế của Hoàng Hoa Thám để trực tiếp đánh Pháp."
        ],
        correctIndex: 2,
        explanation: "Người nhận thấy con đường của cụ Phan Bội Châu chẳng khác nào 'đưa hổ cửa trước, rước hùm cửa sau', cụ Phan Châu Trinh thì 'xin Pháp rủ lòng thương', nên Người quyết định tìm con đường cứu nước mới."
      }
    ],
    // Hỗ trợ tương thích ngược
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 2,
    title: "Ra đi tìm đường cứu nước",
    period: "1911",
    stickyTag: "Bến Nhà Rồng Sài Gòn",
    locationTag: "Bến Nhà Rồng",
    mainImage: "ben_nha_rong.jpg",
    gallery: [
      { src: "ben_nha_rong.jpg", caption: "Bến cảng Nhà Rồng năm 1911 - nơi người thanh niên Nguyễn Tất Thành lên tàu ra đi tìm đường cứu nước" }
    ],
    bulletPoints: [
      "Rời Tổ quốc, lên tàu Amiral Latouche Tréville tại Bến Nhà Rồng.",
      "Bắt đầu hành trình tìm hiểu thế giới, các con đường cứu nước khác nhau."
    ],
    milestoneType: "Nhận thức mới",
    milestoneText: "Không thể đi theo con đường cứu nước cũ của các phong kiến, tư sản.",
    quote: "Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.",
    questions: [
      {
        id: "q4",
        questionNumber: 4,
        questionText: "Ngày 05/06/1911, người thanh niên Nguyễn Tất Thành rời Bến cảng Nhà Rồng trên con tàu nào và với tên gọi gì?",
        options: [
          "Tàu Amiral Latouche-Tréville ngày 05/06/1911 với tên gọi Văn Ba.",
          "Tàu Le Paria ngày 19/05/1911 với tên gọi Nguyễn Ái Quốc.",
          "Tàu Amiral Latouche-Tréville ngày 05/06/1911 với tên gọi Nguyễn Tất Thành.",
          "Tàu La Touche-Tréville ngày 05/06/1912 với tên gọi Anh Ba."
        ],
        correctIndex: 0,
        explanation: "Người lấy tên Văn Ba, làm phụ bếp trên con tàu buôn Amiral Latouche-Tréville rời Sài Gòn sang phương Tây."
      },
      {
        id: "q5",
        questionNumber: 5,
        questionText: "Động cơ chính khiến Nguyễn Tất Thành quyết định sang phương Tây (đặc biệt là nước Pháp) năm 1911 là gì?",
        options: [
          "Xin chính phủ Pháp cấp học bổng vào học Trường Hành chính Paris.",
          "Tìm kiếm sự hỗ trợ quân sự từ các nước tư bản phương Tây để đánh Pháp.",
          "Sang Liên Xô nghiên cứu mô hình Nhà nước Xô viết của giai cấp công nhân.",
          "Xem các nước làm thế nào rồi trở về giúp đồng bào cởi bỏ ách nô lệ."
        ],
        correctIndex: 3,
        explanation: "Người muốn tìm hiểu bản chất của những từ 'Tự do - Bình đẳng - Bác ái' ngay tại nước Pháp để tìm ra phương pháp giải phóng dân tộc."
      },
      {
        id: "q6",
        questionNumber: 6,
        questionText: "Điểm sáng tạo và khác biệt căn bản trong hướng đi cứu nước năm 1911 của Nguyễn Tất Thành so với các sĩ phu tiền bối là gì?",
        options: [
          "Đi sang phương Đông (Nhật Bản, Trung Quốc) để xin viện trợ đánh Pháp.",
          "Dựa vào triều đình phong kiến nhà Nguyễn để phát động phong trào Cần Vương.",
          "Đi sang phương Tây, thâm nhập thực tiễn các nước tư bản và thuộc địa.",
          "Vận động chính giới Pháp trao trả độc lập cho Việt Nam bằng con đường hòa bình."
        ],
        correctIndex: 2,
        explanation: "Các sĩ phu trước đó hướng về phương Đông (Nhật, Trung Quốc) hoặc dựa vào phong kiến, còn Nguyễn Tất Thành đi sang phương Tây để khảo sát trực tiếp các nước tư bản chủ nghĩa."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 3,
    title: "Tiếp xúc với thế giới",
    period: "1911 – 1917",
    stickyTag: "Năm châu",
    locationTag: "Pháp, Anh, Mỹ...",
    mainImage: "hoat dong trong phong trao cong san quoc te.jpg",
    gallery: [
      { src: "hoat dong trong phong trao cong san quoc te.jpg", caption: "Nguyễn Ái Quốc hoạt động, trải nghiệm và tiếp xúc với thế giới lao động quốc tế" }
    ],
    bulletPoints: [
      "Làm việc, trải nghiệm ở nhiều quốc gia (Pháp, Anh, Mỹ...).",
      "Chứng kiến sự áp bức, bất công của chủ nghĩa thực dân và chủ nghĩa tư bản."
    ],
    milestoneType: "Nhận thức sâu sắc",
    milestoneText: "Cần một con đường giải phóng không chỉ cho Việt Nam mà cho cả người lao động trên thế giới.",
    quote: "Ở đâu nhân dân lao động cũng là bạn, ở đâu bọn thực dân đế quốc cũng là kẻ thù.",
    questions: [
      {
        id: "q7",
        questionNumber: 7,
        questionText: "Trong giai đoạn 1911 – 1917, Nguyễn Tất Thành đã bôn ba qua những khu vực nào trên thế giới?",
        options: [
          "Chỉ sống và nghiên cứu lý luận tập trung tại hai quốc gia là Pháp và Nga.",
          "Qua nhiều nước ở châu Á, châu Âu, châu Phi và châu Mỹ (Pháp, Anh, Mỹ...).",
          "Hoạt động cách mạng chủ yếu tại các nước Đông Nam Á như Thái Lan và Lào.",
          "Sống và nghiên cứu lý luận chính trị tại Trung Quốc và Nhật Bản."
        ],
        correctIndex: 1,
        explanation: "Hành trình qua gần 30 quốc gia ở các châu lục đã giúp Người có cái nhìn toàn diện và thực tiễn về thế giới."
      },
      {
        id: "q8",
        questionNumber: 8,
        questionText: "Qua khảo sát thực tiễn đời sống nhân dân lao động ở các nước tư bản và thuộc địa, Nguyễn Tất Thành rút ra kết luận quan trọng nào?",
        options: [
          "Ở đâu đế quốc cũng dã man, ở đâu người lao động cũng bị áp bức bóc lột.",
          "Chủ nghĩa tư bản phương Tây là mô hình xã hội hoàn hảo và bình đẳng nhất.",
          "Nước Pháp và nước Mỹ là nơi tuyệt đối không có người lao động nghèo khổ.",
          "Nhân dân thuộc địa phải dựa hoàn toàn vào sự giúp đỡ của tư sản phương Tây."
        ],
        correctIndex: 0,
        explanation: "Người nhận ra thế giới chia thành hai phe: phe các dân tộc bị áp bức/người lao động nghèo và phe chủ nghĩa đế quốc bóc lột."
      },
      {
        id: "q9",
        questionNumber: 9,
        questionText: "Sự kiện quốc tế vĩ đại nào diễn ra năm 1917 đã mở ra thời đại mới và định hướng nhận thức tiếp theo của Nguyễn Ái Quốc?",
        options: [
          "Cuộc Cách mạng Tân Hợi bùng nổ và giành thắng lợi tại Trung Quốc.",
          "Sự kiện thành lập Quốc tế Cộng sản (Quốc tế III) tại Mát-xcơ-va.",
          "Thắng lợi của cuộc Cách mạng Tháng Mười Nga do Lênin lãnh đạo.",
          "Chiến tranh thế giới thứ nhất bùng nổ quy mô lớn trên toàn châu Âu."
        ],
        correctIndex: 2,
        explanation: "Thắng lợi của Cách mạng Tháng Mười Nga (1917) mở ra thời đại mới và hướng Nguyễn Ái Quốc tìm hiểu về Lênin cùng Quốc tế Cộng sản."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 4,
    title: "Gửi 'Yêu sách của nhân dân An Nam'",
    period: "1919",
    stickyTag: "Paris (Pháp)",
    locationTag: "Paris",
    mainImage: "yeu_sach-nhan_dan_An-Nam.jpg",
    secondImage: "hội nghị versailles (phap).jpg",
    gallery: [
      { src: "yeu_sach-nhan_dan_An-Nam.jpg", caption: "Bản Yêu sách của nhân dân An Nam gồm 8 điểm gửi tới Hội nghị Versailles (1919)" },
      { src: "hội nghị versailles (phap).jpg", caption: "Toàn cảnh Hội nghị hòa bình Versailles tại Paris (Pháp) năm 1919" }
    ],
    bulletPoints: [
      "Tham gia Hội nghị Versailles (Pháp).",
      "Gửi bản yêu sách đòi quyền dân tộc, dân quyền."
    ],
    milestoneType: "Nhận thức mới",
    milestoneText: "Từ yêu cầu quyền dân tộc → nhận thức sâu sắc hơn về quyền con người, quyền dân tộc.",
    quote: "Muốn được giải phóng, các dân tộc chỉ có thể trông cậy vào chính lực lượng của bản thân mình.",
    questions: [
      {
        id: "q10",
        questionNumber: 10,
        questionText: "Tháng 6/1919, thay mặt Hội những người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc đã gửi văn kiện nào tới Hội nghị Versailles?",
        options: [
          "Bản Yêu sách của nhân dân An Nam.",
          "Tuyên ngôn Độc lập của Việt Nam.",
          "Tác phẩm Bản án chế độ thực dân Pháp.",
          "Tác phẩm Đường Kách mệnh cứu quốc."
        ],
        correctIndex: 0,
        explanation: "Bản Yêu sách gồm 8 điểm đòi các quyền tự do, bình đẳng tối thiểu cho nhân dân An Nam gửi tới Hội nghị Versailles gây tiếng vang lớn."
      },
      {
        id: "q11",
        questionNumber: 11,
        questionText: "Bản 'Yêu sách của nhân dân An Nam' (1919) tập trung đòi hỏi chính quyền thực dân Pháp điều gì?",
        options: [
          "Đòi chính quyền thực dân Pháp trao trả độc lập ngay lập tức cho Việt Nam.",
          "Đòi các quyền tự do, dân chủ, bình đẳng tối thiểu cho nhân dân An Nam.",
          "Đòi bãi bỏ hoàn toàn triều đình phong kiến nhà Nguyễn ở Trung Kỳ.",
          "Đòi mở rộng giao thương kinh tế giữa Đông Dương và các nước tư bản."
        ],
        correctIndex: 1,
        explanation: "Bản Yêu sách tập trung vào các quyền dân sinh, dân chủ tối thiểu như tự do ngôn luận, báo chí, hội họp, bình đẳng trước pháp luật."
      },
      {
        id: "q12",
        questionNumber: 12,
        questionText: "Bài học nhận thức lớn nhất mà Nguyễn Ái Quốc rút ra sau khi bản Yêu sách bị Hội nghị Versailles phớt lờ là gì?",
        options: [
          "Cần kiên trì thương lượng và trông chờ vào sự ban ơn của chính giới Pháp.",
          "Cần gửi đơn khiếu nại lên Hội Quốc liên để xin can thiệp quốc tế.",
          "Phải ngay lập tức phát động khởi nghĩa vũ trang trên quy mô toàn quốc.",
          "Muốn giải phóng dân tộc phải dựa vào sức mạnh của chính bản thân mình."
        ],
        correctIndex: 3,
        explanation: "Sự kiện giúp Người nhận ra bản chất của các nước đế quốc và khẳng định bài học 'tự lực cánh sinh'."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 5,
    title: "Đến với chủ nghĩa Mác – Lênin",
    period: "1920",
    stickyTag: "Tours (Pháp)",
    locationTag: "Tours",
    mainImage: "chu_nghia_maclenin.jpg",
    secondImage: "tham gia dcs phap.jpg",
    gallery: [
      { src: "chu_nghia_maclenin.jpg", caption: "Chủ nghĩa Mác – Lênin: Ánh sáng soi đường cho cách mạng giải phóng dân tộc" },
      { src: "tham gia dcs phap.jpg", caption: "Nguyễn Ái Quốc tại Đại hội Tours (12/1920) bỏ phiếu tán thành Quốc tế III và sáng lập Đảng Cộng sản Pháp" }
    ],
    bulletPoints: [
      "Đọc 'Luận cương về vấn đề dân tộc và thuộc địa' của Lênin.",
      "Tham gia Đảng Xã hội Pháp, tiếp cận tư tưởng cách mạng vô sản."
    ],
    milestoneType: "Bước ngoặt lớn",
    milestoneText: "Từ người yêu nước → đến với chủ nghĩa Mác – Lênin: “Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta.”",
    quote: "Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi mừng đến phát khóc lên... Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!",
    questions: [
      {
        id: "q13",
        questionNumber: 13,
        questionText: "Cột mốc đánh dấu sự chuyển biến bước ngoặt về nhận thức của Nguyễn Ái Quốc vào tháng 7/1920 là sự kiện đọc tác phẩm nào?",
        options: [
          "Tác phẩm Chủ nghĩa đế quốc - Giai đoạn tột cùng của chủ nghĩa tư bản.",
          "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa.",
          "Tuyên ngôn của Đảng Cộng sản do Mác và Ăng-ghen soạn thảo.",
          "Tác phẩm Làm gì? của V.I. Lênin bàn về xây dựng Đảng kiểu mới."
        ],
        correctIndex: 1,
        explanation: "Việc tiếp cận Luận cương Lênin tháng 7/1920 là thời điểm Người tìm thấy lời giải lý luận cho con đường cứu nước."
      },
      {
        id: "q14",
        questionNumber: 14,
        questionText: "Điều cốt lõi nhất mà Nguyễn Ái Quốc tìm thấy từ Luận cương Lênin là gì?",
        options: [
          "Phương pháp phát triển kinh tế công nghiệp hiện đại cho các nước thuộc địa.",
          "Mô hình tổ chức nhà nước quân chủ lập hiến theo kiểu các nước phương Tây.",
          "Con đường giải phóng dân tộc gắn liền với cách mạng vô sản.",
          "Kế hoạch xin viện trợ tài chính và vũ khí từ Quốc tế Cộng sản."
        ],
        correctIndex: 2,
        explanation: "Luận cương khẳng định ủng hộ phong trào thuộc địa và gắn cách mạng giải phóng dân tộc ở thuộc địa với cách mạng vô sản."
      },
      {
        id: "q15",
        questionNumber: 15,
        questionText: "Tại Đại hội XVIII Đảng Xã hội Pháp ở thành phố Tours (tháng 12/1920), Nguyễn Ái Quốc đã có hành động lịch sử nào?",
        options: [
          "Bỏ phiếu gia nhập Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp.",
          "Đọc bản Yêu sách 8 điểm đòi quyền tự do dân chủ cho nhân dân An Nam.",
          "Chủ trì Hội nghị hợp nhất các tổ chức cộng sản thành lập Đảng.",
          "Xuất bản tác phẩm Bản án chế độ thực dân Pháp tại thủ đô Paris."
        ],
        correctIndex: 0,
        explanation: "Lá phiếu tại Đại hội Tours tháng 12/1920 đánh dấu việc Người chính thức lựa chọn con đường cách mạng vô sản."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 6,
    title: "Vận dụng và phát triển",
    period: "1920 – 1930",
    stickyTag: "Quảng Châu - Liên Xô",
    locationTag: "Quảng Châu - Liên Xô",
    mainImage: "thanh_lap_hoi_cach_mang_thanh_nien2.jpg",
    secondImage: "Truyen ba chu nghia maclenin vao VN.jpg",
    gallery: [
      { src: "thanh_lap_hoi_cach_mang_thanh_nien2.jpg", caption: "Nguyễn Ái Quốc và Báo Thanh Niên - Cơ quan ngôn luận của Hội Việt Nam Cách mạng Thanh niên (1925)" },
      { src: "Truyen ba chu nghia maclenin vao VN.jpg", caption: "Bác Hồ huấn luyện cán bộ và truyền bá chủ nghĩa Mác – Lênin vào Việt Nam" }
    ],
    bulletPoints: [
      "Hoạt động trong phong trào cộng sản quốc tế.",
      "Thành lập Hội Việt Nam Cách mạng Thanh niên.",
      "Truyền bá chủ nghĩa Mác – Lênin vào Việt Nam."
    ],
    milestoneType: "Nhận thức hoàn thiện hơn",
    milestoneText: "Vận dụng sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam.",
    quote: "Cách mệnh trước hết phải có đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức và vô sản giai cấp mọi nơi.",
    questions: [
      {
        id: "q16",
        questionNumber: 16,
        questionText: "Tác phẩm lý luận cách mạng nổi tiếng của Nguyễn Ái Quốc xuất bản năm 1927 tại Quảng Châu, dùng làm giáo trình huấn luyện cán bộ là tác phẩm nào?",
        options: [
          "Tác phẩm Bản án chế độ thực dân Pháp.",
          "Tác phẩm Cương lĩnh chính trị.",
          "Tác phẩm Nhật ký trong tù.",
          "Tác phẩm Đường Kách mệnh."
        ],
        correctIndex: 3,
        explanation: "Tác phẩm Đường Kách mệnh (1927) hệ thống hóa đường lối, phương pháp cách mạng và đạo đức của người cộng sản."
      },
      {
        id: "q17",
        questionNumber: 17,
        questionText: "Tháng 6/1925, tại Quảng Châu (Trung Quốc), Nguyễn Ái Quốc đã thành lập tổ chức tiền thân quan trọng nào của Đảng Cộng sản Việt Nam?",
        options: [
          "Hội Liên hiệp các dân tộc bị áp bức Á Đông.",
          "Tân Việt Cách mạng Đảng.",
          "Hội Việt Nam Cách mạng Thanh niên.",
          "Đông Dương Cộng sản Liên đoàn."
        ],
        correctIndex: 2,
        explanation: "Hội Việt Nam Cách mạng Thanh niên do Người thành lập 6/1925 là 'vườn ươm' đào tạo cán bộ chuẩn bị cho sự ra đời của Đảng."
      },
      {
        id: "q18",
        questionNumber: 18,
        questionText: "Trong giai đoạn 1920 – 1930, Nguyễn Ái Quốc đã phát triển sáng tạo lý luận Mác - Lênin ở điểm cốt lõi nào về cách mạng thuộc địa?",
        options: [
          "Cách mạng thuộc địa phụ thuộc và phải chờ cách mạng vô sản chính quốc thắng lợi.",
          "Cách mạng giải phóng dân tộc ở thuộc địa có thể chủ động giành thắng lợi trước.",
          "Phong trào giải phóng dân tộc phải do giai cấp tư sản dân tộc lãnh đạo.",
          "Không cần thành lập Đảng Cộng sản ở các quốc gia thuộc địa phương Đông."
        ],
        correctIndex: 1,
        explanation: "Đây là đóng góp sáng tạo lý luận độc đáo của Nguyễn Ái Quốc, coi cách mạng thuộc địa như 'một trong những cái cánh của cách mạng vô sản' có thể chủ động bứt phá."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 7,
    title: "Thành lập Đảng Cộng sản Việt Nam",
    period: "1930",
    stickyTag: "Liên Xô – Trung Quốc – Việt Nam",
    locationTag: "Hương Cảng",
    mainImage: "hoi_nghi_hop_nhat_cac_to_chuc_cong_san.jpg",
    secondImage: "thành lập đảng cộng sản.jpg",
    gallery: [
      { src: "hoi_nghi_hop_nhat_cac_to_chuc_cong_san.jpg", caption: "Hội nghị hợp nhất các tổ chức cộng sản do lãnh tụ Nguyễn Ái Quốc chủ trì đầu năm 1930" },
      { src: "thành lập đảng cộng sản.jpg", caption: "Chủ tịch Hồ Chí Minh và các đại biểu tại Đại hội Đảng" }
    ],
    bulletPoints: [
      "Hội nghị hợp nhất các tổ chức cộng sản.",
      "Thành lập Đảng Cộng sản Việt Nam (3/2/1930)."
    ],
    milestoneType: "Tư tưởng cốt lõi",
    milestoneText: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    quote: "Đảng là đội tiên phong của đạo quân vô sản gồm một số lớn của giai cấp công nhân và làm cho họ có đủ năng lực lãnh đạo quần chúng.",
    questions: [
      {
        id: "q19",
        questionNumber: 19,
        questionText: "Hội nghị hợp nhất các tổ chức cộng sản thành lập Đảng Cộng sản Việt Nam do Nguyễn Ái Quốc chủ trì diễn ra vào thời gian nào và tại đâu?",
        options: [
          "Đầu năm 1930 tại Cửu Long (Hương Cảng, Trung Quốc).",
          "Giữa năm 1930 tại Pác Bó (huyện Hà Quảng, tỉnh Cao Bằng).",
          "Cuối năm 1929 tại thủ đô Hà Nội (miền Bắc Việt Nam).",
          "Giữa năm 1925 tại thành phố Quảng Châu (Trung Quốc)."
        ],
        correctIndex: 0,
        explanation: "Hội nghị họp tại Cửu Long (Hương Cảng) hợp nhất các tổ chức cộng sản riêng rẽ thành Đảng Cộng sản Việt Nam."
      },
      {
        id: "q20",
        questionNumber: 20,
        questionText: "Văn kiện nào do Nguyễn Ái Quốc soạn thảo được thông qua tại Hội nghị thành lập Đảng năm 1930 được xem là Cương lĩnh chính trị đầu tiên của Đảng?",
        options: [
          "Luận cương chính trị của Trần Phú.",
          "Chánh cương văn tắt và Sách lược văn tắt.",
          "Tuyên ngôn Độc lập của Việt Nam.",
          "Tác phẩm Đường Kách mệnh cứu quốc."
        ],
        correctIndex: 1,
        explanation: "Chánh cương văn tắt và Sách lược văn tắt xác định đúng đắn con đường cách mạng Việt Nam ngay từ khi Đảng ra đời."
      },
      {
        id: "q21",
        questionNumber: 21,
        questionText: "Ý nghĩa lịch sử quyết định của sự kiện thành lập Đảng Cộng sản Việt Nam năm 1930 là gì?",
        options: [
          "Đánh đuổi hoàn toàn quân xâm lược Pháp ra khỏi cõi Đông Dương.",
          "Giúp Việt Nam giành lại độc lập dân tộc ngay trong năm 1930.",
          "Chấm dứt cuộc khủng hoảng sâu sắc về đường lối và tổ chức lãnh đạo cách mạng.",
          "Hoàn thành trọn vẹn nhiệm vụ cải cách ruộng đất cho nông dân."
        ],
        correctIndex: 2,
        explanation: "Việc thành lập Đảng cùng Cương lĩnh đúng đắn đã hiện thực hóa con đường cứu nước năm 1920 thành sức mạnh tổ chức thực tiễn."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  },
  {
    id: 8,
    title: "Cách mạng Tháng Tám và Tuyên ngôn Độc lập",
    period: "1945",
    stickyTag: "Hà Nội – Quảng trường Ba Đình",
    locationTag: "Hà Nội",
    mainImage: "Doc_ban_tuyen_ngon_doc_lap.jpg",
    gallery: [
      { src: "Doc_ban_tuyen_ngon_doc_lap.jpg", caption: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, ngày 2/9/1945" }
    ],
    bulletPoints: [
      "Lãnh đạo nhân dân giành chính quyền.",
      "Tuyên bố độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa."
    ],
    milestoneType: "Khẳng định tư tưởng",
    milestoneText: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội là con đường tất yếu của cách mạng Việt Nam.",
    quote: "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!",
    questions: [
      {
        id: "q22",
        questionNumber: 22,
        questionText: "Tại Hội nghị Trung ương 8 (Tháng 5/1941) ở Pác Bó (Cao Bằng), Nguyễn Ái Quốc cùng Trung ương Đảng đã quyết định đặt nhiệm vụ nào lên hàng đầu?",
        options: [
          "Đặt nhiệm vụ cải cách ruộng đất cho nông dân lên hàng đầu.",
          "Đặt nhiệm vụ xây dựng chủ nghĩa xã hội lên hàng đầu.",
          "Đặt nhiệm vụ phát triển kinh tế thương nghiệp lên hàng đầu.",
          "Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và cấp bách nhất."
        ],
        correctIndex: 3,
        explanation: "Hội nghị khẳng định: 'Trong lúc này quyền lợi dân tộc giải phóng cao hơn hết thảy'."
      },
      {
        id: "q23",
        questionNumber: 23,
        questionText: "Ngày 02/09/1945, tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh đã đọc bản văn kiện lịch sử nào?",
        options: [
          "Đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.",
          "Đọc Lời kêu gọi toàn quốc kháng chiến chống thực dân Pháp.",
          "Xuất bản tác phẩm Bản án chế độ thực dân Pháp tại Hà Nội.",
          "Thông qua Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa."
        ],
        correctIndex: 0,
        explanation: "Bản Tuyên ngôn Độc lập đọc ngày 2/9/1945 chính thức tuyên bố sự ra đời của nước Việt Nam Dân chủ Cộng hòa."
      },
      {
        id: "q24",
        questionNumber: 24,
        questionText: "Tác phẩm Tuyên ngôn Độc lập (1945) khẳng định đúc kết pháp lý và thực tiễn nào của dân tộc Việt Nam?",
        options: [
          "\"Việt Nam chấp nhận sự bảo hộ tạm thời của các nước Đồng minh\".",
          "\"Việt Nam trở thành một quốc gia tự trị thuộc Liên hiệp Pháp\".",
          "\"Nước Việt Nam có quyền hưởng tự do độc lập và sự thật đã thành một nước tự do độc lập\".",
          "\"Khôi phục lại chính quyền phong kiến nhà Nguyễn dưới sự cố vấn quốc tế\"."
        ],
        correctIndex: 2,
        explanation: "Đây là tuyên bố đanh thép khẳng định quyền tự do, độc lập thiêng liêng của dân tộc Việt Nam trước toàn thế giới."
      }
    ],
    get question() {
      return this.questions && this.questions.length > 0 ? this.questions[0] : null;
    }
  }
];

// Cột mốc hoàn thành cuối cùng (Grand Finale - MỐC 9: MỐC NGÔI SAO)
const FINALE_DATA = {
  id: 9,
  title: "Hình thành và phát triển hệ thống tư tưởng Hồ Chí Minh (Mốc Ngôi Sao)",
  period: "1945 – 1969 & Hiện nay",
  stickyTag: "Đích Vinh Quang",
  locationTag: "Toàn quốc",
  mainImage: "tu tuong hcm.jpg",
  gallery: [
    { src: "tu tuong hcm.jpg", caption: "Tư tưởng Hồ Chí Minh - Tài sản tinh thần vô giá của Đảng và dân tộc ta" }
  ],
  slogan: "Một tư tưởng – Một con đường – Vì độc lập, tự do, hạnh phúc của dân tộc",
  quote: "“Tư tưởng Hồ Chí Minh là kết quả của cả một quá trình đấu tranh, tìm tòi, khám phá và phát triển không ngừng”",
  author: "Hồ Chí Minh",
  summaryPoints: [
    "Khởi nguồn từ truyền thống yêu nước nồng nàn và tinh hoa văn hóa dân tộc Việt Nam ngàn đời.",
    "Hấp thụ và chắt lọc tinh hoa văn hóa nhân loại cả phương Đông và phương Tây qua 30 năm bôn ba.",
    "Tiếp thu và vận dụng sáng tạo chủ nghĩa Mác – Lênin vào điều kiện lịch sử cụ thể của Việt Nam.",
    "Kim chỉ nam soi đường cho cách mạng Việt Nam đi từ thắng lợi này đến thắng lợi vẻ vang khác."
  ],
  questions: [
    {
      id: "q25",
      questionNumber: 25,
      questionText: "Khẩu hiệu và chân lý bất hủ nổi tiếng nhất của Chủ tịch Hồ Chí Minh được đúc kết trong thời kỳ kháng chiến chống Mỹ cứu nước là gì?",
      options: [
        "\"Thà sinh làm ma nước Nam chứ không làm vương đất Bắc\".",
        "\"Không có gì quý hơn độc lập, tự do\".",
        "\"Đoàn kết, đoàn kết, đại đoàn kết; Thành công, thành công, đại thành công\".",
        "\"Quyết tử cho Tổ quốc quyết sinh\"."
      ],
      correctIndex: 1,
      explanation: "Lời kêu gọi ngày 17/7/1966 của Bác nêu bật chân lý thời đại: \"Không có gì quý hơn độc lập, tự do\"."
    },
    {
      id: "q26",
      questionNumber: 26,
      questionText: "Cốt lõi của hệ thống Tư tưởng Hồ Chí Minh là sự kết hợp độc đáo giữa những yếu tố nền tảng nào?",
      options: [
        "Sự kết hợp thuần túy giữa Nho giáo truyền thống với Triết học phương Tây.",
        "Sự dung hòa giữa chủ nghĩa tư bản dân chủ với tư tưởng Phật giáo dân gian.",
        "Sự tiếp thu nguyên vẹn mô hình phát triển kinh tế của các nước phương Tây.",
        "Sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện Việt Nam."
      ],
      correctIndex: 3,
      explanation: "Tư tưởng Hồ Chí Minh là sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của Việt Nam."
    },
    {
      id: "q27",
      questionNumber: 27,
      questionText: "Đại hội đại biểu toàn quốc lần thứ VII (1991) của Đảng Cộng sản Việt Nam đã khẳng định vị thế của Tư tưởng Hồ Chí Minh như thế nào?",
      options: [
        "Coi Tư tưởng Hồ Chí Minh là một tài liệu tham khảo lịch sử thuần túy.",
        "Khẳng định TTHCM cùng Mác - Lênin là nền tảng tư tưởng, kim chỉ nam cho hành động.",
        "Xem Tư tưởng Hồ Chí Minh là mô hình kinh tế áp dụng riêng cho thời chiến.",
        "Đánh giá TTHCM là lý luận tư sản tiến bộ phù hợp với xu thế hội nhập."
      ],
      correctIndex: 1,
      explanation: "Đại hội VII (1991) chính thức ghi vào Cương lĩnh: \"Đảng lấy chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động\"."
    }
  ],
  get question() {
    return this.questions && this.questions.length > 0 ? this.questions[0] : null;
  }
};
