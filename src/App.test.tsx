import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { profile } from "./content";

describe("Portfolio visitor flows", () => {
  it("switches the content and document language, and retains the preference after remount", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Código que resolve.",
    );
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Code that solves.",
    );
    expect(
      screen.getByRole("heading", { name: "One commit at a time." }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("heitor-language")).toBe("en");
    unmount();
    render(<App />);
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(
      screen.getByRole("button", { name: "Português brasileiro" }),
    );
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("switches theme and restores it after remount", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(screen.getByRole("button", { name: "Ativar tema claro" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("heitor-theme")).toBe("light");
    unmount();
    render(<App />);
    expect(document.documentElement.dataset.theme).toBe("light");
    await user.click(
      screen.getByRole("button", { name: "Ativar tema escuro" }),
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("opens the matching project and releases scroll lock when dismissed", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Conciliação, sem complicação." }),
    );
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { level: 2 })).toHaveTextContent(
      "Conciliação, sem complicação.",
    );
    expect(
      within(dialog).getByText(/Conferência de vendas reduzida/),
    ).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(
      within(dialog).getByRole("button", { name: "Fechar detalhes" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    await user.click(
      screen.getByRole("button", { name: "A próxima forma de construir." }),
    );
    expect(
      within(screen.getByRole("dialog")).getByText(/desde agosto de 2026/),
    ).toBeInTheDocument();
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: true }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile navigation after selecting a destination or pressing Escape", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await user.click(
      within(screen.getByRole("navigation")).getByRole("link", {
        name: "Projetos",
      }),
    );
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("copies the correct contact email and confirms the action", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Copiar e-mail" }));
    expect(await navigator.clipboard.readText()).toBe(profile.email);
    expect(screen.getByRole("status")).toHaveTextContent("E-mail copiado!");
  });

  it("exposes a downloadable resume, real profile links and an honest GitHub placeholder", () => {
    render(<App />);
    for (const link of screen.getAllByRole("link", {
      name: "Baixar currículo",
    })) {
      expect(link).toHaveAttribute("href", profile.resume);
      expect(link).toHaveAttribute("download");
      expect(link).toHaveAttribute("title", "Currículo em português (PDF)");
    }
    expect(
      screen.getByRole("link", { name: "Explorar GitHub" }),
    ).toHaveAttribute("href", profile.github);
    expect(
      screen.getByText(
        "Espaço reservado para meu histórico de contribuições do GitHub.",
      ),
    ).toBeInTheDocument();
    for (const link of screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank")) {
      expect(link).toHaveAttribute("rel", "noreferrer");
    }
  });
});
