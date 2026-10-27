(ns queue.app (:require [clojure.string :as str]))
(def storage-key "kelson-queue-v1")
(defn el [id] (.getElementById js/document id))
(defn node [tag class text] (let [n (.createElement js/document tag)] (set! (.-className n) class) (when text (set! (.-textContent n) text)) n))
(defn append! [parent & children] (doseq [c children] (.appendChild parent c)) parent)
(defn listen! [n event f] (.addEventListener n event f) n)
(defn button [class text f] (listen! (node "button" class text) "click" f))
(def seed [{:id "1" :title "Make something you're excited to open" :project "Personal" :priority "high" :done false}
           {:id "2" :title "Turn that side-project idea into a first step" :project "Ideas" :priority "normal" :done false}
           {:id "3" :title "Leave a review that helps someone ship" :project "Work" :priority "high" :done false}
           {:id "4" :title "Block out an hour for deep work" :project "Work" :priority "normal" :done false}
           {:id "5" :title "Get outside. Leave the phone behind." :project "Personal" :priority "low" :done false}
           {:id "6" :title "Find a little space to think" :project "Personal" :priority "normal" :done true}])
(def storage-ok (atom true))
(defn valid-task? [t] (and (map? t) (string? (:id t)) (string? (:title t)) (contains? #{"Personal" "Work" "Ideas"} (:project t)) (contains? #{"high" "normal" "low"} (:priority t)) (boolean? (:done t))))
(defn load-tasks [] (try (if-let [raw (.getItem js/localStorage storage-key)] (let [v (js->clj (.parse js/JSON raw) :keywordize-keys true)] (if (and (vector? v) (every? valid-task? v)) v (do (reset! storage-ok false) []))) seed) (catch :default _ (reset! storage-ok false) [])))
(def tasks (atom (load-tasks)))
(def view (atom "All tasks"))
(def tab (atom "All"))
(def query (atom ""))
(def sorting (atom "newest"))
(def editing (atom nil))
(def toast-timer (atom nil))
(declare render!)
(defn persist! [] (try (.setItem js/localStorage storage-key (.stringify js/JSON (clj->js @tasks))) (reset! storage-ok true) (catch :default _ (reset! storage-ok false))))
(defn change! [f] (swap! tasks f) (persist!) (render!))
(defn toast! [message undo] (let [n (el "toast")] (when @toast-timer (js/clearTimeout @toast-timer)) (set! (.-textContent n) message) (set! (.. n -style -display) "block") (when undo (append! n (button "" "Undo" (fn [_] (undo) (set! (.. n -style -display) "none"))))) (reset! toast-timer (js/setTimeout #(set! (.. n -style -display) "none") 7000))))
(defn open-editor! [task] (reset! editing (:id task)) (set! (.-textContent (el "dialog-title")) (if task "Edit task" "Create a task")) (set! (.-value (el "task-title")) (or (:title task) "")) (set! (.-value (el "task-project")) (or (:project task) (when (contains? #{"Personal" "Work" "Ideas"} @view) @view) "Personal")) (set! (.-value (el "task-priority")) (or (:priority task) "normal")) (.showModal (el "editor")) (.focus (el "task-title")))
(defn in-view? [t] (case @view "All tasks" true "Focus" (and (not (:done t)) (= "high" (:priority t))) "Completed" (:done t) (= @view (:project t))))
(defn visible? [t] (and (in-view? t) (case @tab "Active" (not (:done t)) "Done" (:done t) true) (str/includes? (str/lower-case (:title t)) (str/lower-case @query))))
(defn task-row [t] (let [row (node "div" (str "task" (when (:done t) " done")) nil)
 check (button "check" (if (:done t) "✓" "") (fn [_] (change! #(mapv (fn [x] (if (= (:id x) (:id t)) (update x :done not) x)) %))))
 body (node "div" "task-body" nil)
 edit (button "task-name" (:title t) (fn [_] (open-editor! t)))
 del (button "delete" "×" (fn [_] (let [idx (first (keep-indexed (fn [i x] (when (= (:id x) (:id t)) i)) @tasks))] (change! #(filterv (fn [x] (not= (:id x) (:id t))) %)) (toast! "Task deleted" #(change! (fn [xs] (let [i (min idx (count xs))] (vec (concat (take i xs) [t] (drop i xs))))))))))]
 (.setAttribute check "aria-label" (str (if (:done t) "Reopen " "Complete ") (:title t))) (.setAttribute check "aria-pressed" (str (:done t))) (.setAttribute del "aria-label" (str "Delete " (:title t)))
 (append! body edit (node "div" "task-meta" (str (:project t) " · " (if (:done t) "Completed" "Ready when you are"))))
 (append! row check body (node "span" "tag" (:project t)) (node "span" (str "priority " (:priority t)) (str (case (:priority t) "high" "▴ " "low" "↓ " "− ") (str/capitalize (:priority t)))) del)))
(defn render-nav! [] (doseq [[id items] [["nav" [["All tasks" "▦"] ["Focus" "◎"] ["Completed" "✓"]]] ["projects" [["Personal" "#6e9ed6"] ["Work" "#ad91d6"] ["Ideas" "#d6ad6e"]]]]] (let [n (el id)] (set! (.-textContent n) "") (doseq [[label icon] items] (let [b (button (str "nav-item" (when (= @view label) " active")) nil (fn [_] (reset! view label) (reset! tab "All") (render!)))
 i (node "span" (if (= id "nav") "nav-icon" "project-dot") (when (= id "nav") icon))
 cnt (count (filter #(case label "All tasks" (not (:done %)) "Focus" (and (= "high" (:priority %)) (not (:done %))) "Completed" (:done %) (and (= label (:project %)) (not (:done %)))) @tasks))]
 (when (= id "projects") (set! (.. i -style -background) icon)) (.setAttribute b "aria-pressed" (str (= @view label))) (append! b i (node "span" "" label) (node "span" "count" (str cnt))) (append! n b))))))
(defn render! []
 (render-nav!)
 (set! (.-textContent (el "title")) (str @view "."))
 (set! (.-textContent (el "subtitle")) (case @view "Focus" "A little less noise. Your highest priorities." "Completed" "Look at you, making things happen." "Less juggling. More doing."))
 (let [total (count @tasks) done (count (filter :done @tasks)) high (count (filter #(and (= "high" (:priority %)) (not (:done %))) @tasks)) n (el "metrics")]
 (set! (.-textContent n) "")
 (doseq [[label value note icon percent] [["Open tasks" (- total done) "things to make happen" "◷" (if (pos? total) (* 100 (/ (- total done) total)) 0)] ["Completed" done "little wins" "✓" (if (pos? total) (* 100 (/ done total)) 0)] ["High priority" high "worth your focus" "⚑" (if (pos? total) (* 100 (/ high total)) 0)]]]
 (let [card (node "div" "metric" nil) top (node "div" "metric-top" nil) val (node "div" "metric-value" (str value)) progress (node "div" "progress" nil) bar (node "div" "" nil)]
 (append! top (node "span" "" label) (node "span" "" icon)) (append! val (node "small" "" note)) (set! (.. bar -style -width) (str percent "%")) (append! progress bar) (append! card top val progress) (append! n card))))
 (let [n (el "tabs")] (set! (.-textContent n) "") (doseq [label ["All" "Active" "Done"]] (let [b (button (str (when (= label @tab) "active")) label (fn [_] (reset! tab label) (render!)))] (.setAttribute b "aria-pressed" (str (= label @tab))) (append! n b))))
 (let [n (el "tasks") xs (filter visible? @tasks) xs (if (= @sorting "priority") (sort-by #(get {"high" 0 "normal" 1 "low" 2} (:priority %)) xs) xs)]
 (set! (.-textContent n) "") (if (seq xs) (doseq [t xs] (append! n (task-row t))) (let [empty (node "div" "empty" "◎")] (append! empty (node "strong" "" (if (seq @query) "No matching tasks" "A little breathing room.")) (node "span" "" (if (seq @query) "Try a different search or view." "Add a new task, or enjoy the clear space."))) (append! n empty))))
 (set! (.-textContent (el "save-status")) (if @storage-ok "Saved on this device · No account needed" "Browser storage unavailable or unreadable · Changes may not persist")))
(listen! (el "new-task") "click" #(open-editor! nil))
(listen! (el "quick-add") "click" #(open-editor! nil))
(listen! (el "close-dialog") "click" #(.close (el "editor")))
(listen! (el "search") "input" (fn [e] (reset! query (.. e -target -value)) (render!)))
(listen! (el "sort") "change" (fn [e] (reset! sorting (.. e -target -value)) (render!)))
(listen! (el "task-form") "submit" (fn [e] (.preventDefault e) (let [title (str/trim (.-value (el "task-title")))] (when (seq title) (let [t {:id (or @editing (str (random-uuid))) :title title :project (.-value (el "task-project")) :priority (.-value (el "task-priority")) :done false} old-id @editing]
 (change! #(if old-id (mapv (fn [x] (if (= old-id (:id x)) (assoc t :done (:done x)) x)) %) (into [t] %))) (.close (el "editor")) (toast! (if old-id "Task updated" "Task added") nil))))))
(listen! js/document "keydown" (fn [e] (when (and (not (.-open (el "editor"))) (not (contains? #{"INPUT" "TEXTAREA" "SELECT"} (.. e -target -tagName))) (not (.-metaKey e)) (not (.-ctrlKey e)) (not (.-altKey e))) (case (.-key e) "n" (do (.preventDefault e) (open-editor! nil)) "/" (do (.preventDefault e) (.focus (el "search"))) nil))))
(render!)
