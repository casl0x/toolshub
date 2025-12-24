import tkinter as tk

APP_BG = "#0f172a"
PANEL_BG = "#111827"
TEXT_COLOR = "#e2e8f0"
ACCENT_COLOR = "#38bdf8"
BUTTON_BG = "#1e293b"
BUTTON_ACTIVE_BG = "#334155"


class HomeFrame(tk.Frame):
    def __init__(self, parent, show_frame, styles):
        super().__init__(parent, bg=styles["panel_bg"])
        tk.Label(
            self,
            text="Accueil",
            bg=styles["panel_bg"],
            fg=styles["text_color"],
            font=styles["title_font"],
        ).pack(pady=(30, 20))
        tk.Button(
            self,
            text="⏱ Pomodoro",
            command=lambda: show_frame("pomodoro"),
            **styles["button"],
        ).pack(pady=10)
        tk.Button(
            self,
            text="📝 Notes",
            command=lambda: show_frame("notes"),
            **styles["button"],
        ).pack(pady=10)


class PomodoroFrame(tk.Frame):
    def __init__(self, parent, show_frame, styles):
        super().__init__(parent, bg=styles["panel_bg"])
        tk.Label(
            self,
            text="Pomodoro",
            bg=styles["panel_bg"],
            fg=styles["text_color"],
            font=styles["title_font"],
        ).pack(pady=(30, 20))
        tk.Button(
            self,
            text="Retour",
            command=lambda: show_frame("home"),
            **styles["button"],
        ).pack(pady=10)


class NotesFrame(tk.Frame):
    def __init__(self, parent, show_frame, styles):
        super().__init__(parent, bg=styles["panel_bg"])
        tk.Label(
            self,
            text="Notes",
            bg=styles["panel_bg"],
            fg=styles["text_color"],
            font=styles["title_font"],
        ).pack(pady=(30, 20))
        tk.Button(
            self,
            text="Retour",
            command=lambda: show_frame("home"),
            **styles["button"],
        ).pack(pady=10)


def main():
    root = tk.Tk()
    root.title("Toolshub")
    root.configure(bg=APP_BG)
    root.geometry("420x320")

    styles = {
        "panel_bg": PANEL_BG,
        "text_color": TEXT_COLOR,
        "title_font": ("Helvetica", 18, "bold"),
        "button": {
            "bg": BUTTON_BG,
            "activebackground": BUTTON_ACTIVE_BG,
            "fg": TEXT_COLOR,
            "activeforeground": TEXT_COLOR,
            "font": ("Helvetica", 12, "bold"),
            "relief": tk.FLAT,
            "padx": 20,
            "pady": 10,
        },
    }

    content_frame = tk.Frame(root, bg=APP_BG)
    content_frame.pack(fill="both", expand=True)

    frames = {}

    def show_frame(name):
        for frame in frames.values():
            frame.pack_forget()
        frames[name].pack(fill="both", expand=True)

    frames["home"] = HomeFrame(content_frame, show_frame, styles)
    frames["pomodoro"] = PomodoroFrame(content_frame, show_frame, styles)
    frames["notes"] = NotesFrame(content_frame, show_frame, styles)

    show_frame("home")

    root.mainloop()


if __name__ == "__main__":
    main()
