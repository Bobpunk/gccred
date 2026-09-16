// Core de cálculo GC Cred — TS puro, reutilizável em React, Vue, Node.
// Regra legada preservada de script.js:
//   valorBrutoInicial = valorLiquido * (1 + taxaTotal)
//   descontoTotal = numParcelas * 0.01
//   valorBrutoFinal = valorBrutoInicial - descontoTotal

export const taxasTotais: Record<number, number> = {
  1: 0.136, 2: 0.146, 3: 0.156, 4: 0.164, 5: 0.17,
  6: 0.176, 7: 0.182, 8: 0.186, 9: 0.19, 10: 0.196,
  11: 0.198, 12: 0.2, 13: 0.22, 14: 0.236, 15: 0.252,
  16: 0.268, 17: 0.284, 18: 0.3,
};

export interface Simulacao {
  valorLiquido: number;
  numParcelas: number;
  taxaTotal: number;
  valorParcela: number;
  valorBrutoFinal: number;
  custoTotal: number;
}

export function simular(valorLiquido: number, numParcelas: number): Simulacao | null {
  if (!Number.isFinite(valorLiquido) || valorLiquido <= 0) return null;
  if (!Number.isFinite(numParcelas) || numParcelas < 1 || numParcelas > 18) return null;
  const taxaTotal = taxasTotais[numParcelas];
  if (taxaTotal === undefined) return null;

  const valorBrutoInicial = valorLiquido * (1 + taxaTotal);
  const descontoTotal = numParcelas * 0.01;
  const valorBrutoFinal = valorBrutoInicial - descontoTotal;
  // guard against impossibly small final (desconto > principal)
  if (!Number.isFinite(valorBrutoFinal) || valorBrutoFinal <= 0) return null;
  const valorParcela = valorBrutoFinal / numParcelas;
  const custoTotal = valorBrutoFinal - valorLiquido;
  if (!Number.isFinite(valorParcela) || !Number.isFinite(custoTotal)) return null;

  return { valorLiquido, numParcelas, taxaTotal, valorParcela, valorBrutoFinal, custoTotal };
}

export function formatarDinheiro(valor: number): string {
  if (!Number.isFinite(valor)) return "—";
  // cap absurdly large values to avoid layout thrash (still correct via Intl)
  const clamped = Math.min(Math.max(valor, -1e12), 1e12);
  try {
    return clamped.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    return `R$ ${clamped.toFixed(2).replace(".", ",")}`;
  }
}

export const WHATSAPP_NUMBER = "5583981810388";

export function whatsappLink(sim: Simulacao): string {
  const texto =
    `Olá! Simulei no site GC Cred: ` +
    `quero ${formatarDinheiro(sim.valorLiquido)} em ${sim.numParcelas}x de ${formatarDinheiro(sim.valorParcela)}. ` +
    `Podemos fechar?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

export function whatsappLinkGenerico(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero simular um empréstimo na GC Cred.")}`;
}
