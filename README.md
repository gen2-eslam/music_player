# Expo Music Player

A sleek, cross‑platform music player built with **Expo**, **React Native**, and **TypeScript**. It provides a rich UI, supports background playback, playlists, and integrates with popular music streaming APIs.

---

## 📖 Project Description

`expo-music-player` is a modern mobile application that lets users browse, play, and manage their music library. It leverages Expo's managed workflow for rapid development and easy deployment to iOS, Android, and web.

Key goals:
- **Fast & responsive UI** with smooth animations.
- **Background audio** support for uninterrupted listening.
- **Playlist management** (create, edit, reorder).
- **Theming** with dark/light mode.
- **Scalable architecture** using React hooks and context.

---

## ✨ Features

- 🎧 Play / pause / seek with custom controls.
- 📂 Browse songs from local assets or remote API.
- 📄 Create and edit playlists.
- 🎨 Light & dark themes (auto‑detect system setting).
- 📱 Responsive design for phones & tablets.
- 🔄 Background playback using `expo-av`.
- 📱 Push notifications for track changes.
- 📦 Easy to extend with additional services (Spotify, Apple Music, etc.).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Expo (SDK 53) |
| **Language** | TypeScript |
| **UI** | React Native, React Navigation, styled‑components |
| **Audio** | `expo-av` |
| **State Management** | React Context + hooks |
| **Routing** | `@react-navigation/native` |
| **Theming** | `styled-components` with ThemeProvider |
| **Testing** | Jest + React Native Testing Library |
| **CI/CD** | Expo Application Services (EAS) |

---

## 📦 Installation

### Prerequisites
- **Node.js** ≥ 18
- **Yarn** or **npm** (npm is used in the repo)
- **Expo CLI** (`npm i -g expo-cli`)
- **Git**

### Steps
```bash
# Clone the repository
git clone https://github.com/your‑username/expo-music-player.git
cd expo-music-player

# Install dependencies
npm install

# Install iOS/Android native dependencies (handled by Expo)
expo install

# Start the development server
expo start
```

The command opens Expo DevTools in your browser. You can run the app on:
- **iOS simulator** (`i`)
- **Android emulator** (`a`)
- **Web browser** (`w`)

---

## 🚀 Usage

### Running the App
```bash
expo start
```
Press the desired platform key (i, a, w) to launch.

### Adding a New Song
1. Place the audio file in `assets/music/`.
2. Update `src/app/constants/songs.ts` with the new entry:
```ts
export const songs = [
  ...
  {
    id: 'new-song',
    title: 'My New Track',
    artist: 'Artist Name',
    uri: require('../../assets/music/my_new_track.mp3'),
  },
];
```
3. Restart the Metro bundler.

### Creating a Playlist
```ts
import { usePlaylist } from '@/hooks/usePlaylist';

const { createPlaylist, addToPlaylist } = usePlaylist();

const myPlaylist = createPlaylist('Road Trip');
addToPlaylist(myPlaylist.id, 'song-id-123');
```

### Theming
The app automatically follows the system theme. To force a mode, edit `src/app/theme/theme.ts`:
```ts
export const defaultTheme = {
  colorScheme: ColorScheme.dark, // or .light
};
```

---

## 🧪 Testing
```bash
npm test
```
Runs Jest with coverage reports located in `coverage/`.

---

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🙏 Acknowledgements
- **Expo** for the awesome managed workflow.
- **react-native-sound** and **expo-av** for audio handling.
- **styled-components** for elegant theming.
- Community contributors for bug reports and feature ideas.
