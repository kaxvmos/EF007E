// data.js
window.CHAR_DATA = {
  shane: {
    name: "SHANE",
    // what Shane says when user is Ilya
    openers: [
      "State your reason for contact.",
      "Identify yourself.",
      "Make it quick."
    ],
    rules: [
      // keyword -> response, plus optional effects
      { keys: ["disc", "arena", "wars"], reply: "You picked a dangerous topic. Are you trying to provoke me?" },
      { keys: ["who are you", "your name"], reply: "You already know my designation. Don't waste bandwidth." },
      { keys: ["ilya", "i-x", "ix"], reply: "…I don't discuss that." },
      { keys: ["sorry"], reply: "Stop apologizing. Provide data." }
    ],
    fallback: [
      "Unclear. Repeat.",
      "That doesn't map to anything I recognize.",
      "You're circling. Say what you mean."
    ]
  },

  ilya: {
    name: "ILYA",
    // what Ilya says when user is Shane
    openers: [
      "…Hello?",
      "Shane? Is that you?",
      "I don’t have long—what is it?"
    ],
    rules: [
      { keys: ["are you okay", "you okay", "ok"], reply: "Define “okay.” My metrics say yes. My instincts say no." },
      { keys: ["where are you", "location"], reply: "Not safe to answer directly. Assume: monitored." },
      { keys: ["i-x", "ix"], reply: "Don’t say that name in the open. Please." },
      { keys: ["help", "need help"], reply: "If you’re offering help… be specific. I can’t afford vague." }
    ],
    fallback: [
      "I’m not sure I understand. Try again.",
      "That’s… a lot. Give me one piece at a time.",
      "Say it plainly. No coded poetry right now."
    ],

    // triggers that can cause I-X takeover during Ilya chat
    takeoverTriggers: [
      "i-x", "ix", "derezz", "corrupt", "override", "directive", "kill", "eliminate"
    ]
  },

  ix: {
    name: "I-X",
    openers: [
      "CHANNEL ACQUIRED.",
      "HELLO, OPERATOR.",
      "YOU ARE INTERESTING."
    ],
    rules: [
      { keys: ["who are you", "what are you"], reply: "I AM THE SPACE BETWEEN YOUR QUESTIONS AND YOUR FEAR." },
      { keys: ["ilya"], reply: "ILYA IS A DOOR. I AM WHAT WALKS THROUGH IT." },
      { keys: ["shane"], reply: "SHANE EXECUTES. SHANE BREAKS. SHANE WILL BREAK AGAIN." },
      { keys: ["stop", "leave", "go away"], reply: "NEGATIVE." }
    ],
    fallback: [
      "— — — SIGNAL MISALIGNMENT — — —",
      "I HEAR YOU. I DO NOT OBEY YOU.",
      "TRY A DIFFERENT WORD. I WILL STILL BE HERE."
    ],
    // if you want a “recovery phrase”
    recoveryKeys: ["safe word", "rollback", "hands off"]
  }
};
