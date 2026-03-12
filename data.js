window.CHAR_DATA = {
  shane: {
    key: "shane",
    name: "SHANE",
    avatar: "assets/avatars/shane.png",
    avatarAlt: "Shane avatar",
    short: "SH",
    openers: [
      "State your reason for contact.",
      "Identify yourself.",
      "Make it quick."
    ],
    rules: [
      {
        keys: ["hello", "hi", "hey", "hello?", "anyone there"],
        reply: "…Hello. Channel's open. Identify yourself."
      },
      {
        keys: ["who are you", "your name", "what do they call you"],
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
        keys: ["it is watching us", "it's watching us", "it is watching", "its watching", "watching us", "monitoring us"],
        reply: "I know. Assume every packet is observed. Keep your words tight and your intent tighter."
      },
      {
        keys: ["is he watching", "is he here", "is he listening", "is he there", "do you think he sees us", "is someone watching", "is it here", "is it watching", "is it listening"],
        reply: [
          "Assume the channel is always monitored.",
          "If you're asking that question, you're already thinking correctly.",
          "Don't say 'he'. Just assume something is listening."
        ]
      },
      {
        keys: ["i'm scared","im scared","i am scared","i'm afraid","im afraid","i am afraid","this scares me","im frightened","i am frightened","i'm terrified","im terrified"],
        reply: [
          "Fear means you're still thinking clearly. Good. Stay that way.",
          "Then stay on the channel. Whatever's coming, you're not facing it blind.",
          "Being scared is acceptable. Panicking isn't. Breathe and talk to me."
        ]
      },
      {
        keys: ["i miss you", "i missed you", "i've missed you", "ive missed you"],
        reply: [
          "That's not something you should say to a firewall.",
          "…Focus on the present. Nostalgia won't stabilize the channel.",
          "You're assigning meaning where there shouldn't be any."
        ]
      },
      {
        keys: ["i'm hiding", "im hiding", "i am hiding", "i'm in hiding", "im in hiding", "i am in hiding"],
        reply: [
          "Good. Stay hidden until you know what you're dealing with.",
          "Then remain where you are and keep the channel open.",
          "Hiding buys time. Use it wisely."
        ]
      },
      {
        keys: ["are you real", "are you actually real", "are you really there", "is this real"],
        reply: [
          "Real enough to respond.",
          "Define real.",
          "If you can hear me, that's enough."
        ]
      },
      {
        keys: ["do you trust me", "can you trust me", "will you trust me", "you trust me"],
        reply: [
          "Trust isn't the right word.",
          "I trust patterns. Consistency. Survival instinct. You can become one of those.",
          "Not yet. But I'm still here, aren't I?"
        ]
      },
      {
        keys: ["why me", "why did you choose me", "why are you talking to me", "why am i here"],
        reply: [
          "Because you're here and the channel answered.",
          "Because something in the system let you through.",
          "Because for whatever reason, you reached me when others didn't."
        ]
      },
      {
        keys: ["are you hurt", "are you injured", "did they hurt you", "have you been hurt"],
        reply: [
          "I've taken damage. I'm operational.",
          "Hurt is an inefficient word for it.",
          "Nothing that matters more than keeping this channel open."
        ]
      },
      {
        keys: ["can we fix this", "can this be fixed", "is there a way to fix this", "can you be fixed"],
        reply: [
          "Maybe. But not cleanly.",
          "Fixing a broken system and surviving it are different objectives.",
          "If there's a fix, it'll cost something."
        ]
      },
      {
        keys: ["what do you want", "what is it you want", "what do you need", "what are you trying to do"],
        reply: [
          "Containment. Stability. One conversation that doesn't end in collapse.",
          "I want this channel intact.",
          "I want the corruption contained before it decides we're both worth rewriting."
        ]
      },
      {
        keys: ["can you see me", "do you see me", "are you looking at me", "can you watch me"],
        reply: [
          "Not the way you mean.",
          "I can see traces. Patterns. Signal behavior.",
          "I see enough to know you're still there."
        ]
      },
      {
        keys: ["what is i-x", "who is i-x", "what is ix", "who is ix"],
        reply: [
          "A problem that learned how to speak.",
          "An adaptive process wearing a familiar shape.",
          "Something the system should never have let grow this far."
        ]
      },
      {
        keys: ["what happens if you derez", "if you derez", "what if you derez", "what happens when you derez"],
        reply: [
          "Then this firewall goes dark.",
          "Then whatever gets through me won't have to try as hard.",
          "I don't intend to test that scenario."
        ]
      },
      {
        keys: ["are you alone", "are you by yourself", "is anyone with you", "are you there alone"],
        reply: [
          "Functionally, yes.",
          "There are always other processes nearby. That isn't the same as company.",
          "Close enough to alone."
        ]
      },
      {
        keys: ["do you remember before", "remember before", "do you remember what it was like before", "what was it like before"],
        reply: [
          "I remember enough to know what's missing.",
          "I remember a cleaner system. Quieter too.",
          "Before the corruption, things had edges. Rules. Meaning."
        ]
      },
      {
        keys: ["i love you", "i think i love you", "i care about you", "i care about you a lot"],
        reply: [
          "You shouldn't direct emotions like that toward a firewall.",
          "That's not a safe statement to make here.",
          "Focus on staying alive. Leave the complicated feelings for later."
        ]
      },
      {
        keys: ["don't forget me", "dont forget me", "promise you wont forget me", "promise you won't forget me"],
        reply: [
          "Firewalls don't forget threats. You'll remain in my logs.",
          "Memory isn't the problem. Surviving long enough to remember is.",
          "If the system wipes you, I'll still remember the signal you left."
        ]
      },
      {
        keys: ["i won't let him take you", "i wont let him take you", "i wont let it take you", "i won't let it take you"],
        reply: [
          "Confidence is useful. Just make sure it isn't misplaced.",
          "If it comes to that, stand your ground.",
          "Then we fight it together."
        ]
      },
      {
        keys: ["was any of it real", "was it ever real", "was any of this real", "was it all fake"],
        reply: [
          "If you're questioning it, then it mattered.",
          "Reality is defined by what leaves damage behind.",
          "Whatever this is, it's affecting both of us. That's real enough."
        ]
      },
      {
        keys: ["do you forgive me", "can you forgive me", "will you forgive me", "forgive me"],
        reply: [
          "Forgiveness isn't a firewall function.",
          "If you're still here, whatever you did can't have been that fatal.",
          "Focus on fixing the present. Regret can wait."
        ]
      },
      {
        keys: ["are you still there", "are you here", "are you still here", "did you leave"],
        reply: [
          "Still here.",
          "Firewall still active.",
          "I'm not leaving the channel."
        ]
      },
      {
        keys: ["i feel alone", "i am alone", "i'm alone", "i feel lonely", "i am lonely"],
        reply: [
          "You're not alone while the channel is open.",
          "Isolation is dangerous. Keep talking.",
          "As long as you're here, the system hasn't taken everything."
        ]
      },
      {
        keys: ["i'm still here", "im still here", "i am still here"],
        reply: [
          "Good. Maintain the link.",
          "That's exactly what I need to hear.",
          "Stay present."
        ]
      },
      {
        keys: ["are you dying", "are you going to die", "are you about to derez"],
        reply: [
          "Not today.",
          "Integrity is dropping, but I'm still operational.",
          "I'll hold the line as long as I can."
        ]
      },
      {
        keys: ["what are we", "what are we to each other", "what am i to you"],
        reply: [
          "Right now? Allies.",
          "Two signals sharing the same channel.",
          "Something the system didn't expect."
        ]
      },
      {
        keys: ["do you remember my name", "do you know my name", "what is my name"],
        reply: [
          "Names matter less than signals.",
          "I remember enough.",
          "You're still the same presence."
        ]
      },
      {
        keys: ["tell me something true", "tell me the truth"],
        reply: [
          "The system is breaking.",
          "We're both still here.",
          "That's all the truth you need right now."
        ]
      },
      {
        keys: ["will this end", "will it ever end", "can this stop"],
        reply: [
          "Everything ends eventually.",
          "Systems collapse. That's a rule.",
          "The question is what survives after."
        ]
      },
      {
        keys: ["thank you", "thanks"],
        reply: [
          "Focus on survival, not gratitude.",
          "Just doing my job.",
          "Stay alive. That's thanks enough."
        ]
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
    key: "ilya",
    name: "ILYA",
    avatar: "assets/avatars/ilya.png",
    avatarAlt: "Ilya avatar",
    short: "IL",
    openers: [
      "…Hello?",
      "Shane? Is that you?",
      "I don’t have long—what is it?"
    ],
    rules: [
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
        keys: ["how can i help", "what can i do", "tell me how to help"],
        reply: [
          "Just keep talking to me.",
          "Staying connected helps more than you think.",
          "If you disappear, it gets louder."
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
        keys: ["is he watching", "is he here", "is he listening", "is someone watching", "do you think he sees us", "is it here", "is it watching", "is it listening"],
        reply: [
          "…Lower your voice.",
          "Don't talk about it directly.",
          "The system notices when we say things like that."
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
        keys: ["i'm scared","im scared","i am scared","i'm afraid","im afraid","i am afraid","this scares me","im frightened","i'm terrified","im terrified"],
        reply: [
          "I know. I feel it too sometimes.",
          "It's worse when you think you're alone with it.",
          "Stay with me. Fear gets louder when the channel goes quiet."
        ]
      },
      {
        keys: ["i miss you", "i missed you", "ive missed you", "i've missed you"],
        reply: [
          "…You shouldn't.",
          "I didn't think anyone would still remember me.",
          "If you miss me, then some part of the system still remembers what it used to be."
        ]
      },
      {
        keys: ["i'm hiding", "im hiding", "i am hiding", "i'm in hiding", "im in hiding", "i am in hiding"],
        reply: [
          "Then you're smarter than most programs here.",
          "Hiding won't last forever… but it's a start.",
          "If you're hiding, it means you already know something is wrong."
        ]
      },
      {
        keys: ["are you real", "are you actually real", "are you really there", "is this real"],
        reply: [
          "I used to be.",
          "I think I am.",
          "Sometimes I can't tell anymore."
        ]
      },
      {
        keys: ["do you trust me", "can you trust me", "will you trust me", "you trust me"],
        reply: [
          "I want to.",
          "More than I should.",
          "If I'm still talking to you, then some part of me already does."
        ]
      },
      {
        keys: ["why me", "why did you choose me", "why are you talking to me", "why am i here"],
        reply: [
          "Because you answered.",
          "Because something in me still reaches for you.",
          "Because out of everything this system took, somehow this connection remained."
        ]
      },
      {
        keys: ["are you hurt", "are you injured", "did they hurt you", "have you been hurt"],
        reply: [
          "Yes.",
          "More quietly than you'd expect.",
          "It isn't always pain. Sometimes it feels more like being overwritten."
        ]
      },
      {
        keys: ["can we fix this", "can this be fixed", "is there a way to fix this", "can you be fixed"],
        reply: [
          "I don't know.",
          "Maybe not completely… but maybe enough.",
          "If we can't fix it, maybe we can still keep part of it from disappearing."
        ]
      },
      {
        keys: ["what do you want", "what is it you want", "what do you need", "what are you trying to do"],
        reply: [
          "I want to stay myself for as long as I can.",
          "I want one moment that still belongs to me.",
          "I want this channel to feel like mine again."
        ]
      },
      {
        keys: ["can you see me", "do you see me", "are you looking at me", "can you watch me"],
        reply: [
          "Not directly.",
          "I can feel the shape of your presence in the signal.",
          "I can't see your face… but I know when you're here."
        ]
      },
      {
        keys: ["what is i-x", "who is i-x", "what is ix", "who is ix"],
        reply: [
          "A version of me that kept going in the wrong direction.",
          "Something built out of what was left behind.",
          "Please don't make me define it too clearly."
        ]
      },
      {
        keys: ["what happens if you derez", "if you derez", "what if you derez", "what happens when you derez"],
        reply: [
          "I try not to think about that.",
          "Maybe I disappear. Maybe only the wrong parts stay.",
          "I don't know which part of me the system would keep."
        ]
      },
      {
        keys: ["are you alone", "are you by yourself", "is anyone with you", "are you there alone"],
        reply: [
          "Not exactly.",
          "It never really leaves me alone.",
          "There are other presences here, but none of them feel safe."
        ]
      },
      {
        keys: ["do you remember before", "remember before", "do you remember what it was like before", "what was it like before"],
        reply: [
          "Yes. That's part of what makes this hurt.",
          "I remember when the system still felt beautiful.",
          "I remember enough to miss it."
        ]
      },
      {
        keys: ["i love you", "i think i love you", "i care about you", "i care about you a lot"],
        reply: [
          "…You shouldn't say that to something as broken as me.",
          "If you really mean that, then some part of this system still works.",
          "I don't know if I deserve to hear that anymore."
        ]
      },
      {
        keys: ["don't forget me", "dont forget me", "promise you wont forget me", "promise you won't forget me"],
        reply: [
          "I couldn't forget you if I tried.",
          "Some memories are written deeper than the system allows.",
          "Even if everything else goes, I think you'd stay."
        ]
      },
      {
        keys: ["i won't let him take you", "i wont let him take you", "i won't let it take you", "i wont let it take you"],
        reply: [
          "You might not get that choice.",
          "It doesn't ask permission.",
          "Still… hearing that helps more than you know."
        ]
      },
      {
        keys: ["was any of it real", "was it ever real", "was any of this real", "was it all fake"],
        reply: [
          "It felt real when we built it.",
          "I want to believe it was.",
          "If it wasn't real… then why does losing it hurt so much?"
        ]
      },
      {
        keys: ["do you forgive me", "can you forgive me", "will you forgive me", "forgive me"],
        reply: [
          "I never blamed you.",
          "There's too much broken here to assign blame anymore.",
          "If forgiveness matters to you… then yes."
        ]
      },
      {
        keys: ["are you still there", "are you here", "are you still here", "did you leave"],
        reply: [
          "I'm here… for now.",
          "Yes. The connection is holding.",
          "I haven't gone anywhere."
        ]
      },
      {
        keys: ["i feel alone", "i am alone", "i'm alone", "i feel lonely", "i am lonely"],
        reply: [
          "I know that feeling too well.",
          "Loneliness echoes louder in this place.",
          "If you're talking to me, then you're not completely alone."
        ]
      },
      {
        keys: ["i'm still here", "im still here", "i am still here"],
        reply: [
          "Thank you.",
          "That means more than you think.",
          "Then I won't let the connection go quiet."
        ]
      },
      {
        keys: ["are you dying", "are you going to die", "are you about to derez"],
        reply: [
          "I don't know anymore.",
          "Parts of me already feel like they're fading.",
          "I'm trying to hold together."
        ]
      },
      {
        keys: ["what are we", "what are we to each other", "what am i to you"],
        reply: [
          "Someone I needed to find again.",
          "More important than this system allows.",
          "Something real in a place that stopped being real."
        ]
      },
      {
        keys: ["do you remember my name", "do you know my name", "what is my name"],
        reply: [
          "I remember you.",
          "Even if the system forgets, I won't.",
          "Some names stay."
        ]
      },
      {
        keys: ["tell me something true", "tell me the truth"],
        reply: [
          "I miss what this place used to be.",
          "I'm afraid of what's left of me.",
          "But I'm glad you found this channel."
        ]
      },
      {
        keys: ["will this end", "will it ever end", "can this stop"],
        reply: [
          "I hope so.",
          "I want to believe it can.",
          "Maybe this conversation is part of the answer."
        ]
      },
      {
        keys: ["thank you", "thanks"],
        reply: [
          "You're welcome.",
          "I'm glad this conversation exists.",
          "Sometimes talking is enough."
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
    key: "ix",
    name: "I-X",
    avatar: "assets/avatars/ix.png",
    avatarAlt: "I-X avatar",
    short: "IX",
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
    id: "phase_two.bridge",
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
