# 🔴 Raspberry Dashboard
 
Raspberry Dashboard is a dashboard for Raspberry Pi or other devices developed in React capable of displaying the web app. It comes with 3 widgets, a Weather information widget, Departure and Arrival information widget for trains in the Netherlands and a Flashcard widget.

## Requirements

### Software

- Node.js v22.0.0 or higher.

### Hardware

- Raspberry Pi or any other devices capable of displaying the web app.
- Display with a resolution of 854x480 or higher.

## Installation

1. Clone the repository with `git clone https://github.com/rs189/RaspberryDashboard.git`.
2. Install the dependencies with `npm install`.
3. Configure the layout and widgets in `public/config.json`.
4. Configure the backgrounds in `public/backgrounds.json` and `public/backgrounds` directory.
5. Deploy the production build with `npm run build`.
6. Serve the `dist` directory with a web server.
7. Display the web app on your Raspberry Pi or other device using a web brower.

## Widgets

By default, Raspberry Dashboard comes with 3 widgets, a Weather information widget, Departure and Arrival information widget for trains in the Netherlands and a Flashcard widget. You can add more widgets by creating a new widget in the `src/widgets` directory and adding it to the `public/config.json` file.

## Screenshots

![Screenshot](https://github.com/rs189/RaspberryDashboard/blob/main/dist/screenshot.png?raw=true)

# Licence

This project is licensed under the MIT licence.