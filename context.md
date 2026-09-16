# GC Cred — context.md

Data: 2026-09-16 (UTC)
Objetivo: modernizar calculadora GC Cred de HTML/CSS/JS estático para React + TS + Vite + Tailwind, aplicar brand kit, endurecer frontend para produção.

## 1. Stack e deploy
- `v2/` = Vite + React + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`)
- Node é só tooling (sem backend)
- Alvo deploy: Vercel (`v2/` como root, `npm run build`, output `dist/`)
- Build atual passa: `tsc -b && vite build`, ~18-19 módulos, dist ~73kB gz JS, ~5kB gz CSS, zero erros TS, zero detector hits (impeccable detect.mjs)
- Live legacy atual: https://gccred.vercel.app/ = versão antiga (`index.html` + `styles.css` + `script.js` raiz)
- Pedido pendente: fazer `v2` ficar parecido com https://gccred.vercel.app/

## 2. Negócio
- GC Cred = empréstimo consignado via WhatsApp
- WhatsApp: `5583981810388`, link `wa.me/5583981810388` com mensagem pré-preenchida da simulação
- Cliente já tem clientes existentes; site é autoatendimento quando dono demora responder
- Voz: "amiga direta" — frases curtas, presente, sem jargão, sem vibe golpe
- Horário footer: Seg–Sáb 8h–18h, tel 83 98181-0388
- Pix em até 24h após aprovação, sujeito à análise, nada salvo no site

## 3. Lógica cálculo (preservar 100% do legacy `script.js`)
- `src/lib/simulate.ts` (TS puro, reutilizável p/ futuro port Vue):
  - `valorBrutoInicial = valorLiquido * (1 + taxaTotal)`
  - `descontoTotal = numParcelas * 0.01`
  - `taxasTotais`: 13.6% a 30% para 1x–18x
  - `simular()`, `formatarDinheiro()` (com try/catch), `whatsappLink()`
  - guards `Number.isFinite`
- `Simulator.tsx`: input texto valor (parse BR 1.500,50, sanitize, maxLength 12, slice 20 p/ paste), select parcelas, validação live após first touch, erros: vazio / NaN / <=0 / <200 / >50000, `fieldset/legend`, `aria-invalid`, `aria-describedby`, live regions polite/assertive, `handleWhatsappClick` bloqueia se inválido + foca input, painel resultado inset (não nested card), `result-enter` anim 220ms expo, overflow guards `min-w-0 break-words [overflow-wrap:anywhere]`, `forced-colors` support, skip-link

## 4. Paleta travada — Rota C / Noite Forte
- Manter Noite Forte (usuário rejeitou light fintech friendly)
- Fundo: `oklch(0.195 0.055 285)` / `#1A1033` violeta escuro
- Accent: `oklch(0.90 0.21 125)` / `#D4FF3F` / `#dfff2f` volt lima
- Texto: `oklch(0.965 0.004 285)` / `#F5F3FF`
- `v2/src/index.css`: scales completas brand 50-900 (violeta), volt 50-600, gray tinted violet, tokens semânticos dark: --bg, --bg-mesh-1/2, --surface, --surface-raised, --surface-inset, --border, --border-strong, --text, --text-secondary, --muted, --faint, --accent, --accent-hover, --accent-subtle, --accent-ink, --accent-ring, --cta, --danger, --success
- Tipografia: Sora 400-800 + JetBrains Mono 500/600 (Google Fonts via `KIT.googleUrl` em App.tsx, `document.title = GC Cred — Empréstimo consignado`)
- Type scale xs-4xl, --rhythm 1.5rem, radial mesh bg, ::selection, :focus-visible, skip-link, prefers-reduced-motion, result-in, select appearance none
- `v2/src/lib/kits.ts` DESATUALIZADO: ainda tem tagline “Tô aqui até tarde.” — App.tsx já usa slogan novo. Precisa sync.

## 5. Skills
- Instaladas em `~/.opencode/skills/` e `~/.agents/skills/`: impeccable, frontend-design, grill-me (minimal, só yaml), nextjs-app-router-patterns, tailwind-css-patterns, typescript-advanced-types, vercel-react-best-practices, web-design-guidelines, find-skills, design-taste-frontend, ai-image-generation, unsplash-asset-images, aura-asset-images, brand-designer (oakoss, 196 installs), brand-identity (arnabbagxd, 1.4K)
- `RUNCOMFY_TOKEN` não setado — sem geração IA via runcomfy
- `brand-designer` usado p/ refazer kit: paleta scales OKLCH, Logo.tsx variantes, Templates.tsx, GUIDE.md
- `grill-me` usado como entrevista (não tem lógica, só perguntas) p/ logo e slogan
- `impeccable`: audit 17/20 antes, polish, harden, detect.mjs sempre [] agora

## 6. Logo — GC monograma + cifrão
- Direção aprovada via grill-me: iniciais GC, C com cifrão, transmitir Dinheiro, ref Nubank, uso em tudo, nenhuma cor proibida
- Implementação stroke-based (dos SVGs novos, não filled):
  - G: `M 16 15 A 7 7 0 1 0 18 20 L 12 20` stroke 3.5 fill none miter
  - C: `M 34 15 A 7 7 0 1 0 34 25` stroke 3.5 fill none
  - Cifrão: linha x=29 y10-30 (header/icon) ou rect x28.5 y11.5 w1 h17 rx0.5 (Logo.tsx antigo), stroke 0.8 opacity 0.35-0.4
  - Cores: fundo `#1A1033`, traço `#D4FF3F`
  - Fonte wordmark: Sora 800, 18px, letter-spacing 1
- `src/components/brand/Logo.tsx`: props variant full/icon/wordmark, color volt/white/dark, fills/bgs via var(--volt-300)/var(--brand-...). Atualmente NÃO usado em App.tsx (import removido)
- `brand/images/`:
  - `logo-gc-icon.svg` (40x40, rx10, stroke-based)
  - `header.svg` (180x40, fundo #1A1033, GC stroke + “GC CRED”)
  - `invertido.svg` (180x40, CORRIGIDO: fundo #D4FF3F rx6 + icon escuro 40x40 + “CRED” #1A1033)
  - `logo.svg` (1344x1152, neon lime GC card: bg #100d2b, outer rect 210,190,924x756 rx82 stroke #dfff2f 44, divider y778, badge 407,316,527x376 rx62 fill #dfff2f, texto GC 208px 900 DejaVu Sans -18 #100d2b) — USADO grande no main
  - `svg.jpeg` (ref IA: SVG CODE FOR GC CRED LOGO VARIATIONS, 3 variações, código pseudo)
  - `board-A/B/C-*.svg`, `post-C-1080x1350.svg`, `story-C-1080x1920.svg`, `cover-C-1200x675.svg` (boards antigos, ainda presentes)
  - Removidos: `logo-gc-full.svg`, `logo-gc-inverted.svg`, `logo-gc-icon-dark.svg`, `ROTA-*.md`, `tokens.css`, `components.css`, `TEMPLATES.md`, `kit-*.md`
- `brand/GUIDE.md`: guidelines Noite Forte (logo, cores, tipo, espaçamento radius 10/16/24/999, componentes botão/card/input, voz/tom tabela Bom/Ruim, social 1200x630/400x400/1080x1350/1080x1920, estrutura arquivos)
- `brand/images/Templates.tsx` (`src/components/brand/Templates.tsx`): OGImage 1200x630, ProfileImage 400x400, PostImage1080x1350 — todos violeta+volt
- Prompt logo p/ outra IA salvo no histórico (GC monograma geométrico, cifrão sutil 0.8px 35%, #1A1033/#D4FF3F, 3 variações, sem gradiente/sombra, funciona 16px)

## 7. Slogan
- Grill-me p/ slogan: onde=todos, message=todas (rápido/seguro/simples/barato/funciona), NÃO “Empréstimo Facilitado”, tom=Urgência, palavra=Praticidade
- Opções IA rejeitadas pelo usuário
- Slogan final (usuário, via outra IA): **“Chamou, passou, tá na conta!”** — aprovado com fix ta→tá
- Análise: ritmo 3 tempos, urgência presente, praticidade implícita, não golpe, cabe bio/cartão/site/post
- Prompt slogan p/ outra IA salvo no histórico (10 opções, explain 1 frase, top3)
- Implementação atual:
  - `App.tsx KIT.tagline = "Chamou, passou, tá na conta!"`
  - Header: SVG inline header.svg (h-9 w-auto) + `<p mt-1 text-[11px] muted>Chamou, passou, tá na conta!</p>` abaixo
  - H1 duplicado removido do main, `aria-labelledby="sim-title"` removido (sem heading no main agora)
  - Usuário removeu botão WhatsApp header e H1/subtítulo main — respeitar, não reintroduzir sem pedir

## 8. App.tsx atual (v2/src/App.tsx, 138 linhas)
- Imports: useEffect, Simulator (Logo import removido)
- Header max-w-[560px]: div shrink-0 aria-label GC Cred > svg 180x40 inline (rect + 2 paths + line + text GC CRED) + p slogan
- Main #conteudo: div flex justify-center mb-8 > svg 400x304 viewBox 0 0 1344 1152 border-2 border-[var(--border)] rounded-xl > foreignObject > svg logo.svg inline (bg, card, divider, badge, GC texto) — NOTA: foreignObject aninhado é frágil, melhor trocar por <img src> ou componente; + <Simulator /> + trust row (Pix 24h · Taxas 13,6%-30% · Sujeito análise)
- Footer: © 2026 GC Cred · 83 98181-0388 / Seg–Sáb 8h–18h · wa.me/...
- `document.documentElement data-kit=noite-forte`

## 9. Legacy (raiz, intocado, live em gccred.vercel.app)
- `index.html`: container 500px, logo-container img images/logo.png, h2 Calculadora de Empréstimo, label/input number valorDesejado, label/select parcelas, button onclick calcular(), div#resultado, script.js
- `styles.css`: body system-ui #37474F, bg linear-gradient 135deg #000000→#adce9c, container #37474F border #e0e0e0 radius12 shadow, h2 #38B000 2em center, label #cdf8dc 600, input/select 100% 12px border #ccc radius8 1.1em focus #38B000 + ring, button #38B000 white 100% 14px radius8 1.2em bold hover #2d8a00 translateY(-2px), #resultado white mt30 border-top #eee opacity0→.visivel, responsive 600px (body 10px, container 20px, logo 150px, h2 1.7em, controls 1em)
- `script.js`: lógica original taxas (preservada em simulate.ts)
- `images/logo.png`, `images/favicon.png`
- Pedido atual: v2 ficar parecido com esse legacy (layout centrado, card, verde? — mas manter Noite Forte? ambíguo, precisa confirmar antes de recolorir)

## 10. Histórico resumido
- Scaffold Vite+React+TS+Tailwind v4, migrate simulate.ts
- 3 rotas A/B/C, lock C, impeccable polish/audit/harden, SVG boards locais
- find-skills → brand-designer + brand-identity instaladas
- Fintech friendly light tentado (purple+coral+DM Sans) → usuário rejeitou, voltar Noite Forte
- Logo GC monograma aprovado, Logo.tsx reescrito, SVGs standalone, header.svg/invertido.svg integrados via impeccable polish
- Slogan grill-me → “Chamou, passou, tá na conta!” aprovado, implementado header
- Usuário editou App.tsx (removeu botão WhatsApp, H1) — não mexer
- logo.svg grande centralizado entre chamada e calculadora (main, 400x304, border)
- Último pedido: parecido com https://gccred.vercel.app/ — em aberto

## 11. Próximos passos
1. Definir com usuário: “parecido com legacy” = layout (card centrado 500px, logo topo, h2, label/input/select/button, resultado) mantendo paleta Noite Forte? Ou copiar cores legacy (#38B000 verde, #37474F cinza, gradient preto-verde)?
2. Sync `kits.ts` tagline → “Chamou, passou, tá na conta!”
3. Trocar foreignObject logo.svg por asset próprio (`public/logo.svg` + <img> ou componente) p/ performance/a11y
4. Re-run impeccable audit pós-mudanças, verificar contraste volt/violeta 8.2:1, touch targets 44px, overflow mobile
5. Deploy Vercel v2, comparar com gccred.vercel.app/

## 12. Arquivos relevantes
- `v2/src/App.tsx`: header SVG inline + slogan, main logo grande + Simulator
- `v2/src/index.css`: tokens Noite Forte OKLCH
- `v2/src/components/Simulator.tsx`: form + resultado + WhatsApp CTA
- `v2/src/lib/simulate.ts`: núcleo cálculo
- `v2/src/lib/kits.ts`: metadata (desatualizado tagline)
- `v2/src/components/brand/Logo.tsx`: componente (não usado atualmente)
- `v2/src/components/brand/Templates.tsx`: OG/profile/post
- `v2/brand/GUIDE.md`: guidelines
- `v2/brand/images/logo.svg`, `header.svg`, `invertido.svg`, `logo-gc-icon.svg`, `svg.jpeg`
- `index.html`, `styles.css`, `script.js`, `images/logo.png`: legacy
- `v2/package.json`, `v2/vite.config.ts`, `v2/index.html`: config
