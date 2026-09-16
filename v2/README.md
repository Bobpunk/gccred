# GC Cred V2 — React + TS + Vite + Tailwind

Repaginada completa (bold viral). Legado estático preservado em `/index.html` na raiz.

## Rodar
```bash
cd v2
npm install
npm run dev
```

## Estrutura
- `src/lib/simulate.ts` — core TS puro (taxas 1x-18x, `simular()`, `whatsappLink()`). Reaproveitável num futuro front Vue.
- `src/lib/kits.ts` — 3 kits de marca
- `src/components/Simulator.tsx` — slider + parcelas + CTA WhatsApp
- `src/App.tsx` — landing (Hero, Marquee, Como funciona, Taxas, CTA)
- `brand/` — kits + tokens + templates sociais

## WhatsApp
Número: `5583981810388`
Link: `https://wa.me/5583981810388?text=...` gerado com simulação pronta.

## Deploy Vercel
- Root Directory: `v2`
- Build: `npm run build`
- Output: `dist`
