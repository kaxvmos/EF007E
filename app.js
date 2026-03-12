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
  const bondOut = $("bondOut");

  const filesList = $("filesList");
  const filesHint = $("filesHint");
  const fileTitle = $("fileTitle");
  const fileBody = $("fileBody");
  const closeFile = $("closeFile");

  const speakerAvatar = $("speakerAvatar");
  const speakerFallback = $("speakerFallback");
  const speakerName = $("speakerName");
  const speakerSub = $("speakerSub");
  const typingIndicator = $("typingIndicator");
  const typingName = $("typingName");

  const helpBtn = $("helpBtn");
  const helpPanel = $("helpPanel");
  const helpBody = $("helpBody");
  const helpSub = $("helpSub");

  function createFreshMemory() {
    return {
      expressedLove: false,
      expressedMissing: false,
      expressedFear: false,
      askedForgiveness: false,
      promisedStay: false,
      askedIfHurt: false,
      askedIfDying: false,
      defendedFromIx: false,
      askedWhatIsReal: false,
      askedForTruth: false,
      saidInHiding: false,
      repeatedFearCount: 0,
      repeatedLoveCount: 0,
      trustQuestions: 0,
      truthQuestions: 0
    };
  }

  function createFreshState() {
    return {
      identity: null,
      remote: null,
      stage: 0,
      integrity: 100,
      turnsSinceTakeover: 0,
      escape_attempts: 0,
      rebooted: false,
      pendingReplies: 0,
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
      },
      memory: createFreshMemory()
    };
  }

  let state = createFreshState();

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

  function getCharVisual(keyOrWho) {
    const key = (keyOrWho || "").toLowerCase();

    if (window.CHAR_DATA[key]) return window.CHAR_DATA[key];

    const fallbackMap = {
      shane: window.CHAR_DATA.shane,
      ilya: window.CHAR_DATA.ilya,
      "i-x": window.CHAR_DATA.ix,
      ix: window.CHAR_DATA.ix
    };

    return fallbackMap[key] || null;
  }

  function makeAvatarEl(label) {
    const visual = getCharVisual(label);
    const wrap = document.createElement("div");
    wrap.className = "msgAvatar";

    if (visual?.avatar) {
      const img = document.createElement("img");
      img.src = visual.avatar;
      img.alt = visual.avatarAlt || `${visual.name} avatar`;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        wrap.innerHTML = `<div class="msgAvatarFallback">${visual?.short || String(label).slice(0, 2).toUpperCase()}</div>`;
      });
      wrap.appendChild(img);
      return wrap;
    }

    wrap.innerHTML = `<div class="msgAvatarFallback">${visual?.short || String(label).slice(0, 2).toUpperCase()}</div>`;
    return wrap;
  }

  function updateSpeakerCard(label, subtitle) {
    const visual = getCharVisual(label);

    speakerName.textContent = visual?.name || label || "—";
    speakerSub.textContent = subtitle || "Awaiting transmission…";

    if (visual?.avatar) {
      speakerAvatar.src = visual.avatar;
      speakerAvatar.alt = visual.avatarAlt || `${visual.name} avatar`;
      speakerAvatar.classList.remove("hiddenAvatar");
      speakerFallback.style.display = "none";

      speakerAvatar.onerror = () => {
        speakerAvatar.classList.add("hiddenAvatar");
        speakerFallback.style.display = "grid";
        speakerFallback.textContent = visual?.short || "--";
      };
    } else {
      speakerAvatar.classList.add("hiddenAvatar");
      speakerFallback.style.display = "grid";
      speakerFallback.textContent = visual?.short || "--";
    }
  }

  function showTyping(label) {
    typingName.textContent = label;
    typingIndicator.classList.remove("hidden");
    updateSpeakerCard(label, "Transmission incoming…");
  }

  function hideTyping() {
    typingIndicator.classList.add("hidden");
  }

  function appendMsg(who, text) {
    const wrap = document.createElement("div");
    wrap.className = "msg";

    const avatar = makeAvatarEl(who);

    const main = document.createElement("div");
    main.className = "msgMain";

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

    if (state.stage > 0 && who !== state.identity?.toUpperCase() && who !== "SYSTEM" && who !== "—") {
      holder.classList.add("glitchText");
      holder.dataset.glitch = makeGibberishFrom(text, state.stage);
    }

    body.appendChild(holder);

    main.appendChild(meta);
    main.appendChild(body);

    wrap.appendChild(avatar);
    wrap.appendChild(main);

    logEl.appendChild(wrap);
    logEl.scrollTop = logEl.scrollHeight;

    updateSpeakerCard(who, "Last transmission received.");
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

  function getBondScore() {
    const m = state.memory;
    let score = 0;

    if (m.expressedLove) score += 3;
    if (m.expressedMissing) score += 2;
    if (m.promisedStay) score += 2;
    if (m.defendedFromIx) score += 3;
    if (m.askedIfHurt) score += 1;
    if (m.askedForgiveness) score += 1;
    if (m.askedForTruth) score += 1;
    if (m.askedWhatIsReal) score += 1;

    score += Math.min(m.repeatedLoveCount, 2);
    score += Math.min(m.repeatedFearCount, 1);

    return score;
  }

  function isFileUnlocked(file) {
    const u = file.unlock;
    if (!u) return true;
    if (file.id === "phase_two.bridge" && !state.rebooted) return false;
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

  function getHelpHints() {
    if (state.stage === 3) {
      return [
        `Try asking <code>who are you</code>`,
        `Try saying <code>stop</code> or <code>leave</code>`,
        `Try mentioning <code>Shane</code> or <code>Ilya</code>`,
        `Try provoking it with <code>escape</code> or <code>portal</code>`
      ];
    }

    if (state.stage === 2) {
      return [
        `Try grounding them: <code>I'm here</code>`,
        `Try emotional prompts: <code>stay with me</code>`,
        `Try questions like <code>what happened to you</code>`,
        `Try concern-based prompts: <code>does it hurt</code>`
      ];
    }

    if (state.remote === "ilya") {
      return [
        `Try: <code>hello</code>`,
        `Try: <code>what happened to you</code>`,
        `Try: <code>tell me your story</code>`,
        `Try: <code>how can I help</code>`,
        `Try: <code>stay with me</code>`,
        `Try: <code>do you trust me</code>`
      ];
    }

    if (state.remote === "shane") {
      return [
        `Try: <code>hello</code>`,
        `Try: <code>who are you</code>`,
        `Try: <code>what are you</code>`,
        `Try: <code>tell me a story</code>`,
        `Try: <code>it is watching us</code>`,
        `Try: <code>are you real</code>`
      ];
    }

    return [
      `Try simple openers like <code>hello</code>`,
      `Ask identity questions like <code>who are you</code>`,
      `Ask story questions like <code>tell me your story</code>`
    ];
  }

  function renderHelp() {
    const hints = getHelpHints();
    helpBody.innerHTML = "";
    helpSub.textContent =
      state.stage >= 2 ? "Signal unstable • recommended prompts" : "Suggested prompts";

    hints.forEach((hint) => {
      const item = document.createElement("div");
      item.className = "helpHint";
      item.innerHTML = hint;
      helpBody.appendChild(item);
    });
  }

  function toggleHelp() {
    helpPanel.classList.toggle("hidden");
    helpBtn.textContent = helpPanel.classList.contains("hidden") ? "HELP" : "HIDE HELP";
    if (!helpPanel.classList.contains("hidden")) {
      renderHelp();
    }
  }

  function setUI() {
    identityOut.textContent = state.identity?.toUpperCase() ?? "—";
    remoteOut.textContent = state.stage === 3 ? "I-X" : (state.remote?.toUpperCase() ?? "—");
    integrityOut.textContent = `${state.integrity}%`;
    bondOut.textContent = String(getBondScore());

    const stageLabel =
      state.stage === 0 ? "STABLE" :
      state.stage === 1 ? "MILD" :
      state.stage === 2 ? "SEVERE" : "FULL";

    stageOut.textContent = stageLabel;

    channelTag.textContent =
      `CH: ${state.identity?.toUpperCase() ?? "—"}→${state.stage === 3 ? "I-X" : (state.remote?.toUpperCase() ?? "—")}`;

    if (state.stage === 0) {
      systemTag.textContent = "SYSTEM :: SECURE";
      statusOut.textContent = state.pendingReplies > 0 ? "TRANSMISSION ACTIVE" : "READY";
    } else if (state.stage === 1) {
      systemTag.textContent = "SYSTEM :: DESYNC";
      statusOut.textContent = state.pendingReplies > 0 ? "SIGNAL FLUCTUATING" : "SIGNAL UNSTABLE";
    } else if (state.stage === 2) {
      systemTag.textContent = "SYSTEM :: CORRUPTION";
      statusOut.textContent = state.pendingReplies > 0 ? "CORRUPTION SPREADING" : "INTEGRITY DROPPING";
    } else {
      systemTag.textContent = "SYSTEM :: COMPROMISED";
      statusOut.textContent = state.pendingReplies > 0 ? "OVERRIDE ACTIVE" : "CHANNEL OVERRIDDEN";
    }

    setBodyStageClass();
    renderFiles();

    if (!helpPanel.classList.contains("hidden")) {
      renderHelp();
    }
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

  function noteConversationMemory(userText) {
    const t = normalize(userText);
    const hasAny = (phrases) => phrases.some(p => t.includes(p));

    if (hasAny(["i love you", "i think i love you", "i care about you"])) {
      state.memory.expressedLove = true;
      state.memory.repeatedLoveCount += 1;
    }

    if (hasAny(["i miss you", "ive missed you", "i've missed you", "i missed you"])) {
      state.memory.expressedMissing = true;
    }

    if (hasAny(["i'm scared", "im scared", "i am scared", "i'm afraid", "im afraid", "i am afraid", "i'm terrified", "im terrified"])) {
      state.memory.expressedFear = true;
      state.memory.repeatedFearCount += 1;
    }

    if (hasAny(["forgive me", "do you forgive me", "can you forgive me", "will you forgive me"])) {
      state.memory.askedForgiveness = true;
    }

    if (hasAny([
      "i'm still here", "im still here", "i am still here",
      "i'm not leaving", "im not leaving", "i wont leave", "i won't leave",
      "stay with me"
    ])) {
      state.memory.promisedStay = true;
    }

    if (hasAny(["are you hurt", "are you injured", "did they hurt you", "have you been hurt"])) {
      state.memory.askedIfHurt = true;
    }

    if (hasAny(["are you dying", "are you going to die", "are you about to derez"])) {
      state.memory.askedIfDying = true;
    }

    if (hasAny(["i won't let him take you", "i wont let him take you", "i won't let it take you", "i wont let it take you"])) {
      state.memory.defendedFromIx = true;
    }

    if (hasAny(["was any of it real", "was it ever real", "was any of this real", "was it all fake", "are you real"])) {
      state.memory.askedWhatIsReal = true;
      state.memory.truthQuestions += 1;
    }

    if (hasAny(["tell me the truth", "tell me something true"])) {
      state.memory.askedForTruth = true;
      state.memory.truthQuestions += 1;
    }

    if (hasAny(["i'm hiding", "im hiding", "i am hiding", "i'm in hiding", "im in hiding"])) {
      state.memory.saidInHiding = true;
    }

    if (hasAny(["do you trust me", "can you trust me", "will you trust me"])) {
      state.memory.trustQuestions += 1;
    }
  }

  function getMemoryAwareReply(characterKey, userText) {
    const t = normalize(userText);
    const m = state.memory;

    if (characterKey === "shane") {
      if (m.expressedLove && (t.includes("are you still there") || t.includes("did you leave"))) {
        return rand([
          "I'm still here. Don't make me repeat myself.",
          "Still here. You said enough earlier that I'm not closing this channel yet.",
          "Yes. I'm here."
        ]);
      }

      if (m.expressedFear && (t.includes("help") || t.includes("what do i do"))) {
        return rand([
          "First, keep your breathing even. Second, keep talking.",
          "You stay calm and you stay connected. Start there.",
          "You already did the right thing by saying it out loud."
        ]);
      }

      if (m.askedForgiveness && (t.includes("do you trust me") || t.includes("trust me"))) {
        return rand([
          "You're still asking. That counts for something.",
          "Regret and trust aren't the same thing. But they're not unrelated either.",
          "I'm still listening. Use that however you want."
        ]);
      }

      if (m.defendedFromIx && (t.includes("what do you want") || t.includes("what are you trying to do"))) {
        return rand([
          "I want to keep this channel from losing one more person.",
          "I want containment. And maybe, against my better judgment, I want you intact.",
          "I want it stopped."
        ]);
      }

      if (m.expressedMissing && (t.includes("do you remember before") || t.includes("remember before"))) {
        return rand([
          "More than I should.",
          "Enough to know why you'd say that.",
          "Enough."
        ]);
      }
    }

    if (characterKey === "ilya") {
      if (m.expressedLove && (t.includes("are you still there") || t.includes("are you here"))) {
        return rand([
          "I'm here. I heard what you said.",
          "Still here… and still thinking about that.",
          "Yes. I'm here."
        ]);
      }

      if (m.expressedMissing && (t.includes("do you remember me") || t.includes("you remember me"))) {
        return rand([
          "How could I not?",
          "You said you missed me. That isn't something I can ignore now.",
          "Yes. More clearly than before, somehow."
        ]);
      }

      if (m.expressedFear && (t.includes("stay with me") || t.includes("don't leave") || t.includes("dont leave"))) {
        return rand([
          "I'm trying. Hearing your fear makes it harder to let go.",
          "I will, as long as I can.",
          "Then keep talking to me."
        ]);
      }

      if (m.askedIfHurt && (t.includes("can we fix this") || t.includes("can this be fixed"))) {
        return rand([
          "Maybe not all of it. But maybe enough to keep something of me here.",
          "I don't know. But you asking that makes it feel less impossible.",
          "I want to believe we can."
        ]);
      }

      if (m.defendedFromIx && (t.includes("i'm still here") || t.includes("im still here"))) {
        return rand([
          "I know. I can feel you holding the line.",
          "Then maybe it doesn't get all of me.",
          "Good. Don't let the channel go quiet."
        ]);
      }

      if (m.askedForgiveness && (t.includes("what are we") || t.includes("what am i to you"))) {
        return rand([
          "Someone I never wanted to lose.",
          "Someone I still reach for.",
          "Someone I don't want to answer lightly."
        ]);
      }

      if ((m.askedWhatIsReal || m.askedForTruth) && (t.includes("was any of it real") || t.includes("tell me the truth"))) {
        return rand([
          "You keep asking because you already know it mattered.",
          "If it hurts to lose, then it was real to me.",
          "Maybe reality is just what survives the damage."
        ]);
      }
    }

    return null;
  }

  function maybeIlyaApologyFragment() {
    if (!isTalkingToIlya()) return;
    if (state.stage < 2) return;
    if (state.flags.ilya_tried) return;

    if (Math.random() < 0.35) {
      state.flags.ilya_tried = true;
      queueReply("ILYA", distort("Shane— I’m s—", Math.min(state.stage, 3)));
      queueReply("SYSTEM", "INTERRUPTION SUPPRESSED", { delay: 420 });
    }
  }

  function maybeStageFlavorLine(characterKey, whoLabel, useDistort) {
    const stageKey = "stage" + state.stage;
    const pool = window.CHAR_DATA[characterKey]?.stageLines?.[stageKey];
    if (pool && Math.random() < 0.25) {
      const line = rand(pool);
      queueReply(whoLabel, useDistort ? distort(line, state.stage) : line, { delay: 550 });
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

    queueReply("SYSTEM", rand(state.stage === 2 ? logs2 : logs3), { delay: 380 });
  }

  function maybeIxEnvLine() {
    if (state.stage < 2) return;
    if (Math.random() > 0.45) return;
    const env = window.CHAR_DATA.ix.envLines;
    const pool = state.stage === 2 ? env.stage2 : env.stage3;
    queueReply("I-X", distort(rand(pool), state.stage), { delay: 500 });
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

    queueReply("SYSTEM", "KEYWORD EVENT :: DEREZ :: CHANNEL DESYNC", { delay: 120 });
    queueReply("SYSTEM", "ADMIN PRESENCE: ACTIVE", { delay: 280 });
    queueReply("ILYA", distort("…No—", 1), { delay: 520 });
    queueReply("SYSTEM", "ERR-IX-113 :: DATA CORRUPTION DETECTED", { delay: 740 });
    queueReply("I-X", distort(rand(window.CHAR_DATA.ix.openers), 1), { delay: 980 });
  }

  function maybeAdvanceStagesAndRewrite() {
    if (state.stage === 0) return;

    state.turnsSinceTakeover += 1;

    const decay = state.stage === 1 ? 2 : state.stage === 2 ? 4 : 6;
    state.integrity = Math.max(1, state.integrity - decay);

    if (state.stage === 1 && state.turnsSinceTakeover >= 3) {
      escalateTo(2);
      queueReply("SYSTEM", "ESCALATION :: CORRUPTION SPREADING", { delay: 180 });
      queueReply("I-X", distort("Shifting from host control to environmental rewrite.", 2), { delay: 420 });
    } else if (state.stage === 2 && state.turnsSinceTakeover >= 6) {
      escalateTo(3);
      queueReply("SYSTEM", "OVERRIDE :: CHANNEL ACQUIRED", { delay: 180 });
      queueReply("I-X", distort("Root environment prioritized. Host suppression reduced.", 3), { delay: 420 });
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

    queueReply("SYSTEM", "SYSTEM FAILURE IMMINENT", { delay: 120 });
    queueReply("SYSTEM", "RESIDUAL THREADS COLLIDING", { delay: 280 });
    queueReply("SYSTEM", "ILYA + SHANE :: MUTUAL OVERRIDE", { delay: 430 });
    queueReply("SYSTEM", "MERGE ATTEMPT :: IN PROGRESS", { delay: 610 });
    queueReply("SYSTEM", "FILE CREATED :: phase_two.bridge", { delay: 800 });
    queueReply("—", "Stay.", { delay: 1040 });

    if (state.flags.shane_stayed) {
      queueReply("—", "I'm here.", { delay: 1260 });
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

    setTimeout(() => {
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
    }, 1400);
  }

  function computeDelay(who, text, extra = 0) {
    if (who === "SYSTEM" || who === "—") return 220 + extra;

    const base = who === "I-X" ? 420 : 700;
    const perChar = who === "I-X" ? 8 : 16;
    const len = Math.min((text || "").length, 160);

    return Math.min(base + (len * perChar) + extra, 2600);
  }

  function queueReply(who, text, opts = {}) {
    const delay = opts.delay ?? computeDelay(who, text);
    state.pendingReplies += 1;
    setUI();

    if (who !== "SYSTEM" && who !== "—") showTyping(who);

    setTimeout(() => {
      appendMsg(who, text);
      state.pendingReplies = Math.max(0, state.pendingReplies - 1);
      if (state.pendingReplies === 0) hideTyping();
      setUI();
    }, delay);
  }

  function handleSend() {
    const text = inputEl.value;
    if (!text.trim() || state.pendingReplies > 0) return;

    inputEl.value = "";

    appendMsg(state.identity.toUpperCase(), text);
    noteConversationMemory(text);
    updateSpeakerCard(state.identity.toUpperCase(), "Message sent.");

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
      queueReply("I-X", distort(reply, 3));
      logMergeMomentIfEligible();
      checkForReboot();
      return;
    }

    if (state.stage === 2) {
      const ilya = getMemoryAwareReply("ilya", text) || matchRule("ilya", text);
      queueReply("ILYA", distort(ilya, 2));

      if (Math.random() < 0.55) {
        const ix = matchRule("ix", text);
        queueReply("I-X", distort(ix, 2), { delay: 900 });
      }

      logMergeMomentIfEligible();
      checkForReboot();
      return;
    }

    if (state.stage === 1) {
      const ilya = getMemoryAwareReply("ilya", text) || matchRule("ilya", text);
      queueReply("ILYA", distort(ilya, 1));
      logMergeMomentIfEligible();
      checkForReboot();
      return;
    }

    const replyKey = state.remote;
    const memoryReply = getMemoryAwareReply(replyKey, text);
    const reply = memoryReply || matchRule(replyKey, text);
    queueReply(window.CHAR_DATA[replyKey].name, reply);

    checkForReboot();
  }

  function startSession(loginAs) {
    state = createFreshState();
    state.identity = loginAs;
    state.remote = loginAs === "shane" ? "ilya" : "shane";

    loginView.classList.add("hidden");
    chatView.classList.remove("hidden");

    logEl.innerHTML = "";
    closeFileViewer();
    hideTyping();

    helpPanel.classList.add("hidden");
    helpBtn.textContent = "HELP";
    renderHelp();

    setUI();
    appendMsg("SYSTEM", `SECURE CHANNEL ESTABLISHED :: ${state.identity.toUpperCase()} → ${state.remote.toUpperCase()}`);
    queueReply(window.CHAR_DATA[state.remote].name, rand(window.CHAR_DATA[state.remote].openers), { delay: 600 });

    updateSpeakerCard(window.CHAR_DATA[state.remote].name, "Secure channel established.");
    inputEl.focus();
  }

  function resetSession() {
    state = createFreshState();

    logEl.innerHTML = "";
    closeFileViewer();
    hideTyping();

    helpPanel.classList.add("hidden");
    helpBtn.textContent = "HELP";
    helpBody.innerHTML = "";

    setUI();

    chatView.classList.add("hidden");
    loginView.classList.remove("hidden");

    loginUser.value = "";
    loginPass.value = "";
    loginStatus.textContent = "AWAITING INPUT…";

    updateSpeakerCard("SYSTEM", "Awaiting authentication…");
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

  helpBtn.addEventListener("click", toggleHelp);
  resetBtn.addEventListener("click", resetSession);
  closeFile.addEventListener("click", closeFileViewer);

  updateSpeakerCard("SYSTEM", "Awaiting authentication…");
  setUI();
})();
