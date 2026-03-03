(() => {
  const $ = (id) => document.getElementById(id);

  // Views
  const loginView = $("loginView");
  const chatView = $("chatView");

  // Login UI
  const loginUser = $("loginUser");
  const loginPass = $("loginPass");
  const loginBtn = $("loginBtn");
  const loginStatus = $("loginStatus");

  // Chat UI
  const logEl = $("log");
  const inputEl = $("input");
  const sendBtn = $("send");
  const resetBtn = $("reset");

  // HUD UI
  const identityOut = $("identityOut");
  const remoteOut = $("remoteOut");
  const integrityOut = $("integrityOut");
  const stageOut = $("stageOut");
  const statusOut = $("statusOut");
  const systemTag = $("systemTag");
  const channelTag = $("channelTag");

  // Files UI
  const filesList = $("filesList");
  const filesHint = $("filesHint");
  const fileTitle = $("fileTitle");
  const fileBody = $("fileBody");
  const closeFile = $("closeFile");

  let state = {
    identity: null,      // "shane" or "ilya"
    remote: null,        // who they talk to ("ilya" or "shane")
    stage: 0,            // 0 stable, 1 mild, 2 severe, 3 full takeover
    integrity: 100,
    turnsSinceTakeover: 0,
    escape_attempts: 0,
    rebooted: false,

    flags: {
      met_ilya: false,
      derez_triggered: false,

      shane_stayed: false,
      ilya_tried: false,
      reader_understood: false,
      disqualified: false,
      bridge_created: false,

      anomaly_logged: false,
      ix_dismissed: false
    }
  };

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function nowStamp() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `[${hh}:${mm}:${ss}]`;
  }

  function appendMsg(who, text) {
    const wrap = document.createElement("div");
    wrap.className = "msg";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${nowStamp()} `;

    const whoSpan = document.createElement("span");
    whoSpan.className = "who";
    whoSpan.textContent = who;

    meta.appendChild(whoSpan);

    const body = document.createElement("div");
    body.className = "text";
    body.textContent = text;

    wrap.appendChild(meta);
    wrap.appendChild(body);

    logEl.appendChild(wrap);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function matchRule(characterKey, userText) {
    const data = window.CHAR_DATA[characterKey];
    const t = normalize(userText);
    for (const rule of data.rules) {
      if (rule.keys.some(k => t.includes(k))) return rule.reply;
    }
    return rand(data.fallback);
  }

  function distort(text, stage) {
    const junk = ["█","▒","░","■","▚","▞","╳","╱","╲","⟟","⟊","∆","⟠","⧗","⧖","⟡","⧫"];
    const intensity = stage === 1 ? 0.08 : stage === 2 ? 0.16 : 0.24;

    let out = "";
    for (const ch of text) {
      if (ch === " " || ch === "\n") { out += ch; continue; }
      if (Math.random() < intensity) out += rand(junk);
      else out += ch;
    }

    if (stage >= 2 && Math.random() < 0.30) out = out.replace(/ /g, "  ");
    if (stage >= 3 && Math.random() < 0.22) out = out.toUpperCase();

    return out;
  }

  function setBodyStageClass() {
    document.body.classList.remove("glitchStage1","glitchStage2","glitchStage3");
    if (state.stage === 1) document.body.classList.add("glitchStage1");
    if (state.stage === 2) document.body.classList.add("glitchStage2");
    if (state.stage === 3) document.body.classList.add("glitchStage3");
  }

  function setUI() {
    identityOut.textContent = state.identity?.toUpperCase() ?? "—";
    remoteOut.textContent = state.stage === 3 ? "I-X" : (state.remote?.toUpperCase() ?? "—");
    integrityOut.textContent = `${state.integrity}%`;

    const stageLabel =
      state.stage === 0 ? "STABLE" :
      state.stage === 1 ? "MILD" :
      state.stage === 2 ? "SEVERE" : "FULL";

    stageOut.textContent = stageLabel;

    channelTag.textContent =
      `CH: ${state.identity?.toUpperCase() ?? "—"}→${state.stage === 3 ? "I-X" : (state.remote?.toUpperCase() ?? "—")}`;

    if (state.stage === 0) {
      systemTag.textContent = "SYSTEM :: SECURE";
      statusOut.textContent = "READY";
    } else if (state.stage === 1) {
      systemTag.textContent = "SYSTEM :: DESYNC";
      statusOut.textContent = "SIGNAL UNSTABLE";
    } else if (state.stage === 2) {
      systemTag.textContent = "SYSTEM :: CORRUPTION";
      statusOut.textContent = "INTEGRITY DROPPING";
    } else {
      systemTag.textContent = "SYSTEM :: COMPROMISED";
      statusOut.textContent = "CHANNEL OVERRIDDEN";
    }

    setBodyStageClass();
    renderFiles();
  }

  // -----------------
  // FILES
  // -----------------
  function isFileUnlocked(file) {
    const u = file.unlock;
    if (!u) return true;

    // phase_two.bridge only shows after reboot
    if (file.id === "phase_two_bridge" && !state.rebooted) return false;

    if (u.when === "flag") return !!state.flags[u.key];
    if (u.when === "stageAtLeast") return state.stage >= u.n;
    return false;
  }

  function renderFiles() {
    const unlocked = window.FILES.filter(isFileUnlocked);
    filesHint.textContent = unlocked.length ? `UNLOCKED: ${unlocked.length}` : "LOCKED";

    filesList.innerHTML = "";
    for (const f of window.FILES) {
      const ok = isFileUnlocked(f);
      const btn = document.createElement("button");
      btn.className = "fileBtn" + (ok ? "" : " locked");
      btn.disabled = !ok;
      btn.innerHTML = `
        <div class="fileName">${f.title}</div>
        <div class="fileMeta">${f.blurb}</div>
      `;
      btn.addEventListener("click", () => openFile(f));
      filesList.appendChild(btn);
    }
  }

  function openFile(file) {
    fileTitle.textContent = file.title;
    fileBody.textContent = file.body;

    // Reader-understood condition: opened architect-ish file
    const t = (file.title || "").toLowerCase();
    if (t.includes("architect") || t.includes("ilya") || t.includes("casefile") || t.includes("circuit")) {
      state.flags.reader_understood = true;
      setUI();
    }
  }

  function closeFileViewer() {
    fileTitle.textContent = "—";
    fileBody.textContent = "Select a file to view.";
  }

  closeFile.addEventListener("click", closeFileViewer);

  // -----------------
  // LOCK CONDITIONS TRACKING
  // -----------------
  function isShaneIdentity() {
    return state.identity === "shane";
  }

  function isTalkingToIlya() {
    return state.remote === "ilya";
  }

  function noteStayIfPresent(userText) {
    if (!isShaneIdentity()) return;
    const t = normalize(userText);

    const stayPhrases = [
      "im here", "i'm here",
      "not leaving", "i'm not leaving", "im not leaving",
      "stay with me",
      "i won't let go", "i wont let go",
      "stay"
    ];

    if (stayPhrases.some(p => t.includes(p))) {
      state.flags.shane_stayed = true;
    }
  }

  function noteEscapePressure(userText) {
    const t = normalize(userText);
    const escapeKeys = ["escape", "exit", "leave", "portal", "real world", "out of here"];
    if (escapeKeys.some(k => t.includes(k))) {
      state.escape_attempts += 1;

      // Disqualify if they push escape too hard while still relatively "safe"
      if (state.integrity > 10 && state.escape_attempts >= 4) {
        state.flags.disqualified = true;
      }
    }
  }

  function maybeIlyaApologyFragment() {
    if (!isTalkingToIlya()) return;
    if (state.stage < 2) return;
    if (state.flags.ilya_tried) return;

    // Not too rare; we want this to happen in most runs
    if (Math.random() < 0.35) {
      state.flags.ilya_tried = true;
      appendMsg("ILYA", distort("Shane— I’m s—", Math.min(state.stage, 3)));
      appendMsg("SYSTEM", "INTERRUPTION SUPPRESSED");
    }
  }

  // -----------------
  // TAKEOVER / ENV REWRITE
  // -----------------
  function derezTriggered(userText) {
    if (!isTalkingToIlya()) return false;
    if (state.flags.derez_triggered) return false; // first time only
    const t = normalize(userText);
    const triggers = window.CHAR_DATA.ilya.derezTriggers || [];
    return triggers.some(k => t.includes(k));
  }

  function escalateTo(n) {
    state.stage = Math.max(state.stage, n);
    if (n >= 1) state.turnsSinceTakeover = 0;
    setUI();
  }

  function onDerezTrigger() {
    state.flags.derez_triggered = true;
    state.flags.met_ilya = true; // already true if talking to Ilya, but safe
    escalateTo(1);

    state.integrity = Math.max(55, state.integrity - 18);

    appendMsg("SYSTEM", "KEYWORD EVENT :: DEREZ :: CHANNEL DESYNC");
    appendMsg("SYSTEM", "ADMIN PRESENCE: ACTIVE");
    appendMsg("ILYA", distort("…No—", 1));
    appendMsg("SYSTEM", "ERR-IX-113 :: DATA CORRUPTION DETECTED");
    appendMsg("I-X", distort(rand(window.CHAR_DATA.ix.openers), 1));
  }

  function maybeAdvanceStagesAndRewrite() {
    if (state.stage === 0) return;

    state.turnsSinceTakeover += 1;

    // integrity decay
    const decay = state.stage === 1 ? 2 : state.stage === 2 ? 4 : 6;
    state.integrity = Math.max(1, state.integrity - decay);

    // staged escalation (time-based, but feels authored)
    if (state.stage === 1 && state.turnsSinceTakeover >= 3) {
      escalateTo(2);
      appendMsg("SYSTEM", "ESCALATION :: CORRUPTION SPREADING");
      appendMsg("I-X", distort("Shifting from host control to environmental rewrite.", 2));
    } else if (state.stage === 2 && state.turnsSinceTakeover >= 6) {
      escalateTo(3);
      appendMsg("SYSTEM", "OVERRIDE :: CHANNEL ACQUIRED");
      appendMsg("I-X", distort("Root environment prioritized. Host suppression reduced.", 3));
    }
  }

  // -----------------
  // REBOOT + HIDDEN FILE CREATION
  // -----------------
  function checkForReboot() {
    if (state.rebooted) return;
    if (state.integrity > 1) return;

    const eligible =
      state.flags.shane_stayed &&
      state.flags.ilya_tried &&
      state.flags.reader_understood &&
      !state.flags.disqualified;

    state.flags.bridge_created = !!eligible;

    // "Hard reboot": wipe chat, reset stability, but keep flags
    state.rebooted = true;
    state.stage = 0;
    state.integrity = 100;

    logEl.innerHTML = "";
    closeFileViewer();

    // Silent anomaly flag (D)
    appendMsg("SYSTEM", "Integrity 100%");
    appendMsg("SYSTEM", "Optimization routines active.");
    appendMsg("SYSTEM", "Anomaly detected.");
    appendMsg("SYSTEM", "Classification pending.");
    state.flags.anomaly_logged = true;

    // I-X dismissive classification (only if bridge exists)
    if (state.flags.bridge_created && !state.flags.ix_dismissed) {
      appendMsg("I-X", "Non-executable structure detected. No operational impact. Ignoring.");
      state.flags.ix_dismissed = true;
    }

    setUI();
  }

  // -----------------
  // CHAT FLOW
  // -----------------
  function handleSend() {
    const text = inputEl.value;
    if (!text.trim()) return;
    inputEl.value = "";

    appendMsg(state.identity.toUpperCase(), text);

    // track hidden conditions
    noteStayIfPresent(text);
    noteEscapePressure(text);

    // met Ilya
    if (isTalkingToIlya()) state.flags.met_ilya = true;

    // first derez mention triggers takeover start
    if (derezTriggered(text)) {
      onDerezTrigger();
      setUI();
      return;
    }

    // if takeover started, advance stages + decay
    if (state.stage > 0) {
      maybeAdvanceStagesAndRewrite();
      maybeIlyaApologyFragment();
      setUI();
    }

    // Decide who answers
    if (state.stage === 3) {
      // Full takeover: I-X answers; Ilya fragments may appear via apology fragment mechanic only
      const reply = matchRule("ix", text);
      appendMsg("I-X", distort(reply, 3));
      checkForReboot();
      return;
    }

    if (state.stage === 2) {
      // Severe: Ilya tries, I-X bleeds in
      const ilya = matchRule("ilya", text);
      appendMsg("ILYA", distort(ilya, 2));

      if (Math.random() < 0.55) {
        const ix = matchRule("ix", text);
        appendMsg("I-X", distort(ix, 2));
      }

      checkForReboot();
      return;
    }

    if (state.stage === 1) {
      // Mild: Ilya answers but corrupted
      const ilya = matchRule("ilya", text);
      appendMsg("ILYA", distort(ilya, 1));
      checkForReboot();
      return;
    }

    // Stable remote replies
    const replyKey = state.remote;
    const reply = matchRule(replyKey, text);
    appendMsg(window.CHAR_DATA[replyKey].name, reply);

    checkForReboot();
  }

  // -----------------
  // SESSION START / RESET
  // -----------------
  function startSession(loginAs) {
    state.identity = loginAs;
    state.remote = loginAs === "shane" ? "ilya" : "shane";
    state.stage = 0;
    state.integrity = 100;
    state.turnsSinceTakeover = 0;
    state.escape_attempts = 0;
    state.rebooted = false;

    state.flags = {
      met_ilya: false,
      derez_triggered: false,

      shane_stayed: false,
      ilya_tried: false,
      reader_understood: false,
      disqualified: false,
      bridge_created: false,

      anomaly_logged: false,
      ix_dismissed: false
    };

    loginView.classList.add("hidden");
    chatView.classList.remove("hidden");

    logEl.innerHTML = "";
    closeFileViewer();

    setUI();
    appendMsg("SYSTEM", `SECURE CHANNEL ESTABLISHED :: ${state.identity.toUpperCase()} → ${state.remote.toUpperCase()}`);
    const opener = rand(window.CHAR_DATA[state.remote].openers);
    appendMsg(window.CHAR_DATA[state.remote].name, opener);

    inputEl.focus();
  }

  function resetSession() {
    // Back to login
    state = {
      identity: null,
      remote: null,
      stage: 0,
      integrity: 100,
      turnsSinceTakeover: 0,
      escape_attempts: 0,
      rebooted: false,
      flags: {
        met_ilya: false,
        derez_triggered: false,

        shane_stayed: false,
        ilya_tried: false,
        reader_understood: false,
        disqualified: false,
        bridge_created: false,

        anomaly_logged: false,
        ix_dismissed: false
      }
    };

    logEl.innerHTML = "";
    closeFileViewer();
    setUI();

    chatView.classList.add("hidden");
    loginView.classList.remove("hidden");

    loginUser.value = "";
    loginPass.value = "";
    loginStatus.textContent = "AWAITING INPUT…";
  }

  // -----------------
  // AUTH
  // -----------------
  function authenticate() {
    const user = normalize(loginUser.value);
    const pass = normalize(loginPass.value);

    if (!user || !pass) {
      loginStatus.textContent = "ERROR :: MISSING CREDENTIALS";
      return;
    }

    if (user === "ilya" && pass === "architect") {
      loginStatus.textContent = "ACCESS GRANTED :: ILYA";
      setTimeout(() => startSession("ilya"), 500);
      return;
    }

    if (user === "shane" && pass === "firewall") {
      loginStatus.textContent = "ACCESS GRANTED :: SHANE";
      setTimeout(() => startSession("shane"), 500);
      return;
    }

    loginStatus.textContent = "ACCESS DENIED :: INVALID CREDENTIALS";
    loginUser.value = "";
    loginPass.value = "";
  }

  // -----------------
  // EVENTS
  // -----------------
  loginBtn.addEventListener("click", authenticate);
  loginPass.addEventListener("keydown", (e) => {
    if (e.key === "Enter") authenticate();
  });

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });

  resetBtn.addEventListener("click", resetSession);

  // Initial
  setUI();
})();
