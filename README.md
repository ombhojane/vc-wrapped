# VC Wrapped 2025

**See how you're connected to the people who shaped your year.**

Your phone knows who matters to you. Every call you made, every late-night conversation, every quick check-in - it's all there in your call logs. VC Wrapped reads your call history and turns it into a beautiful story about your relationships in 2025.

<img width="1600" height="900" alt="vcwrapped" src="https://github.com/user-attachments/assets/8d7534ff-4551-424a-a0d0-d93d3b139cfc" />

---

## What is this?

Think of it like **Spotify Wrapped, but for your phone calls**.

Instead of showing your top songs, VC Wrapped shows you:
- **Who you talked to most** — your inner circle
- **How much time you spent on calls** — in hours and days
- **Your calling personality** — are you a Night Owl? A Listener First? A Catch-Up King?
- **When you call most** — your peak hours and busiest days
- **The calls you missed** — we all have them

It's a 10-slide story that you can tap through, save to your gallery, and share with friends.

---

## How it works

1. **Open the app** — tap "Replay my Year"
2. **Grant permission** — the app needs to read your call logs (that's it, nothing else)
3. **Watch your story** — tap through your personalized wrapped experience
4. **Save & share** — download all slides to your phone

Your data never leaves your device. The app reads your call logs locally and calculates everything on your phone.

---

## The Wrapped Experience

The story takes you through:

| Slide | What it shows |
|-------|---------------|
| Opening | Sets the tone — "This year, you made your voice count" |
| Talk Time | Total hours spent on calls this year |
| Personality | Your calling personality based on your patterns |
| Inner Circle | Your top 3 people by talk time |
| Time & Mood | When you call most — peak hour and busiest day |
| Call Types | Breakdown of work vs. personal vs. fun calls |
| Missed Calls | The ones that got away |
| Growth | How your calling habits reflect your year |
| Wisdom | A meaningful quote to take with you |
| Final | Save your wrapped and replay anytime |

---

## Tech Stack

This is a **React Native** app built for Android. Here's what powers it:

| What | How |
|------|-----|
| **Framework** | React Native 0.83 |
| **Language** | TypeScript |
| **Call Log Access** | Custom native Android module (Java) |
| **Animations** | React Native Reanimated |
| **UI** | Custom components with Poppins font |
| **Story Progress** | Instagram-style progress bars |
| **Saving** | React Native View Shot + Camera Roll |
| **Storage** | Async Storage (for app state) |

### Project Structure

```
vc/
├── App.tsx                    # Main app — manages screens and wrapped modal
├── src/
│   ├── screens/
│   │   ├── OnboardingScreen   # Landing page with "Replay my Year" button
│   │   ├── DashboardScreen    # After wrapped — shows your stats
│   │   └── wrapped/
│   │       ├── WrappedModal   # The story experience container
│   │       └── slides/        # All 10 story slides
│   ├── services/
│   │   ├── callLogService     # Reads call logs from Android
│   │   ├── contactsService    # Gets contact names
│   │   └── statsProcessor     # Calculates all the wrapped stats
│   ├── hooks/
│   │   └── useCallData        # Main hook that fetches and processes data
│   ├── components/            # Reusable UI components
│   ├── theme/                 # Colors, fonts, styling
│   └── types/                 # TypeScript interfaces
├── android/                   # Native Android code
│   └── .../CallLogModule.java # Custom module to read call logs
└── assets/
    ├── designs/               # Background images for slides
    └── fonts/                 # Poppins font family
```

### How the Stats Work

The `statsProcessor.ts` file takes your raw call logs and calculates:

- **Total talk time** — sum of all call durations
- **Top contacts** — sorted by total time spent talking
- **Personality** — based on call patterns (night calls, call length, incoming vs outgoing ratio)
- **Peak hour** — the hour when you make the most calls
- **Busiest day** — which day of the week you're most active
- **Call type percentages** — work hours vs personal hours calls

---

## Running Locally

### Prerequisites

- Node.js 20+
- Android Studio with SDK
- A physical Android device or emulator

### Setup

```bash
# Install dependencies
npm install

# Run on Android (in a new terminal)
npx react-native run-android

# Run on iOS (in a new terminal)
npx react-native run-ios
```

## Privacy

**Your data stays on your phone.** 

VC Wrapped reads your call logs locally and calculates everything on-device. No call data is sent anywhere. The only permission needed is `READ_CALL_LOG` (and optionally `READ_CONTACTS` to show names instead of numbers).

---

## Credits

Built by Raksha Poojari and Om Bhojane to explore what our phones know about our relationships.

The idea is simple: **your calls tell a story**. This app just helps you see it.

---

*"Keep calling the people who matter."*
