// Dữ liệu câu hỏi — sinh bởi build_v2.py, không sửa tay.
window.QUIZ = {
 "title": "Ôn tập tối ưu ngữ cảnh LLM",
 "desc": "kiến thức nền để đọc văn liệu về tối ưu ngữ cảnh, chưng cất kinh nghiệm và đánh giá LLM. Chọn một phương án là thấy giải thích ngay.",
 "groups": [
  {
   "key": "rl",
   "label": "RL &amp; GRPO",
   "n": 14
  },
  {
   "key": "icl",
   "label": "Học trong ngữ cảnh",
   "n": 13
  },
  {
   "key": "mem",
   "label": "Kinh nghiệm &amp; bộ nhớ",
   "n": 16
  },
  {
   "key": "metric",
   "label": "Thước đo",
   "n": 12
  },
  {
   "key": "stat",
   "label": "Thống kê &amp; thiết kế",
   "n": 14
  },
  {
   "key": "causal",
   "label": "Nhân quả",
   "n": 8
  },
  {
   "key": "bench",
   "label": "Benchmark",
   "n": 11
  },
  {
   "key": "read",
   "label": "Đọc paper",
   "n": 8
  },
  {
   "key": "infra",
   "label": "Hạ tầng",
   "n": 4
  }
 ],
 "questions": [
  {
   "id": 1,
   "g": "rl",
   "q": "Trong học tăng cường áp dụng cho LLM, \"policy\" (chính sách) là gì?",
   "options": [
    "Tập quy tắc an toàn lọc đầu ra trước khi trả về",
    "Hàm gán điểm thưởng cho mỗi câu trả lời sinh ra",
    "Chính mô hình — phân phối xác suất của token tiếp theo",
    "Cách chia dữ liệu thành train, validation, test"
   ],
   "answer": 2,
   "explain": "Policy chính là mô hình. Với LLM, policy π(token | ngữ cảnh) là phân phối xác suất mà mô hình gán cho token tiếp theo. \"Huấn luyện bằng RL\" nghĩa là chỉnh tham số để phân phối đó dịch về phía hành vi có điểm thưởng cao. Hàm tính điểm là reward function, một thứ khác hoàn toàn."
  },
  {
   "id": 2,
   "g": "rl",
   "q": "\"Rollout\" trong ngữ cảnh RL cho LLM nghĩa là gì?",
   "options": [
    "Việc triển khai mô hình ra môi trường sản xuất",
    "Quá trình giảm dần learning rate theo số bước huấn luyện đã qua",
    "Một bước cập nhật gradient trên một batch",
    "Một lần sinh trọn vẹn một câu trả lời cho một đầu vào"
   ],
   "answer": 3,
   "explain": "Rollout = cho mô hình chạy một lượt sinh hoàn chỉnh, thu được một quỹ đạo (trajectory) gồm các bước suy luận và câu trả lời cuối. Chi phí thí nghiệm trong lĩnh vực này thường được tính bằng SỐ ROLLOUT, vì đó là phần đốt GPU nhiều nhất — khi so sánh hai phương pháp, nếu một bên dùng gấp 10 lần rollout thì so sánh đó không công bằng."
  },
  {
   "id": 3,
   "g": "rl",
   "q": "Chữ \"Group Relative\" trong GRPO (Group Relative Policy Optimization) chỉ điều gì?",
   "options": [
    "So tương đối với một mô hình giáo viên lớn hơn",
    "So lợi thế của mỗi câu trả lời với các câu khác cùng đề",
    "Nhóm dữ liệu huấn luyện lại theo từng chủ đề",
    "Nhóm các GPU trong cùng một cụm máy để chia sẻ gradient với nhau"
   ],
   "answer": 1,
   "explain": "Đây là ý tưởng cốt lõi. PPO cần một mạng \"critic\" riêng để ước lượng giá trị kỳ vọng làm mốc so sánh. GRPO bỏ critic: với mỗi đề bài, nó sinh G câu trả lời, rồi lấy chính điểm trung bình của nhóm đó làm mốc. Câu nào trên trung bình thì lợi thế dương, dưới trung bình thì âm. Rẻ hơn và đơn giản hơn nhiều."
  },
  {
   "id": 4,
   "g": "rl",
   "q": "Vì sao GRPO không cần mạng critic (value network) như PPO?",
   "options": [
    "GRPO chỉ hoạt động với reward nhị phân 0 hoặc 1",
    "Critic được gộp thẳng vào trong mô hình policy",
    "Điểm trung bình của nhóm rollout thay cho vai trò critic",
    "GRPO hoàn toàn không dùng tới khái niệm lợi thế advantage nào cả"
   ],
   "answer": 2,
   "explain": "Critic tồn tại để trả lời \"câu trả lời này tốt hơn hay kém hơn kỳ vọng?\". GRPO lấy kỳ vọng đó bằng cách thực nghiệm: sinh nhiều câu trả lời cho cùng đề bài rồi lấy trung bình nhóm. Đổi lại, GRPO phải tốn G lần rollout cho mỗi đề bài, nên nó tiết kiệm bộ nhớ và độ phức tạp nhưng tốn compute sinh mẫu."
  },
  {
   "id": 5,
   "g": "rl",
   "q": "\"Advantage\" (lợi thế) của một rollout đo điều gì?",
   "options": [
    "Độ dài chuỗi suy luận mà rollout đã sinh ra",
    "Tổng điểm thưởng tuyệt đối mà rollout đạt được",
    "Tốc độ sinh token trung bình của rollout đó",
    "Rollout này hơn hay kém mức trung bình bao nhiêu"
   ],
   "answer": 3,
   "explain": "Reward tuyệt đối không dùng trực tiếp được: nếu MỌI câu trả lời đều được 0.8 điểm thì không có gì để học. Advantage là reward TRỪ ĐI một mốc, nên nó có dấu: dương = nên làm nhiều hơn, âm = nên làm ít hơn. Không có phương sai trong nhóm thì advantage bằng 0 và tín hiệu học biến mất — hiện tượng này gọi là advantage collapse."
  },
  {
   "id": 6,
   "g": "rl",
   "q": "Nếu cả G rollout cho một đề bài đều ĐÚNG, hoặc đều SAI, thì chuyện gì xảy ra với tín hiệu học của GRPO?",
   "options": [
    "Reward sẽ được nhân đôi lên để bù lại phần tín hiệu còn thiếu",
    "Hệ thống sẽ tự động tăng độ khó của các đề bài đó lên",
    "Advantage đều bằng 0 — đề bài không cho tín hiệu học",
    "Gradient sẽ trở nên rất lớn và làm quá trình mất ổn định"
   ],
   "answer": 2,
   "explain": "Vì mốc so sánh chính là trung bình nhóm, khi nhóm đồng nhất thì mọi rollout đều bằng trung bình → advantage = 0 → đề bài bị loại khỏi việc học. Đây là lý do các hệ thống kiểu này thường có một \"cổng\" chỉ giữ lại các đề bài có cả câu đúng lẫn câu sai. Hệ quả thực tế: nếu tập huấn luyện quá dễ hoặc quá khó so với mô hình, phần lớn đề bài bị cổng loại và hệ thống gần như không học được gì."
  },
  {
   "id": 7,
   "g": "rl",
   "q": "Phân biệt \"parametric\" và \"non-parametric\" trong các phương pháp cải thiện LLM:",
   "options": [
    "Parametric suy luận một bước; còn kia suy luận nhiều bước",
    "Parametric cần tinh chỉnh siêu tham số, còn kia thì không cần",
    "Parametric thì có tham số; còn non-parametric thì không có",
    "Parametric sửa trọng số; non-parametric chỉ sửa ngữ cảnh"
   ],
   "answer": 3,
   "explain": "Đây là trục phân loại quan trọng nhất của toàn bộ nhóm văn liệu này. Fine-tuning, LoRA, RLHF, GRPO đều là parametric — chúng sửa trọng số. Còn tối ưu prompt, thư viện kinh nghiệm, playbook, cheatsheet là non-parametric — mô hình bị đóng băng, chỉ phần văn bản đưa vào thay đổi. Cụm \"training-free\" nghĩa là non-parametric."
  },
  {
   "id": 8,
   "g": "rl",
   "q": "LoRA (Low-Rank Adaptation) thuộc loại nào?",
   "options": [
    "Non-parametric — vì nó chỉ chỉnh sửa phần prompt thôi",
    "Parametric — có ma trận hạng thấp được huấn luyện",
    "Không thuộc loại nào cả, vì nó chỉ dùng để nén mô hình lại",
    "Parametric, nhưng chỉ khi nào nó được dùng kèm với RL"
   ],
   "answer": 1,
   "explain": "LoRA đóng băng trọng số gốc nhưng thêm vào các ma trận hạng thấp A·B và huấn luyện chúng. Có gradient, có trọng số được cập nhật → parametric. Nó rẻ hơn full fine-tuning rất nhiều nhưng KHÔNG phải training-free. Nhầm chỗ này là nhầm cả phân loại phương pháp: nếu đề tài bị ràng buộc training-free thì LoRA không dùng được."
  },
  {
   "id": 9,
   "g": "rl",
   "q": "Ý tưởng chính của nhóm phương pháp \"training-free\" mô phỏng RL là gì?",
   "options": [
    "Huấn luyện mô hình nhưng không cần nhãn do người gán",
    "Thay cập nhật gradient bằng sửa một artifact văn bản",
    "Vẫn chạy RL nhưng đặt learning rate bằng 0",
    "Dùng một mô hình nhỏ để huấn luyện mô hình lớn"
   ],
   "answer": 1,
   "explain": "Phép loại suy ở đây là: gradient ↔ một đoạn văn bản mô tả kinh nghiệm; cập nhật trọng số ↔ thao tác thêm/xóa/sửa mục trong thư viện. Vì không có gradient, không cần GPU huấn luyện, nên chi phí rất thấp. Nhưng phép loại suy này là một GIẢ ĐỊNH, không phải định lý — và kiểm tra xem văn bản đó có thực sự ảnh hưởng tới hành vi hay không là một việc riêng phải làm."
  },
  {
   "id": 10,
   "g": "rl",
   "q": "Trong phép loại suy \"gradient ↔ văn bản\" nói trên, cái gì đóng vai trò của learning rate?",
   "options": [
    "Độ dài tối đa cho phép của mỗi câu trả lời",
    "Số lượng rollout G sinh ra cho mỗi đề bài",
    "Nhiệt độ sinh temperature được dùng ở bước lấy mẫu các rollout",
    "Không có thứ tương ứng rõ ràng — loại suy hỏng ở đây"
   ],
   "answer": 3,
   "explain": "Đây là câu hỏi nên tự đặt với mọi phép loại suy: nó khớp tới đâu rồi hỏng ở đâu. Gradient có độ lớn liên tục và learning rate điều tiết bước đi; còn thao tác văn bản là rời rạc — thêm một mục là thêm hẳn một mục, không có \"thêm 0.01 mục\". Hệ quả: các phương pháp này không có cơ chế giảm dần bước đi, nên dễ dao động hoặc phình to không kiểm soát."
  },
  {
   "id": 11,
   "g": "rl",
   "q": "Thuật ngữ \"frozen model\" (mô hình đóng băng) nghĩa là gì?",
   "options": [
    "Mô hình không được phép gọi tool bên ngoài",
    "Mô hình được lưu ở dạng đã nén lại để tiết kiệm bộ nhớ GPU",
    "Trọng số không đổi suốt quá trình; chỉ đầu vào thay đổi",
    "Mô hình chỉ được chạy ở nhiệt độ sinh bằng 0"
   ],
   "answer": 2,
   "explain": "\"Frozen\" là điều kiện làm việc của mọi phương pháp training-free. Nó có một hệ quả thực tế rất lớn cho người làm luận văn với GPU hạn chế: không cần VRAM cho optimizer state và gradient, nên một GPU chỉ đủ để suy luận vẫn chạy được thí nghiệm — đây là lý do chính khiến nhóm phương pháp này hấp dẫn khi tài nguyên eo hẹp."
  },
  {
   "id": 12,
   "g": "rl",
   "q": "Reward \"verifiable\" (kiểm chứng được) nghĩa là gì, và vì sao nó quan trọng?",
   "options": [
    "Điểm có thể tính lại được từ log đã lưu",
    "Điểm đã được con người kiểm tra lại từng trường hợp một",
    "Điểm luôn được chuẩn hoá về khoảng từ 0 tới 1",
    "Chấm bằng checker xác định, không bằng mô hình khác"
   ],
   "answer": 3,
   "explain": "Toán và lập trình được ưa dùng trong lĩnh vực này vì có checker xác định: đáp án khớp hoặc không, test chạy qua hoặc không. Nếu dùng một LLM làm giám khảo thì nhiễu của giám khảo trộn vào nhiễu của phương pháp, rất khó tách. Hệ quả cần nhớ: gần như mọi kết quả dương của nhóm \"ngữ cảnh tiến hóa\" đều ở miền CÓ checker chính xác — chuyển sang miền không có checker là chuyện khác hẳn."
  },
  {
   "id": 13,
   "g": "rl",
   "q": "Vì sao một hàm reward viết cho toán học KHÔNG dùng lại được cho vật lý mà không sửa?",
   "options": [
    "Đáp án lý là biểu thức kèm đơn vị, so khớp chuỗi chấm 0",
    "Mô hình ngôn ngữ không giải được bài vật lý",
    "Reward cho vật lý buộc phải nhận giá trị âm",
    "Vật lý không có đáp án đúng duy nhất cho mỗi bài"
   ],
   "answer": 0,
   "explain": "\"9.8 m/s²\" so với \"9.8\" so với \"g\" — cùng một đáp án đúng, ba chuỗi khác nhau. Checker toán so khớp biểu thức số sẽ chấm sai hết. Đây là một cái bẫy đo lường âm thầm: reward thấp trông giống \"mô hình kém\" nhưng thực ra là \"thước đo sai\". Nguyên tắc: trước khi tin bất kỳ con số reward nào, phải kiểm tay vài chục trường hợp xem checker có chấm đúng không."
  },
  {
   "id": 14,
   "g": "rl",
   "q": "Khi một bài báo nói \"chúng tôi dùng cùng một mô hình cho cả vai trò sinh và vai trò phản tư\", vì sao chi tiết đó quan trọng?",
   "options": [
    "Loại khả năng mô hình mạnh truyền kiến thức cho mô hình yếu",
    "Bảo đảm hai vai trò dùng cùng một nhiệt độ sinh",
    "Giúp kết quả tái lập được trên mọi loại GPU",
    "Giúp tiết kiệm chi phí gọi API khi phải chạy rất nhiều thí nghiệm"
   ],
   "answer": 0,
   "explain": "Nếu mô hình phản tư mạnh hơn mô hình thực thi, thì \"cải thiện\" quan sát được có thể chỉ là chưng cất kiến thức từ mô hình lớn xuống — một hiện tượng đã biết từ lâu, không phải đóng góp mới. Khóa cả hai vai trò về cùng một mô hình là cách loại giả thuyết đối thủ đó. Khi đọc paper, hãy tìm câu này; nếu không có, hãy tự hỏi ai đang nói với ai."
  },
  {
   "id": 15,
   "g": "icl",
   "q": "In-context learning (ICL) là gì?",
   "options": [
    "Mô hình học dần từ phản hồi của con người theo thời gian thực",
    "Mô hình truy hồi tài liệu rồi fine-tune lại trên chính nó",
    "Mô hình được huấn luyện thêm trên chính dữ liệu của người dùng",
    "Mô hình đổi hành vi theo prompt, không cập nhật trọng số"
   ],
   "answer": 3,
   "explain": "Chữ \"learning\" ở đây dễ gây nhầm: không có gì được học theo nghĩa lưu lại. Hết phiên là hết. Mọi phương pháp training-free đều dựa trên ICL, nên trần hiệu quả của chúng bị chặn bởi khả năng ICL của mô hình nền — đó là lý do các tác giả thường viết \"model capability is a prerequisite\"."
  },
  {
   "id": 16,
   "g": "icl",
   "q": "\"Few-shot prompting\" khác \"zero-shot\" ở điểm nào?",
   "options": [
    "Few-shot đưa kèm vài ví dụ đã giải; zero-shot thì không",
    "Few-shot phải gọi mô hình nhiều lần, còn zero-shot gọi một lần",
    "Few-shot còn cần thêm một bước fine-tune nhẹ trước khi dùng",
    "Few-shot thì chỉ dùng được với những mô hình lớn trên 70B"
   ],
   "answer": 0,
   "explain": "Few-shot = dạy bằng ví dụ ngay trong prompt. Điểm cần cảnh giác khi đọc paper: hiệu năng few-shot rất nhạy với VIỆC CHỌN và THỨ TỰ ví dụ — chênh lệch giữa bộ ví dụ tốt nhất và tệ nhất có thể lớn hơn mức cải thiện mà phương pháp được đề xuất tuyên bố. Vì vậy một baseline tử tế phải là \"ví dụ chọn ngẫu nhiên, lấy giá trị tốt nhất qua nhiều lần chọn\", không phải một bộ ví dụ cố định."
  },
  {
   "id": 17,
   "g": "icl",
   "q": "Chain-of-Thought (CoT) prompting là gì?",
   "options": [
    "Lưu lịch sử hội thoại vào một bộ nhớ ngoài",
    "Nối nhiều mô hình lại thành một chuỗi xử lý",
    "Buộc mô hình trả lời ngắn gọn nhất có thể",
    "Buộc mô hình viết các bước trung gian trước khi trả lời"
   ],
   "answer": 3,
   "explain": "CoT cho mô hình thêm \"không gian làm nháp\" bằng chính token sinh ra. Với người đọc paper, CoT quan trọng vì nó khiến chi phí token tăng mạnh — nên khi so sánh một phương pháp dùng CoT dài với một baseline không CoT, phần cải thiện có thể chỉ phản ánh việc tiêu nhiều compute hơn. Đây là lý do đối chứng khớp chi phí token trở nên bắt buộc."
  },
  {
   "id": 18,
   "g": "icl",
   "q": "ReAct là mẫu thiết kế gì?",
   "options": [
    "Một cách nén lịch sử hội thoại dài thành tóm tắt",
    "Một thuật toán RL dành riêng cho agent duyệt web",
    "Xen kẽ suy luận bằng chữ và hành động gọi tool",
    "Một kiến trúc mạng neural được thiết kế riêng cho agent"
   ],
   "answer": 2,
   "explain": "ReAct = Reasoning + Acting. Vòng lặp: nghĩ → gọi tool → đọc kết quả → nghĩ tiếp. Khi đọc bảng kết quả, phải để ý cấu hình này vì \"Direct\" và \"ReAct\" cho mức nền rất khác nhau trên cùng một bộ dữ liệu — so một phương pháp chạy ReAct với một baseline chạy Direct là so sai."
  },
  {
   "id": 19,
   "g": "icl",
   "q": "\"Prompt optimizer\" (bộ tối ưu prompt) làm gì?",
   "options": [
    "Chọn ra mô hình phù hợp nhất cho một prompt đã có sẵn từ trước",
    "Tự tìm trong không gian prompt để lấy prompt điểm cao nhất",
    "Nén prompt lại để tiết kiệm token mỗi lần gọi",
    "Dịch prompt sang dạng mà mô hình hiểu tốt hơn"
   ],
   "answer": 1,
   "explain": "Nó là một bài toán tìm kiếm: sinh ứng viên prompt, chấm điểm, giữ cái tốt, lặp lại. Vì có bước \"chấm điểm trên tập phát triển\", mọi bộ tối ưu prompt đều có nguy cơ khớp quá mức vào tập đó — nên con số đáng tin duy nhất là điểm trên tập kiểm tra ĐỘC LẬP chưa từng dùng để chọn prompt."
  },
  {
   "id": 20,
   "g": "icl",
   "q": "\"Textual gradient\" (gradient văn bản) nghĩa là gì?",
   "options": [
    "Chuyển văn bản thành vector rồi cho lan truyền ngược",
    "Tính đạo hàm của hàm mất mát theo embedding của toàn bộ prompt",
    "Dùng lời phê bình bằng chữ làm tín hiệu sửa prompt",
    "Một kỹ thuật làm mượt phân phối xác suất của các token"
   ],
   "answer": 2,
   "explain": "Đây là phép loại suy trung tâm của TextGrad và các phương pháp cùng họ: lời phê bình bằng chữ thay cho đạo hàm. Lưu ý giới hạn: gradient thật được bảo đảm chỉ về hướng giảm mất mát cục bộ; lời phê bình của một LLM thì không có bảo đảm nào — nó có thể sai, có thể tự mâu thuẫn với lời phê bình ở lượt trước."
  },
  {
   "id": 21,
   "g": "icl",
   "q": "Tối ưu prompt theo kiểu tiến hóa (evolutionary) hoạt động thế nào?",
   "options": [
    "Thử hết mọi tổ hợp từ khoá có thể có trong prompt",
    "Huấn luyện một mô hình nhỏ để dự đoán prompt tốt",
    "Giữ quần thể prompt, đột biến và chọn lọc qua các thế hệ",
    "Giảm dần độ dài prompt tới khi điểm bắt đầu tụt"
   ],
   "answer": 2,
   "explain": "Đây là tìm kiếm rời rạc có chọn lọc. Điểm cần chú ý về chi phí: mỗi lần chấm một ứng viên là một loạt rollout, nên ngân sách bị đốt rất nhanh. Kỹ thuật \"racing\" ra đời để xử lý việc này — chấm từng phần dữ liệu và cắt sớm các ứng viên đã rõ ràng kém, dồn ngân sách cho ứng viên còn sống."
  },
  {
   "id": 22,
   "g": "icl",
   "q": "Kỹ thuật \"racing\" trong tối ưu prompt giải quyết vấn đề gì?",
   "options": [
    "Chạy song song trên nhiều GPU để tăng tốc quá trình suy luận",
    "Giảm độ trễ phản hồi cho người dùng cuối",
    "Cắt sớm ứng viên đã rõ ràng kém để khỏi tốn ngân sách",
    "Chọn ra mô hình nhanh nhất trong một tập mô hình"
   ],
   "answer": 2,
   "explain": "Racing là ý tưởng mượn từ tối ưu siêu tham số. Thay vì chấm mọi ứng viên trên toàn bộ tập phát triển, chấm trên một phần nhỏ trước; ứng viên nào đã kém rõ rệt thì dừng luôn. Với người làm thí nghiệm trên GPU miễn phí theo giờ, đây là kỹ thuật đáng mượn nhất trong cả nhóm — nó đổi độ chắc chắn ở ứng viên tồi lấy ngân sách cho ứng viên tốt."
  },
  {
   "id": 23,
   "g": "icl",
   "q": "Trong tối ưu prompt, \"meta-prompt\" là gì?",
   "options": [
    "Prompt cuối cùng được chọn ra sau khi quá trình tối ưu xong",
    "Prompt hệ thống mặc định của mô hình nền",
    "Prompt hướng dẫn bộ tối ưu về cách viết lại prompt",
    "Bản mô tả siêu dữ liệu đi kèm tập dữ liệu"
   ],
   "answer": 2,
   "explain": "Meta-prompt là prompt của tầng trên. Phát hiện gây khó chịu từ văn liệu: với CÙNG một bộ tối ưu và cùng mô hình, chỉ đổi meta-prompt thôi đã làm điểm chạy từ khoảng 10 lên khoảng 31 trên GSM8K — biên độ do meta-prompt lớn hơn biên độ giữa các phương pháp được so sánh. Nghĩa là nếu không báo cáo meta-prompt, kết quả không tái lập được."
  },
  {
   "id": 24,
   "g": "icl",
   "q": "Khi một bài báo nói phương pháp của họ tìm kiếm trên \"Pareto frontier\" các ứng viên, điều đó nghĩa là gì?",
   "options": [
    "Chỉ giữ lại 20% ứng viên có điểm cao nhất",
    "Sắp xếp ứng viên theo thứ tự điểm giảm dần",
    "Tối ưu đồng thời cả tốc độ xử lý lẫn độ chính xác của mô hình",
    "Giữ nhiều ứng viên, mỗi cái mạnh ở một tập con tác vụ"
   ],
   "answer": 3,
   "explain": "Chỉ giữ ứng viên tốt nhất theo điểm trung bình dễ làm mất những ứng viên giải được các bài khó mà đa số ứng viên khác không giải được. Giữ cả một mặt Pareto duy trì sự đa dạng, giúp tìm kiếm không bị kẹt ở một cực trị địa phương. Chi phí là bộ nhớ và số lần chấm điểm tăng lên."
  },
  {
   "id": 25,
   "g": "icl",
   "q": "Vì sao \"prompt trực tiếp, không tối ưu gì\" (direct prompting) là một baseline bắt buộc, chứ không phải tùy chọn?",
   "options": [
    "Vì các tạp chí yêu cầu định dạng báo cáo như vậy",
    "Vì nó cho điểm cao nhất trong phần lớn trường hợp",
    "Nhiều phương pháp phức tạp hoá ra không vượt được nó",
    "Vì nó là cấu hình chạy nhanh nhất trong mọi cấu hình"
   ],
   "answer": 2,
   "explain": "Đây là bài học thực nghiệm, không phải quy tắc hình thức. Một nghiên cứu đã thử mười hai phương pháp cải thiện ngữ cảnh khác nhau trên cùng một bộ dữ liệu và KHÔNG phương pháp nào vượt prompt trực tiếp quá một điểm. Nếu một bài không báo cáo baseline này, bạn không có cách nào biết phần cải thiện đến từ phương pháp hay chỉ từ việc tiêu thêm token."
  },
  {
   "id": 26,
   "g": "icl",
   "q": "Khi một mô hình nhỏ cho kết quả tệ với một prompt phức tạp, cách suy luận nào đúng?",
   "options": [
    "Chưa kết luận được — phải tách năng lực khỏi độ khớp prompt",
    "Kết luận prompt viết sai và cần được viết lại",
    "Kết luận rằng mô hình đó không đủ năng lực để làm được tác vụ này",
    "Kết luận tác vụ đó quá khó với mọi loại mô hình"
   ],
   "answer": 0,
   "explain": "Hai giả thuyết này cho cùng một quan sát nhưng dẫn tới hai kết luận trái ngược, nên phải tách chúng ra. Độ nhạy định dạng của mô hình nhỏ rất cao — khoảng cách giữa prompt tốt nhất và tệ nhất có thể lên tới 40–57% ngay cả sau khi đã huấn luyện cho bền với định dạng. Trộn lẫn hai giả thuyết này là lỗi suy luận phổ biến nhất khi đánh giá mô hình nhỏ."
  },
  {
   "id": 27,
   "g": "icl",
   "q": "\"Context window\" và \"context length\" ảnh hưởng thế nào tới các phương pháp tích lũy kinh nghiệm?",
   "options": [
    "Không ảnh hưởng gì cả, vì thư viện được lưu ở ngoài mô hình",
    "Chỉ ảnh hưởng tốc độ, không ảnh hưởng chi phí",
    "Chỉ ảnh hưởng với các mô hình nhỏ dưới 7B",
    "Thư viện càng to càng chiếm ngữ cảnh và càng tốn token"
   ],
   "answer": 3,
   "explain": "Mỗi mục trong thư viện đều phải được dán vào prompt ở mỗi lần gọi, nên nó là chi phí lặp lại ở MỌI rollout chứ không phải chi phí một lần. Điều này tạo ra hai áp lực đối nghịch: thêm mục thì nhiều thông tin hơn, nhưng cũng đắt hơn, dài hơn, và dễ làm mô hình bị phân tán. Vì vậy mọi phương pháp loại này đều phải có cơ chế hợp nhất hoặc xóa bớt."
  },
  {
   "id": 28,
   "g": "mem",
   "q": "\"Experience distillation\" (chưng cất kinh nghiệm) trong nhóm văn liệu này nghĩa là gì?",
   "options": [
    "Lọc bỏ phần dữ liệu huấn luyện kém chất lượng",
    "Nén quỹ đạo thô dài thành artifact văn bản tái dùng được",
    "Chuyển log của hệ thống thành một báo cáo cho người đọc xem",
    "Nén một mô hình lớn thành một mô hình nhỏ hơn"
   ],
   "answer": 1,
   "explain": "Phân biệt với knowledge distillation (chưng cất mô hình lớn → nhỏ, có huấn luyện). Ở đây \"chưng cất\" nghĩa là nén TRẢI NGHIỆM thành chữ: từ hàng nghìn token quỹ đạo thành vài dòng \"bài học\". Chính bước nén này là nơi thông tin có thể bị mất hoặc bị bóp méo — và cũng là nơi hầu như không bài nào đo xem artifact kết quả có đúng hay không."
  },
  {
   "id": 29,
   "g": "mem",
   "q": "Phân biệt \"quỹ đạo thô\" (raw trajectory) và \"kinh nghiệm đã chưng cất\" (condensed experience):",
   "options": [
    "Thô là dữ liệu train, đã chưng cất là dữ liệu test",
    "Thô là bản ghi đầy đủ; đã chưng cất là bản tóm tắt tự viết",
    "Thô ở dạng vector, đã chưng cất ở dạng văn bản",
    "Đó là hai tên gọi khác nhau của cùng một thứ"
   ],
   "answer": 1,
   "explain": "Khác biệt này quan trọng vì có nghiên cứu cho thấy hai loại artifact không được mô hình sử dụng như nhau: làm nhiễu quỹ đạo THÔ gây suy giảm hiệu năng rõ rệt, còn làm nhiễu bản ĐÃ CHƯNG CẤT thì hành vi gần như không đổi. Nghĩa là bước khái quát hóa có thể làm artifact trở nên... không được đọc."
  },
  {
   "id": 30,
   "g": "mem",
   "q": "Kiến trúc ba vai trò Generator – Reflector – Curator phân chia công việc thế nào?",
   "options": [
    "Cả ba cùng giải rồi bỏ phiếu lấy kết quả đa số",
    "Giải tác vụ / rút bài học / quyết định ghi gì vào ngữ cảnh",
    "Viết prompt / dịch prompt / chọn mô hình phù hợp",
    "Sinh ra dữ liệu huấn luyện / chấm điểm / lưu lại các checkpoint"
   ],
   "answer": 1,
   "explain": "Tách vai trò giúp cô lập nguyên nhân khi hệ thống hỏng: hỏng ở Generator (giải sai), ở Reflector (rút bài học sai), hay ở Curator (ghi sai chỗ, ghi trùng, xóa mất mục tốt)? Lưu ý quan trọng: trong các bài gốc, cả ba vai trò thường dùng CÙNG một mô hình — nên \"tách vai trò\" là tách về logic, không phải tách về năng lực."
  },
  {
   "id": 31,
   "g": "mem",
   "q": "\"Context collapse\" (ngữ cảnh sụp đổ) là hiện tượng gì?",
   "options": [
    "Cửa sổ ngữ cảnh bị tràn và gây lỗi lúc chạy",
    "Nhiều mục trong ngữ cảnh mâu thuẫn lẫn nhau",
    "Mô hình bỏ qua hẳn ngữ cảnh và chỉ trả lời theo tri thức có sẵn",
    "Artifact bị viết lại và teo dần tới khi mất hết thông tin"
   ],
   "answer": 3,
   "explain": "Đây là hỏng hóc do CƠ CHẾ VIẾT LẠI: mỗi vòng mô hình được yêu cầu tóm tắt lại artifact, và tóm tắt của tóm tắt của tóm tắt thì rụng dần. Một trường hợp được ghi nhận: artifact teo từ hơn 18 nghìn token xuống còn khoảng 122 token, điểm tụt từ 66.7 xuống 57.1 trong khi không làm gì cả là 63.7. Cách phòng: cập nhật theo delta (chỉ thêm/sửa phần thay đổi) thay vì viết lại toàn bộ."
  },
  {
   "id": 32,
   "g": "mem",
   "q": "\"Delta update\" (cập nhật theo delta) chống được context collapse bằng cách nào?",
   "options": [
    "Lưu lại nhiều phiên bản artifact để có thể hoàn tác về sau",
    "Dùng một mô hình lớn hơn để cập nhật artifact",
    "Chỉ ghi phần thay đổi, không sinh lại toàn bộ artifact",
    "Chỉ cập nhật khi mức thay đổi vượt một ngưỡng"
   ],
   "answer": 2,
   "explain": "Nguyên nhân của collapse là việc tái sinh toàn bộ. Nếu mỗi vòng chỉ cho phép thao tác cục bộ — thêm mục này, sửa mục kia — thì phần không bị chạm sẽ nguyên vẹn, nên không có hiện tượng rụng dần. Đây là một ví dụ tốt về việc sửa cơ chế thay vì sửa prompt."
  },
  {
   "id": 33,
   "g": "mem",
   "q": "Bộ thao tác Add / Delete / Modify / Keep trên một thư viện kinh nghiệm đóng vai trò gì?",
   "options": [
    "Là bốn mức ưu tiên gán cho mỗi mục kinh nghiệm",
    "Là không gian hành động của bước cập nhật artifact",
    "Là bốn chế độ hoạt động khác nhau của mô hình",
    "Là các lệnh CRUD cho cơ sở dữ liệu lưu artifact"
   ],
   "answer": 1,
   "explain": "Mỗi vòng, mô hình đề xuất một tập thao tác thuộc bốn loại này. Chúng là nơi mọi thay đổi xảy ra, nên cũng là nơi mọi hỏng hóc phía viết xảy ra: thao tác Modify trỏ tới một ID không tồn tại sẽ bị bỏ qua âm thầm; giới hạn số thao tác mỗi vòng có thể bị vượt mà không ai báo lỗi."
  },
  {
   "id": 34,
   "g": "mem",
   "q": "Vì sao một thư viện kinh nghiệm cần bước \"consolidation\" (hợp nhất/merge)?",
   "options": [
    "Gộp mục trùng để thư viện không phình to vô hạn",
    "Mã hoá các mục lại nhằm mục đích bảo mật cho dữ liệu",
    "Chuyển các mục sang dạng vector để phục vụ truy hồi",
    "Sắp xếp lại các mục theo đúng thứ tự thời gian tạo ra"
   ],
   "answer": 0,
   "explain": "Không có hợp nhất thì mỗi vòng lại thêm mục mới, và chi phí token tăng tuyến tính mãi. Nhưng hợp nhất cũng chính là bước nguy hiểm: gộp hai mục đúng có thể sinh ra một mục sai, và một lỗi lập trình ở bước này có thể làm thư viện phình to dù đã có giới hạn, một triệu chứng chỉ phát hiện được nếu bạn ghi lại kích thước thư viện theo từng vòng."
  },
  {
   "id": 35,
   "g": "mem",
   "q": "Cách kiểm tra đơn giản nhất xem cơ chế hợp nhất có hoạt động hay không là gì?",
   "options": [
    "Đo thời gian chạy của mỗi vòng cập nhật lại thư viện",
    "Ghi số mục sau mỗi vòng và so với giới hạn đã đặt",
    "Đọc tay từng mục để xem nội dung có đúng hay không",
    "So điểm cuối cùng với điểm của baseline dùng để đối chiếu"
   ],
   "answer": 1,
   "explain": "Đây là một \"assertion\" rẻ tiền mà rất hiệu quả: bạn đã khai báo giới hạn, nên hãy kiểm tra giới hạn đó ở mỗi vòng. Nếu kích thước thư viện tăng vượt mức trong khi cấu hình nói là không được, bạn biết ngay có lỗi phía viết — và biết điều đó TRƯỚC khi mất ba tháng diễn giải một con số điểm số sai."
  },
  {
   "id": 36,
   "g": "mem",
   "q": "Thuật ngữ nào chỉ việc bộ nhớ của agent SUY GIẢM dần trong quá trình tiến hóa bình thường, không có kẻ tấn công?",
   "options": [
    "Memory misevolution — suy giảm lành tính khi tiến hoá",
    "Catastrophic forgetting — quên thảm hoạ khi học thêm cái mới",
    "Memory poisoning — bộ nhớ bị kẻ xấu đầu độc có chủ đích",
    "Mode collapse — phân phối đầu ra bị sụp về đúng một mối"
   ],
   "answer": 0,
   "explain": "Dùng đúng từ rất quan trọng khi viết luận văn: trong lĩnh vực này \"poisoning\" có nghĩa là TẤN CÔNG ĐỐI KHÁNG do kẻ xấu chủ động thực hiện. Nếu bạn dùng từ đó cho hiện tượng tự suy giảm, phản biện sẽ hiểu sai toàn bộ phạm vi nghiên cứu. \"Misevolution\" mới là từ chỉ suy giảm lành tính."
  },
  {
   "id": 37,
   "g": "mem",
   "q": "\"Admission control\" (kiểm soát kết nạp) áp dụng cho bộ nhớ nghĩa là gì?",
   "options": [
    "Xoá các mục cũ nhất mỗi khi bộ nhớ đã đầy",
    "Giới hạn số người dùng được phép truy cập bộ nhớ",
    "Kiểm mục ứng viên trước khi cho vào, chặn nếu không qua",
    "Chỉ cho mô hình đọc bộ nhớ, không cho phép ghi"
   ],
   "answer": 2,
   "explain": "Ý tưởng mượn từ hệ thống phân tán: đặt một cái cổng ở đầu vào. Lý do nó hiệu quả với bộ nhớ LLM: một sự kiện sai ghi vào bộ nhớ sẽ được đọc lại như sự thật ở mọi lượt sau, nên sai lan theo thời gian. Chặn ở cửa rẻ hơn rất nhiều so với sửa về sau."
  },
  {
   "id": 38,
   "g": "mem",
   "q": "Cổng kiểm định bằng \"tự nhất quán\" (self-consistency) hoạt động thế nào?",
   "options": [
    "So nội dung mới với toàn bộ bộ nhớ hiện có để tìm chỗ trùng lặp",
    "Dùng thêm một mô hình thứ hai lớn hơn hẳn để xác minh lại nó",
    "Kiểm lại nội dung đó bằng một công cụ tìm kiếm ở bên ngoài",
    "Hỏi lại K lần độc lập; không nhất quán thì coi là ảo giác"
   ],
   "answer": 3,
   "explain": "Trực giác: nếu mô hình THỰC SỰ biết một điều, nó sẽ trả lời giống nhau qua nhiều lần hỏi độc lập; nếu nó bịa, các lần bịa sẽ khác nhau. Có hai tham số phải điều chỉnh: K (số mẫu kiểm chứng) và ngưỡng τ (mức nhất quán tối thiểu để được cho qua). K lớn thì chắc hơn nhưng đắt hơn."
  },
  {
   "id": 39,
   "g": "mem",
   "q": "Khi dùng một cổng kiểm định, vì sao chỉ báo cáo \"tỉ lệ mục sai đã giảm\" là KHÔNG đủ?",
   "options": [
    "Vì bản thân tỉ lệ mục sai vốn đã rất khó đo chính xác trong thực tế",
    "Vì tỉ lệ đó còn phụ thuộc vào kích thước của bộ nhớ",
    "Vì còn cần so sánh với một cổng kiểm định khác nữa",
    "Cổng chặn hết cũng cho tỉ lệ sai bằng 0 — phải báo cả recall"
   ],
   "answer": 3,
   "explain": "Đây là cặp đánh đổi precision–recall quen thuộc, đặt vào ngữ cảnh mới. Một cổng đóng kín cho \"độ sạch\" hoàn hảo và một bộ nhớ rỗng hoàn toàn vô dụng. Vì vậy phải báo cáo cả hai chiều: tỉ lệ mục được kết nạp mà sai, VÀ tỉ lệ mục đúng bị chặn oan."
  },
  {
   "id": 40,
   "g": "mem",
   "q": "\"Skill library\" (thư viện kỹ năng) khác \"experience library\" ở điểm nào về bản chất?",
   "options": [
    "Kỹ năng là đơn vị thực thi được; kinh nghiệm là mô tả chữ",
    "Kỹ năng thì dùng cho agent, còn kinh nghiệm thì dùng cho chatbot",
    "Kỹ năng do người viết, kinh nghiệm do mô hình viết",
    "Hai thứ đó khác nhau chỉ ở cách đặt tên gọi"
   ],
   "answer": 0,
   "explain": "Khác biệt này quyết định mức độ kiểm chứng được: một hàm có thể CHẠY THỬ, nếu lỗi thì lộ ngay; còn một câu mô tả kinh nghiệm thì không có cách nào chạy để kiểm. Đây là lý do các kết quả ấn tượng nhất của nhóm \"cheatsheet\" thường xảy ra trên tác vụ mà một đoạn mã tái dùng được giải quyết được nhiều trường hợp cùng lúc."
  },
  {
   "id": 41,
   "g": "mem",
   "q": "Hiện tượng \"skill shadowing\" trong một thư viện kỹ năng lớn là gì?",
   "options": [
    "Thư viện quá lớn làm agent chọn sai kỹ năng cần dùng",
    "Một số kỹ năng không bao giờ được gọi tới",
    "Kỹ năng bị sao chép thành nhiều bản trùng lặp",
    "Kỹ năng mới ghi đè lên kỹ năng cũ có cùng tên"
   ],
   "answer": 0,
   "explain": "Cách đo hiện tượng này rất đáng học: so hiệu năng khi agent có thư viện LỚN với hiệu năng khi nó được cho đúng tập kỹ năng cần thiết (tập oracle). Khoảng cách đó còn phân rã được thành hai phần — phần do chọn sai kỹ năng, và phần do chi phí ngữ cảnh vì thư viện dài. Phân rã kiểu này biến một cảm nhận mơ hồ thành hai con số."
  },
  {
   "id": 42,
   "g": "mem",
   "q": "Giả thuyết \"executor không thực sự đọc artifact\" khác các giả thuyết hỏng hóc khác ở chỗ nào, và vì sao nên kiểm nó trước?",
   "options": [
    "Nếu đúng thì can thiệp phía viết vô ích, mà kiểm lại rất rẻ",
    "Vì nó không cần tới dữ liệu nào để kiểm chứng",
    "Vì đó là giả thuyết dễ chứng minh nhất trong cả nhóm giả thuyết",
    "Vì các giả thuyết còn lại đã bị văn liệu loại trừ"
   ],
   "answer": 0,
   "explain": "Đây là nguyên tắc chọn thứ tự thí nghiệm: kiểm trước cái mà kết quả của nó VÔ HIỆU HÓA nhiều nhánh công việc khác, và cái rẻ nhất để kiểm. Nếu artifact không được đọc, thì cải thiện chất lượng artifact là công dã tràng. Phép kiểm chỉ cần so hiệu năng với artifact thật, artifact bị xáo trộn, và artifact chung chung cùng độ dài — không cần huấn luyện lại gì cả."
  },
  {
   "id": 43,
   "g": "mem",
   "q": "Vì sao việc đánh lại ID các mục theo vị trí ở mỗi vòng (G1, G2, G3... theo thứ tự hiện tại) là một lỗi thiết kế?",
   "options": [
    "Vì nó làm chậm hẳn việc tìm kiếm trong toàn bộ thư viện",
    "Vì các ID sẽ bị trùng nhau khi số mục trong thư viện tăng",
    "Không theo dõi được vòng đời của một mục qua các vòng",
    "Vì mô hình không hiểu được định dạng ID được viết kiểu đó"
   ],
   "answer": 2,
   "explain": "Đánh ID theo vị trí làm mất danh tính của mục. Hệ quả là không đo được những thứ quan trọng nhất: một mục tồn tại bao lâu, bị sửa mấy lần, nội dung trôi dạt thế nào. Cách sửa là gán mỗi mục một ID bền (UUID) khi nó sinh ra và giữ nguyên suốt đời."
  },
  {
   "id": 44,
   "g": "metric",
   "q": "pass@1 nghĩa là gì?",
   "options": [
    "Tỉ lệ tác vụ mà mô hình đạt được điểm tuyệt đối",
    "Tỉ lệ tác vụ giải đúng khi chỉ lấy một lần thử mỗi tác vụ",
    "Độ chính xác của đáp án đứng đầu trong danh sách gợi ý trả về",
    "Tỉ lệ tác vụ giải được trong vòng một phút đầu"
   ],
   "answer": 1,
   "explain": "pass@1 là \"một phát ăn ngay\". Nó là con số gần với trải nghiệm thực tế nhất, nhưng cũng là con số nhiễu nhất khi nhiệt độ sinh lớn hơn 0, vì mỗi lần chạy lại có thể cho kết quả khác. Nhiễu này chính là lý do phải chạy nhiều lần và báo cáo độ phân tán."
  },
  {
   "id": 45,
   "g": "metric",
   "q": "pass@k khác pass@1 thế nào?",
   "options": [
    "Là điểm trung bình của toàn bộ k lần thử",
    "Là tỉ lệ đúng tính riêng ở lần thử thứ k",
    "Tính là đúng nếu có ít nhất một trong k lần thử đúng",
    "Là độ chính xác trên k tác vụ đầu của bộ dữ liệu"
   ],
   "answer": 2,
   "explain": "pass@k đo xem đáp án đúng có nằm đâu đó trong k lần thử hay không. Nó hữu ích khi có bộ kiểm tra để chọn ra câu đúng, nhưng dễ gây hiểu sai: pass@k cao mà pass@1 thấp nghĩa là mô hình \"biết\" đáp án nhưng không chọn được nó — một vấn đề khác hẳn việc không biết."
  },
  {
   "id": 46,
   "g": "metric",
   "q": "\"Mean@32\" trên một bộ dữ liệu nghĩa là gì?",
   "options": [
    "Lấy điểm trung bình trên 32 bài đầu tiên của bộ dữ liệu",
    "Lấy trung bình điểm số của 32 phương pháp khác nhau",
    "Chạy 32 lần mỗi bài rồi lấy trung bình tỉ lệ đúng",
    "Lấy trung bình điểm số sau mỗi 32 vòng huấn luyện mô hình"
   ],
   "answer": 2,
   "explain": "Mean@n giảm nhiễu SINH MẪU bằng cách lấy trung bình nhiều lần sinh. Nhưng chú ý một điều rất dễ bỏ qua: nó KHÔNG giảm nhiễu của bản thân quá trình tối ưu. Nếu artifact kinh nghiệm chỉ được xây đúng một lần, thì Mean@32 chỉ cho bạn một ước lượng chính xác về hiệu năng của MỘT artifact — chưa nói gì về việc lần xây artifact kế tiếp sẽ ra sao."
  },
  {
   "id": 47,
   "g": "metric",
   "q": "\"Exact match\" là thước đo gì, và điểm yếu của nó là gì?",
   "options": [
    "Đo khoảng cách embedding; điểm yếu là phải cần thêm mô hình phụ",
    "Đo tỉ lệ token trùng nhau; điểm yếu là quá dễ dãi",
    "So khớp chuỗi sau chuẩn hoá; đáp án viết khác bị chấm sai",
    "So khớp có sai số; điểm yếu là phải chọn ngưỡng"
   ],
   "answer": 2,
   "explain": "Exact match rẻ, khách quan, và tái lập được — nên nó được dùng rộng rãi. Nhưng nó cũng là nơi phát sinh \"lỗi đo\" âm thầm: biểu thức tương đương, đơn vị, thứ tự thành phần, định dạng phân số đều có thể làm một câu trả lời đúng bị chấm 0. Luôn kiểm tay một mẫu trước khi tin."
  },
  {
   "id": 48,
   "g": "metric",
   "q": "F1 score kết hợp hai đại lượng nào?",
   "options": [
    "Độ chính xác và tốc độ sinh token của mô hình được đánh giá",
    "Số các dự đoán đúng dương và số dự đoán đúng âm tính",
    "Precision và recall — gộp bằng trung bình điều hoà",
    "Accuracy và loss cùng đo trên một tập đánh giá chung"
   ],
   "answer": 2,
   "explain": "F1 là trung bình điều hòa của precision và recall, nên nó bị kéo xuống mạnh nếu một trong hai thấp. Nó được dùng cho các tác vụ mà đáp án là một tập (hỏi-đáp nhiều thực thể, truy hồi tài liệu) chứ không phải một đáp án duy nhất. Trung bình điều hòa được chọn thay vì trung bình cộng chính vì nó không cho phép bù lỗ một chiều."
  },
  {
   "id": 49,
   "g": "metric",
   "q": "\"Strict pass\" trong một đánh giá theo rubric nghĩa là gì?",
   "options": [
    "Tính là đạt khi điểm vượt qua ngưỡng 80 phần trăm",
    "Chỉ tính đạt khi toàn bộ mục rubric đều được thoả",
    "Chỉ chấm những mục rubric quan trọng nhất",
    "Chấm điểm nghiêm khắc hơn so với mức bình thường"
   ],
   "answer": 1,
   "explain": "Strict pass là thước đo \"tất cả hoặc không\". Nó khắc nghiệt nhưng phản ánh đúng nhiều tình huống thực tế (một tài liệu thiếu một yêu cầu bắt buộc thì không dùng được). Hệ quả: điểm strict pass thường rất thấp, nên khi thấy một con số như 22% đừng kết luận mô hình kém — phải đọc xem thước đo là gì."
  },
  {
   "id": 50,
   "g": "metric",
   "q": "Vì sao đánh giá theo rubric với hàng chục nghìn mục nhỏ lại cho phép phát hiện nhiều hơn so với chấm đúng/sai một điểm mỗi tác vụ?",
   "options": [
    "Vì nó không cần tới bất kỳ đáp án tham chiếu nào cả",
    "Vì nó loại bỏ được phần nhiễu do việc lấy mẫu khi sinh",
    "Cho phép phân rã thất bại theo từng loại yêu cầu",
    "Vì nó cho điểm cao hơn nên dễ nhìn thấy khác biệt hơn"
   ],
   "answer": 2,
   "explain": "Độ hạt của phép đo quyết định phát hiện nào có thể xuất hiện. Với một điểm đúng/sai mỗi tác vụ, bạn chỉ biết \"trượt\". Với rubric chi tiết, bạn đếm được rằng ví dụ hơn một nửa các mục trượt là mục kiểm ĐẶC TẢ chứ không phải nội dung — một kết luận không thể rút ra từ dữ liệu thô hơn. Bài học: thiết kế đo lường có trước, phát hiện có sau."
  },
  {
   "id": 51,
   "g": "metric",
   "q": "Khi một bài đo \"Update-Validation Gain\", \"In-Distribution Gain\" và \"Out-of-Distribution Gain\" riêng biệt, họ đang tách bạch điều gì?",
   "options": [
    "Ba mức khái quát: tập đã chọn, cùng phân phối, khác phân phối",
    "Mức cải thiện đo được trên ba cỡ mô hình khác nhau",
    "Ba giai đoạn liên tiếp nhau trong quá trình huấn luyện của mô hình",
    "Ba cách tính điểm trung bình khác nhau trên cùng tập"
   ],
   "answer": 0,
   "explain": "Đây là cách phân tầng rất đáng học. Mức tăng trên tập đã dùng để chọn là mức DỄ nhất và gần như luôn dương — nó chỉ chứng minh bước tối ưu có hoạt động. Mức tăng ngoài phân phối mới là thứ cho biết phương pháp có học được gì khái quát hay chỉ khớp quá mức. Một phương pháp có thể tăng mạnh ở mức đầu và ÂM ở mức cuối."
  },
  {
   "id": 52,
   "g": "metric",
   "q": "\"Forgetting rate\" (tỉ lệ quên) trong đánh giá agent tự tiến hóa đo điều gì?",
   "options": [
    "Tỉ lệ token bị cắt bỏ khi nén ngữ cảnh lại",
    "Tỉ lệ mục bị xoá khỏi bộ nhớ sau mỗi vòng",
    "Tốc độ suy giảm của điểm số theo từng vòng cập nhật thư viện",
    "Phần tác vụ trước giải được mà sau cập nhật lại không"
   ],
   "answer": 3,
   "explain": "Điểm trung bình tăng vẫn có thể che giấu việc hệ thống làm hỏng những thứ trước đó đã đúng — tăng 5 bài mới, mất 3 bài cũ, tổng vẫn dương. Tỉ lệ quên phơi bày phần mất đó. Nó quan trọng vì một hệ thống \"tiến hóa\" mà phá vỡ hành vi đã đúng thì không dùng được trong thực tế, dù điểm trung bình đẹp."
  },
  {
   "id": 53,
   "g": "metric",
   "q": "Khi so sánh hai phương pháp, vì sao phải xem CẢ chi phí token chứ không chỉ điểm?",
   "options": [
    "Vì token nhiều làm mô hình chậm hội tụ hơn",
    "Nhiều phương pháp cải thiện chỉ bằng cách tiêu thêm compute",
    "Vì các tạp chí bắt buộc phải báo cáo chi phí",
    "Vì chi phí token quyết định tốc độ phản hồi"
   ],
   "answer": 1,
   "explain": "Đây là bài học thực nghiệm then chốt: khi đối chứng khớp chi phí token, một số phương pháp tự phản tư cho kết quả KÉM HƠN việc chỉ đơn giản lấy mẫu nhiều lần rồi bỏ phiếu. Nghĩa là \"cải thiện\" của chúng chỉ là compute được dùng kém hiệu quả. Nếu một bài không báo chi phí, bạn không thể loại được giả thuyết này."
  },
  {
   "id": 54,
   "g": "metric",
   "q": "\"Token-matched baseline\" (đối chứng khớp token) nghĩa là gì?",
   "options": [
    "Một baseline chạy đúng cùng số vòng cập nhật lại artifact đó",
    "Baseline đơn giản được cấp đúng tổng ngân sách token đã đo",
    "Một baseline dùng chung tokenizer với phương pháp đang được đề xuất",
    "Một baseline có độ dài prompt bằng đúng với phương pháp đề xuất"
   ],
   "answer": 1,
   "explain": "Chữ \"đo được\" là phần quan trọng: phải đếm toàn bộ token của mọi lệnh gọi phụ trợ, không chỉ token của lần sinh câu trả lời cuối. Các phương pháp loại này tiêu rất nhiều token vào bước phản tư và hợp nhất, và nếu không đếm chúng thì so sánh bị lệch nghiêm trọng về phía phương pháp phức tạp."
  },
  {
   "id": 55,
   "g": "metric",
   "q": "\"Compute-matched generic critique\" là đối chứng kiểu gì, và nó loại trừ giả thuyết nào?",
   "options": [
    "Phê bình chung chung cùng chi phí — tách nội dung khỏi số bước",
    "Cho phê bình bằng một mô hình lớn hơn mô hình gốc",
    "Phê bình dựa theo một bản rubric do chính con người soạn sẵn từ trước",
    "Lặp lại bước phê bình cho tới khi kết quả hội tụ"
   ],
   "answer": 0,
   "explain": "Đây là một thiết kế đối chứng rất sạch. Giả thuyết đối thủ là \"chỉ cần bắt mô hình xem lại lần nữa là đã tốt hơn, nội dung xem lại không quan trọng\". Cách loại nó: giữ nguyên số bước và chi phí, chỉ thay nội dung phê bình bằng thứ vô thưởng vô phạt. Nếu điểm tụt về baseline, bạn đã chứng minh được cơ chế, không chỉ hiện tượng."
  },
  {
   "id": 56,
   "g": "stat",
   "q": "\"Seed\" (hạt giống ngẫu nhiên) trong một thí nghiệm là gì?",
   "options": [
    "Prompt đầu tiên trong một chuỗi tối ưu gồm rất nhiều vòng",
    "Mô hình gốc ban đầu trước khi nó được đem tinh chỉnh thêm",
    "Tập dữ liệu ban đầu dùng để khởi động cho cả quá trình học",
    "Giá trị khởi tạo bộ sinh số ngẫu nhiên của thí nghiệm"
   ],
   "answer": 3,
   "explain": "Seed kiểm soát tính tái lập. Cùng seed, cùng cấu hình thì ra cùng kết quả. Nhưng điều quan trọng hơn: chạy NHIỀU seed khác nhau cho biết kết quả của bạn dao động bao nhiêu do may mắn. Một bài báo cáo một con số từ một seed duy nhất không cho bạn biết con số đó có ý nghĩa hay không."
  },
  {
   "id": 57,
   "g": "stat",
   "q": "Nếu độ lệch chuẩn theo seed của một thiết lập là 5–15 điểm, thì một phương pháp báo cáo cải thiện +1.1 điểm nên được hiểu thế nào?",
   "options": [
    "Cải thiện nhỏ nhưng thật, vì vẫn là một số dương",
    "Nằm sâu trong nhiễu — không tách được khỏi việc đổi seed",
    "Đáng kể, nếu bộ dữ liệu đủ lớn để bù phương sai",
    "Không kết luận được vì còn thiếu thông tin mô hình"
   ],
   "answer": 1,
   "explain": "Đây là khái niệm \"ngưỡng nhiễu\" (noise floor) — và nó là công cụ đọc paper hữu dụng nhất bạn có thể học. Nếu chạy lại CÙNG một phương pháp với seed khác đã dao động 5–15 điểm, thì khoảng cách 1.1 điểm giữa hai phương pháp không mang thông tin. Việc đầu tiên nên làm trong bất kỳ dự án nào là đo ngưỡng nhiễu của chính thiết lập của mình."
  },
  {
   "id": 58,
   "g": "stat",
   "q": "Trên một bộ dữ liệu chỉ có 30 bài, việc trả lời đúng thêm MỘT bài làm điểm thay đổi bao nhiêu?",
   "options": [
    "Khoảng chừng 1 điểm phần trăm trên thang điểm 100",
    "Tuỳ vào độ khó của chính bài toán vừa được giải đúng",
    "Không tính được nếu như chưa biết thước đo đang dùng là gì",
    "Khoảng 3.3 điểm — nhỏ hơn thế là không đọc được"
   ],
   "answer": 3,
   "explain": "1 chia 30 bằng 3.33%. Đây là \"độ hạt\" của phép đo: trên bộ dữ liệu này bạn KHÔNG THỂ quan sát khoảng cách 1 điểm, vì không có cấu hình nào cho ra 1 điểm. Nên khi một bài báo cáo +1.1 điểm trên bộ 30 bài, con số đó thậm chí không tương ứng với một bài toán nguyên vẹn. Hãy luôn chia 100 cho cỡ mẫu trước khi đọc bảng kết quả."
  },
  {
   "id": 59,
   "g": "stat",
   "q": "Khoảng tin cậy (confidence interval) cho ta biết điều gì mà một con số trung bình đơn lẻ không cho?",
   "options": [
    "Số lần thí nghiệm đã được chạy để lấy số liệu",
    "Giá trị lớn nhất và giá trị nhỏ nhất đã quan sát được trong tập mẫu",
    "Một khoảng hợp lý cho giá trị thật; chứa 0 là chưa khẳng định",
    "Mức độ chính xác của thiết bị và quy trình đo"
   ],
   "answer": 2,
   "explain": "Quy tắc đọc nhanh và cực kỳ hữu dụng: nếu khoảng tin cậy của một HIỆU SỐ chứa 0, thì dữ liệu đó không loại trừ được khả năng không có hiệu ứng nào. Có những bài phân rã kết quả thành hai thành phần và trung thực báo rằng một thành phần có khoảng tin cậy loại trừ 0 (khẳng định được) còn thành phần kia thì chứa 0 (không khẳng định được). Đó là cách báo cáo đáng tin."
  },
  {
   "id": 60,
   "g": "stat",
   "q": "\"Bootstrap\" là kỹ thuật gì?",
   "options": [
    "Khởi động bằng một tập dữ liệu nhỏ trước khi huấn luyện thật đầy đủ",
    "Tự động sinh thêm dữ liệu huấn luyện từ dữ liệu cũ",
    "Lấy mẫu có hoàn lại từ dữ liệu có sẵn để ước lượng phân tán",
    "Dùng kết quả vòng trước làm đầu vào cho vòng sau"
   ],
   "answer": 2,
   "explain": "Bootstrap rất phù hợp với lĩnh vực này vì nó không đòi hỏi dữ liệu phân phối chuẩn và dùng được ngay cả khi cỡ mẫu nhỏ. Cách làm: từ n kết quả đã có, lấy ngẫu nhiên có hoàn lại n giá trị, tính lại thống kê, lặp vài nghìn lần, rồi đọc phân vị để lấy khoảng tin cậy. Nó cho bạn error bar mà không cần chạy thêm thí nghiệm."
  },
  {
   "id": 61,
   "g": "stat",
   "q": "\"Error bar\" trên một biểu đồ cột biểu diễn điều gì?",
   "options": [
    "Mức độ tin cậy đối với nguồn gốc của dữ liệu",
    "Phạm vi sai số của chính thiết bị dùng để đo",
    "Khoảng giá trị mục tiêu mà nghiên cứu mong đạt",
    "Độ phân tán hoặc độ bất định của giá trị được vẽ"
   ],
   "answer": 3,
   "explain": "Một biểu đồ cột không có error bar là một bức tranh không có thông tin về độ chắc chắn — hai cột chênh nhau trông rất thuyết phục nhưng có thể hoàn toàn trùng nhau khi tính độ phân tán. Khi đọc paper trong lĩnh vực này, hãy đếm xem có bao nhiêu hình có error bar; con số đó nói nhiều về mức độ cẩn thận của bài."
  },
  {
   "id": 62,
   "g": "stat",
   "q": "Vì sao tăng số seed có thể LÀM ĐẢO NGƯỢC kết luận của một thí nghiệm?",
   "options": [
    "Vì mô hình học được từ kết quả của các lần chạy trước đó",
    "Ít seed thì thứ hạng giữa các phương pháp có thể chỉ do ngẫu nhiên",
    "Vì việc tăng thêm số seed sẽ làm phương sai của kết quả đo lớn lên nhiều",
    "Vì mỗi seed lại dùng một tập dữ liệu đánh giá khác nhau"
   ],
   "answer": 1,
   "explain": "Đã có trường hợp một tương quan xếp hạng đo bằng 3 seed cho khoảng +0.98 (gần như hoàn hảo), nhưng khi tăng lên 44 seed thì rơi xuống khoảng +0.31 đến +0.80. Kết luận \"xếp hạng ổn định\" biến mất. Bài học: số seed nhỏ không chỉ làm kết quả kém chắc chắn, nó có thể tạo ra một kết luận SAI trông rất thuyết phục."
  },
  {
   "id": 63,
   "g": "stat",
   "q": "So sánh \"theo cặp\" (paired comparison) giữa hai phương pháp mạnh hơn so sánh trung bình độc lập ở điểm nào?",
   "options": [
    "Vì nó thường cho ra con số điểm cao hơn",
    "So trên cùng từng câu, nên loại được biến thiên do độ khó",
    "Vì cách này chỉ cần ít dữ liệu đánh giá hơn hẳn so với cách kia",
    "Vì nó không đòi phải tính độ lệch chuẩn"
   ],
   "answer": 1,
   "explain": "Phần lớn phương sai trong một bộ đánh giá đến từ việc các câu hỏi có độ khó rất khác nhau. So theo cặp (cùng câu hỏi, hai phương pháp) triệt tiêu nguồn phương sai đó, nên phát hiện được hiệu ứng nhỏ hơn với cùng lượng dữ liệu. Đây là cách tăng độ mạnh thống kê mà không cần thêm compute."
  },
  {
   "id": 64,
   "g": "stat",
   "q": "\"Multiplicity\" (vấn đề đa so sánh) là gì và nó phát sinh khi nào?",
   "options": [
    "Khi nhiều nhóm tác giả cùng đo một hiện tượng",
    "Khi dữ liệu có nhiều nhãn cho mỗi một mẫu",
    "Càng nhiều phép so, càng dễ có kết quả đẹp do tình cờ",
    "Khi một phương pháp được đem đánh giá trên nhiều mô hình nền"
   ],
   "answer": 2,
   "explain": "Nếu bạn thử 20 cấu hình và báo cáo cấu hình tốt nhất, thì ngay cả khi không có hiệu ứng thật, khả năng cao bạn vẫn tìm được một cấu hình trông đẹp. Đó là \"đào dữ liệu\". Cách xử lý trung thực: khai báo trước mình sẽ so bao nhiêu phép, rồi hiệu chỉnh ngưỡng, hoặc tách rõ phần khám phá và phần kiểm chứng."
  },
  {
   "id": 65,
   "g": "stat",
   "q": "Vì sao báo cáo \"best-validation snapshot\" (chọn bản tốt nhất trên tập validation) có thể thổi phồng kết quả của một lần chạy đơn?",
   "options": [
    "Vì snapshot tốt nhất thường nằm ở cuối quá trình",
    "Vì cách này bỏ qua các snapshot ở giai đoạn sớm",
    "Vì tập validation thường nhỏ hơn tập test nhiều",
    "Cực đại của một chuỗi nhiễu đã bao gồm phần may mắn"
   ],
   "answer": 3,
   "explain": "Đây là một dạng lựa chọn gây chệch rất dễ bỏ qua. Nếu bạn có 10 snapshot với điểm dao động do nhiễu và bạn báo cáo cái cao nhất, bạn đang báo cáo cực đại của nhiễu, không phải giá trị kỳ vọng. Cách lành mạnh: chọn snapshot trên validation nhưng BÁO CÁO điểm trên một tập test độc lập."
  },
  {
   "id": 66,
   "g": "stat",
   "q": "\"Ablation\" (thí nghiệm bóc tách) là gì?",
   "options": [
    "Tháo bỏ từng thành phần để xem phần nào tạo hiệu quả",
    "Giảm dần cỡ mô hình để tìm ngưỡng tối thiểu",
    "Thử nghiệm phương pháp đó trên nhiều miền dữ liệu khác nhau",
    "Loại bỏ các mẫu dữ liệu gây nhiễu khỏi tập"
   ],
   "answer": 0,
   "explain": "Ablation chuyển \"phương pháp của tôi hoạt động\" thành \"phần NÀY của phương pháp tôi hoạt động\". Một chi tiết hay bị bỏ qua khi đọc: mức tăng của từng thành phần riêng lẻ cộng lại thường KHÔNG bằng mức tăng của phương pháp đầy đủ — các thành phần tương tác, nên đừng đọc bảng ablation như một phép phân tích cộng tính."
  },
  {
   "id": 67,
   "g": "stat",
   "q": "Nếu ablation cho thấy việc chỉ sửa prompt hệ thống làm điểm TỤT, trong khi sửa tool và bộ nhớ làm điểm tăng, kết luận hợp lý là gì?",
   "options": [
    "Đòn bẩy thuần văn bản là yếu nhất ở thiết lập đó",
    "Prompt hệ thống không quan trọng đối với mọi loại mô hình",
    "Cần một mô hình lớn hơn nhiều để prompt mới có tác dụng",
    "Phương pháp đó về cơ bản là hoàn toàn không hoạt động"
   ],
   "answer": 0,
   "explain": "Phải cẩn thận với phạm vi: kết luận đúng là \"trong thiết lập đó\", không phải \"nói chung\". Nhưng nó vẫn là một tín hiệu quan trọng, vì nó gợi ý rằng giả định nền của cả nhóm phương pháp training-free — rằng sửa văn bản ngữ cảnh là một đòn bẩy mạnh — có thể không vững ở mọi miền. Đó là loại bằng chứng đáng đi tìm trước khi cam kết ba tháng vào một hướng."
  },
  {
   "id": 68,
   "g": "stat",
   "q": "Khi một bài so sánh phương pháp A dùng 24.000 rollout với phương pháp B dùng 2.000 rollout, vấn đề là gì?",
   "options": [
    "A chắc chắn đã khớp quá mức vào tập phát triển",
    "Không có vấn đề gì, miễn là cả hai phương pháp đều đã kịp hội tụ",
    "B chắc chắn kém hơn vì học từ ít dữ liệu hơn",
    "Ngân sách lệch nên không tách được phương pháp khỏi compute"
   ],
   "answer": 3,
   "explain": "Đây là biến gây nhiễu (confounder) kinh điển của lĩnh vực. Để so sánh có nghĩa, phải hoặc khớp ngân sách, hoặc vẽ đường cong hiệu năng theo ngân sách cho cả hai rồi so tại cùng mức. Chỉ so hai điểm ở hai mức ngân sách khác nhau thì không kết luận được gì về phương pháp."
  },
  {
   "id": 69,
   "g": "stat",
   "q": "Vì sao một baseline few-shot nên là \"giá trị tốt nhất qua nhiều lần chọn ví dụ ngẫu nhiên\" chứ không phải một bộ ví dụ cố định?",
   "options": [
    "Nhiều kết quả few-shot không vượt nổi baseline chọn ngẫu nhiên",
    "Vì nó loại bỏ được nhiễu do lấy mẫu khi sinh",
    "Vì ví dụ ngẫu nhiên luôn tốt hơn ví dụ do người chọn",
    "Vì cách này giúp tiết kiệm chi phí đánh giá"
   ],
   "answer": 0,
   "explain": "Nếu phương pháp của bạn tìm được một bộ ví dụ tốt, câu hỏi tự nhiên là: ngẫu nhiên thử cùng số lần thì có tìm được bộ tốt tương đương không? Khá nhiều lần câu trả lời là có. Baseline này khó vượt hơn nhiều so với một bộ ví dụ cố định, và chính vì thế nó mới có ý nghĩa."
  },
  {
   "id": 70,
   "g": "causal",
   "q": "\"Faithfulness\" (tính trung thực) của việc dùng kinh nghiệm được định nghĩa thế nào trong các nghiên cứu can thiệp nhân quả?",
   "options": [
    "Kinh nghiệm được ghi lại có khớp với thực tế đã xảy ra hay không",
    "Hành vi có thực sự bị quy định bởi kinh nghiệm đầu vào không",
    "Agent có báo cáo đúng những việc nó đã làm không",
    "Tỉ lệ mục kinh nghiệm không bị trùng lặp nhau"
   ],
   "answer": 1,
   "explain": "Định nghĩa này rất thông minh vì nó biến một câu hỏi mơ hồ (\"mô hình có dùng artifact không?\") thành một phép đo thao tác được: can thiệp vào artifact rồi đo thay đổi hành vi. Chú ý chiều logic: hành vi ĐỔI khi can thiệp là bằng chứng artifact ĐƯỢC dùng; hành vi KHÔNG đổi là bằng chứng nó bị bỏ qua."
  },
  {
   "id": 71,
   "g": "causal",
   "q": "Trong một giao thức can thiệp, phép \"Shuffle\" (xáo trộn thứ tự các bước trong quỹ đạo) kiểm tra điều gì?",
   "options": [
    "Agent phụ thuộc trình tự, hay chỉ bắt lấy vài từ khoá",
    "Agent có chịu được dữ liệu đầu vào bị nhiễu nặng hay không",
    "Quỹ đạo thu được có đủ dài để học được điều gì hay không",
    "Thứ tự tối ưu của các bước trong một quỹ đạo nên là gì"
   ],
   "answer": 0,
   "explain": "Nếu xáo trộn thứ tự mà hiệu năng không đổi, nghĩa là agent không thực sự đọc kinh nghiệm như một quy trình có thứ tự — nó chỉ bắt lấy vài từ khóa. Đó là một dạng dùng artifact hời hợt, và nó giải thích vì sao \"artifact có vẻ hợp lý\" vẫn có thể không mang lại lợi ích gì."
  },
  {
   "id": 72,
   "g": "causal",
   "q": "Phép can thiệp \"Filler\" — thay artifact bằng các ký tự vô nghĩa như %$#&amp; — dùng để làm gì?",
   "options": [
    "Mốc dưới: giữ hình thức, bỏ hết nội dung artifact",
    "Kiểm xem tokenizer có bị lỗi với các ký tự lạ hay không",
    "Kiểm mô hình có xử lý được các ký tự đặc biệt không",
    "Đo độ dài ngữ cảnh tối đa mà mô hình có thể chịu được"
   ],
   "answer": 0,
   "explain": "Đây là một đối chứng rất sạch. Có thể hiệu năng tăng chỉ vì prompt dài hơn, hoặc vì có một khối văn bản ở vị trí đó. Filler giữ nguyên hình thức và bỏ nội dung, nên nếu artifact thật và filler cho kết quả như nhau thì nội dung không đóng vai trò gì."
  },
  {
   "id": 73,
   "g": "causal",
   "q": "Vì sao \"artifact bị xáo trộn\" và \"artifact chung chung khớp độ dài\" đều cần có trong thiết kế thí nghiệm?",
   "options": [
    "Một dùng cho mô hình nhỏ, một cho mô hình lớn",
    "Để đủ số điều kiện cho ý nghĩa thống kê",
    "Mỗi cái loại trừ một giả thuyết đối thủ khác nhau",
    "Cho hai ước lượng độc lập của cùng một hiệu ứng"
   ],
   "answer": 2,
   "explain": "Mỗi đối chứng nhằm vào một giả thuyết đối thủ cụ thể — đó là cách thiết kế đối chứng đúng, chứ không phải thêm điều kiện cho nhiều. Trước khi thêm một điều kiện vào thí nghiệm, hãy viết ra một câu: điều kiện này loại trừ giả thuyết nào?"
  },
  {
   "id": 74,
   "g": "causal",
   "q": "Phép can thiệp nhân quả lên artifact có lợi thế thực tế gì về chi phí?",
   "options": [
    "Chỉ cần thêm lượt đánh giá, không phải xây lại artifact",
    "Nó dùng ít dữ liệu đánh giá hơn các cách khác",
    "Nó có thể chạy được hoàn toàn trên CPU, không cần tới GPU nào",
    "Nó không cần tới đáp án tham chiếu nào cả"
   ],
   "answer": 0,
   "explain": "Đây là lý do nên làm thí nghiệm này TRƯỚC. Artifact đã có; bạn chỉ cần xáo trộn nó, làm rỗng nó, thay bằng filler, rồi chạy lại phần đánh giá. Với người làm việc trên GPU miễn phí theo giờ, một thí nghiệm rẻ mà có thể vô hiệu hóa cả một nhánh công việc là thí nghiệm giá trị nhất."
  },
  {
   "id": 75,
   "g": "causal",
   "q": "\"Integrated Gradients\" được dùng trong các nghiên cứu này để làm gì?",
   "options": [
    "Tính gradient tích luỹ qua nhiều bước huấn luyện",
    "Đo độ dốc của đường cong học theo số vòng",
    "Ước lượng mô hình thực sự chú ý vào phần nào của đầu vào",
    "Tối ưu hoá prompt bằng một phương pháp dựa trên đạo hàm bậc nhất"
   ],
   "answer": 2,
   "explain": "Nó là một phương pháp quy gán (attribution): phân bổ đóng góp của từng token đầu vào vào đầu ra. Giá trị của nó ở đây là cung cấp bằng chứng ĐỘC LẬP với phép can thiệp: can thiệp cho thấy hành vi không đổi, quy gán cho thấy mô hình vốn không chú ý vào vùng artifact. Hai nguồn bằng chứng cùng hướng thì kết luận chắc hơn."
  },
  {
   "id": 76,
   "g": "causal",
   "q": "Phân biệt \"sửa phía viết\" và \"sửa phía đọc\" của một hệ thống dùng artifact ngữ cảnh:",
   "options": [
    "Viết là ghi artifact ra ổ đĩa, còn đọc là nạp nó lại từ đĩa lên",
    "Viết dùng mô hình lớn, đọc dùng mô hình nhỏ",
    "Viết là chất lượng artifact; đọc là cách nó được đưa vào",
    "Viết xảy ra lúc huấn luyện, đọc lúc suy luận"
   ],
   "answer": 2,
   "explain": "Phân biệt này quyết định bạn làm gì tiếp theo. Nếu artifact đúng nhưng không được dùng, thì viết cổng kiểm định, sửa merge, tinh chỉnh reflector đều vô ích — vấn đề nằm ở chỗ chèn artifact vào đâu trong prompt, định dạng thế nào, có hướng dẫn mô hình dùng nó hay không. Chẩn đoán sai phía là cách chắc chắn nhất để mất vài tháng."
  },
  {
   "id": 77,
   "g": "causal",
   "q": "Nếu can thiệp vào artifact chỉ gây \"suy giảm không đáng kể, hoặc thậm chí cải thiện nhẹ\", kết luận là gì?",
   "options": [
    "Phép can thiệp chưa đủ mạnh để thấy khác biệt",
    "Mô hình quá nhỏ để đánh giá được điều này",
    "Artifact rất bền với nhiễu — đó là một ưu điểm",
    "Agent không dùng artifact một cách trung thực"
   ],
   "answer": 3,
   "explain": "Chi tiết \"thậm chí cải thiện nhẹ\" là phần đáng chú ý nhất: nó nghĩa là artifact đang chiếm chỗ trong ngữ cảnh mà không mang lại gì, hoặc làm mô hình phân tán. Lưu ý về cách diễn đạt: kết luận đúng là \"chưa thiết lập được rằng artifact có tác dụng\", không phải \"đã chứng minh artifact vô dụng\" — phát biểu quá mạnh sẽ bị phản biện bác."
  },
  {
   "id": 78,
   "g": "bench",
   "q": "Vì sao AIME là một bộ dữ liệu khó dùng để kết luận, dù rất phổ biến?",
   "options": [
    "Đáp án chính thức của kỳ thi đó không được công khai một cách đầy đủ",
    "Chỉ 30 bài nên độ hạt là 3.3 điểm, khác biệt nhỏ không đọc được",
    "Nó chỉ gồm các bài toán thuộc riêng phân môn hình học",
    "Nó đã bị loại khỏi danh sách các benchmark chuẩn"
   ],
   "answer": 1,
   "explain": "Cỡ mẫu nhỏ là vấn đề cốt lõi. Ngoài ra còn hai vấn đề nữa: AIME rất nổi tiếng nên nguy cơ đã có trong dữ liệu tiền huấn luyện cao, và phổ điểm bị dồn ở hai đầu. Nếu bạn phải dùng AIME, hãy dùng kèm một bộ lớn hơn và báo cáo cả hai."
  },
  {
   "id": 79,
   "g": "bench",
   "q": "MATH-500 là gì và nó khắc phục được gì so với AIME?",
   "options": [
    "Một bộ có đáp án ở dạng văn bản tự do dài",
    "Một bộ 500 bài được chọn vì khó hơn cả AIME",
    "Một bộ dữ liệu mới hoàn toàn, chưa từng được công khai ra",
    "500 bài chọn từ bộ MATH, độ hạt mịn hơn còn 0.2 điểm"
   ],
   "answer": 3,
   "explain": "500 bài cho độ hạt 0.2 điểm mỗi bài, nên bạn CÓ THỂ quan sát khác biệt vài điểm một cách có ý nghĩa. Đây là lý do MATH-500 nên là bộ chính và AIME chỉ là bộ phụ, nếu đề tài của bạn là về toán. Đổi lại, MATH-500 dễ hơn nên hiệu ứng trần (ceiling effect) có thể xuất hiện với mô hình mạnh."
  },
  {
   "id": 80,
   "g": "bench",
   "q": "\"In-distribution\" và \"out-of-distribution\" (ID và OOD) khác nhau thế nào trong đánh giá?",
   "options": [
    "ID là tập huấn luyện, OOD là tập validation",
    "ID là dữ liệu đã từng thấy, còn OOD là dữ liệu chưa từng thấy",
    "ID cùng loại với dữ liệu đã dùng để tối ưu; OOD khác loại",
    "ID là dữ liệu sạch, OOD là dữ liệu có nhiễu"
   ],
   "answer": 2,
   "explain": "Phân biệt then chốt: \"chưa thấy\" không đồng nghĩa với \"khác phân phối\". Một bài kiểm tra trên các câu toán mới nhưng cùng dạng vẫn là ID. Lý do điều này quan trọng: nhiều phương pháp tăng rõ ở ID nhưng ÂM ở OOD, nghĩa là chúng học được đặc thù của miền huấn luyện chứ không học được điều gì chuyển giao được."
  },
  {
   "id": 81,
   "g": "bench",
   "q": "\"Contamination\" (nhiễm dữ liệu) trong đánh giá LLM nghĩa là gì?",
   "options": [
    "Dữ liệu kiểm tra bị gán nhãn sai ở một số mẫu",
    "Dữ liệu huấn luyện có chứa nội dung độc hại",
    "Dữ liệu kiểm tra bị trộn lẫn giữa nhiều miền",
    "Dữ liệu kiểm tra đã có trong dữ liệu tiền huấn luyện"
   ],
   "answer": 3,
   "explain": "Đây là lý do một bộ dữ liệu càng nổi tiếng thì càng đáng ngờ. Nó đặc biệt nguy hiểm với nhóm phương pháp \"học trong ngữ cảnh\": nếu mô hình vốn đã biết đáp án, bạn không thể phân biệt \"nó học được từ ngữ cảnh\" với \"nó vốn đã nhớ\". Các bộ dữ liệu thiết kế có kiểm soát nhiễm bẩn ra đời chính để tách hai thứ này."
  },
  {
   "id": 82,
   "g": "bench",
   "q": "Vì sao một bộ dữ liệu đánh giá \"học trong ngữ cảnh\" cần chứa kiến thức KHÔNG có trong tiền huấn luyện?",
   "options": [
    "Vì mô hình cần dữ liệu mới để không bị quên cái cũ",
    "Vì kiến thức mới khó hơn nên phân biệt được mô hình tốt",
    "Vì cách đó tránh được vấn đề về bản quyền dữ liệu",
    "Nếu mô hình vốn đã biết thì phép đo mất hiệu lực"
   ],
   "answer": 3,
   "explain": "Đây là yêu cầu hiệu lực (validity) của phép đo, không phải yêu cầu về độ khó. Hầu hết benchmark ngữ cảnh dài thất bại ở đúng điểm này: chúng đo được việc mô hình trả lời đúng, nhưng không chứng minh được câu trả lời đến TỪ ngữ cảnh. Khi đọc một bài về in-context learning, hãy tìm xem họ xử lý vấn đề này thế nào."
  },
  {
   "id": 83,
   "g": "bench",
   "q": "GSM8K là bộ dữ liệu về gì?",
   "options": [
    "Các bài toán olympic dành cho học sinh ở bậc trung học",
    "Toán đố số học nhiều bước, đáp án là một con số",
    "Các bài tập suy luận logic được viết ở dạng hình thức",
    "Hỏi đáp dựa trên một tập tài liệu đã được cho trước"
   ],
   "answer": 1,
   "explain": "GSM8K là bộ \"mốc\" phổ biến nhất cho suy luận nhiều bước. Ưu điểm: đáp án là một số nên chấm tự động dễ, cỡ mẫu lớn. Nhược điểm: đã khá cũ và nguy cơ nhiễm dữ liệu cao, và nhiều mô hình hiện đại đã đạt mức rất cao nên khó phân biệt (hiệu ứng trần)."
  },
  {
   "id": 84,
   "g": "bench",
   "q": "HotpotQA đòi hỏi năng lực gì mà một bộ hỏi-đáp thông thường không đòi?",
   "options": [
    "Trả lời câu hỏi về nội dung của một hình ảnh",
    "Trả lời câu hỏi trong một khoảng thời gian đã bị giới hạn sẵn",
    "Trả lời cùng một câu hỏi bằng nhiều ngôn ngữ",
    "Suy luận nhiều chặng — ghép thông tin từ nhiều tài liệu"
   ],
   "answer": 3,
   "explain": "Multi-hop nghĩa là đáp án không nằm trong một đoạn văn nào cả; phải lấy một mẩu từ tài liệu A, một mẩu từ tài liệu B rồi kết hợp. Đây là lý do nó được dùng để đánh giá agent có khả năng truy hồi và lập kế hoạch, chứ không chỉ đọc hiểu."
  },
  {
   "id": 85,
   "g": "bench",
   "q": "Terminal-Bench và SWE-bench-verified đánh giá loại agent nào?",
   "options": [
    "Agent duyệt web và thu thập thông tin trực tuyến",
    "Agent hội thoại nhiều lượt với người dùng thật",
    "Agent suy luận toán học ở mức độ olympic",
    "Agent lập trình — thao tác terminal và sửa lỗi repo thật"
   ],
   "answer": 3,
   "explain": "Điểm quan trọng khi đọc: một kết quả trên các bộ này KHÔNG chuyển giao sang suy luận toán/lý. Một phương pháp \"thắng\" trên Terminal-Bench có thể được phép sửa công cụ, middleware và cấu trúc dự án — một không gian hành động hoàn toàn khác với việc sửa một đoạn văn bản kinh nghiệm. So sánh chéo hai loại benchmark này là so sai."
  },
  {
   "id": 86,
   "g": "bench",
   "q": "Chữ \"verified\" trong SWE-bench-verified có nghĩa gì?",
   "options": [
    "Mọi mô hình đều đã được xác thực lại trước khi đem ra đánh giá",
    "Đáp án đã được chứng minh ở dạng hình thức",
    "Tập con đã được người kiểm lại là giải được và test đúng",
    "Kết quả đã được một nhóm thứ ba xác nhận lại"
   ],
   "answer": 2,
   "explain": "Bộ gốc có một tỉ lệ mục mà đề bài không đủ thông tin hoặc test sai, khiến mọi mô hình đều trượt vì lý do không liên quan tới năng lực. Bản \"verified\" lọc những mục đó. Bài học rộng hơn: khi điểm trên một benchmark thấp bất thường, hãy nghi ngờ benchmark trước khi nghi ngờ mô hình."
  },
  {
   "id": 87,
   "g": "bench",
   "q": "Vì sao gần như mọi kết quả dương của nhóm \"ngữ cảnh tiến hóa\" đều nằm ở miền có bộ kiểm tra chính xác?",
   "options": [
    "Vì các miền đó có sẵn nhiều dữ liệu hơn hẳn",
    "Vì các tác giả hầu hết xuất thân từ ngành toán và lập trình",
    "Vòng lặp cần tín hiệu thưởng đáng tin để so các rollout",
    "Vì chỉ ở miền đó mới có mô hình đủ mạnh để chạy"
   ],
   "answer": 2,
   "explain": "Đây là một quan sát quan trọng để chọn miền cho đề tài. Vòng lặp của các phương pháp này là: sinh nhiều rollout → so sánh bằng reward → rút kinh nghiệm từ cái tốt. Nếu reward do một LLM chấm, nhiễu giám khảo trộn vào mọi bước. Hệ quả thực tế: nếu miền bạn chọn không có checker chính xác, điều đó quyết định dự án trước cả việc chọn kích thước mô hình."
  },
  {
   "id": 88,
   "g": "bench",
   "q": "Khi một bài báo cáo kết quả trên một \"subset phân tầng\" (stratified subset) của một benchmark, bạn cần chú ý gì?",
   "options": [
    "Kết quả đo trên tập con luôn thấp hơn so với trên tập đủ",
    "Con số đó không so trực tiếp được với bài dùng tập khác",
    "Tập con phân tầng thì không được dùng trong công bố khoa học",
    "Tập con phân tầng thì luôn khó hơn so với bộ dữ liệu đầy đủ"
   ],
   "answer": 1,
   "explain": "Phân tầng nghĩa là chọn mẫu sao cho giữ tỉ lệ các loại bài, thường để tiết kiệm chi phí đánh giá. Đó là một cách làm hợp lý. Vấn đề chỉ phát sinh khi người đọc đặt con số đó cạnh con số của một bài khác đo trên tập khác — hai số đó khác đơn vị, dù cùng tên benchmark."
  },
  {
   "id": 89,
   "g": "read",
   "q": "\"Preprint\" khác \"bài đã qua phản biện\" (peer-reviewed) thế nào?",
   "options": [
    "Preprint chỉ dành cho các kết quả mang tính âm tính",
    "Preprint không có số định danh, bài phản biện thì có",
    "Preprint chưa qua ai kiểm độc lập; bài phản biện thì đã qua",
    "Preprint là bản nháp, bài phản biện là bản cuối cùng"
   ],
   "answer": 2,
   "explain": "arXiv không có phản biện: ai cũng đăng được. Điều đó không làm preprint vô giá trị — rất nhiều công trình quan trọng xuất hiện ở đó trước. Nhưng khi viết luận văn, bạn phải ghi rõ trạng thái từng trích dẫn, vì mức độ bạn được phép dựa vào một preprint khác với một bài đã qua phản biện."
  },
  {
   "id": 90,
   "g": "read",
   "q": "Trường \"Comments\" trên trang arXiv ghi \"Accepted at ICML 2026\" — bạn nên hiểu thế nào?",
   "options": [
    "Là thông tin do hội nghị cập nhật tự động vào",
    "Do tác giả tự khai, chưa đối chiếu kỷ yếu — phải tự kiểm",
    "Là trạng thái đang trong quá trình phản biện",
    "Là thông tin đã được chính arXiv kiểm tra và xác minh lại kỹ"
   ],
   "answer": 1,
   "explain": "Trường này do tác giả tự điền và không ai kiểm. Thỉnh thoảng nó đúng, thỉnh thoảng nó là bản gửi chưa được nhận, thỉnh thoảng nó sai năm. Thói quen đúng: tra tên bài trong kỷ yếu chính thức hoặc trên OpenReview, rồi mới ghi trạng thái vào thư mục tài liệu của mình."
  },
  {
   "id": 91,
   "g": "read",
   "q": "Khi một bài có nhiều trích dẫn, điều đó có nghĩa là kết quả của nó đã được xác nhận?",
   "options": [
    "Có, số trích dẫn chính là chỉ báo tốt nhất về mức độ tin cậy của bài",
    "Không — phần lớn là trích để dùng, rất ít là kiểm chứng lại",
    "Chỉ đúng khi số trích dẫn đã vượt qua mốc 100",
    "Chỉ đúng khi các bài trích dẫn đến từ nhóm khác"
   ],
   "answer": 1,
   "explain": "Phân biệt \"người dùng\" và \"người kiểm chứng\" là một kỹ năng đọc quan trọng. Một kết quả có thể được 50 bài trích dẫn như tiền đề mà chưa ai chạy lại nó. Khi đánh giá độ vững của một tuyên bố, hãy tìm cụ thể: có ai ĐỘC LẬP đo lại chưa, và dưới giao thức nào?"
  },
  {
   "id": 92,
   "g": "read",
   "q": "Vì sao đáng chú ý khi chính nhóm tác giả của một phương pháp, vài tháng sau, công bố một phương pháp khác thêm lại phần họ từng nói là không cần?",
   "options": [
    "Chuyện rất bình thường, không mang lại thông tin gì cả",
    "Chỉ là một chiến lược công bố nhằm tăng số lượng bài báo",
    "Tín hiệu mạnh về giới hạn thực tế của phương pháp đầu",
    "Cho thấy phương pháp đầu tiên đã sai hoàn toàn ngay từ gốc"
   ],
   "answer": 2,
   "explain": "Chính nhóm tác giả có động cơ mạnh nhất để phương pháp của họ thành công, nên khi họ tự thêm lại thứ họ từng loại bỏ, đó là bằng chứng có giá trị cao. Nhưng phải diễn đạt cẩn thận: nó cho thấy GIỚI HẠN, không cho thấy \"sai hoàn toàn\" — và nếu bài sau không nói thẳng mối liên hệ thì phải ghi rõ đó là suy luận của bạn."
  },
  {
   "id": 93,
   "g": "read",
   "q": "Bạn đọc bài A mô tả phương pháp của bài B là \"một biến thể của X dùng để củng cố các chuỗi gọi tool thành công\", nhưng bài B thực ra duy trì một thư viện văn bản. Bạn nên làm gì?",
   "options": [
    "Trích theo bài A, vì đó là nguồn mới hơn hai bài",
    "Trích cả hai và để người đọc tự quyết định",
    "Bỏ cả hai bài vì chúng mâu thuẫn với nhau",
    "Trích theo bản gốc, bỏ cách bài A mô tả baseline"
   ],
   "answer": 3,
   "explain": "Mô tả sai baseline là chuyện xảy ra thường xuyên, kể cả ở các bài tốt — tác giả tập trung vào phương pháp của họ và tóm tắt baseline một cách lỏng lẻo. Quy tắc an toàn: cơ chế của một phương pháp phải đọc từ bản gốc của chính nó. Phát hiện kiểu này cũng là tín hiệu để cẩn thận với các phần khác của bài A."
  },
  {
   "id": 94,
   "g": "read",
   "q": "Khi mã nguồn chính thức của một phương pháp bị đánh dấu \"deprecated\", suy luận đúng là gì?",
   "options": [
    "Mã nguồn có lỗ hổng bảo mật nên bị gỡ xuống",
    "Phương pháp đó đã bị cả cộng đồng nghiên cứu bác bỏ hoàn toàn",
    "Bài báo tương ứng đã bị rút khỏi nơi công bố",
    "Phải kiểm là bỏ hẳn hay chỉ được di chuyển đi chỗ khác"
   ],
   "answer": 3,
   "explain": "\"Deprecated\" có thể nghĩa là \"đã chuyển sang một thư viện khác và vẫn được bảo trì\", hoặc \"không ai dùng nữa\". Đọc commit, đọc README mới, tìm xem code đi đâu. Phát biểu quá mạnh về điểm này là cách dễ nhất để bị phản biện chỉ ra là đã không kiểm tra."
  },
  {
   "id": 95,
   "g": "read",
   "q": "Bạn thấy một bài tuyên bố cải thiện ngoài phân phối, nhưng một bài khác đo lại dưới giao thức dùng chung thì ra số âm. Cách diễn đạt nào trung thực?",
   "options": [
    "Kết luận rằng phương pháp đó không hoạt động",
    "Chỉ trích dẫn bài gốc, vì đó mới chính là nguồn của phương pháp",
    "Nêu cả hai kèm điều kiện đo, và giới hạn của bên đo lại",
    "Chỉ trích bài đo lại, vì nó dùng giao thức chung"
   ],
   "answer": 2,
   "explain": "Một phép đo lại dưới giao thức chung có giá trị cao hơn, nhưng nó không miễn nhiễm với vấn đề của chính nó — nếu nó chỉ chạy một seed thì con số của nó cũng không chắc. Cách viết đúng cho luận văn là trình bày cả hai cùng điều kiện, rồi nói rõ bạn dựa vào bên nào và vì sao."
  },
  {
   "id": 96,
   "g": "read",
   "q": "Khi đọc một bảng kết quả, thông tin nào nên tìm TRƯỚC khi đọc các con số?",
   "options": [
    "Cỡ mẫu, số seed, thước đo, và baseline đang so với cái gì",
    "Nguồn tài trợ cho nghiên cứu đó được nêu ở đâu",
    "Kích thước của các mô hình được dùng trong bảng",
    "Tên của toàn bộ những phương pháp đang được đem ra để so sánh"
   ],
   "answer": 0,
   "explain": "Các con số không có nghĩa khi tách khỏi bốn thông tin này. Cỡ mẫu cho bạn độ hạt; số seed cho bạn ngưỡng nhiễu; thước đo cho bạn biết con số đo cái gì; baseline cho bạn biết \"cải thiện\" là so với cái gì. Tập thói quen đọc chú thích bảng trước khi đọc ô số — nó tiết kiệm rất nhiều thời gian diễn giải sai."
  },
  {
   "id": 97,
   "g": "infra",
   "q": "Trong vLLM, quan hệ giữa `max_model_len` và số token tối đa được sinh ra là gì?",
   "options": [
    "Số token sinh sẽ được tự động cắt cho vừa trần",
    "Là trần cho tổng của prompt cộng phần được sinh ra",
    "Nó chỉ áp dụng cho phần prompt đưa vào mô hình",
    "Hai tham số đó hoàn toàn độc lập với nhau"
   ],
   "answer": 1,
   "explain": "Đây là một cái bẫy cấu hình gây lỗi 100% request mà thông báo lỗi lại không nói rõ nguyên nhân. Nếu `max_model_len` là 16384 và bạn yêu cầu sinh 16384 token, thì prompt dài bao nhiêu cũng làm tổng vượt trần. Hậu quả nguy hiểm nhất không phải lỗi, mà là một thư mục kết quả toàn số 0 trông giống như một phát hiện khoa học."
  },
  {
   "id": 98,
   "g": "infra",
   "q": "Lượng tử hóa (AWQ, GPTQ) là gì và nó gây rủi ro gì cho thí nghiệm?",
   "options": [
    "Xoá bớt các lớp của mô hình; rủi ro là mất hẳn phần năng lực",
    "Chuyển sang số nguyên để chạy được trên CPU; rủi ro là chậm",
    "Chia mô hình ra thành nhiều GPU; rủi ro là bị lỗi đồng bộ",
    "Giảm độ chính xác số; nhiễu có thể nuốt mất hiệu ứng nhỏ"
   ],
   "answer": 3,
   "explain": "Lượng tử hóa là cách duy nhất để chạy mô hình lớn trên GPU nhỏ, nên thường không tránh được. Cách xử lý đúng: coi nó là một biến gây nhiễu và BÁO CÁO nó, đồng thời kiểm chứng toàn bộ quy trình trên một mô hình nhỏ KHÔNG lượng tử hóa trước khi tin bất kỳ con số nào từ mô hình lớn đã lượng tử hóa."
  },
  {
   "id": 99,
   "g": "infra",
   "q": "Nhiệt độ sinh (temperature) ảnh hưởng thế nào tới việc đo lường?",
   "options": [
    "Không ảnh hưởng tới kết quả nếu dùng cùng một giá trị seed ban đầu",
    "Trên 0 thì mỗi lần chạy khác nhau; bằng 0 thì mất đa dạng",
    "Nhiệt độ chỉ ảnh hưởng tới tốc độ sinh token",
    "Nhiệt độ càng cao thì kết quả càng tốt hơn"
   ],
   "answer": 1,
   "explain": "Có một căng thẳng nội tại ở đây: vòng lặp kiểu GRPO CẦN nhiệt độ cao lúc rollout để nhóm có đa dạng (không đa dạng thì advantage bằng 0), nhưng lúc ĐÁNH GIÁ bạn lại muốn ít nhiễu. Vì vậy các bài thường dùng hai nhiệt độ khác nhau cho hai giai đoạn — và bạn phải báo cáo cả hai."
  },
  {
   "id": 100,
   "g": "infra",
   "q": "Vì sao cấu hình phục vụ mô hình (serving config) cần được báo cáo trong phần thí nghiệm?",
   "options": [
    "Vì nó ảnh hưởng tới chi phí tiền điện khi chạy nhiều thí nghiệm",
    "Vì các hội nghị yêu cầu phải có mục này trong bài",
    "Vì nó quyết định mô hình nào chạy được trên GPU",
    "Khác biệt do cấu hình có thể lớn hơn mức cải thiện tuyên bố"
   ],
   "answer": 3,
   "explain": "Đã có trường hợp cùng một mô hình và cùng một phương pháp cho các điểm khác nhau chỉ vì tham số phục vụ khác nhau, và khoảng cách đó vượt cả mức cải thiện được tuyên bố. Nghĩa là nếu không khóa và báo cáo cấu hình này, kết quả của bạn không tái lập được — kể cả bởi chính bạn, một tháng sau."
  }
 ]
};
