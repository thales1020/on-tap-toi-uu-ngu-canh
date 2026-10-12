# Ôn tập tối ưu ngữ cảnh LLM

100 câu trắc nghiệm kiến thức nền để đọc văn liệu về tối ưu ngữ cảnh, chưng cất kinh nghiệm
và đánh giá LLM. Giải thích hiện ngay khi chọn đáp án.

**https://thales1020.github.io/on-tap-toi-uu-ngu-canh/**

| | |
|---|---|
| `docs/index.html` | trang thi — một câu một lần, kèm phiếu trả lời |
| `docs/style.css` | giao diện |
| `docs/data/questions.js` | 100 câu hỏi (sinh tự động, không sửa tay) |

Phím tắt: `A`–`D` hoặc `1`–`4` để chọn, `←` `→` để chuyển câu.
Tiến độ lưu trong `localStorage` của trình duyệt.

## Về độ dài đáp án

Đáp án đúng được viết ngắn gọn còn đáp án sai được viết đủ dài, sao cho không
đoán được bài bằng cách chọn phương án dài nhất. Script dựng có kiểm tra bắt buộc:
mọi mẹo đoán phải về mức ngẫu nhiên (~25/100).
