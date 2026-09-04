# MKT205 Study Portal - Progressive Web App (PWA)

Đây là ứng dụng web hỗ trợ ôn tập học phần MKT205 với bộ dữ liệu 324 câu hỏi trắc nghiệm (lý thuyết, dịch vụ và chiến lược Marketing). Ứng dụng đã được nâng cấp thành Progressive Web App (PWA) cho phép cài đặt và sử dụng ngoại tuyến.

## 🚀 Tính Năng Nổi Bật

- **Hệ Thống Flashcard:** Ôn tập từng câu hỏi, lật mặt xem đáp án, và đánh dấu "Đã nhớ" hoặc "Chưa nhớ".
- **Luyện Trắc Nghiệm Ngẫu Nhiên:** Tuỳ chọn làm 10, 20, 30... hoặc tất cả câu hỏi, tự động xáo trộn vị trí câu hỏi và đáp án (A/B/C/D).
- **Thống Kê Tiến Độ:** Theo dõi quá trình học tập (Câu mới, Đang học, Đã nhớ) qua biểu đồ và dashboard trực quan.
- **Ôn Câu Trả Lời Sai:** Tự động lưu lại các câu trả lời sai để tiện ôn tập lại.
- **Hỗ Trợ Ngoại Tuyến (Offline):** Ứng dụng là một PWA thực thụ. Bạn có thể cài đặt ứng dụng vào màn hình chính của điện thoại hoặc máy tính và ôn bài không cần kết nối mạng.
- **Chế Độ Giao Diện:** Hỗ trợ Light Mode (Sáng) / Dark Mode (Tối).

## 🛠️ Công Nghệ Sử Dụng

Dự án này sử dụng công nghệ lõi (Vanilla Web) tương tự **Project 1.1 (PWA - Field Survey)**:
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS).
- **Backend (Server giả định):** Node.js đơn giản (tùy chọn) để phục vụ file tĩnh.
- **PWA Features:**
  - `manifest.json`: Để cài đặt (Installable).
  - `sw.js` (Service Worker): Sử dụng Cache API để lưu trữ ngoại tuyến toàn bộ dữ liệu.

## 📥 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Chạy trực tiếp (Local Development)

1. Đảm bảo máy bạn đã cài đặt [Node.js](https://nodejs.org/).
2. Tải mã nguồn về máy:
   ```bash
   git clone https://github.com/HuuThai127/mkt205-quiz.git
   cd mkt205-quiz
   ```
3. Khởi động server nội bộ:
   ```bash
   npm start
   # hoặc
   node server.js
   ```
4. Mở trình duyệt (Chrome, Edge, Safari...) và truy cập: `http://localhost:3000`

### Cài Đặt Ứng Dụng (PWA)

1. Khi truy cập vào ứng dụng trên trình duyệt Chrome hoặc Edge, nhìn lên thanh địa chỉ (Address Bar).
2. Nhấn vào biểu tượng **"Install" (Cài đặt)** hình màn hình máy tính có dấu cộng.
3. Ứng dụng sẽ được cài đặt và xuất hiện ngoài Desktop / Màn hình chính của bạn. Từ nay bạn có thể mở nó lên và dùng ngay cả khi mất mạng internet.

## 📂 Cấu Trúc Mã Nguồn

- `index.html`: Giao diện chính của ứng dụng.
- `style.css`: File định dạng giao diện, màu sắc, bố cục (Sử dụng CSS Variables cho Dark/Light mode).
- `script.js`: Xử lý toàn bộ logic giao diện, chấm điểm, thống kê và điều hướng.
- `questions.js`: Chứa data base gồm 324 câu hỏi định dạng JSON.
- `manifest.json`: Web App Manifest cho PWA.
- `sw.js`: Service Worker xử lý bộ nhớ đệm ngoại tuyến (Offline Cache).
- `server.js`: Web server cơ bản bằng Node.js.
- `icon.svg`: Biểu tượng của ứng dụng.

## 🤝 Đóng Góp
Nếu có phát hiện lỗi sai trong bộ đề hoặc muốn cải thiện tính năng, hãy tạo **Pull Request** hoặc mở **Issue**.

---
*Dự án thuộc học phần MKT205.*
