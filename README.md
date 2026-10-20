<h1 align="center">
  <img alt="Logo" src="https://github.com/AgentGhost/ShareMe/blob/master/src/assets/icons/icon.png" height="48">
  ShareMe
</h1>

<p align="center">
  An app for quickly searching and sharing songbook entries with your church group. <br>
  You no longer have to retype their titles over and over again.
</p>

<p align="center">
  <a href="https://app.netlify.com/sites/shareme/deploys">
    <img alt="Netlify Deploys" src="https://img.shields.io/badge/deploys-shareme-00AD9F.svg?logo=netlify">
  </a>
  <a href="https://shareme.netlify.com">
    <img alt="App" src="https://img.shields.io/badge/app-shareme-crimson.svg?logo=angular">
  </a>
</p>

<p align="center">
  Works best on 'chrome for android'.
</p>

# Explanatory notes

<p align="left">
  To get sure to have the actual version of ShareMe, just reload the page in the desktop app on your device. <br>
  <br>
  You can search for songs by title or alternativly add a song from a specific book or list by typing in the placeholder for that database together with the number of the song. <br>
  'g' means 'green book' = Ich will dir danken (Iwdd) <br>
  'b' means 'blue book' = Loben <br>
  'p' means 'powerpoint song' (church related) <br>
  <br>
  You can always change the internal data by editing Contents.ts and subscripts in /src/app/contents to your preferences.
</p>

# Devs

This project uses [Angular CLI](https://github.com/angular/angular-cli) (currently Angular 19).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `--configuration production` for a production build. Production builds also generate the service worker (`ngsw-worker.js` / `ngsw.json`) from `ngsw-config.json`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). On Windows, Chrome is auto-detected; set `CHROME_BIN` to override.

## CI

Pushes and pull requests run the GitHub Actions workflow in `.github/workflows/ci.yml` (install → production build → headless unit tests).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
