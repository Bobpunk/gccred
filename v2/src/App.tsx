import { useEffect } from "react";
import Simulator from "./components/Simulator";

const KIT = {
  id: "noite-forte",
  nome: "GC Cred",
  tagline: "Chamou, passou, tá na conta!",
  googleUrl:
    "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap",
} as const;

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-kit", KIT.id);
    const id = "kit-font";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = KIT.googleUrl;
    document.title = `${KIT.nome} — Empréstimo consignado`;
  }, []);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-6">
      <a href="#conteudo" className="skip-link">
        Pular para o simulador
      </a>

      <div
        className="w-full max-w-[560px] min-w-0 my-auto"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "28px",
          boxShadow: "0 1px 0 oklch(1 0 0 / 0.06) inset, 0 20px 60px oklch(0 0 0 / 0.35), 0 1px 3px oklch(0 0 0 / 0.2)",
        }}
      >
      <header className="w-full px-5 sm:px-7 pt-5 sm:pt-7 flex justify-center">
        <img
          src="/badge-gc-cred.svg"
          alt="GC Cred — Chamou, passou, tá na conta!"
          className="w-full max-w-[280px] sm:max-w-[320px] h-auto"
        />
      </header>

      <main
        id="conteudo"
        className="w-full flex-1 px-5 sm:px-7 py-4 sm:py-5 flex flex-col gap-3"
      >
        <Simulator />

        
      </main>

      <footer className="w-full px-5 sm:px-7 pb-3 sm:pb-4">
        <div
          className="pt-3 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs break-words"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--faint)",
          }}
        >
          <span className="min-w-0 truncate">
            © 2026 {KIT.nome} 
          </span>
          <a
            href="https://github.com/Bobpunk"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 underline underline-offset-2 text-sky-400 visited:text-gray-400 hover:brightness-110 transition"
          >
            Criado e desenvolvido por José Cecilio F. Júnior
          </a>
        </div>
      </footer>
      </div>
    </div>
  );
}
