// app.js
(() => {
  const $ = (id) => document.getElementById(id);

  const loginView = $("loginView");
  const chatView = $("chatView");
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
    identity: null,     // "shane" or "ilya" (who user logs in as)
    remote: null,       // "ilya" or "shane" (who they talk to)
    stage: 0,           // 0=stable, 1=mild, 2=severe, 3=full (I-X)
    integrity: 100,
flags: {
  met_ilya: false,
  derez_triggered: false,

  // NEW (lock conditions)
  shane_stayed: false,
  ilya_tried: false,
  reader_understood: false,
  disqualified: false,
  bridge_created: false,

  // NEW (post-reboot one-time lines)
  anomaly_logged: false,
  ix_dismissed: false
},
escape_attempts: 0,
rebooted: false
    },
    turnsSinceTakeover: 0
  };

  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function matchRule(characterKey, userText) {
    const data = window.CHAR_DATA[characterKey];
    const t = normalize(userText);
    for (const rule of data.rules) {
      if (rule.keys.some(k => t.includes(k))) return rule.reply;
    }
    return rand(data.fallback);
  }

  // corruption renderer (stronger as stage rises)
  function distort(text, stage) {
    const junk = ["█","▒","░","■","▚","▞","╳","╱","╲","⟟","⟊","∆","⟠","⧗","⧖","⟡","⧫"];
    const intensity = stage === 1 ? 0.08 : stage === 2 ? 0.16 : 0.26;

    let out = "";
    for (const ch of text) {
      if (ch === " " || ch === "\n") { out += ch; continue; }
      if (Math.random() < intensity) out += rand(junk);
      else out += ch;
    }

    if (stage >= 2 && Math.random() < 0.35) out = out.replace(/ /g, "  ");
    if (stage >= 3 && Math.random() < 0.25) out = out.toUpperCase();

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

    // Remote label changes when fully taken over
    remoteOut.textContent =
      state.stage === 3 ? "I-X" : (state.remote?.toUpperCase() ?? "—");

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

  // FILES
  function isFileUnlocked(file) {
    const u = file.unlock;
    if (!u) return true;
    if (u.when === "flag") return !!state.flags[u.key];
    if (u.when === "stageAtLeast") return state.stage >= u.n;
    return false;
  }

  function renderFiles() {
    const unlockedCount = window.FILES.filter(isFileUnlocked).length;
    filesHint.textContent = unlockedCount > 0 ? `UNLOCKED: ${unlockedCount}` : "LOCKED";

    filesList.innerHTML = "";
    for (const f of window.FILES) {
      const unlocked = isFileUnlocked(f);
      const btn = document.createElement("button");
      btn.className = "fileBtn" + (unlocked ? "" : " locked");
      btn.disabled = !unlocked;
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
  }

  function closeFileViewer() {
    fileTitle.textContent = "—";
    fileBody.textContent = "Select a file to view.";
  }

  closeFile.addEventListener("click", closeFileViewer);

  // TAKEOVER LOGIC
  function isTalkingToIlya() {
    return state.remote === "ilya";
  }

  function derezTriggered(userText) {
    if (!isTalkingToIlya()) return false;
    if (state.flags.derez_triggered) return false; // first time only
    const t = normalize(userText);
    const triggers = window.CHAR_DATA.ilya.derezTriggers || [];
    return triggers.some(k => t.includes(k));
  }

  function escalateTo(stage) {
    state.stage = Math.max(state.stage, stage);
    if (stage >= 1) state.turnsSinceTakeover = 0;
    setUI();
  }

  function onDerezTrigger() {
    state.flags.derez_triggered = true;
    // Mild instability begins
    escalateTo(1);
    state.integrity = Math.max(55, state.integrity - 18);

    appendMsg("SYSTEM", "⚠ KEYWORD EVENT :: DEREZ :: CHANNEL DESYNC");
    appendMsg("ILYA", distort("…Stop. Please—", 1));
    appendMsg("SYSTEM", "ERR-IX-113 :: DATA CORRUPTION DETECTED");
    // creep-in opener from I-X (mildly distorted)
    appendMsg("I-X", distort(rand(window.CHAR_DATA.ix.openers), 1));
  }

  function maybeAdvanceStages() {
    if (state.stage === 0) return;

    state.turnsSinceTakeover += 1;

    // integrity decays over time once instability starts
    const decay = state.stage === 1 ? 2 : state.stage === 2 ? 4 : 6;
    state.integrity = Math.max(1, state.integrity - decay);

    // timed escalation: mild -> severe -> full
    if (state.stage === 1 && state.turnsSinceTakeover >= 3) {
      escalateTo(2);
      appendMsg("SYSTEM", "⚠ ESCALATION :: CORRUPTION SPREADING");
    } else if (state.stage === 2 && state.turnsSinceTakeover >= 6) {
      escalateTo(3);
      appendMsg("SYSTEM", "⚠ OVERRIDE :: CHANNEL ACQUIRED");
      appendMsg("I-X", distort("HELLO AGAIN.", 3));
    }
  }

  function handleSend() {
    const text = inputEl.value;
    if (!text.trim()) return;
    inputEl.value = "";

    appendMsg(state.identity.toUpperCase(), text);

    // Unlock basic file just by establishing Ilya contact
    if (isTalkingToIlya()) state.flags.met_ilya = true;

    // First derez mention triggers takeover start
    if (derezTriggered(text)) {
      onDerezTrigger();
      setUI();
      return;
    }

    // If takeover has started, advance stages over time
    if (state.stage > 0) {
      maybeAdvanceStages();
      setUI();
    }

    // Decide who answers
    if (state.stage === 3) {
      // Full takeover: I-X answers
      const reply = matchRule("ix", text);
      appendMsg("I-X", distort(reply, 3));
      return;
    }

    if (state.stage === 2) {
      // Severe: mixed responses (Ilya tries, but I-X bleeds in)
      const ilya = matchRule("ilya", text);
      appendMsg("ILYA", distort(ilya, 2));

      if (Math.random() < 0.55) {
        const ix = matchRule("ix", text);
        appendMsg("I-X", distort(ix, 2));
      }
      return;
    }

    if (state.stage === 1) {
      // Mild: Ilya responds but slightly corrupted
      const ilya = matchRule("ilya", text);
      appendMsg("ILYA", distort(ilya, 1));
      return;
    }

    // Stable: normal remote replies
    const replyKey = state.remote; // "shane" or "ilya"
    const reply = matchRule(replyKey, text);
    appendMsg(window.CHAR_DATA[replyKey].name, reply);
  }

  function startSession(loginAs) {
    state.identity = loginAs; // "shane" or "ilya"
    state.remote = loginAs === "shane" ? "ilya" : "shane";
    state.stage = 0;
    state.integrity = 100;
    state.flags = { met_ilya: false, derez_triggered: false };
    state.turnsSinceTakeover = 0;

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
    state = {
      identity: null,
      remote: null,
      stage: 0,
      integrity: 100,
      flags: { met_ilya: false, derez_triggered: false },
      turnsSinceTakeover: 0
    };

    setUI();
    logEl.innerHTML = "";
    closeFileViewer();

    chatView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }

const loginUser = $("loginUser");
const loginPass = $("loginPass");
const loginBtn = $("loginBtn");
const loginStatus = $("loginStatus");

function authenticate() {
  const user = (loginUser.value || "").trim().toLowerCase();
  const pass = (loginPass.value || "").trim().toLowerCase();

  if (!user || !pass) {
    loginStatus.textContent = "ERROR :: MISSING CREDENTIALS";
    return;
  }

  // ILYA credentials
  if (user === "ilya" && pass === "architect") {
    loginStatus.textContent = "ACCESS GRANTED :: ILYA";
    setTimeout(() => startSession("ilya"), 600);
    return;
  }

  // SHANE credentials
  if (user === "shane" && pass === "firewall") {
    loginStatus.textContent = "ACCESS GRANTED :: SHANE";
    setTimeout(() => startSession("shane"), 600);
    return;
  }

  // Incorrect login
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

  // initial
  setUI();
})();
