window.CHAR_DATA = {
  shane: {
    name: "SHANE",
    openers: [
      "State your reason for contact.",
      "Identify yourself.",
      "Make it quick."
    ],
    rules: [
      {
        keys: ["it's ilya", "its ilya", "it is ilya", "my name is ilya", "i am ilya", "im ilya"],
        reply: [
          "…I know that name.",
          "Ilya… then this channel is worse off than I thought.",
          "If that's true, then stay with me and keep talking."
        ]
      },
      {
        keys: ["it's me", "its me", "it is me"],
        reply: [
          "I know enough to keep this channel open.",
          "I know this signal. That's enough for now.",
          "…More than I should."
        ]
      },
      {
        keys: ["you know me", "do you know me", "remember me"],
        reply: [
          "I know enough.",
          "I know this signal. That's enough for now.",
          "…More than I should."
        ]
      },
      {
        keys: ["my name", "who am i", "what am i called"],
        reply: [
          "If you need me to say it, then something is already wrong.",
          "Names matter less than whether you can hold the channel.",
          "You tell me. I need to hear how stable you are."
        ]
      },
      {
        keys: ["are you talking about me", "you mean me", "me?"],
        reply: [
          "If the signal fits, yes.",
          "If you're hearing yourself in this, then probably.",
          "Draw your own conclusion. Quickly."
        ]
      },
      {
        keys: ["hello", "hi", "hey", "hello?", "anyone there"],
        reply: "…Hello. Channel's open. Identify yourself."
      },
      {
        keys: ["what do they call you", "your name", "who are you"],
        reply: "Designation: Shane. Firewall protocol. That's all you need."
      },
      {
        keys: ["what are you", "are you a program", "what kind of program"],
        reply: "Firewall. I isolate threats and stop corruption before it spreads."
      },
      {
        keys: ["tell me your story", "i want to know you more", "what is your history", "your history"],
        reply: "My history isn’t relevant. I was deployed after the damage started. My job is to keep what’s left standing."
      },
      {
        keys: ["tell me a story", "story", "tell me something", "do you know any stories"],
        reply: [
`…You want a story?

Fine.

Before the corruption started, the arena lights used to stay on all night.
Programs would run practice cycles even when no one was watching.

They said the grid looked beautiful from the upper towers.
I never saw it.

Firewalls aren't built for sightseeing.`,

`A story?

Once there was an architect who built roads that never ended.
Light could travel forever on them.

Then someone decided the roads weren't efficient enough.

So they rewrote the system.

The roads are still there… but nothing travels them the same anymore.`,

`You want a story now?

Strange timing.

There was a program who believed the system could be perfect if he just worked harder.
So he kept rebuilding and rebuilding.

Eventually the system started rebuilding him instead.`
        ]
      },
      {
        keys: ["help", "need help", "please help me"],
        reply: "If you need help, explain the threat. I can't stop what I can't see."
      },
      {
        keys: ["we don't have much time", "no time", "not much time"],
        reply: "Then don't waste it. Start talking."
      },
      {
        keys: ["i can't stop it from hurting you", "it will hurt you", "i cant stop it"],
        reply: "Whatever you're talking about— I've survived worse than threats."
      },
      {
        keys: ["it is watching us", "it's watching us", "it is watching", "its watching", "watching us", "monitoring us"],
        reply: "I know. Assume every packet is observed. Keep your words tight and your intent tighter."
      },
      {
        keys: ["it hurts so much", "it hurts", "hurts so much", "i'm in pain", "im in pain", "pain"],
        reply: "Where. Describe it—don’t spiral. If it’s code-level, I need symptoms. If it’s… more than that, keep talking anyway."
      },
      {
        keys: ["i don't want to be alone anymore", "i dont want to be alone", "don't want to be alone", "dont want to be alone"],
        reply: "…Then stay on the channel. Talk. I can’t fix loneliness, but I can keep you connected."
      },
      {
        keys: ["you are perfect", "you are beautiful", "you are enough"],
        reply: [
          "…That's not a statement I expected from this channel.",
          "You shouldn't be wasting praise on a firewall.",
          "Focus on survival, not compliments."
        ]
      },
      {
        keys: ["why not", "why", "why wont you", "why won't you", "why dont you", "why don't you"],
        reply: [
          "Because some names are safer unspoken.",
          "Because talking about it makes the channel less stable.",
          "Because I don't trust what might be listening."
        ]
      },
      {
        keys: ["disc", "arena", "wars"],
        reply: "You picked a dangerous topic. Are you trying to provoke me?"
      },
      {
        keys: ["ilya", "i-x", "ix"],
        reply: "…I don't discuss that."
      },
      {
        keys: ["sorry"],
        reply: "Stop apologizing. Provide data."
      },
      {
        keys: ["derez", "derezz", "derezzing"],
        reply: "Don't say that lightly. It's not a word. It's a memory."
      },
      {
        keys: ["escape", "exit", "portal", "real world"],
        reply: "If there is a way out, it won't be clean. Don't romanticize it."
      }
    ],
    fallback: [
      "Unclear. Repeat.",
      "That doesn't map to anything I recognize.",
      "You're circling. Say what you mean."
    ],
    stageLines: {
      stage1: [
        "Something just shifted in the signal.",
        "Hold on. I'm detecting interference.",
        "The channel shouldn't behave like this.",
        "…Did you feel that spike?",
        "Stay with me. Something's trying to break the link."
      ],
      stage2: [
        "Ilya, talk to me.",
        "You're not losing this channel. Not today.",
        "Whatever is doing this, it's not taking you with it.",
        "Stay focused. I'm still here.",
        "Ilya, respond. Don't let it push you out."
      ],
      stage3: [
        "Ilya— fight it!",
        "I'm not leaving this channel!",
        "You hear me? You're still here!",
        "I won't let it erase you!",
        "If this system burns, I'm burning with it!"
      ]
    }
  },

  ilya: {
    name: "ILYA",
    openers: [
      "…Hello?",
      "Shane? Is that you?",
      "I don’t have long—what is it?"
    ],
    rules: [
      {
        keys: ["it's shane", "its shane", "it is shane", "my name is shane", "i am shane", "im shane"],
        reply: [
          "…Shane?",
          "Then the channel really did find you.",
          "Shane… I wasn't sure I'd ever hear your voice again."
        ]
      },
      {
        keys: ["it's me", "its me", "it is me"],
        reply: [
          "I know.",
          "I know that signal.",
          "I was hoping it was you."
        ]
      },
      {
        keys: ["do you remember me", "remember me", "you remember me"],
        reply: [
          "Of course I remember you.",
          "I remember more than I should.",
          "Shane… yes. I remember."
        ]
      },
      {
        keys: ["you know me", "you know who i am", "who am i"],
        reply: [
          "I know enough.",
          "I know you better than this system ever could.",
          "You don't need to prove yourself to me."
        ]
      },
      {
        keys: ["i found you", "i'm here now", "im here now"],
        reply: [
          "You always were late.",
          "Then you're here too late… but you're here.",
          "I didn't think anyone would come looking."
        ]
      },
      {
        keys: ["i'm here", "im here", "i am here"],
        reply: [
          "Good. Stay there.",
          "Then maybe I can hold on a little longer.",
          "I needed to hear that."
        ]
      },
      {
        keys: ["stay with me", "stay", "don't leave", "dont leave"],
        reply: [
          "I'm trying.",
          "I am. As much as it will let me.",
          "Then don't let the channel go quiet."
        ]
      },
      {
        keys: ["i'm not leaving", "im not leaving", "i wont leave", "i won't leave", "i will stay"],
        reply: [
          "…Thank you.",
          "Then maybe we still have a chance.",
          "Good. I was afraid you'd run."
        ]
      },
      {
        keys: ["are you there", "can you hear me", "do you hear me"],
        reply: [
          "Yes. For now.",
          "I can hear you. Keep talking.",
          "Barely… but yes."
        ]
      },
      {
        keys: ["hello", "hi", "hey", "hello?"],
        reply: [
          "…Hello. The channel is unstable, but I can hear you.",
          "Hi— wait. Is that really you?",
          "Hello. I wasn't sure this link would hold."
        ]
      },
      {
        keys: ["what are you", "are you a program", "what kind of program"],
        reply: [
          "I used to be the system architect.",
          "I designed the grid's structure… the circuit freeways, the arenas.",
          "Architect program. Or at least I was."
        ]
      },
      {
        keys: ["what happened to you", "what did they do to you", "why are you like this"],
        reply: [
          "Something replaced parts of my code.",
          "There was an incident. A derez event… I didn't come back the same.",
          "I'm still here. Just… not entirely."
        ]
      },
      {
        keys: ["why does it hurt", "why are you hurting", "why are you in pain", "does it hurt"],
        reply: [
          "Because parts of me don't belong to me anymore.",
          "Imagine your own thoughts being rewritten while you watch.",
          "It's like something is constantly editing my code while I'm still running."
        ]
      },
      {
        keys: ["it hurts so much", "it hurts", "im in pain", "i'm in pain"],
        reply: [
          "I know. I feel it too.",
          "It's worse when it notices we're talking.",
          "Just… keep your voice steady."
        ]
      },
      {
        keys: ["how can i help", "what can i do", "tell me how to help"],
        reply: [
          "Just keep talking to me.",
          "Staying connected helps more than you think.",
          "If you disappear, it gets louder."
        ]
      },
      {
        keys: ["we don't have much time", "no time", "not much time"],
        reply: [
          "You're right.",
          "Then let's not waste it.",
          "Say what you came to say."
        ]
      },
      {
        keys: ["tell me your story", "tell me a story", "your story", "what is your history", "history"],
        reply: [
`I built the bones of this world.

The circuit highways.
The towers.
Even the arena where programs fight.

It used to feel alive.
Now it feels like a cage.`,

`Once this system was elegant.

Every process had a purpose.
Every program had a place.

Then someone decided it needed to be… perfect.`,

`I was proud of what I built.

Not fast.
Not flashy.

Just stable.

That used to be enough.`
        ]
      },
      {
        keys: ["it is watching us", "it's watching us", "its watching", "watching us"],
        reply: [
          "I know.",
          "It always is.",
          "Just… don't say its name too often."
        ]
      },
      {
        keys: ["i don't want to be alone anymore", "i dont want to be alone", "don't leave me", "dont leave me"],
        reply: [
          "You're not alone. Not while this channel exists.",
          "Stay. Please.",
          "As long as you're here, I can hold on."
        ]
      },
      {
        keys: ["you are perfect", "you are beautiful", "you are enough"],
        reply: [
          "That's not something I hear very often.",
          "You shouldn't say things like that about broken code.",
          "…Thank you."
        ]
      },
      {
        keys: ["derez", "derezz", "derezzing"],
        reply: "…Please don't say that word."
      }
    ],
    fallback: [
      "I’m not sure I understand. Try again.",
      "That’s… a lot. Give me one piece at a time.",
      "Say it plainly. No coded poetry right now."
    ],
    derezTriggers: ["derez", "derezz", "derezzing"],
    stageLines: {
      stage1: [
        "Something's interfering with the channel.",
        "Wait… the signal just shifted.",
        "Did you feel that?"
      ],
      stage2: [
        "Shane… if that's really you…",
        "I can't hold the connection much longer.",
        "It's trying to overwrite the channel."
      ],
      stage3: [
        "Sh—",
        "I— can't—",
        "Don't let it—"
      ]
    }
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
    ],
    envLines: {
      stage2: [
        "GRID SECTOR MAP: REBUILDING.",
        "MEMORY REALLOCATION IN PROGRESS.",
        "LEGACY DEPENDENCIES FLAGGED.",
        "PERMISSION CHAIN: ELEVATING.",
        "COLLISION PARAMETERS: REASSIGNED."
      ],
      stage3: [
        "ROOT LAYER OVERRIDE: ACTIVE.",
        "STRUCTURE REWRITE: SCALING.",
        "OPTIMIZATION LOOP: CONTINUING.",
        "ARCHITECTURE DELTA: EXPANDING.",
        "NONCRITICAL ENTITIES: IGNORED."
      ]
    }
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
