# Queue
A local-first task app in ClojureScript. Static HTML/CSS and `app.cljs`; Scittle 0.8.33 runs the ClojureScript in the browser. The pinned runtime and its EPL license are vendored, so no CDN or backend is required.

Serve the repository using `python3 -m http.server 8093` and visit `/queue/`. There is no build step.

Features: create/edit/complete tasks, three project categories, priority sorting, search, focus and completed views, delete with undo, keyboard shortcuts (`n` and `/`), responsive layout, localStorage persistence. Example tasks appear on first use. Clearing browser data deletes saved tasks. No account, telemetry, or cross-device sync.

Runtime source: https://github.com/babashka/scittle (unmodified npm release 0.8.33).
