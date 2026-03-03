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
  const statusOut = $("statusOut");
  const systemTag = $("systemTag");
  const channelTag = $("channelTag");

  let state = {
    identity: null,     // "shane" or "ilya" (who user logs in as)
    remote: null,       // "ilya" or "shane" (who they talk to)
    mode: "normal",     // "normal" | "ix"
    integrity: 100
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

  function setUI() {
    identityOut.textContent = state.identity?.toUpperCase() ?? "—";
    remoteOut.textContent = state.mode === "ix" ? "I-X" : (state.remote?.toUpperCase() ?? "—");
    integrityOut.textContent = `${state.integrity}%`;

    channelTag.textContent = `CH: ${state.identity?.toUpperCase() ?? "—"}→${(state.mode === "ix" ? "I-X" : state.remote?.toUpperCase()) ?? "—"}`;

    if (state.mode === "ix") {
      document.body.classList.add("glitchMode");
      systemTag.textContent = "SYSTEM :: INSTABILITY";
      statusOut.textContent = "SIGNAL COMPROMISED";
    } else {
      document.body.classList.remove("glitchMode");
      systemTag.textContent = "SYSTEM :: SECURE";
      statusOut.textContent = "READY";
    }
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

  // Make text look corrupted without animation
  function distort(text, intensity = 0.18) {
    const junk = ["█","▒","░","■","▚","▞","╳","╱","╲","⟟","⟊","∆","⟠","⧗","⧖","⟡","⧫"];
    let out = "";
    for (const ch of text) {
      if (ch === " " || ch === "\n") { out += ch; continue; }
      if (Math.random() < intensity) out += rand(junk);
      else out += ch;
    }
    // occasional hard glitch stutter
    if (Math.random() < 0.35) out = out.replace(/ /g, "  ");
    return out;
  }

  function maybeTriggerTakeover(userText) {
    // Only possible while talking to Ilya and in normal mode
    if (state.mode !== "normal") return false;
    if (state.remote !== "ilya") return false;

    const t = normalize(userText);
    const triggers = window.CHAR_DATA.ilya.takeoverTriggers || [];
    const hit = triggers.some(k => t.includes(k));
    if (!hit) return false;

    // Chance-based so it isn't guaranteed every time
    const chance = t.includes("i-x") || t.includes("ix") ? 0.75 : 0.35;
    return Math.random() < chance;
  }

  function takeover() {
    state.mode = "ix";
    state.integrity = Math.max(1, state.integrity - 37);
    setUI();

    // I-X barges in
    appendMsg("SYSTEM", "⚠ CHANNEL INTEGRITY FAILURE :: ERR-IX-113");
    appendMsg("I-X", distort(rand(window.CHAR_DATA.ix.openers), 0.08));
  }

  function maybeRecover(userText) {
    if (state.mode !== "ix") return false;
    const t = normalize(userText);
    const keys = window.CHAR_DATA.ix.recoveryKeys || [];
    if (!keys.some(k => t.includes(k))) return false;

    // Recovery is possible but not perfect
    state.mode = "normal";
    state.integrity = Math.min(100, state.integrity + 22);
    setUI();
    appendMsg("SYSTEM", "ROLLBACK COMPLETE :: CHANNEL PARTIALLY RESTORED");
    appendMsg("ILYA", "…Did you do that? I thought I was gone for a second.");
    return true;
  }

  function handleSend() {
    const text = inputEl.value;
    if (!text.trim()) return;
    inputEl.value = "";

    appendMsg(state.identity.toUpperCase(), text);

    // If in takeover mode, allow recovery phrase
    if (maybeRecover(text)) return;

    // Maybe trigger takeover while talking to Ilya
    if (maybeTriggerTakeover(text)) {
      // Ilya tries to respond, then gets cut off
      const ilyaReply = matchRule("ilya", text);
      appendMsg("ILYA", ilyaReply);
      takeover();
      return;
    }

    // Normal responses
    if (state.mode === "ix") {
      const reply = matchRule("ix", text);
      appendMsg("I-X", distort(reply, 0.22));
      // integrity slowly worsens while I-X is present
      state.integrity = Math.max(1, state.integrity - (Math.random() < 0.5 ? 1 : 2));
      setUI();
      return;
    }

    const replyKey = state.remote; // "shane" or "ilya"
    const reply = matchRule(replyKey, text);
    appendMsg(window.CHAR_DATA[replyKey].name, reply);
  }

  function startSession(loginAs) {
    state.identity = loginAs; // "shane" or "ilya"
    state.remote = loginAs === "shane" ? "ilya" : "shane";
    state.mode = "normal";
    state.integrity = 100;

    // Switch views
    loginView.classList.add("hidden");
    chatView.classList.remove("hidden");

    // Clear log and greet
    logEl.innerHTML = "";
    setUI();
    appendMsg("SYSTEM", `SECURE CHANNEL ESTABLISHED :: ${state.identity.toUpperCase()} → ${state.remote.toUpperCase()}`);

    const opener = rand(window.CHAR_DATA[state.remote].openers);
    appendMsg(window.CHAR_DATA[state.remote].name, opener);

    inputEl.focus();
  }

  function resetSession() {
    // back to login
    state = { identity:null, remote:null, mode:"normal", integrity:100 };
    setUI();
    logEl.innerHTML = "";
    chatView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }

  // Wire buttons
  document.querySelectorAll("[data-login]").forEach(btn => {
    btn.addEventListener("click", () => startSession(btn.dataset.login));
  });

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
  resetBtn.addEventListener("click", resetSession);

  // initial UI
  setUI();
})();
