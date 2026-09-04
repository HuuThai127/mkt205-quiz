# MINI-PROJECT SHORT TECHNICAL REPORT
**Course:** Cross-Platform Mobile App Development (VKU)
**Mini-Project Title:** Project 1.1 PWA - Ứng Dụng Ôn Tập Marketing (MKT205)
**Team / Student Name:** Hữu Thái
**Submission Date:** 04/09/2026

---

## 1. GENERAL INFORMATION & DELIVERABLE LINKS
* **Team Members:**
  1. Hữu Thái — Student ID: [Mã Sinh Viên Của Bạn] — Role: Fullstack Developer — Contribution: 100%
* **🔗 Live Demo URL:** [https://huuthai127.github.io/mkt205-quiz/](https://huuthai127.github.io/mkt205-quiz/)
* **💻 GitHub Repository:** [https://github.com/HuuThai127/mkt205-quiz](https://github.com/HuuThai127/mkt205-quiz)
* **🎥 Video Demo (Optional):** [Cập nhật link video nếu có, nếu không có thể xóa dòng này]

---

## 2. FEATURE IMPLEMENTATION CHECKLIST
| # | Required Feature | Status | Implementation Details & Acceptance Level |
|:---:|---|:---:|---|
| 1 | PWA Installable | ✅ Complete | Cấu hình `manifest.json` hỗ trợ cài đặt ứng dụng (Add to Home screen) trên iOS và Android. |
| 2 | Local Offline Persistence | ✅ Complete | Sử dụng **Service Worker (Cache API)** để cache toàn bộ tài nguyên (HTML, CSS, JS, JSON). Ứng dụng hoạt động 100% ngoại tuyến sau lần đầu truy cập. |
| 3 | Responsive Mobile Viewport | ✅ Complete | Giao diện tối ưu hoàn toàn cho thiết bị di động (Mobile-first), hỗ trợ Light/Dark mode qua CSS Variables. |
| 4 | Học Flashcard & Trắc nghiệm | ✅ Complete | Logic xử lý dữ liệu 324 câu hỏi tự động bằng Vanilla JavaScript. Tính năng trộn câu hỏi và đáp án ngẫu nhiên. |

---

## 3. TECHNICAL ARCHITECTURE & PROJECT STRUCTURE
- **Architecture:** Ứng dụng phát triển dưới dạng **Progressive Web App (PWA)**, không sử dụng framework trung gian (thuần Vanilla Web App).
- **Directory Structure:**
  - `index.html`: Cấu trúc UI chính (chứa toàn bộ giao diện điều hướng, Quiz, Flashcard).
  - `style.css`: Hệ thống biến CSS (Design Tokens) cho Light/Dark mode và responsive layouts.
  - `script.js`: Xử lý Logic toàn bộ ứng dụng (State management cho bộ câu hỏi, tính điểm, chuyển trang).
  - `questions.js`: File Database dạng mảng JSON chứa 324 câu hỏi lý thuyết MKT205.
  - `manifest.json`: Web App Manifest phục vụ cài đặt PWA độc lập (Standalone).
  - `sw.js`: Service Worker bắt sự kiện `fetch` để trả về tài nguyên đã lưu trong Cache khi người dùng mất mạng.
- **State Management & Caching Flow:** Dữ liệu trang được quản lý thông qua biến trong bộ nhớ (DOM State). Bộ đệm tĩnh (Static Caching) thông qua Service Worker.

---

## 4. EMPIRICAL EVIDENCE & SCREENSHOTS
*(*Chèn 3-4 ảnh chụp màn hình ứng dụng tại đây: (1) Màn hình chính Dashboard, (2) Màn hình lúc cài đặt Add to Home screen, (3) Giao diện khi tắt mạng (Offline), (4) Màn hình làm Quiz.*)*

![Dashboard](link-anh-1)
![Add to Home Screen](link-anh-2)

---

## 5. CONCLUSION & REFLECTION
* **Thách thức (Challenges faced):** Tích hợp Service Worker để cache đầy đủ tài nguyên sao cho ứng dụng không bị lỗi 404 khi truy cập hoàn toàn ngoại tuyến; tối ưu hóa giao diện hiển thị 324 câu hỏi trên các màn hình nhỏ mượt mà.
* **Bài học (What I learned):** Nắm vững kiến trúc cốt lõi của Progressive Web App (PWA). Hiểu rõ cách Web App Manifest tương tác với hệ điều hành của di động (iOS/Android) và cách Service Worker quản lý vòng đời bộ đệm (Install, Activate, Fetch).
