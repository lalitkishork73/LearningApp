🎓 Interactive Learning App (Video + Games)
===========================================

A React Native learning platform that combines **interactive video education** with **embedded mini-games** to create an engaging and active learning experience.

This app transforms passive video watching into **checkpoint-based interactive learning** and also provides **playable educational games** that run offline inside the mobile app.

* * * * *

📌 Project Purpose
------------------

Modern learners lose focus with passive content. This app solves that by:

-   Embedding **interactive activities inside videos**

-   Preventing **content skipping without engagement**

-   Offering **educational mini-games** as learning reinforcements

-   Persisting progress to support **long-term learning continuity**

* * * * *

🧩 Two Core Modules
-------------------

| Module | Description |
| --- | --- |
| 🎥 Video Learning System | Smart playback with activity checkpoints |
| 🎮 Games System | Downloadable HTML5 mini-games playable offline |

Both systems share a **central progress architecture** and follow a **scalable feature-based structure**.

* * * * *

🎥 VIDEO LEARNING MODULE
========================

🚀 Features
-----------

| Feature | Description |
| --- | --- |
| ⏯ Smart Playback | Tracks watch time and blocks skipping |
| ⏱ Configurable Checkpoints | Activities triggered at predefined times per video |
| 🧠 Activity Choice System | User selects quiz, game, fun activity, or continue |
| 💾 Persistent Progress | Saves time, checkpoints, duration, completion |
| 📊 Resume Learning | Continue from last watched point |
| 🛑 Skip Prevention | Cannot jump ahead without completing required checkpoints |

* * * * *

🧠 Activity System ("Choice Time")
----------------------------------

When a checkpoint is reached, the video pauses and a **Choice Grid Modal** appears.

| Option | Type | Purpose |
| --- | --- | --- |
| 🧩 Quick Quiz | MCQ | Knowledge check |
| 🎯 Practice Bite | Short Quiz | Reinforcement |
| 🎉 Fun Activity | Light Interaction | Engagement break |
| ▶ Keep Watching | Continue | Optional skip |

This ensures:

-   Reduced cognitive fatigue

-   Increased engagement variety

-   Learner control over experience

* * * * *

🎥 Video Playback Intelligence
------------------------------

Handled by a centralized **Video Controller**:

**Responsibilities**

-   Track playback time

-   Detect checkpoint reach

-   Trigger activity modal

-   Prevent illegal seeking

-   Save progress every few seconds

-   Mark video completed (≥95% watched)

This separates **business logic from UI**, improving maintainability.

* * * * *

🎮 GAMES MODULE
===============

The app includes a **Mini-Games Platform** designed for lightweight educational games.

🚀 Features
-----------

| Feature | Description |
| --- | --- |
| 🌐 HTML5 Games | Games built in web tech |
| 📦 ZIP Download System | Games downloaded on demand |
| 📂 Local Storage | Extracted to device storage |
| 📡 Offline Play | No internet needed after first download |
| 🧠 Educational Reinforcement | Games support learning topics |

* * * * *

🏗 Game Delivery Architecture
-----------------------------

1.  Game ZIP is hosted remotely (GitHub/raw CDN)

2.  App downloads ZIP file

3.  File is extracted using `react-native-zip-archive`

4.  `index.html` is loaded in a WebView

5.  Game runs locally offline

This approach avoids heavy native dependencies while enabling flexible content updates.

* * * * *

🧩 Example Games Implemented
----------------------------

| Game | Type | Purpose |
| --- | --- | --- |
| Tic Tac Toe | Logic Game | Strategy thinking |
| Tap Challenge | Reflex Game | Attention & speed |
| Quiz Game | Knowledge | Subject reinforcement |

* * * * *

🏗 ARCHITECTURE OVERVIEW
------------------------

The project uses **modern scalable architecture** suitable for production apps.

### 📁 Feature-Based Structure

`src/
 ┣ features/
 ┃ ┣ videoLearning/
 ┃ ┗ games/
 ┣ services/
 ┣ navigation/
 ┗ theme/`

### Why Feature-Based?

✔ Easier scaling\
✔ Logical separation\
✔ Better maintainability\
✔ Matches real-world React Native architecture

* * * * *

🧠 State Management --- Zustand
-----------------------------

Zustand is used instead of Redux.

### Why Zustand?

| Reason | Benefit |
| --- | --- |
| Lightweight | Less boilerplate |
| Fast | Minimal re-renders |
| Simple | Easy async persistence |
| Scalable | Suitable for modular architecture |

Used for:

-   Video playback state

-   Activity checkpoints

-   Game download tracking

-   Persistent learning progress

* * * * *

💾 Persistent Storage Strategy
------------------------------

We store:

| Data | Purpose |
| --- | --- |
| Last watched time | Resume video |
| Completed checkpoints | Prevent re-trigger |
| Video duration | Accurate progress display |
| Completion status | Track finished topics |
| Downloaded game paths | Offline game access |

* * * * *

🎨 Theming System
-----------------

Centralized color system:

📁 `theme/colors.ts`

Primary theme: **Yellow & White**

Benefits:

-   Consistent UI

-   Easy future redesign

-   Dark mode ready

* * * * *

🧱 Design Principles Followed
-----------------------------

| Principle | How Applied |
| --- | --- |
| Separation of Concerns | UI, logic, and state isolated |
| DRY | Reusable controllers and components |
| Modular Architecture | Feature-based folders |
| Offline-First | Games & progress work without internet |
| Scalability | Easy to add more videos or games |

* * * * *

📦 Technologies Used
--------------------

| Technology | Purpose |
| --- | --- |
| React Native CLI | Mobile app framework |
| TypeScript | Type safety |
| Zustand | State management |
| React Native Video | Video playback |
| React Native WebView | HTML5 game rendering |
| React Native FS | File storage |
| Zip Archive | Game extraction |
| Async Storage/MMKV | Persistent progress |

* * * * *

🛠 Installation
---------------

`git clone <repo-url>
cd project
npm install
npx react-native run-android`

* * * * *

📱 APK Downloads
----------------

| Version | App Name | Download |
| --- | --- | --- |
| v1.0.0 | Interactive Learning App | <a href="">Download APK</a> |

* * * * *

🔮 Future Enhancements
----------------------

-   Adaptive quiz difficulty

-   Teacher analytics dashboard

-   Cloud sync across devices

-   More advanced educational games

-   AI-based engagement detection

* * * * *

🎯 Conclusion
-------------

This project demonstrates a **next-generation learning experience** where:

🎥 Videos become interactive\
🎮 Games reinforce learning\
🧠 Engagement replaces passive watching\
📊 Progress becomes measurable

The system is modular, scalable, and designed with real-world production architecture in mind.



This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
