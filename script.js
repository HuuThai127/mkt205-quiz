// MKT205 - Application Script Logic (Fixed)

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------
    // 1. DOM ELEMENTS (declared first)
    // -----------------------------------------
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    const dashTotal = document.getElementById('dash-total');
    const dashMastered = document.getElementById('dash-mastered');
    const dashLearning = document.getElementById('dash-learning');
    const dashNew = document.getElementById('dash-new');
    const dashProgressPercent = document.getElementById('dash-progress-percent');
    const dashProgressBar = document.getElementById('dash-progress-bar');
    const dashStudiedCount = document.getElementById('dash-studied-count');

    const actionStudyNew = document.getElementById('action-study-new');
    const actionReviewLearning = document.getElementById('action-review-learning');
    const actionPracticeQuiz = document.getElementById('action-practice-quiz');

    const flashcardEl = document.getElementById('fc-card');
    const flashcardQuestion = document.getElementById('flashcard-question');
    const flashcardAnswer = document.getElementById('flashcard-answer');
    const flashcardTopic = document.getElementById('flashcard-topic');
    const flashcardCounter = document.getElementById('flashcard-counter');
    const flashcardProgressBar = document.getElementById('flashcard-progress-bar');
    const fcOptionsEl = document.getElementById('fc-options');
    const fcAnswerPanel = document.getElementById('fc-answer-panel');
    const fcAnswerLabel = document.getElementById('fc-answer-label');
    const btnMemorizeCorrect = document.getElementById('btn-memorize-correct');
    const btnMemorizeWrong = document.getElementById('btn-memorize-wrong');
    const flashPrevBtn = document.getElementById('flash-prev-btn');
    const flashNextBtn = document.getElementById('flash-next-btn');
    const flashShuffleBtn = document.getElementById('flash-shuffle-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const quizSetupView = document.getElementById('quiz-setup-view');
    const quizPlayingView = document.getElementById('quiz-playing-view');
    const quizResultView = document.getElementById('quiz-result-view');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizCountSelect = document.getElementById('quiz-count');
    const quizRandomQCheckbox = document.getElementById('quiz-random-questions');
    const quizRandomACheckbox = document.getElementById('quiz-random-answers');
    const quizTopic = document.getElementById('quiz-topic');
    const quizCounter = document.getElementById('quiz-counter');
    const quizProgressBar = document.getElementById('quiz-progress-bar');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizSubmitBtn = document.getElementById('quiz-submit-btn');
    const quizNextBtn = document.getElementById('quiz-next-btn');

    const resultPercent = document.getElementById('result-percent');
    const resultCorrect = document.getElementById('result-correct');
    const resultWrong = document.getElementById('result-wrong');
    const btnQuizRetry = document.getElementById('btn-quiz-retry');
    const btnQuizReviewWrong = document.getElementById('btn-quiz-review-wrong');
    const btnQuizHome = document.getElementById('btn-quiz-home');

    const wrongList = document.getElementById('wrong-list');
    const btnWrongRetry = document.getElementById('btn-wrong-retry');
    const btnWrongClear = document.getElementById('btn-wrong-clear');
    const wrongActionsBar = document.getElementById('wrong-actions');

    const searchInput = document.getElementById('search-input');
    const searchCount = document.getElementById('search-count');
    const searchResults = document.getElementById('search-results');

    const statsMastered = document.getElementById('stats-mastered');
    const statsLearning = document.getElementById('stats-learning');
    const statsNew = document.getElementById('stats-new');
    const statsStudied = document.getElementById('stats-studied');
    const statsBestScore = document.getElementById('stats-best-score');
    const statsCoveragePercent = document.getElementById('stats-coverage-percent');
    const statsCoverageBar = document.getElementById('stats-coverage-bar');
    const statsAccuracyPercent = document.getElementById('stats-accuracy-percent');
    const statsAccuracyBar = document.getElementById('stats-accuracy-bar');
    const statsTopicsList = document.getElementById('stats-topics-list');

    // -----------------------------------------
    // 2. ALL FUNCTION DEFINITIONS (before use)
    // -----------------------------------------

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function updateThemeIcons(isDark) {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i><span>Tối / Sáng</span>'
                : '<i class="fa-solid fa-moon"></i><span>Tối / Sáng</span>';
        }
        if (mobileThemeToggleBtn) {
            mobileThemeToggleBtn.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        }
    }

    function saveState() {
        localStorage.setItem('mkt_mastered', JSON.stringify([...mastered]));
        localStorage.setItem('mkt_learning', JSON.stringify([...learning]));
        localStorage.setItem('mkt_wrongAnswers', JSON.stringify(wrongAnswers));
        localStorage.setItem('mkt_bestScore', bestScore.toString());
        localStorage.setItem('mkt_totalQuizAnswered', totalQuizAnswered.toString());
        localStorage.setItem('mkt_totalQuizCorrect', totalQuizCorrect.toString());
        updateDashboard();
    }

    function updateDashboard() {
        const total = questions.length;
        const masteredCount = mastered.size;
        const learningCount = learning.size;
        const newCount = Math.max(0, total - masteredCount - learningCount);
        const studiedCount = masteredCount + learningCount;
        const progressPercentage = Math.round((studiedCount / total) * 100);

        if (dashTotal) dashTotal.textContent = total;
        if (dashMastered) dashMastered.textContent = masteredCount;
        if (dashLearning) dashLearning.textContent = learningCount;
        if (dashNew) dashNew.textContent = newCount;
        if (dashStudiedCount) dashStudiedCount.textContent = studiedCount;
        if (dashProgressPercent) dashProgressPercent.textContent = `${progressPercentage}%`;
        if (dashProgressBar) dashProgressBar.style.width = `${progressPercentage}%`;
    }

    function switchSection(targetSectionId) {
        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetSectionId);
        });
        menuItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-target') === targetSectionId);
        });

        if (targetSectionId === 'home-section') updateDashboard();
        else if (targetSectionId === 'flashcard-section') initFlashcards();
        else if (targetSectionId === 'wrong-section') renderWrongAnswers();
        else if (targetSectionId === 'stats-section') renderStatistics();
        else if (targetSectionId === 'search-section') {
            searchInput.value = '';
            runSearch();
        }
    }

    // ---------- FLASHCARD FUNCTIONS ----------
    let flashQuestions = [];
    let flashIndex = 0;
    let flashShuffled = false;
    let flashActiveFilter = 'all';
    let originalIndices = [];

    function initFlashcards() {
        // Reset
        if (fcAnswerPanel) fcAnswerPanel.classList.add('hidden');
        if (fcOptionsEl) fcOptionsEl.innerHTML = '';

        if (flashActiveFilter === 'new') {
            flashQuestions = questions.filter(q => !mastered.has(q.id) && !learning.has(q.id));
        } else if (flashActiveFilter === 'learning') {
            flashQuestions = questions.filter(q => learning.has(q.id));
        } else {
            flashQuestions = [...questions];
        }

        flashIndex = 0;
        originalIndices = Array.from({ length: flashQuestions.length }, (_, i) => i);
        if (flashShuffled) shuffle(originalIndices);

        renderFlashcard();
    }

    function renderFlashcard() {
        if (flashQuestions.length === 0) {
            flashcardQuestion.textContent = 'Không có câu hỏi nào trong mục này!';
            flashcardTopic.textContent = '-';
            flashcardCounter.textContent = '0 / 0';
            flashcardProgressBar.style.width = '0%';
            if (fcOptionsEl) fcOptionsEl.innerHTML = '';
            if (fcAnswerPanel) fcAnswerPanel.classList.add('hidden');
            return;
        }

        const actualIndex = originalIndices[flashIndex];
        const q = flashQuestions[actualIndex];

        flashcardTopic.textContent = q.topic;
        flashcardQuestion.textContent = q.question;
        flashcardCounter.textContent = `${flashIndex + 1} / ${flashQuestions.length}`;
        flashcardProgressBar.style.width = `${((flashIndex + 1) / flashQuestions.length) * 100}%`;

        // Hide answer panel
        fcAnswerPanel.classList.add('hidden');
        fcAnswerLabel.className = 'fc-answer-label';
        fcAnswerLabel.textContent = '';
        flashcardAnswer.textContent = '';

        // Build shuffled options (always shuffle in flashcard mode too)
        const opts = [...q.options];
        shuffle(opts);

        fcOptionsEl.innerHTML = '';
        opts.forEach((optText, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const btn = document.createElement('button');
            btn.className = 'fc-opt-btn';
            btn.innerHTML = `<span class="fc-opt-letter">${letter}</span><span>${optText}</span>`;

            btn.addEventListener('click', () => {
                if (btn.disabled) return;

                // Disable all options
                fcOptionsEl.querySelectorAll('.fc-opt-btn').forEach(b => b.disabled = true);

                const isCorrect = optText === q.answer;

                // Highlight selected as correct or wrong
                btn.classList.add(isCorrect ? 'fc-correct' : 'fc-wrong');

                // Highlight actual correct option green
                fcOptionsEl.querySelectorAll('.fc-opt-btn').forEach(b => {
                    const bText = b.querySelector('span:last-child').textContent;
                    if (bText === q.answer) b.classList.add('fc-correct');
                });

                // Show answer panel
                fcAnswerLabel.textContent = isCorrect ? '✅ ĐÁP ÁN CHÍNH XÁC!' : '❌ SAI RỒI! Đáp án đúng là:';
                fcAnswerLabel.className = 'fc-answer-label ' + (isCorrect ? 'is-correct' : 'is-wrong');
                flashcardAnswer.textContent = q.answer;
                fcAnswerPanel.classList.remove('hidden');

                // Track learning state based on answer
                if (!isCorrect) {
                    learning.add(q.id);
                    mastered.delete(q.id);
                    saveState();
                }
            });

            fcOptionsEl.appendChild(btn);
        });
    }

    function handleFlashNext() {
        if (flashQuestions.length === 0) return;
        flashIndex = (flashIndex + 1) % flashQuestions.length;
        renderFlashcard();
    }

    function handleFlashPrev() {
        if (flashQuestions.length === 0) return;
        flashIndex = (flashIndex - 1 + flashQuestions.length) % flashQuestions.length;
        renderFlashcard();
    }

    function setFlashcardFilter(filterName) {
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filterName);
        });
        flashActiveFilter = filterName;
        initFlashcards();
    }

    // ---------- QUIZ FUNCTIONS ----------
    let quizQuestions = [];
    let quizIndex = 0;
    let quizScore = 0;
    let quizSize = 20;
    let isQuizRandomQ = true;
    let isQuizRandomA = true;
    let selectedOptionText = null;
    let isWrongReviewQuiz = false;

    function initQuizSession() {
        quizIndex = 0;
        quizScore = 0;
        selectedOptionText = null;

        quizSetupView.classList.add('hidden');
        quizPlayingView.classList.remove('hidden');
        quizResultView.classList.add('hidden');

        loadQuizQuestion();
    }

    function loadQuizQuestion() {
        selectedOptionText = null;
        quizFeedback.classList.add('hidden');
        quizFeedback.innerHTML = '';
        quizNextBtn.classList.add('hidden');
        quizSubmitBtn.classList.remove('hidden');
        quizSubmitBtn.disabled = true;

        const q = quizQuestions[quizIndex];
        quizTopic.textContent = q.topic;
        quizCounter.textContent = `Câu ${quizIndex + 1} / ${quizQuestions.length}`;
        quizProgressBar.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
        quizQuestion.textContent = q.question;

        quizOptions.innerHTML = '';
        let opts = [...q.options];
        if (isQuizRandomA) shuffle(opts);

        opts.forEach((optText, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.innerHTML = `<span class="quiz-opt-letter">${letter}</span><span class="quiz-opt-text">${optText}</span>`;
            btn.addEventListener('click', () => {
                if (!quizFeedback.classList.contains('hidden')) return;
                document.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedOptionText = optText;
                quizSubmitBtn.disabled = false;
            });
            quizOptions.appendChild(btn);
        });
    }

    function showQuizResults() {
        quizPlayingView.classList.add('hidden');
        quizResultView.classList.remove('hidden');

        const pct = Math.round((quizScore / quizQuestions.length) * 100);
        resultPercent.textContent = `${pct}%`;
        resultCorrect.textContent = quizScore;
        resultWrong.textContent = quizQuestions.length - quizScore;

        if (pct > bestScore) {
            bestScore = pct;
            saveState();
        }
    }

    // ---------- WRONG ANSWERS FUNCTIONS ----------
    function renderWrongAnswers() {
        wrongList.innerHTML = '';

        if (wrongAnswers.length === 0) {
            wrongList.innerHTML = '<div class="card" style="text-align:center;color:var(--text-muted);padding:40px;">🎉 Danh sách câu sai trống! Bạn đã nắm vững các câu hỏi.</div>';
            wrongActionsBar.style.display = 'none';
            return;
        }

        wrongActionsBar.style.display = 'flex';

        wrongAnswers.forEach(item => {
            const card = document.createElement('div');
            card.className = 'wrong-item-card';
            card.innerHTML = `
                <div class="wrong-item-header">
                    <span class="topic-tag">${item.topic}</span>
                    <button class="btn btn-outline-wrong btn-sm remove-wrong-btn" data-id="${item.id}" style="font-size:13px;padding:6px 12px;">
                        <i class="fa-solid fa-trash-can"></i> Xóa
                    </button>
                </div>
                <div class="wrong-item-q">${item.question}</div>
                <div class="wrong-item-details">
                    <div>Lựa chọn của bạn:<div class="wrong-item-answer user-selection">${item.userAnswer}</div></div>
                    <div>Đáp án chính xác:<div class="wrong-item-answer correct-val">${item.correctAnswer}</div></div>
                </div>`;

            card.querySelector('.remove-wrong-btn').addEventListener('click', e => {
                e.stopPropagation();
                wrongAnswers = wrongAnswers.filter(w => w.id !== item.id);
                saveState();
                renderWrongAnswers();
            });

            wrongList.appendChild(card);
        });
    }

    // ---------- SEARCH FUNCTION ----------
    function runSearch() {
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';

        if (!query) {
            searchCount.textContent = '0';
            searchResults.innerHTML = '<div class="card" style="text-align:center;color:var(--text-muted);padding:30px;">Gõ từ khóa để tra cứu câu hỏi...</div>';
            return;
        }

        const matches = questions.filter(q =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query) ||
            q.topic.toLowerCase().includes(query) ||
            q.options.some(o => o.toLowerCase().includes(query))
        );

        searchCount.textContent = matches.length;

        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="card" style="text-align:center;color:var(--text-muted);padding:30px;">Không tìm thấy câu hỏi phù hợp.</div>';
            return;
        }

        matches.forEach(q => {
            const card = document.createElement('div');
            card.className = 'search-item-card';
            const optsHtml = q.options.map(opt => {
                const isCor = opt === q.answer;
                return `<div class="search-item-opt ${isCor ? 'is-correct' : ''}">${isCor ? '✅ ' : ''}${opt}</div>`;
            }).join('');
            card.innerHTML = `
                <div class="search-item-header">
                    <span class="topic-tag">${q.topic}</span>
                    <span class="counter-tag">Q${String(q.id).padStart(3,'0')}</span>
                </div>
                <div class="search-item-q">${q.question}</div>
                <div class="search-item-options">${optsHtml}</div>`;
            searchResults.appendChild(card);
        });
    }

    // ---------- STATISTICS FUNCTION ----------
    function renderStatistics() {
        const total = questions.length;
        const masteredCount = mastered.size;
        const learningCount = learning.size;
        const newCount = Math.max(0, total - masteredCount - learningCount);
        const studiedCount = masteredCount + learningCount;

        statsMastered.textContent = masteredCount;
        statsLearning.textContent = learningCount;
        statsNew.textContent = newCount;
        statsStudied.textContent = studiedCount;
        statsBestScore.textContent = `${Math.round(bestScore)}%`;

        const coverage = Math.round((studiedCount / total) * 100);
        statsCoveragePercent.textContent = `${coverage}%`;
        statsCoverageBar.style.width = `${coverage}%`;

        const accuracy = totalQuizAnswered > 0 ? Math.round((totalQuizCorrect / totalQuizAnswered) * 100) : 0;
        statsAccuracyPercent.textContent = `${accuracy}%`;
        statsAccuracyBar.style.width = `${accuracy}%`;

        statsTopicsList.innerHTML = '';
        const topicData = {};
        questions.forEach(q => {
            if (!topicData[q.topic]) topicData[q.topic] = { total: 0, mastered: 0 };
            topicData[q.topic].total++;
            if (mastered.has(q.id)) topicData[q.topic].mastered++;
        });

        for (const [name, data] of Object.entries(topicData)) {
            const pct = Math.round((data.mastered / data.total) * 100) || 0;
            const row = document.createElement('div');
            row.className = 'topic-row';
            row.innerHTML = `
                <div class="topic-row-info">
                    <span class="topic-name">${name}</span>
                    <span class="topic-percent">${pct}% (${data.mastered}/${data.total})</span>
                </div>
                <div class="topic-bar-container">
                    <div class="topic-bar-fill" style="width:${pct}%"></div>
                </div>`;
            statsTopicsList.appendChild(row);
        }
    }

    // -----------------------------------------
    // 3. STATE INITIALIZATION (after functions defined)
    // -----------------------------------------
    let mastered = new Set(JSON.parse(localStorage.getItem('mkt_mastered') || '[]'));
    let learning = new Set(JSON.parse(localStorage.getItem('mkt_learning') || '[]'));
    let wrongAnswers = JSON.parse(localStorage.getItem('mkt_wrongAnswers') || '[]');
    let bestScore = parseFloat(localStorage.getItem('mkt_bestScore') || '0');
    let totalQuizAnswered = parseInt(localStorage.getItem('mkt_totalQuizAnswered') || '0');
    let totalQuizCorrect = parseInt(localStorage.getItem('mkt_totalQuizCorrect') || '0');

    // Apply saved theme
    const savedTheme = localStorage.getItem('mkt_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    } else {
        updateThemeIcons(false);
    }

    // Initial dashboard render
    updateDashboard();

    // -----------------------------------------
    // 4. EVENT LISTENERS
    // -----------------------------------------

    // --- Navigation ---
    menuItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            switchSection(item.getAttribute('data-target'));
            sidebar.classList.remove('open');
        });
    });

    mobileMenuToggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));

    document.addEventListener('click', e => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !mobileMenuToggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('mkt_theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }
    themeToggleBtn.addEventListener('click', toggleTheme);
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);

    // --- Quick Actions on Home ---
    actionStudyNew.addEventListener('click', () => { switchSection('flashcard-section'); setFlashcardFilter('new'); });
    actionReviewLearning.addEventListener('click', () => { switchSection('flashcard-section'); setFlashcardFilter('learning'); });
    actionPracticeQuiz.addEventListener('click', () => switchSection('quiz-section'));

    // --- Flashcard Events ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => setFlashcardFilter(btn.getAttribute('data-filter')));
    });

    // Đã Nhớ (Mastered)
    btnMemorizeCorrect.addEventListener('click', e => {
        e.stopPropagation();
        if (flashQuestions.length === 0) return;
        const q = flashQuestions[originalIndices[flashIndex]];
        mastered.add(q.id);
        learning.delete(q.id);
        saveState();
        handleFlashNext();
    });

    // Chưa Nhớ (Still Learning)
    btnMemorizeWrong.addEventListener('click', e => {
        e.stopPropagation();
        if (flashQuestions.length === 0) return;
        const q = flashQuestions[originalIndices[flashIndex]];
        learning.add(q.id);
        mastered.delete(q.id);
        saveState();
        handleFlashNext();
    });

    flashNextBtn.addEventListener('click', handleFlashNext);
    flashPrevBtn.addEventListener('click', handleFlashPrev);

    flashShuffleBtn.addEventListener('click', () => {
        flashShuffled = !flashShuffled;
        flashShuffleBtn.classList.toggle('active', flashShuffled);
        if (flashShuffled) {
            shuffle(originalIndices);
        } else {
            originalIndices = Array.from({ length: flashQuestions.length }, (_, i) => i);
        }
        flashIndex = 0;
        renderFlashcard();
    });

    // --- Quiz Events ---
    startQuizBtn.addEventListener('click', () => {
        const countVal = quizCountSelect.value;
        isQuizRandomQ = quizRandomQCheckbox.checked;
        isQuizRandomA = quizRandomACheckbox.checked;
        isWrongReviewQuiz = false;

        let source = [...questions];
        if (isQuizRandomQ) shuffle(source);

        quizSize = countVal === 'all' ? source.length : Math.min(parseInt(countVal), source.length);
        quizQuestions = source.slice(0, quizSize);
        initQuizSession();
    });

    quizSubmitBtn.addEventListener('click', () => {
        if (!selectedOptionText) return;
        const q = quizQuestions[quizIndex];
        const isCorrect = selectedOptionText === q.answer;

        totalQuizAnswered++;
        if (isCorrect) { totalQuizCorrect++; quizScore++; }

        document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
            const txt = btn.querySelector('.quiz-opt-text').textContent;
            if (txt === q.answer) btn.classList.add('correct-reveal');
            else if (txt === selectedOptionText && !isCorrect) btn.classList.add('wrong-reveal');
        });

        quizFeedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'wrong');
        quizFeedback.innerHTML = isCorrect
            ? '<i class="fa-solid fa-circle-check"></i> ĐÁP ÁN CHÍNH XÁC!'
            : `<i class="fa-solid fa-circle-xmark"></i> SAI! Đáp án đúng: <strong>${q.answer}</strong>`;
        quizFeedback.classList.remove('hidden');

        if (!isCorrect) {
            const existing = wrongAnswers.findIndex(w => w.id === q.id);
            if (existing >= 0) {
                wrongAnswers[existing].userAnswer = selectedOptionText;
            } else {
                wrongAnswers.push({
                    id: q.id, topic: q.topic, question: q.question,
                    options: q.options, userAnswer: selectedOptionText,
                    correctAnswer: q.answer, timestamp: Date.now()
                });
            }
        } else if (isWrongReviewQuiz) {
            wrongAnswers = wrongAnswers.filter(w => w.id !== q.id);
        }

        saveState();
        quizSubmitBtn.classList.add('hidden');
        quizNextBtn.classList.remove('hidden');
    });

    quizNextBtn.addEventListener('click', () => {
        quizIndex++;
        if (quizIndex < quizQuestions.length) loadQuizQuestion();
        else showQuizResults();
    });

    btnQuizRetry.addEventListener('click', initQuizSession);
    btnQuizReviewWrong.addEventListener('click', () => switchSection('wrong-section'));
    btnQuizHome.addEventListener('click', () => {
        quizSetupView.classList.remove('hidden');
        quizPlayingView.classList.add('hidden');
        quizResultView.classList.add('hidden');
        switchSection('home-section');
    });

    // --- Wrong Answers Events ---
    btnWrongClear.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách câu sai?')) {
            wrongAnswers = [];
            saveState();
            renderWrongAnswers();
        }
    });

    btnWrongRetry.addEventListener('click', () => {
        if (wrongAnswers.length === 0) return;
        isWrongReviewQuiz = true;
        isQuizRandomQ = true;
        isQuizRandomA = true;

        quizQuestions = wrongAnswers.map(item => {
            return questions.find(q => q.id === item.id) || {
                id: item.id, topic: item.topic, question: item.question,
                options: item.options, answer: item.correctAnswer
            };
        });
        shuffle(quizQuestions);
        switchSection('quiz-section');
        initQuizSession();
    });

    // --- Search Events ---
    searchInput.addEventListener('input', runSearch);
});
