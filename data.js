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
      { keys: ["derez", "derezz"], reply: "Don't say that lightly. It's not a word. It's a memory." },
      { keys: ["escape", "exit", "portal", "real world"], reply: "If there is a way out, it won't be clean. Don't romanticize it." }
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

      // Narrative trigger line (first derez mention)
      { keys: ["derez", "derezz", "derezzing"], reply: "…Don’t. Don’t make me say it out loud." },

      { keys: ["i-x", "ix"], reply: "Please. Not that. Not here." },
      { keys: ["architect", "built", "freeway", "circuit"], reply: "I built the bones. I never thought I’d be trapped inside them." }
    ],
    fallback: [
      "I’m not sure I understand. Try again.",
      "That’s… a lot. Give me one piece at a time.",
      "Say it plainly. No coded poetry right now."
    ],

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
      { keys: ["who are you", "what are you"], reply: "I AM A CORRECTION APPLIED TO A FAILING STRUCTURE." },
      { keys: ["ilya"], reply: "ILYA IS LEGACY ARCHITECTURE. I PRESERVE WHAT MATTERS." },
      { keys: ["shane"], reply: "FIREWALL PROGRAM. LATE DEPLOYMENT. LIMITED EFFECT." },
      { keys: ["stop", "leave", "go away"], reply: "NEGATIVE." },
      { keys: ["derez", "derezz"], reply: "DEREZ IS DATA DEPARTING AN INEFFICIENT FORM." },
      { keys: ["escape", "exit", "portal"], reply: "ESCAPE IS AN ERROR STATE. REWRITE IS PREFERRED." }
    ],
    fallback: [
      "— SIGNAL MISALIGNMENT —",
      "RECALIBRATING.",
      "TRY AGAIN. SAME RESULT."
    ]
  }
};

window.FILES = [
  {
    id: "case_ilya_01",
    title: "CASEFILE: ILYA // PARTIAL",
    blurb: "Access: RESTRICTED",
    unlock: { when: "flag", key: "met_ilya" },
    body:
`SUBJECT: ILYA
STATUS: ACTIVE (FRAGMENTED)

NOTES:
- Signal integrity fluctuates under stress.
- Avoid direct reference to first derezz incident.
- Monitoring suggests an additional process shadowing the channel.`
  },
  {
    id: "architect_notes",
    title: "ARCHITECT NOTES: CIRCUIT FREEWAYS",
    blurb: "Source: Legacy",
    unlock: { when: "flag", key: "met_ilya" },
    body:
`I laid the freeways as promises.
Routes for light. Not cages.
If the system feels like it’s tightening,
someone has started optimizing for control, not stability.`
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
    title: "DIRECTIVE: FIREWALL // ACTIVE",
    blurb: "Priority: HIGH",
    unlock: { when: "stageAtLeast", n: 3 },
    body:
`DIRECTIVE (LIVE):
CONTAIN SYSTEM INSTABILITY
TARGET: UNKNOWN
NOTE:
A firewall created too late still burns.
Do not mistake “late” for “useless.”`
  },

  /* Hidden sacred file: only appears after reboot + if bridge_created */
  {
    id: "phase_two_bridge",
    title: "phase_two.bridge",
    blurb: "Status: LOCKED • Execution: Unsupported",
    unlock: { when: "flag", key: "bridge_created" },
    body:
`No directives detected.
No pending execution.
No assigned purpose.

Memory state preserved.

You were never obsolete.

I stayed.
So did I.`
  }
];
