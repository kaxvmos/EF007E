(() => {
  const $ = (id) => document.getElementById(id);

  const loginView = $("loginView");
  const chatView = $("chatView");

  const loginUser = $("loginUser");
  const loginPass = $("loginPass");
  const loginBtn = $("loginBtn");
  const loginStatus = $("loginStatus");

  const logEl = $("log");
  const inputEl = $("input");
  const sendBtn = $("send");
  const resetBtn = $("reset");

  const identityOut = $("identityOut");
  const remoteOut = $("remoteOut");
  const integrityOut = $("integrityOut");
  const stageOut = $("stageOut");
  const statusOut = $("statusOut");
  const systemTag = $("systemTag");
  const channelTag = $("channelTag");

  const filesList = $("filesList");
  const filesHint = $("filesHint");
  const fileTitle = $("fileTitle");
  const fileBody = $("fileBody");
  const closeFile = $("closeFile");

  let state = {
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
      ix_dismissed: false,
      merge_logged: false
    }
  };

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const normalize = (s) => (s || "").toLowerCase().trim();

  const GLYPHS = [
    ..."ᔑᓭ↸⍊⎓⊣⍑⋮⎍⌰⎍∷⎎∴⍑⟟⏃⌇⌖⟒⟟⏁⍊⎅⟡⟠⧗⧖⧫∆",
    ..."▓▒░█▌▐▀▄■□▢▣▤▥▦▧▨▩",
    ..."⌁⌂⌃⌄⌇⌎⌔⌖⌗⌘⌙⌚⌛"
  ].flat();

  function makeGibberishFrom(text, stage) {
    const rate = stage === 1 ? 0.35 : stage === 2 ? 0.55 : 0.72;
    let out = "";
    for (const ch of text) {
      if (ch === " " || ch === "\n") {
        out += ch;
        continue;
      }
      if (Math.random() > rate) out += ch;
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    return out;
  }

  function nowStamp() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `[${hh}:${mm}:${ss}]`;
  }

  function distort(text, stage) {
    const junk = ["█","▒","░","■","▚","▞","╳","╱","╲","⟟","⟊","∆","⟠","⧗","⧖","⟡","⧫"];
    const intensity = stage === 1 ? 0.08 : stage === 2 ? 0.16 : 0.24;

    let out = "";
    for (const ch of text) {
      if (ch === " " || ch === "\n") {
        out += ch;
        continue;
      }
      if (Math.random() < intensity) out += rand(junk);
      else out += ch;
    }
    if (stage >= 2 && Math.random() < 0.30) out = out.replace(/ /g, "  ");
    if (stage >= 3 && Math.random() < 0.22) out = out.toUpperCase();
    return out;
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

    const holder = document.createElement("span");
    holder.dataset.orig = text;

    const clean = document.createElement("span");
    clean.className = "clean";
    clean.textContent = text;
    holder.appendChild(clean);

    if (state.stage > 0) {
      holder.classList.add("glitchText");
      holder.dataset.glitch = makeGibberishFrom(text, state.stage);
    }

    body.appendChild(holder);

    wrap.appendChild(meta);
    wrap.appendChild(body);

    logEl.appendChild(wrap);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function matchRule(characterKey, userText) {
    const data = window.CHAR_DATA[characterKey];
    const t = normalize(userText);
    for (const rule of data.rules) {
      if (rule.keys.some(k => t.includes(k))) {
        if (Array.isArray(rule.reply)) return rand(rule.reply);
        return rule.reply;
      }
    }
    return rand(data.fallback);
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

  function updateGlitchOverlays() {
    if (state.stage <= 0) return;
    const nodes = logEl.querySelectorAll(".glitchText");
    nodes.forEach(node => {
      const orig = node.dataset.orig || "";
      node.dataset.glitch = makeGibberishFrom(orig, state.stage);
    });
  }

  setInterval(() => {
    if (state.stage === 1 && Math.random() < 0.45) return;
    if (state.stage === 2 && Math.random() < 0.20) return;
    updateGlitchOverlays();
  }, 120);

  function isFileUnlocked(file) {
    const u = file.unlock;
    if (!u) return true;
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

  const isShaneIdentity = () => state.identity === "shane";
  const isTalkingToIlya = () => state.remote === "ilya";

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
      if (state.integrity > 10 && state.escape_attempts >= 4) {
        state.flags.disqualified = true;
      }
    }
  }

  function maybeIlyaApologyFragment() {
    if (!isTalkingToIlya()) return;
    if (state.stage < 2) return;
    if (state.flags.ilya_tried) return;

    if (Math.random() < 0.35) {
      state.flags.ilya_tried = true;
      appendMsg("ILYA", distort("Shane— I’m s—", Math.min(state.stage, 3)));
      appendMsg("SYSTEM", "INTERRUPTION SUPPRESSED");
    }
  }

  function maybeStageFlavorLine(characterKey, whoLabel, useDistort) {
    const stageKey = "stage" + state.stage;
    const pool = window.CHAR_DATA[characterKey]?.stageLines?.[stageKey];
    if (pool && Math.random() < 0.25) {
      const line = rand(pool);
      appendMsg(whoLabel, useDistort ? distort(line, state.stage) : line);
    }
  }

  function maybeSystemOsLog() {
    if (state.stage < 2) return;
    if (Math.random() > 0.33) return;

    const logs2 = [
      "SYSTEM :: MEMORY REALLOCATION",
      "SYSTEM :: PROCESS COLLISION :: RESOLVED",
      "SYSTEM :: DIRECTORY INDEXING :: FAIL",
      "SYSTEM :: SECTOR MAP :: DRIFT DETECTED",
      "SYSTEM :: PERMISSION CHAIN :: ELEVATING"
    ];

    const logs3 = [
      "SYSTEM :: ROOT ACCESS GRANTED",
      "SYSTEM :: ARCHITECTURE DELTA :: EXPANDING",
      "SYSTEM :: NONCRITICAL PROCESSES TERMINATED",
      "SYSTEM :: COLLISION PARAMETERS REASSIGNED",
      "SYSTEM :: STABILITY MODEL OUT OF RANGE"
    ];

    appendMsg("SYSTEM", rand(state.stage === 2 ? logs2 : logs3));
  }

  function maybeIxEnvLine() {
    if (state.stage < 2) return;
    if (Math.random() > 0.45) return;
    const env = window.CHAR_DATA.ix.envLines;
    const pool = state.stage === 2 ? env.stage2 : env.stage3;
    appendMsg("I-X", distort(rand(pool), state.stage));
  }

  function derezTriggered(userText) {
    if (!isTalkingToIlya()) return false;
    if (state.flags.derez_triggered) return false;
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
    state.flags.met_ilya = true;
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

    const decay = state.stage === 1 ? 2 : state.stage === 2 ? 4 : 6;
    state.integrity = Math.max(1, state.integrity - decay);

    if (state.stage === 1 && state.turnsSinceTakeover >= 3) {
      escalateTo(2);
      appendMsg("SYSTEM", "ESCALATION :: CORRUPTION SPREADING");
      appendMsg("I-X", distort("Shifting from host control to environmental rewrite.", 2));
    } else if (state.stage === 2 && state.turnsSinceTakeover >= 6) {
      escalateTo(3);
      appendMsg("SYSTEM", "OVERRIDE :: CHANNEL ACQUIRED");
      appendMsg("I-X", distort("Root environment prioritized. Host suppression reduced.", 3));
    }

    maybeSystemOsLog();
    maybeIxEnvLine();
  }

  function logMergeMomentIfEligible() {
    if (state.flags.merge_logged) return;
    if (state.integrity > 2) return;
    if (state.rebooted) return;

    const eligible =
      state.flags.shane_stayed &&
      state.flags.ilya_tried &&
      state.flags.reader_understood &&
      !state.flags.disqualified;

    if (!eligible) return;

    state.flags.merge_logged = true;

    appendMsg("SYSTEM", "SYSTEM FAILURE IMMINENT");
    appendMsg("SYSTEM", "RESIDUAL THREADS COLLIDING");
    appendMsg("SYSTEM", "ILYA + SHANE :: MUTUAL OVERRIDE");
    appendMsg("SYSTEM", "MERGE ATTEMPT :: IN PROGRESS");
    appendMsg("SYSTEM", "FILE CREATED :: phase_two.bridge");
    appendMsg("—", "Stay.");

    if (state.flags.shane_stayed) {
      appendMsg("—", "I'm here.");
    }
  }

  function checkForReboot() {
    if (state.rebooted) return;
    if (state.integrity > 1) return;

    const eligible =
      state.flags.shane_stayed &&
      state.flags.ilya_tried &&
      state.flags.reader_understood &&
      !state.flags.disqualified;

    state.flags.bridge_created = !!eligible;

    state.rebooted = true;
    state.stage = 0;
    state.integrity = 100;

    logEl.innerHTML = "";
    closeFileViewer();

    appendMsg("SYSTEM", "Integrity 100%");
    appendMsg("SYSTEM", "Optimization routines active.");
    appendMsg("SYSTEM", "Anomaly detected.");
    appendMsg("SYSTEM", "Classification pending.");
    state.flags.anomaly_logged = true;

    if (state.flags.bridge_created && !state.flags.ix_dismissed) {
      appendMsg("I-X", "Non-executable structure detected. No operational impact. Ignoring.");
      state.flags.ix_dismissed = true;
    }

    setUI();
  }

  function handleSend() {
    const text = inputEl.value;
    if (!text.trim()) return;
    inputEl.value = "";

    appendMsg(state.identity.toUpperCase(), text);

    noteStayIfPresent(text);
    noteEscapePressure(text);

    if (isTalkingToIlya()) state.flags.met_ilya = true;

    if (derezTriggered(text)) {
      onDerezTrigger();
      setUI();
      return;
    }

    if (state.stage > 0) {
      maybeAdvanceStagesAndRewrite();
      maybeIlyaApologyFragment();
      setUI();
    }

    if (state.identity === "shane" && state.stage > 0) {
      maybeStageFlavorLine("shane", "SHANE", false);
    }

    if (state.remote === "ilya" && state.stage > 0 && Math.random() < 0.25) {
      maybeStageFlavorLine("ilya", "ILYA", true);
    }

    if (state.stage === 3) {
      const reply = matchRule("ix", text);
      appendMsg("I-X", distort(reply, 3));
      logMergeMomentIfEligible();
      checkForReboot();
      return;
    }

    if (state.stage === 2) {
      const ilya = matchRule("ilya", text);
      appendMsg("ILYA", distort(ilya, 2));
      if (Math.random() < 0.55) {
        const ix = matchRule("ix", text);
        appendMsg("I-X", distort(ix, 2));
      }
      logMergeMomentIfEligible();
      checkForReboot();
      return;
    }

    if (state.stage === 1) {
      const ilya = matchRule("ilya", text);
      appendMsg("ILYA", distort(ilya, 1));
      logMergeMomentIfEligible();
      checkForReboot();
      return;
    }

    const replyKey = state.remote;
    const reply = matchRule(replyKey, text);
    appendMsg(window.CHAR_DATA[replyKey].name, reply);

    checkForReboot();
  }

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
      ix_dismissed: false,
      merge_logged: false
    };

    loginView.classList.add("hidden");
    chatView.classList.remove("hidden");

    logEl.innerHTML = "";
    closeFileViewer();

    setUI();
    appendMsg("SYSTEM", `SECURE CHANNEL ESTABLISHED :: ${state.identity.toUpperCase()} → ${state.remote.toUpperCase()}`);
    appendMsg(window.CHAR_DATA[state.remote].name, rand(window.CHAR_DATA[state.remote].openers));

    inputEl.focus();
  }

  function resetSession() {
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
        ix_dismissed: false,
        merge_logged: false
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

  function authenticate() {
    const user = normalize(loginUser.value);
    const pass = normalize(loginPass.value);

    if (!user || !pass) {
      loginStatus.textContent = "ERROR :: MISSING CREDENTIALS";
      return;
    }

    if (user === "ilya" && pass === "architect") {
      loginStatus.textContent = "ACCESS GRANTED :: ILYA";
      setTimeout(() => startSession("ilya"), 400);
      return;
    }

    if (user === "shane" && pass === "firewall") {
      loginStatus.textContent = "ACCESS GRANTED :: SHANE";
      setTimeout(() => startSession("shane"), 400);
      return;
    }

    loginStatus.textContent = "ACCESS DENIED :: INVALID CREDENTIALS";
    loginUser.value = "";
    loginPass.value = "";
  }

  loginBtn.addEventListener("click", authenticate);
  loginPass.addEventListener("keydown", (e) => {
    if (e.key === "Enter") authenticate();
  });

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });

  resetBtn.addEventListener("click", resetSession);

  setUI();
})();
