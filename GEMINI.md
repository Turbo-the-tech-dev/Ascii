# Gemini Workspace Analysis

This directory contains the "Ascii" project, which has two main components: a React Native mobile application for generating ASCII art, and a conceptual website.

## Project: AsciiGenerator (React Native App)

**Project Overview:**
A mobile application for generating ASCII art from text input. It's built with React Native and uses the `figlet` library for ASCII art conversion.

**Building and Running:**
*   **Install dependencies:** `cd AsciiGenerator && npm install`
*   **Run on Android:** `cd AsciiGenerator && npm run android`
*   **Run on iOS:** `cd AsciiGenerator && npm run ios`
*   **Run tests:** `cd AsciiGenerator && npm run test`
*   **Start the bundler:** `cd AsciiGenerator && npm run start`

**Development Conventions:**
*   The project is built with React Native and TypeScript.
*   The main application logic is in `AsciiGenerator/App.tsx`.
*   Dependencies are managed with `npm` in the `AsciiGenerator/package.json` file.
*   Unit tests are located in `AsciiGenerator/__tests__` and run with Jest.

## Project: docs (Website)

**Project Overview:**
A simple HTML landing page that describes the conceptual goals of the "Ascii" project, which is envisioned to be a tool that generates ASCII art while providing feedback on coding style.

**Usage:**
Open `docs/index.html` in a web browser to view the project's conceptual landing page.
