# Expo Music Player

## Project Description

A cross‑platform music player built with **Expo** and **React Native**. It streams audio from popular services, supports playlists, background playback, and a sleek UI that works on iOS, Android, and web.

## Features

- 🎧 Play, pause, skip, and seek tracks.
- 📂 Create, edit, and reorder playlists.
- 🌙 Light & dark theme with automatic system detection.
- 📱 Responsive layout for phones, tablets, and browsers.
- 🔊 Background audio playback with lock‑screen controls.
- 📦 Offline caching of recent tracks.
- ✅ Type‑safe codebase using **TypeScript**.
- 🧭 Navigation powered by **expo-router** (or **react‑navigation**).
- 🛠️ Easily configurable via environment variables.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Platform | Expo SDK 50, React Native 0.74 |
| Language | TypeScript (strict mode) |
| State Management | React Context + custom hooks (future Redux optional) |
| UI Library | React Native Paper, styled‑components |
| Audio Engine | Expo AV (`Audio.Sound`) |
| Build & Deploy | EAS Build, Expo Go |
| Testing | Jest, React Native Testing Library |

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your‑org/expo-music-player.git
   cd expo-music-player
   ```
2. **Install dependencies**
   ```bash
   npm ci   # installs exact versions from package‑lock.json
   ```
3. **Configure environment** (optional)
   - Copy `.env.example` to `.env` and adjust values such as `API_BASE_URL`.
4. **Run the app**
   ```bash
   npx expo start
   ```
   - Scan the QR code with the Expo Go app (iOS/Android) or press `w` to open in a web browser.

## Usage

### Development

- **Hot reload**: Save a file and the app updates instantly.
- **Debugging**: Press `d` in the Expo CLI to open the DevTools console.
- **Testing**:
  ```bash
  npm test          # runs Jest unit tests
  npm run test:e2e  # runs Expo E2E tests with playwright
  ```

### Core API (login hook example)
```ts
import { useLogin } from './app/features/login/hooks/login_hooks';

function LoginScreen() {
  const { login, loading, error } = useLogin();

  const handleSubmit = async (email: string, password: string) => {
    await login({ email, password });
  };

  return (
    // UI omitted for brevity
  );
}
```
- `useLogin` returns a `login` function, a `loading` flag, and an optional `error` string.
- Errors are thrown for network failures or invalid credentials and can be displayed with a toast.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Follow the existing lint rules (`npm run lint`).
4. Submit a Pull Request with a clear description and screenshots if UI changes are involved.

## License

MIT License – see the [LICENSE](LICENSE) file for details.
