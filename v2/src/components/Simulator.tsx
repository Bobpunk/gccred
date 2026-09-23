import { useId, useMemo, useRef, useState } from "react";
import { formatarDinheiro, simular, taxasTotais, whatsappLink } from "../lib/simulate";

function parseValor(text: string): number {
  const cleaned = text.trim().replace(/\s/g, "");
  if (!cleaned) return 0;
  // sanitize: keep only digits, comma, dot, minus (then handle)
  const sanitized = cleaned.replace(/[^0-9.,-]/g, "");
  if (!sanitized) return 0;
  // reject multiple minus or minus not at start
  if ((sanitized.match(/-/g) || []).length > 1) return NaN;
  if (sanitized.includes("-") && !sanitized.startsWith("-")) return NaN;
  // reject multiple commas
  if ((sanitized.match(/,/g) || []).length > 1) return NaN;
  const normalized = sanitized.replace(/\./g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

export default function Simulator() {
  const valorId = useId();
  const helpId = useId();
  const errorId = useId();

  const [valorTexto, setValorTexto] = useState("1000");
  const [parcelas, setParcelas] = useState(12);
  const [touchedValor, setTouchedValor] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const valor = useMemo(() => parseValor(valorTexto), [valorTexto]);
  const isParseError = Number.isNaN(valor);
  const sim = useMemo(() => {
    if (isParseError) return null;
    return simular(valor, parcelas);
  }, [valor, parcelas, isParseError]);

  const valorError = useMemo(() => {
    if (!touchedValor) return null;
    if (!valorTexto.trim()) return "Digite um valor para simular.";
    if (isParseError) return "Use apenas números, ponto e vírgula (ex.: 1.500,50).";
    if (valor <= 0) return "Digite um valor maior que zero.";
    if (valor < 200) return "Valor mínimo: R$ 200.";
    if (valor > 50000) return "Valor máximo: R$ 50.000.";
    return null;
  }, [valor, valorTexto, touchedValor, isParseError]);

  // live-validate after first touch: update error even without blur
  const showResult = !!sim && !valorError;

  // harden: prevent whatsapp when invalid, focus field
  const handleWhatsappClick = (e: React.MouseEvent) => {
    if (!showResult || !sim) {
      e.preventDefault();
      setTouchedValor(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="rounded-[20px] p-3 sm:p-4 min-w-0"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 0 oklch(1 0 0 / 0.06) inset, 0 20px 60px oklch(0 0 0 / 0.35), 0 1px 3px oklch(0 0 0 / 0.2)",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTouchedValor(true);
          if (valorError || !showResult) inputRef.current?.focus();
        }}
        noValidate
        className="grid gap-3 min-w-0"
        aria-describedby={helpId}
      >
        {/* valor fieldset */}
        <fieldset className="grid gap-1.5 min-w-0 p-0 m-0 border-0">
          <legend className="sr-only">Valor e parcelas</legend>

          <label htmlFor={valorId} className="text-[13px] font-semibold tracking-[-0.01em] break-words" style={{ color: "var(--text)" }}>
            Quanto você quer receber?
          </label>

          <div
            className="group relative flex items-center rounded-[16px] transition min-w-0"
            style={{
              background: "var(--bg)",
              border: `1px solid ${valorError ? "var(--danger-border)" : "var(--border)"}`,
              boxShadow: valorError ? "0 0 0 4px oklch(0.635 0.19 27 / 0.08)" : "none",
            }}
          >
            <span className="ps-4 pe-2 text-[15px] font-semibold select-none shrink-0" style={{ color: "var(--faint)" }} aria-hidden>
              R$
            </span>
            <input
              ref={inputRef}
              id={valorId}
              inputMode="decimal"
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="1.000"
              maxLength={12}
              value={valorTexto}
              onChange={(e) => {
                let v = e.target.value;
                // allow paste of emoji/letters then sanitize display: strip disallowed but keep user intent
                // we keep filtering to avoid layout break from huge pastes
                if (v.length > 20) v = v.slice(0, 20);
                // allow digits, dot, comma, space, minus, letters for paste (will error)
                setValorTexto(v);
                if (touchedValor) {
                  // live-validate after first interaction
                }
              }}
              onBlur={() => setTouchedValor(true)}
              onFocus={(e) => e.currentTarget.select()}
              aria-invalid={!!valorError}
              aria-describedby={valorError ? errorId : helpId}
              className="w-full min-w-0 bg-transparent py-2.5 pe-4 text-[16px] font-semibold tracking-[-0.02em] outline-none placeholder:font-medium placeholder:opacity-60"
              style={{ color: "var(--text)" }}
            />
          </div>

          <div className="flex flex-wrap items-start justify-between gap-2 min-h-[18px] min-w-0">
            <p id={helpId} className="text-xs leading-4 break-words" style={{ color: "var(--faint)" }}>
              {valor > 0 && !valorError && !isParseError ? (
                <span style={{ color: "var(--muted)" }} className="break-words">{formatarDinheiro(valor)} • valor líquido</span>
              ) : (
                "Ex.: 1000 ou 1.500,50"
              )}
            </p>
            {valorError ? (
              <p id={errorId} className="text-xs font-medium text-right break-words max-w-[60%]" style={{ color: "var(--danger)" }}>
                {valorError}
              </p>
            ) : null}
          </div>
        </fieldset>

        <fieldset className="grid gap-1.5 min-w-0 p-0 m-0 border-0">
          <legend className="text-[13px] font-semibold tracking-[-0.01em] break-words p-0" style={{ color: "var(--text)" }}>
            Em quantas vezes?
          </legend>
          <div className="grid grid-cols-6 gap-1.5 min-w-0">
            {Object.keys(taxasTotais).map((p) => {
              const n = Number(p);
              const selected = n === parcelas;
              return (
                <label
                  key={n}
                  className="flex min-w-0 cursor-pointer flex-col items-center justify-center rounded-[10px] px-1 py-2 text-center transition outline-none hover:brightness-[0.97] active:scale-[0.98] focus-within:shadow-[0_0_0_4px_var(--accent-ring)]"
                  style={{
                    background: selected ? "var(--accent)" : "var(--bg)",
                    border: `1px solid ${selected ? "transparent" : "var(--border)"}`,
                    color: selected ? "var(--accent-ink)" : "var(--text)",
                    boxShadow: selected ? "0 8px 20px oklch(0 0 0 / 0.28)" : "none",
                  }}
                >
                  <input
                    type="radio"
                    name="parcelas"
                    value={n}
                    checked={selected}
                    onChange={() => setParcelas(n)}
                    className="sr-only"
                  />
                  <span className="text-[13px] font-bold leading-none tracking-[-0.01em]">{n}x</span>
                </label>
              );
            })}
          </div>
          <p className="text-xs break-words" style={{ color: "var(--faint)" }}>
            Taxa total de 13,6% (1×) a 30% (18×). Sem pegadinhas.
          </p>
        </fieldset>
      </form>

      {/* result — inset panel, not nested card */}
      <div className="mt-4 min-w-0">
        {showResult && sim ? (
          <div
            key={`${sim.valorLiquido}-${sim.numParcelas}`}
            className="result-enter rounded-[16px] p-4 min-w-0 overflow-hidden"
            style={{
              background: "var(--surface-inset)",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 0 oklch(1 0 0 / 0.04) inset",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex items-start justify-between gap-4 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: "var(--faint)" }}>
                  Você paga
                </p>
                {/* harden: long currency must wrap, not overflow */}
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                  <p className="text-[22px] sm:text-[24px] font-extrabold tracking-[-0.03em] leading-none break-words [overflow-wrap:anywhere] [hyphens:auto]" style={{ color: "var(--accent)" }}>
                    {sim.numParcelas}× de {formatarDinheiro(sim.valorParcela)}
                  </p>
                  <p className="inline-flex items-center gap-1 text-[12px] font-bold break-words" style={{ color: "var(--accent)" }}>
                    Pix na hora!
                  </p>
                </div>
                <p className="mt-1 text-[13px] leading-5 break-words [overflow-wrap:anywhere]" style={{ color: "var(--muted)" }}>
                  Total {formatarDinheiro(sim.valorBrutoFinal)}
                </p>
              </div>

              <div
                className="hidden sm:grid size-10 place-items-center rounded-full shrink-0"
                style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M13 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <a
              href={whatsappLink(sim)}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsappClick}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold tracking-[-0.01em] transition hover:brightness-[0.98] active:translate-y-[1px] active:brightness-95 focus-visible:outline-offset-2 min-w-0 [overflow-wrap:anywhere]"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
                boxShadow: "0 1px 0 oklch(1 0 0 / 0.2) inset, 0 8px 20px oklch(0 0 0 / 0.28)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
                <path d="M19.05 4.91A9.82 9.82 0 0012 2C6.48 2 2 6.48 2 12c0 1.78.46 3.45 1.32 4.91L2 22l5.25-1.38A9.86 9.86 0 0012 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-7.09zM12 20a8 8 0 01-4.08-1.11l-.29-.17-3.11.82.83-3.03-.19-.31A8 8 0 014 12C4 7.58 7.58 4 12 4a8 8 0 015.66 2.34A8 8 0 0120 12c0 4.42-3.58 8-8 8zm4.37-5.92c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.30-.02-.42-.06-.12-.54-1.30-.74-1.78-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.30-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.40 1.37.51.58.18 1.10.16 1.51.10.46-.07 1.42-.58 1.62-1.14.20-.56.20-1.04.14-1.14-.06-.10-.22-.16-.46-.28z" />
              </svg>
              <span className="truncate">Enviar no WhatsApp</span>
            </a>

            
          </div>
        ) : (
          <div
            className="rounded-[16px] px-4 py-3 flex gap-3 items-start min-w-0 overflow-hidden"
            style={{
              background: valorError ? "var(--danger-bg)" : "var(--surface-inset)",
              border: `1px solid ${valorError ? "var(--danger-border)" : "var(--border)"}`,
            }}
            role={valorError ? "alert" : "status"}
            aria-live={valorError ? "assertive" : "polite"}
          >
            <span
              className="mt-0.5 grid size-7 place-items-center rounded-full shrink-0 text-[13px] font-bold"
              style={{
                background: valorError ? "var(--danger)" : "var(--surface-raised)",
                color: valorError ? "white" : "var(--muted)",
                border: valorError ? "none" : "1px solid var(--border)",
              }}
              aria-hidden
            >
              {valorError ? "!" : "→"}
            </span>
            <p className="text-[13.5px] leading-5 break-words [overflow-wrap:anywhere] min-w-0 flex-1" style={{ color: valorError ? "oklch(0.88 0.08 27)" : "var(--muted)" }}>
              {valorError ? valorError : "Digite um valor para ver a simulação aqui. O cálculo é instantâneo."}
            </p>
          </div>
        )}
      </div>

      {/* i18n note: hidden for AT but ensures RTL-safe rendering */}
      <p className="sr-only" lang="pt-BR">Valores em reais, formato brasileiro.</p>
    </div>
  );
}
