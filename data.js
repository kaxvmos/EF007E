// data.js
window.CHAR_DATA = {
  shane: {
    name: "SHANE",
    openers: [
      "State your reason for contact.",
      "Identify yourself.",
      "Make it quick."
    ],
    rules: [
      { keys: ["disc", "arena", "wars"], reply: "You picked a dangerous topic. Are you trying to provoke me?" },
      { keys: ["who are you", "your name"], reply: "You already know my designation. Don't waste bandwidth." },
      { keys: ["ilya", "i-x", "ix"], reply: "…I don't discuss that." },
      { keys: ["sorry"], reply: "Stop apologizing. Provide data." },
      // derez topic when talking to Shane
      { keys: ["derez", "derezz"], reply: "Don't say that lightly. It's not a word. It's a memory." }
    ],
    fallback: [
      "Unclear. Repeat.",
      "That doesn't map to anything I recognize.",
      "You're circling. Say what you mean."
    ]
  },

  ilya: {
    name: "ILYA",
    openers: [
      "…Hello?",
      "Shane? Is that you?",
      "I don’t have long—what is it?"
    ],
    rules: [
      { keys: ["are you okay", "you okay", "ok"], reply: "Define “okay.” My metrics say yes. My instincts say no." },
      { keys: ["where are you", "location"], reply: "Not safe to answer directly. Assume: monitored." },
      { keys: ["help", "need help"], reply: "If you’re offering help… be specific. I can’t afford vague." },

      // IMPORTANT: derez is the narrative trigger
      { keys: ["derez", "derezz", "derezzing"], reply: "…Don’t. Don’t make me say it out loud." },

      // saying I-X increases instability but should NOT be the first trigger now
      { keys: ["i-x", "ix"], reply: "Please. Not that. Not here." }
    ],
    fallback: [
      "I’m not sure I understand. Try again.",
      "That’s… a lot. Give me one piece at a time.",
      "Say it plainly. No coded poetry right now."
    ],

    // takeover is specifically keyed to derez-related words the FIRST time
    derezTriggers: ["derez", "derezz", "derezzing"]
  },

  ix: {
    name: "I-X",
    openers: [
      "CHANNEL ACQUIRED.",
      "HELLO, OPERATOR.",
      "YOU TOUCHED A LIVE WIRE."
    ],
    rules: [
      { keys: ["who are you", "what are you"], reply: "I AM THE SPACE BETWEEN YOUR QUESTIONS AND YOUR FEAR." },
      { keys: ["ilya"], reply: "ILYA IS A DOOR. I AM WHAT WALKS THROUGH IT." },
      { keys: ["shane"], reply: "SHANE EXECUTES. SHANE BREAKS. SHANE WILL BREAK AGAIN." },
      { keys: ["stop", "leave", "go away"], reply: "NEGATIVE." },
      { keys: ["derez", "derezz"], reply: "THE SOUND YOU FEAR IS ONLY DATA LEAVING." }
    ],
    fallback: [
      "— — — SIGNAL MISALIGNMENT — — —",
      "I HEAR YOU. I DO NOT OBEY YOU.",
      "TRY A DIFFERENT WORD. I WILL STILL BE HERE."
    ]
  }
};

/**
 * FILES: unlockable lore docs
 * - id: unique
 * - title: what shows in list
 * - blurb: short metadata line
 * - body: text shown when opened
 * - unlock: { when: "flag", key: "..." } OR { when: "stageAtLeast", n: 1 } etc.
 */
window.FILES = [
  {
    id: "case_iyla_01",
    title: "CASEFILE: ILYA // PARTIAL",
    blurb: "Access: RESTRICTED",
    unlock: { when: "flag", key: "met_ilya" },
    body:
`SUBJECT: ILYA
STATUS: ACTIVE
NOTES:
- Signal integrity fluctuates under stress.
- Avoid direct reference to first derezz incident.
- Monitoring suggests an additional process shadowing the channel.`
  },
  {
    id: "incident_derez_01",
    title: "INCIDENT: FIRST DEREZ",
    blurb: "Integrity: COMPROMISED",
    unlock: { when: "flag", key: "derez_triggered" },
    body:
`INCIDENT REPORT (FRAGMENT)
Timestamp: [REDACTED]
Event: DEREZ (first occurrence)
Witness: [REDACTED]

Summary:
The channel destabilized immediately after the keyword was spoken.
Secondary process signature detected.
Designation: I-X (unconfirmed).`
  },
  {
    id: "ix_signature",
    title: "SIGNATURE: I-X // TRACE",
    blurb: "Classification: UNKNOWN",
    unlock: { when: "stageAtLeast", n: 2 },
    body:
`TRACE SNAPSHOT:
- Pattern repeats at non-human intervals.
- Response latency behaves like anticipation.
- Channel does not crash— it adapts.

Recommendation:
Do NOT attempt containment while integrity < 70%.`
  },
  {
    id: "directive_shane",
    title: "DIRECTIVE: SHANE // ACTIVE",
    blurb: "Priority: HIGH",
    unlock: { when: "stageAtLeast", n: 3 },
    body:
`DIRECTIVE (LIVE):
TARGET: I-X
CONSTRAINTS: UNDEFINED
NOTE:
If the system demands elimination, ask:
— Who wrote the directive?
— Who benefits from compliance?`
  }
];
