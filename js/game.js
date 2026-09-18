/**
 * STORY MAP ENGINE: HÀNH TRÌNH TƯ TƯỞNG CỦA BÁC
 * Thiết kế Story Map uốn lượn liên tục - Hoàn toàn không dùng Card
 * Đường uốn lượn SVG kết nối các điểm mốc lịch sử tự nhiên trên bản đồ
 * Tích hợp trọn bộ 27 câu hỏi trắc nghiệm chia đều cho 9 mốc (3 câu / mốc)
 */

class StoryMapEngine {
  constructor() {
    this.stages = this.loadStagesData();
    this.finale = this.loadFinaleData();
    this.currentStageId = parseInt(localStorage.getItem('hcm_current_stage') || '1', 10);
    this.unlockedStages = new Set(JSON.parse(localStorage.getItem('hcm_unlocked_stages') || '[]'));

    if (this.currentStageId < 1 || this.currentStageId > 9) {
      this.currentStageId = 1;
    }

    this.activeQuizStage = null;
    this.activeQuestionIndex = 0;
    this.isReviewMode = false;

    this.editorCurrentStageId = 1;
    this.editorCurrentQuestionIdx = 0;

    this.initDOM();
    this.bindEvents();
    this.render();

    // Lắng nghe thay đổi kích thước cửa sổ để vẽ lại đường uốn lượn
    window.addEventListener('resize', () => {
      this.drawStoryRoad();
    });

    // Vẽ lại đường sau khi các ảnh đã tải xong
    window.addEventListener('load', () => {
      this.drawStoryRoad();
    });
  }

  loadStagesData() {
    const version = localStorage.getItem('hcm_data_version');
    if (version !== HCM_DATA_VERSION) {
      localStorage.setItem('hcm_data_version', HCM_DATA_VERSION);
      localStorage.removeItem('hcm_custom_stages_data');
      localStorage.removeItem('hcm_custom_finale_data');
      return JSON.parse(JSON.stringify(DEFAULT_STAGES_DATA));
    }

    const saved = localStorage.getItem('hcm_custom_stages_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].questions) {
          return parsed;
        }
      } catch (e) {
        console.error("Lỗi đọc dữ liệu đã lưu, dùng mặc định", e);
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_STAGES_DATA));
  }

  loadFinaleData() {
    const saved = localStorage.getItem('hcm_custom_finale_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.questions) {
          return parsed;
        }
      } catch (e) {
        console.error("Lỗi đọc dữ liệu finale đã lưu, dùng mặc định", e);
      }
    }
    return JSON.parse(JSON.stringify(FINALE_DATA));
  }

  saveStagesData() {
    localStorage.setItem('hcm_data_version', HCM_DATA_VERSION);
    localStorage.setItem('hcm_custom_stages_data', JSON.stringify(this.stages));
    localStorage.setItem('hcm_custom_finale_data', JSON.stringify(this.finale));
  }

  saveGameState() {
    localStorage.setItem('hcm_current_stage', this.currentStageId);
    localStorage.setItem('hcm_unlocked_stages', JSON.stringify([...this.unlockedStages]));
  }

  initDOM() {
    // Top bar
    this.storyProgressFill = document.getElementById('storyProgressFill');
    this.storyProgressText = document.getElementById('storyProgressText');
    this.btnSoundToggle = document.getElementById('btnSoundToggle');
    this.btnOpenEditor = document.getElementById('btnOpenEditor');
    this.btnViewReference = document.getElementById('btnViewReference');
    this.btnResetProgress = document.getElementById('btnResetProgress');

    // SVG Canvas
    this.posterCanvas = document.getElementById('posterCanvas');
    this.storyRoadSvg = document.getElementById('storyRoadSvg');
    this.roadTrailsGroup = document.getElementById('roadTrailsGroup');
    this.roadFootstepsGroup = document.getElementById('roadFootstepsGroup');

    // Quiz modal
    this.quizModal = document.getElementById('quizModal');
    this.btnCloseQuiz = document.getElementById('btnCloseQuiz');
    this.quizBadge = document.getElementById('quizBadge');
    this.quizQuestionStepper = document.getElementById('quizQuestionStepper');
    this.quizHeaderTitle = document.getElementById('quizHeaderTitle');
    this.quizStagePhoto = document.getElementById('quizStagePhoto');
    this.quizQuestionContent = document.getElementById('quizQuestionContent');
    this.quizOptionsContainer = document.getElementById('quizOptionsContainer');
    this.quizFeedbackBox = document.getElementById('quizFeedbackBox');
    this.feedbackTitleText = document.getElementById('feedbackTitleText');
    this.feedbackDetailText = document.getElementById('feedbackDetailText');
    this.quizReviewNav = document.getElementById('quizReviewNav');
    this.btnPrevQuestion = document.getElementById('btnPrevQuestion');
    this.btnReviewNextQuestion = document.getElementById('btnReviewNextQuestion');
    this.btnNextQuestion = document.getElementById('btnNextQuestion');
    this.btnProceedUnlocked = document.getElementById('btnProceedUnlocked');

    // Finale modal
    this.finaleModal = document.getElementById('finaleModal');
    this.btnCloseFinale = document.getElementById('btnCloseFinale');
    this.btnReplayFinale = document.getElementById('btnReplayFinale');
    this.btnCloseFinaleAction = document.getElementById('btnCloseFinaleAction');

    // Reference modal
    this.referenceModal = document.getElementById('referenceModal');
    this.btnCloseReference = document.getElementById('btnCloseReference');

    // Editor modal
    this.editorModal = document.getElementById('editorModal');
    this.btnCloseEditor = document.getElementById('btnCloseEditor');
    this.editorTabsBar = document.getElementById('editorTabsBar');
    this.editorQuestionTabsBar = document.getElementById('editorQuestionTabsBar');
    this.editQuestionInput = document.getElementById('editQuestionInput');
    this.editOpt0 = document.getElementById('editOpt0');
    this.editOpt1 = document.getElementById('editOpt1');
    this.editOpt2 = document.getElementById('editOpt2');
    this.editOpt3 = document.getElementById('editOpt3');
    this.editCorrectSelect = document.getElementById('editCorrectSelect');
    this.editExplainInput = document.getElementById('editExplainInput');
    this.btnSaveQuestion = document.getElementById('btnSaveQuestion');
    this.btnExportJSON = document.getElementById('btnExportJSON');
    this.btnImportJSON = document.getElementById('btnImportJSON');
    this.jsonFileInput = document.getElementById('jsonFileInput');
    this.btnResetDefaultQuestions = document.getElementById('btnResetDefaultQuestions');
  }

  bindEvents() {
    // Âm thanh
    this.btnSoundToggle.addEventListener('click', () => {
      const enabled = window.soundSystem.toggleSound();
      this.btnSoundToggle.innerHTML = enabled ? '🔊 Âm thanh' : '🔇 Đã tắt';
      window.soundSystem.playClick();
    });

    // Chơi lại từ đầu
    this.btnResetProgress.addEventListener('click', () => {
      if (confirm("Bạn có muốn chơi lại toàn bộ hành trình từ Chặng 1 không?")) {
        window.soundSystem.playClick();
        this.currentStageId = 1;
        this.unlockedStages.clear();
        this.saveGameState();
        this.render();
      }
    });

    // Mở ảnh tham chiếu gốc
    this.btnViewReference.addEventListener('click', () => {
      window.soundSystem.playClick();
      this.openModal(this.referenceModal);
    });
    this.btnCloseReference.addEventListener('click', () => this.closeModal(this.referenceModal));

    // Đóng modals
    this.btnCloseQuiz.addEventListener('click', () => this.closeModal(this.quizModal));
    this.btnCloseFinale.addEventListener('click', () => this.closeModal(this.finaleModal));
    this.btnCloseFinaleAction.addEventListener('click', () => this.closeModal(this.finaleModal));
    this.btnCloseEditor.addEventListener('click', () => this.closeModal(this.editorModal));

    // Nút chuyển câu hỏi kế tiếp trong chặng
    if (this.btnNextQuestion) {
      this.btnNextQuestion.addEventListener('click', () => {
        window.soundSystem.playClick();
        if (this.activeQuizStage && this.activeQuestionIndex < this.activeQuizStage.questions.length - 1) {
          this.activeQuestionIndex++;
          this.renderQuizQuestion();
        }
      });
    }

    // Nút chuyển câu hỏi khi ở chế độ xem lại (Review)
    if (this.btnPrevQuestion) {
      this.btnPrevQuestion.addEventListener('click', () => {
        window.soundSystem.playClick();
        if (this.activeQuizStage && this.activeQuestionIndex > 0) {
          this.activeQuestionIndex--;
          this.renderQuizQuestion();
        }
      });
    }

    if (this.btnReviewNextQuestion) {
      this.btnReviewNextQuestion.addEventListener('click', () => {
        window.soundSystem.playClick();
        if (this.activeQuizStage && this.activeQuestionIndex < this.activeQuizStage.questions.length - 1) {
          this.activeQuestionIndex++;
          this.renderQuizQuestion();
        }
      });
    }

    // Nút mở khóa và tiến bước
    this.btnProceedUnlocked.addEventListener('click', () => {
      this.closeModal(this.quizModal);
      if (this.unlockedStages.has(9)) {
        this.openFinaleModal();
      } else if (this.currentStageId <= 8 && !this.unlockedStages.has(this.currentStageId)) {
        const nextEl = document.getElementById(`node-${this.currentStageId}`);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (this.currentStageId === 9 && !this.unlockedStages.has(9)) {
        const finaleEl = document.getElementById('node-finale');
        if (finaleEl) {
          finaleEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // Quản lý câu hỏi
    if (this.btnOpenEditor) {
      this.btnOpenEditor.addEventListener('click', () => {
        window.soundSystem.playClick();
        this.openEditorModal();
      });
    }

    this.btnSaveQuestion.addEventListener('click', () => this.saveCurrentEditorQuestion());

    this.btnResetDefaultQuestions.addEventListener('click', () => {
      if (confirm("Khôi phục toàn bộ 27 câu hỏi về trạng thái ban đầu?")) {
        this.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES_DATA));
        this.finale = JSON.parse(JSON.stringify(FINALE_DATA));
        this.saveStagesData();
        this.renderEditorTabs();
        this.renderEditorQuestionTabs();
        this.loadEditorStage(this.editorCurrentStageId, this.editorCurrentQuestionIdx);
        this.render();
        alert("Đã khôi phục thành công toàn bộ 27 câu hỏi mặc định!");
      }
    });

    this.btnExportJSON.addEventListener('click', () => {
      const exportData = {
        version: HCM_DATA_VERSION,
        stages: this.stages,
        finale: this.finale
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = "27_cau_hoi_hanh_trinh_bac_ho.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });

    this.btnImportJSON.addEventListener('click', () => this.jsonFileInput.click());
    this.jsonFileInput.addEventListener('change', (e) => this.handleImportJSON(e));

    this.btnReplayFinale.addEventListener('click', () => {
      this.closeModal(this.finaleModal);
      this.currentStageId = 1;
      this.unlockedStages.clear();
      this.saveGameState();
      this.render();
    });
  }

  render() {
    this.renderTopProgress();
    this.renderAllLandmarks();

    // Sau khi DOM dựng xong, tiến hành vẽ đường uốn lượn SVG
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.drawStoryRoad();
      }, 50);
    });
  }

  renderTopProgress() {
    const totalMilestones = 9;
    const unlockedCount = this.unlockedStages.size;
    const pct = Math.min(100, Math.round((unlockedCount / totalMilestones) * 100));
    this.storyProgressFill.style.width = `${pct}%`;
    const answeredCount = Math.min(27, unlockedCount * 3);
    this.storyProgressText.textContent = `Mốc: ${unlockedCount}/9 • ${answeredCount}/27 câu (${pct}%)`;
  }

  renderAllLandmarks() {
    // 8 Chặng mốc lịch sử
    for (let i = 1; i <= 8; i++) {
      const stage = this.stages.find(s => s.id === i);
      const container = document.getElementById(`node-${i}`);
      if (stage && container) {
        container.innerHTML = '';
        container.appendChild(this.createLandmarkElement(stage));
      }
    }

    // Cột mốc Đích Vinh Quang (Mốc 9 Ngôi sao)
    const finaleContainer = document.getElementById('node-finale');
    if (finaleContainer) {
      finaleContainer.innerHTML = '';
      finaleContainer.appendChild(this.createFinaleElement());
    }
  }

  createLandmarkElement(stage) {
    const isCompleted = this.unlockedStages.has(stage.id);
    const isActive = stage.id === this.currentStageId;

    const el = document.createElement('div');
    el.className = `story-landmark ${isCompleted ? 'is-completed' : (isActive ? 'is-active' : 'is-locked')}`;

    const activeImgSrc = stage.gallery && stage.gallery[0] ? stage.gallery[0].src : stage.mainImage;
    const hasMultiple = stage.gallery && stage.gallery.length > 1;

    let switchTabsHtml = '';
    if (hasMultiple) {
      switchTabsHtml = `
        <div class="polaroid-switch-tabs">
          ${stage.gallery.map((g, idx) => `
            <button class="switch-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
              Ảnh ${idx + 1}
            </button>
          `).join('')}
        </div>
      `;
    }

    el.innerHTML = `
      <!-- KHUNG ẢNH GHIM TRÊN BẢN ĐỒ (KHÔNG CẮT MẶT BÁC) -->
      <div class="landmark-photo-wrap">
        <div class="stage-number-badge">${stage.id}</div>
        <div class="tape-sticky-tag">${stage.stickyTag || stage.locationTag}</div>
        
        <div class="landmark-photo-canvas" title="Bấm vào ảnh để trả lời câu hỏi">
          <img id="stagePhoto-${stage.id}" src="${activeImgSrc}" alt="${stage.title}">
        </div>

        ${switchTabsHtml}
        <div class="polaroid-active-banner">👣 Bấm trả lời 3 câu!</div>
      </div>

      <!-- NỘI DUNG CHỮ LỊCH SỬ NẰM TỰ NHIÊN TRÊN BẢN ĐỒ -->
      <div class="landmark-title-wrap">
        <div class="landmark-title-text">${stage.title}</div>
        <span class="landmark-period-text">(${stage.period})</span>
      </div>

      <!-- KHI CHƯA MỞ KHÓA -->
      <div class="landmark-lock-notice">
        <span>${isActive ? '👣' : '🔒'}</span>
        <span>${isActive ? 'Chặng đang chờ khám phá! Bấm vào ảnh để trả lời (3 câu) ➔' : 'Chưa mở khóa'}</span>
      </div>

      <!-- KHI ĐÃ MỞ KHÓA: HIỂN THỊ NỘI DUNG VÀ Ô VÀNG NHẬN THỨC -->
      <div class="landmark-story-content">
        <ul class="landmark-bullet-list">
          ${stage.bulletPoints.map(b => `<li>${b}</li>`).join('')}
        </ul>

        <div class="yellow-takeaway-box">
          <strong>${stage.milestoneType}:</strong>
          ${stage.milestoneText}
        </div>

        <div class="landmark-seal-badge">
          ✓ Đã mở khóa (3/3 câu)
        </div>
      </div>
    `;

    // Chuyển ảnh nếu có nhiều ảnh
    if (hasMultiple) {
      const tabBtns = el.querySelectorAll('.switch-tab-btn');
      const imgEl = el.querySelector(`#stagePhoto-${stage.id}`);
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.index, 10);
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (stage.gallery[idx]) {
            imgEl.src = stage.gallery[idx].src;
          }
        });
      });
    }

    // Click mở quiz
    el.addEventListener('click', () => {
      this.handleStageClick(stage);
    });

    return el;
  }

  createFinaleElement() {
    const allStagesDone = this.stages.every(s => this.unlockedStages.has(s.id));
    const finaleDone = this.unlockedStages.has(9);
    const isActive = allStagesDone && !finaleDone;

    const el = document.createElement('div');
    el.className = `finale-landmark-wrap ${finaleDone ? 'is-completed' : (isActive ? 'is-active' : 'is-locked')}`;

    let borderStyle = 'opacity: 0.78;';
    let btnText = '🔒 Hoàn thành 8 chặng trước';
    let btnClass = 'nav-btn';

    if (finaleDone) {
      borderStyle = 'border-color: #ffd700; box-shadow: 0 0 25px rgba(255, 215, 0, 0.75);';
      btnText = '🏆 Đích Toàn Thắng (Xem Lại)';
      btnClass = 'nav-btn btn-accent';
    } else if (isActive) {
      borderStyle = 'border-color: #e5a93b; box-shadow: 0 0 20px rgba(229, 169, 59, 0.6);';
      btnText = '🌟 Mốc 9: Giải đố 3 câu cuối! ➔';
      btnClass = 'nav-btn btn-accent';
    }

    el.innerHTML = `
      <div class="landmark-photo-wrap">
        <div class="stage-number-badge" style="background: #ffd700; color: #8b181b; border: 2px solid #8b181b; font-weight: 900;">★</div>
        <div class="tape-sticky-tag" style="background: #ffd700; color: #8b181b; font-weight: 800;">Mốc 9 Ngôi Sao</div>
        <div class="finale-art-canvas" style="${borderStyle}">
          <img src="finale_badge_art.png" alt="Hình thành và phát triển hệ thống tư tưởng Hồ Chí Minh">
        </div>
        ${isActive ? '<div class="polaroid-active-banner" style="display: block;">🌟 Mốc 9: Bấm giải đố 3 câu!</div>' : ''}
      </div>
      <div style="text-align: center; margin-top: 6px;">
        <button class="${btnClass}" style="pointer-events: none; border-color: #ffd700; font-size: 0.8rem; font-weight: 700;">
          ${btnText}
        </button>
      </div>
    `;

    el.addEventListener('click', () => {
      if (finaleDone) {
        window.soundSystem.playClick();
        this.openFinaleModal();
      } else if (isActive) {
        window.soundSystem.playFootstep();
        this.openQuizModal(this.finale, false);
      } else {
        window.soundSystem.playClick();
        alert(`Bạn đã hoàn thành ${this.unlockedStages.size}/8 chặng. Hãy giải đố tại Chặng ${this.currentStageId} để mở khóa Mốc 9 Ngôi Sao nhé!`);
      }
    });

    return el;
  }

  // =========================================================
  // VẼ ĐƯỜNG UỐN LƯỢN SVG & DẤU CHÂN NỐI TIẾP (WINDING STORY ROAD)
  // =========================================================
  drawStoryRoad() {
    const svg = this.storyRoadSvg;
    const trailsGroup = this.roadTrailsGroup;
    const footstepsGroup = this.roadFootstepsGroup;
    const canvas = this.posterCanvas;
    if (!svg || !trailsGroup || !footstepsGroup || !canvas) return;

    trailsGroup.innerHTML = '';
    footstepsGroup.innerHTML = '';

    const canvasRect = canvas.getBoundingClientRect();
    const nodeCenters = [];

    // Lấy tọa độ tâm ảnh của 8 chặng
    for (let i = 1; i <= 8; i++) {
      const el = document.getElementById(`node-${i}`);
      if (el) {
        const photoEl = el.querySelector('.landmark-photo-canvas') || el;
        const pRect = photoEl.getBoundingClientRect();
        nodeCenters[i] = {
          x: pRect.left + pRect.width / 2 - canvasRect.left,
          y: pRect.top + pRect.height / 2 - canvasRect.top,
          left: pRect.left - canvasRect.left,
          right: pRect.right - canvasRect.left,
          top: pRect.top - canvasRect.top,
          bottom: pRect.bottom - canvasRect.top,
          width: pRect.width,
          height: pRect.height
        };
      }
    }

    // Lấy tọa độ của mốc Đích (node 9)
    const finaleEl = document.getElementById('node-finale');
    if (finaleEl) {
      const photoEl = finaleEl.querySelector('.finale-art-canvas') || finaleEl;
      const pRect = photoEl.getBoundingClientRect();
      nodeCenters[9] = {
        x: pRect.left + pRect.width / 2 - canvasRect.left,
        y: pRect.top + pRect.height / 2 - canvasRect.top,
        left: pRect.left - canvasRect.left,
        right: pRect.right - canvasRect.left,
        top: pRect.top - canvasRect.top,
        bottom: pRect.bottom - canvasRect.top,
        width: pRect.width,
        height: pRect.height
      };
    }

    if (!nodeCenters[1] || !nodeCenters[2] || !nodeCenters[3] || !nodeCenters[4]) return;

    // Định nghĩa 8 đoạn đường cong uốn lượn liên tục theo hình chữ S
    const segments = [
      // 1 -> 2: Sang phải
      {
        from: 1,
        to: 2,
        d: `M ${nodeCenters[1].right + 4} ${nodeCenters[1].y} L ${nodeCenters[2].left - 4} ${nodeCenters[2].y}`,
        unlocked: this.unlockedStages.has(1),
        active: this.currentStageId === 2
      },
      // 2 -> 3: Sang phải
      {
        from: 2,
        to: 3,
        d: `M ${nodeCenters[2].right + 4} ${nodeCenters[2].y} L ${nodeCenters[3].left - 4} ${nodeCenters[3].y}`,
        unlocked: this.unlockedStages.has(2),
        active: this.currentStageId === 3
      },
      // 3 -> 4: Đoạn uốn cong chữ S bên phải (vòng ra biên phải rồi xuống chặng 4)
      {
        from: 3,
        to: 4,
        d: `M ${nodeCenters[3].right + 4} ${nodeCenters[3].y} 
            C ${Math.min(canvasRect.width - 15, nodeCenters[3].right + 90)} ${nodeCenters[3].y + 30}, 
              ${Math.min(canvasRect.width - 15, nodeCenters[4].right + 90)} ${nodeCenters[4].y - 30}, 
              ${nodeCenters[4].right + 4} ${nodeCenters[4].y}`,
        unlocked: this.unlockedStages.has(3),
        active: this.currentStageId === 4
      },
      // 4 -> 5: Sang trái
      {
        from: 4,
        to: 5,
        d: `M ${nodeCenters[4].left - 4} ${nodeCenters[4].y} L ${nodeCenters[5].right + 4} ${nodeCenters[5].y}`,
        unlocked: this.unlockedStages.has(4),
        active: this.currentStageId === 5
      },
      // 5 -> 6: Sang trái
      {
        from: 5,
        to: 6,
        d: `M ${nodeCenters[5].left - 4} ${nodeCenters[5].y} L ${nodeCenters[6].right + 4} ${nodeCenters[6].y}`,
        unlocked: this.unlockedStages.has(5),
        active: this.currentStageId === 6
      },
      // 6 -> 7: Đoạn uốn cong chữ S bên trái (vòng ra biên trái rồi xuống chặng 7)
      {
        from: 6,
        to: 7,
        d: `M ${nodeCenters[6].left - 4} ${nodeCenters[6].y} 
            C ${Math.max(15, nodeCenters[6].left - 90)} ${nodeCenters[6].y + 30}, 
              ${Math.max(15, nodeCenters[7].left - 90)} ${nodeCenters[7].y - 30}, 
              ${nodeCenters[7].left - 4} ${nodeCenters[7].y}`,
        unlocked: this.unlockedStages.has(6),
        active: this.currentStageId === 7
      },
      // 7 -> 8: Sang phải
      {
        from: 7,
        to: 8,
        d: `M ${nodeCenters[7].right + 4} ${nodeCenters[7].y} L ${nodeCenters[8].left - 4} ${nodeCenters[8].y}`,
        unlocked: this.unlockedStages.has(7),
        active: this.currentStageId === 8
      },
      // 8 -> Finale (9): Sang phải
      {
        from: 8,
        to: 9,
        d: `M ${nodeCenters[8].right + 4} ${nodeCenters[8].y} L ${nodeCenters[9].left - 4} ${nodeCenters[9].y}`,
        unlocked: this.unlockedStages.has(9),
        active: this.unlockedStages.has(8) && !this.unlockedStages.has(9)
      }
    ];

    segments.forEach(seg => {
      // 1. Vẽ đường nét đứt (Dashed road line)
      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", seg.d);
      pathEl.setAttribute("fill", "none");
      pathEl.setAttribute("stroke", seg.unlocked ? "#8b181b" : (seg.active ? "#c2953b" : "#cfbc9e"));
      pathEl.setAttribute("stroke-width", seg.unlocked || seg.active ? "2.5" : "1.8");
      pathEl.setAttribute("stroke-dasharray", "8, 8");
      pathEl.setAttribute("stroke-linecap", "round");
      pathEl.setAttribute("opacity", seg.unlocked || seg.active ? "0.9" : "0.4");
      trailsGroup.appendChild(pathEl);

      // 2. Vẽ các dấu chân dọc theo đường cong (Footsteps along curve)
      const len = pathEl.getTotalLength();
      if (len > 30) {
        const stepDist = 36;
        const count = Math.floor(len / stepDist);
        const startOffset = (len - (count - 1) * stepDist) / 2;

        for (let k = 0; k < count; k++) {
          const d = startOffset + k * stepDist;
          const pt = pathEl.getPointAtLength(d);
          const ptNext = pathEl.getPointAtLength(Math.min(len, d + 2));
          const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

          const isRightFoot = k % 2 === 1;
          const yOff = isRightFoot ? 4 : -4;
          const color = seg.unlocked ? "#4a2511" : (seg.active ? "#8b181b" : "#b09c85");

          const gStep = document.createElementNS("http://www.w3.org/2000/svg", "g");
          gStep.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle}) scale(0.68)`);
          gStep.setAttribute("class", `road-step ${seg.unlocked ? 'is-unlocked' : (seg.active ? 'is-active' : 'is-locked')}`);

          gStep.innerHTML = `
            <ellipse cx="0" cy="${yOff}" rx="6.5" ry="3.8" fill="${color}" />
            <circle cx="-5" cy="${yOff}" r="2.8" fill="${color}" />
            <circle cx="6.5" cy="${yOff - 2.8}" r="1.2" fill="${color}" />
            <circle cx="7.5" cy="${yOff - 1}" r="1.1" fill="${color}" />
            <circle cx="7.5" cy="${yOff + 0.6}" r="1" fill="${color}" />
            <circle cx="7" cy="${yOff + 2}" r="0.9" fill="${color}" />
            <circle cx="6" cy="${yOff + 3.2}" r="0.8" fill="${color}" />
          `;

          footstepsGroup.appendChild(gStep);
        }
      }
    });
  }

  handleStageClick(stage) {
    window.soundSystem.playClick();

    if (this.unlockedStages.has(stage.id)) {
      this.openQuizModal(stage, true, 0);
    } else if (stage.id === this.currentStageId) {
      window.soundSystem.playFootstep();
      this.openQuizModal(stage, false, 0);
    } else {
      alert(`Chặng ${stage.id} chưa mở khóa! Bạn hãy trả lời câu hỏi tại Chặng ${this.currentStageId} trước nhé.`);
    }
  }

  // =========================================================
  // QUIZ ENGINE (HỖ TRỢ 3 CÂU / MỐC & REVIEW MODE)
  // =========================================================
  openQuizModal(stage, isReviewMode = false, questionIdx = 0) {
    this.activeQuizStage = stage;
    this.isReviewMode = isReviewMode;
    this.activeQuestionIndex = questionIdx;

    const stageNumberStr = stage.id === 9 ? "Mốc 9 (Ngôi Sao)" : `Chặng ${stage.id}/9`;
    this.quizBadge.textContent = `${stageNumberStr} • ${stage.period || ''}`;
    this.quizHeaderTitle.textContent = stage.title;
    this.quizStagePhoto.src = stage.gallery && stage.gallery[0] ? stage.gallery[0].src : stage.mainImage;

    this.renderQuizQuestion();
    this.openModal(this.quizModal);
  }

  renderQuizQuestion() {
    const stage = this.activeQuizStage;
    if (!stage || !stage.questions) return;
    const qIndex = this.activeQuestionIndex;
    const q = stage.questions[qIndex];
    const total = stage.questions.length;
    const isReview = this.isReviewMode;

    // 1. Render Stepper câu hỏi
    if (this.quizQuestionStepper) {
      this.quizQuestionStepper.innerHTML = '';
      stage.questions.forEach((item, idx) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'stepper-item';
        const qNum = item.questionNumber || ((stage.id - 1) * 3 + idx + 1);

        if (idx === qIndex) {
          stepEl.classList.add('is-active');
          stepEl.innerHTML = `● Câu ${qNum}`;
        } else if (isReview || idx < qIndex) {
          stepEl.classList.add('is-done');
          stepEl.innerHTML = `✓ Câu ${qNum}`;
        } else {
          stepEl.innerHTML = `○ Câu ${qNum}`;
        }

        // Cho phép bấm chuyển câu trực tiếp khi đang xem lại
        if (isReview) {
          stepEl.classList.add('is-clickable');
          stepEl.title = `Xem lại Câu ${qNum}`;
          stepEl.addEventListener('click', () => {
            window.soundSystem.playClick();
            this.activeQuestionIndex = idx;
            this.renderQuizQuestion();
          });
        }

        this.quizQuestionStepper.appendChild(stepEl);
      });
    }

    // 2. Nội dung câu hỏi
    const displayNum = q.questionNumber || ((stage.id - 1) * 3 + qIndex + 1);
    this.quizQuestionContent.innerHTML = `<span style="color: var(--color-red); font-weight: 800;">[Câu ${displayNum} - Phần ${qIndex + 1}/${total}]:</span> ${q.questionText}`;

    // 3. Render 4 lựa chọn A, B, C, D
    this.quizOptionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-answer-btn';
      btn.innerHTML = `
        <div class="answer-letter-circle">${letters[index]}</div>
        <div style="flex: 1;">${optText}</div>
      `;

      if (isReview) {
        if (index === q.correctIndex) {
          btn.classList.add('correct-choice');
        }
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          this.handleQuizAnswer(index, btn);
        });
      }

      this.quizOptionsContainer.appendChild(btn);
    });

    // 4. Feedback box và điều khiển
    this.quizFeedbackBox.className = 'quiz-result-feedback';
    this.btnNextQuestion.style.display = 'none';
    this.btnProceedUnlocked.style.display = 'none';

    if (isReview) {
      this.quizFeedbackBox.className = 'quiz-result-feedback is-correct';
      this.quizFeedbackBox.style.display = 'block';
      this.feedbackTitleText.textContent = `✓ Đáp án đúng: ${letters[q.correctIndex]}`;
      this.feedbackDetailText.textContent = q.explanation;

      if (this.quizReviewNav) {
        this.quizReviewNav.style.display = 'flex';
        this.btnPrevQuestion.disabled = (qIndex === 0);
        this.btnReviewNextQuestion.disabled = (qIndex === total - 1);
      }
    } else {
      this.quizFeedbackBox.style.display = 'none';
      if (this.quizReviewNav) {
        this.quizReviewNav.style.display = 'none';
      }
    }
  }

  handleQuizAnswer(selectedIndex, selectedBtn) {
    const stage = this.activeQuizStage;
    const qIndex = this.activeQuestionIndex;
    const q = stage.questions[qIndex];
    const total = stage.questions.length;
    const allOptionBtns = this.quizOptionsContainer.querySelectorAll('.quiz-answer-btn');

    if (selectedIndex === q.correctIndex) {
      // Đúng!
      window.soundSystem.playCorrect();
      selectedBtn.classList.add('correct-choice');
      allOptionBtns.forEach(btn => btn.disabled = true);

      this.quizFeedbackBox.className = 'quiz-result-feedback is-correct';
      this.quizFeedbackBox.style.display = 'block';
      this.feedbackTitleText.textContent = `🎉 Chính xác! (Câu ${qIndex + 1}/${total})`;
      this.feedbackDetailText.textContent = q.explanation;

      // Cập nhật Stepper item
      const stepItems = this.quizQuestionStepper.querySelectorAll('.stepper-item');
      if (stepItems[qIndex]) {
        stepItems[qIndex].classList.remove('is-active');
        stepItems[qIndex].classList.add('is-done');
        stepItems[qIndex].innerHTML = `✓ Câu ${q.questionNumber || ((stage.id - 1) * 3 + qIndex + 1)}`;
      }

      // Còn câu hỏi tiếp theo trong chặng này không?
      if (qIndex < total - 1) {
        const nextQNum = stage.questions[qIndex + 1].questionNumber || ((stage.id - 1) * 3 + qIndex + 2);
        this.btnNextQuestion.style.display = 'inline-flex';
        this.btnNextQuestion.textContent = `Tiếp tục: Câu ${nextQNum} ➔`;
      } else {
        // Đã hoàn thành tất cả câu hỏi của chặng này!
        this.unlockedStages.add(stage.id);

        if (this.currentStageId === stage.id) {
          this.currentStageId = Math.min(9, stage.id + 1);
        }

        this.saveGameState();
        this.render();

        this.btnProceedUnlocked.style.display = 'inline-flex';
        if (stage.id === 9) {
          this.btnProceedUnlocked.textContent = "🏆 Hoàn thành 27/27 câu - Xem Vinh Danh Toàn Thắng ➔";
        } else if (stage.id === 8) {
          this.btnProceedUnlocked.textContent = "🌟 Tuyệt vời! Tiến tới Mốc 9 (Mốc Ngôi Sao) ➔";
        } else {
          this.btnProceedUnlocked.textContent = `✨ Mở khóa Chặng ${stage.id} & Tiến tới Chặng ${this.currentStageId} ➔`;
        }
      }
    } else {
      // Sai
      window.soundSystem.playWrong();
      selectedBtn.classList.add('wrong-choice');

      this.quizFeedbackBox.className = 'quiz-result-feedback is-wrong';
      this.quizFeedbackBox.style.display = 'block';
      this.feedbackTitleText.textContent = "❌ Chưa chính xác. Hãy suy nghĩ và thử lại!";
      this.feedbackDetailText.textContent = "Hãy đọc kỹ các mốc tư liệu lịch sử liên quan đến giai đoạn này.";

      setTimeout(() => {
        selectedBtn.classList.remove('wrong-choice');
      }, 1200);
    }
  }

  openFinaleModal() {
    window.soundSystem.playVictory();
    this.openModal(this.finaleModal);
    this.triggerConfetti();
  }

  // =========================================================
  // QUIZ EDITOR (CHỈNH SỬA 27 CÂU HỎI QUA 9 MỐC)
  // =========================================================
  openEditorModal() {
    this.renderEditorTabs();
    this.renderEditorQuestionTabs();
    this.loadEditorStage(this.editorCurrentStageId, this.editorCurrentQuestionIdx);
    this.openModal(this.editorModal);
  }

  renderEditorTabs() {
    this.editorTabsBar.innerHTML = '';
    const allStagesList = [...this.stages, this.finale];
    allStagesList.forEach(s => {
      const btn = document.createElement('button');
      btn.className = `nav-btn ${s.id === this.editorCurrentStageId ? 'btn-accent' : ''}`;
      btn.textContent = s.id === 9 ? 'Mốc 9 (★)' : `Chặng ${s.id}`;
      btn.addEventListener('click', () => {
        this.editorCurrentStageId = s.id;
        this.editorCurrentQuestionIdx = 0;
        this.renderEditorTabs();
        this.renderEditorQuestionTabs();
        this.loadEditorStage(s.id, 0);
      });
      this.editorTabsBar.appendChild(btn);
    });
  }

  renderEditorQuestionTabs() {
    if (!this.editorQuestionTabsBar) return;
    this.editorQuestionTabsBar.innerHTML = '';
    const stage = (this.editorCurrentStageId === 9) 
      ? this.finale 
      : this.stages.find(s => s.id === this.editorCurrentStageId);
    if (!stage || !stage.questions) return;

    stage.questions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = `nav-btn ${idx === this.editorCurrentQuestionIdx ? 'btn-accent' : ''}`;
      const qNum = q.questionNumber || ((stage.id - 1) * 3 + idx + 1);
      btn.textContent = `Câu ${qNum} (Phần ${idx + 1})`;
      btn.addEventListener('click', () => {
        this.editorCurrentQuestionIdx = idx;
        this.renderEditorQuestionTabs();
        this.loadEditorStage(this.editorCurrentStageId, idx);
      });
      this.editorQuestionTabsBar.appendChild(btn);
    });
  }

  loadEditorStage(stageId, questionIdx = 0) {
    const stage = (stageId === 9) ? this.finale : this.stages.find(s => s.id === stageId);
    if (!stage || !stage.questions) return;
    const q = stage.questions[questionIdx] || stage.questions[0];

    this.editQuestionInput.value = q.questionText || '';
    this.editOpt0.value = (q.options && q.options[0]) || '';
    this.editOpt1.value = (q.options && q.options[1]) || '';
    this.editOpt2.value = (q.options && q.options[2]) || '';
    this.editOpt3.value = (q.options && q.options[3]) || '';
    this.editCorrectSelect.value = (q.correctIndex !== undefined ? q.correctIndex : 0).toString();
    this.editExplainInput.value = q.explanation || '';
  }

  saveCurrentEditorQuestion() {
    const stage = (this.editorCurrentStageId === 9) ? this.finale : this.stages.find(s => s.id === this.editorCurrentStageId);
    if (!stage || !stage.questions) return;

    const qText = this.editQuestionInput.value.trim();
    const opt0 = this.editOpt0.value.trim();
    const opt1 = this.editOpt1.value.trim();
    const opt2 = this.editOpt2.value.trim();
    const opt3 = this.editOpt3.value.trim();
    const correctIdx = parseInt(this.editCorrectSelect.value, 10);
    const explanation = this.editExplainInput.value.trim();

    if (!qText || !opt0 || !opt1 || !opt2 || !opt3) {
      alert("Vui lòng điền đầy đủ câu hỏi và 4 đáp án!");
      return;
    }

    const qIdx = this.editorCurrentQuestionIdx;
    const qNum = stage.questions[qIdx] ? stage.questions[qIdx].questionNumber : ((stage.id - 1) * 3 + qIdx + 1);

    stage.questions[qIdx] = {
      id: `q${qNum}`,
      questionNumber: qNum,
      questionText: qText,
      options: [opt0, opt1, opt2, opt3],
      correctIndex: correctIdx,
      explanation: explanation
    };

    this.saveStagesData();
    this.render();
    window.soundSystem.playCorrect();
    alert(`Đã lưu thành công Câu ${qNum} của ${stage.id === 9 ? 'Mốc 9' : 'Chặng ' + stage.id}!`);
  }

  handleImportJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.stages && Array.isArray(data.stages)) {
          this.stages = data.stages;
          if (data.finale) this.finale = data.finale;
          this.saveStagesData();
          this.renderEditorTabs();
          this.renderEditorQuestionTabs();
          this.loadEditorStage(this.editorCurrentStageId, 0);
          this.render();
          alert("Đã nhập thành công bộ câu hỏi mới từ tệp JSON!");
        } else if (Array.isArray(data) && data.length > 0) {
          this.stages = data;
          this.saveStagesData();
          this.renderEditorTabs();
          this.renderEditorQuestionTabs();
          this.loadEditorStage(this.editorCurrentStageId, 0);
          this.render();
          alert("Đã nhập thành công bộ câu hỏi mới từ tệp JSON!");
        } else {
          alert("Định dạng file JSON không hợp lệ!");
        }
      } catch (err) {
        alert("Lỗi khi đọc file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  // =========================================================
  // TIỆN ÍCH MODAL & CONFETTI
  // =========================================================
  openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
  }

  triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ffd700', '#a01a1e', '#ffffff', '#2e7d32', '#ff9800'];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 2,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 6
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vrot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (Date.now() - startTime < 4000) {
        animationFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    renderConfetti();
  }
}

// Khởi chạy engine khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  window.storyEngine = new StoryMapEngine();
});
