# GC Cred — Brand Guidelines (Noite Forte)

## Brand Overview

GC Cred é um serviço de empréstimo consignado que funciona direto pelo WhatsApp. A marca transmite **confiança, agilidade e simplicidade** — sem parecer banco velho e sem parecer golpe.

**Personalidade:** Direta, amiga, moderna, confiável.

**Público:** Brasileiros que precisam de crédito rápido e seguro.

---

## Logo

### Variações

| Versão | Uso |
|--------|-----|
| Full (ícone + wordmark) | Website header, materiais impressos |
| Icon | Favicon, avatar de redes sociais, app |
| Wordmark | Quando o ícone não cabe |

### Regras

- Manter espaço livre igual à altura da letra mais alta ao redor
- Tamanho mínimo digital: 120px full / 40px icon
- Não rotacionar, não adicionar sombras, não distorcer
- Versão volt lima para fundos escuros

---

## Cores — Noite Forte

### Paleta Principal — Violeta

| Token | OKLCH | Uso |
|-------|-------|-----|
| brand-50 | oklch(0.965 0.004 285) | Texto claro |
| brand-100 | oklch(0.90 0.02 285) | Texto secundário claro |
| brand-200 | oklch(0.73 0.04 285) | Bordas leves |
| brand-300 | oklch(0.60 0.05 285) | Ícones secundários |
| brand-400 | oklch(0.45 0.055 285) | Elementos interativos |
| brand-500 | oklch(0.33 0.05 285) | Bordas fortes |
| brand-600 | oklch(0.28 0.065 285) | Superfícies elevadas |
| brand-700 | oklch(0.235 0.065 285) | Superfícies |
| brand-800 | oklch(0.195 0.055 285) | **Fundo principal** |
| brand-900 | oklch(0.14 0.04 285) | Fundo mais escuro |

### Accent — Volt Lima

| Token | OKLCH | Uso |
|-------|-------|-----|
| volt-100 | oklch(0.93 0.10 125) | Highlights |
| volt-200 | oklch(0.90 0.16 125) | Hover sutil |
| volt-300 | oklch(0.90 0.21 125) | **Cor principal — CTAs, destaques** |
| volt-400 | oklch(0.85 0.20 125) | Hover CTA |
| volt-500 | oklch(0.75 0.18 125) | Ícones |
| volt-600 | oklch(0.60 0.15 125) | Elementos menores |

### Regras de Uso

- Fundo escuro (brand-800) domina a interface
- Volt limpa (volt-300) aparece nos CTAs e destaques
- Texto claro (brand-50) para leitura
- Texto secundário (brand-200/300) para informações auxiliares
- Nunca usar volt para fundos grandes

---

## Tipografia

### Fontes

| Uso | Fonte | Weight |
|-----|-------|--------|
| Display / Headlines | Sora | 700–800 |
| Body / UI | Sora | 400–600 |
| Números / Monospace | JetBrains Mono | 500–600 |

### Escala

| Token | Tamanho | Uso |
|-------|---------|-----|
| text-xs | 12px | Labels, captions |
| text-sm | 14px | Texto auxiliar |
| text-base | 16px | Body text |
| text-lg | 18px | Subheadings |
| text-xl | 20px | Cards |
| text-2xl | 24px | H2 |
| text-3xl | 30px | H1 mobile |
| text-4xl | 36px | H1 desktop |

### Regras

- Máximo 2 famílias de fonte (Sora + JetBrains Mono)
- Line-height: 1.1 para headings, 1.5 para body
- Tracking: -0.03em para headings grandes

---

## Espaçamento

- Border radius: 10px (ícones), 16px (cards/inputs), 24px (cards grandes), 999px (botões/pills)
- Spacing base: 4px (0.25rem)
- Componentes com padding: 16px–24px

---

## Componentes

### Botão Primário (CTA)
- Fundo: volt-300
- Texto: brand-800 (escuro)
- Border radius: 999px (pill)
- Padding: 14px 24px
- Font: Sora 700 15px
- Hover: volt-400

### Card
- Fundo: brand-700
- Border: oklch(0.33 0.05 285)
- Border radius: 24px
- Padding: 20px–28px
- Sombra: 0 20px 60px oklch(0 0 0 / 0.35)

### Input
- Fundo: brand-800
- Border: oklch(0.33 0.05 285)
- Border radius: 16px
- Padding: 14px 16px
- Focus: ring volt-300

---

## Voz e Tom

### Princípios

1. **Direta** — sem enrolação, vá direto ao ponto
2. **Amiga** — fale como quem ajuda, não como vendedor
3. **Clara** — sem jargão bancário, sem pegadinhas
4. **Rápida** — reações curtas, ações imediatas

### Exemplos

| Bom | Ruim |
|-----|------|
| "Simule em segundos" | "Preencha o formulário para iniciar sua simulação" |
| "R$ 99,99 por mês" | "Valor da parcela mensal: R$ 99,99" |
| "Pix na sua conta" | "Transferência via Pix processada em até 24h" |
| "Sem cadastro" | "Não é necessário criar conta" |

---

## Social Media

### Dimensões

| Template | Tamanho | Uso |
|----------|---------|-----|
| OG Image | 1200×630 | Capa de link |
| Profile | 400×400 | Avatar |
| Post Feed | 1080×1350 | Instagram feed |
| Story | 1080×1920 | Instagram story |

### Regras

- Usar componentes React SVG em `src/components/brand/Templates.tsx`
- Exportar como SVG (vetor) ou converter para PNG 1× via ferramenta externa
- Manter texto dentro da "área segura" (margem de 60px)

---

## Arquivos

```
src/
  components/
    brand/
      Logo.tsx          — Componente logo (3 variantes)
      Templates.tsx     — Social media templates
  index.css             — Tokens Noite Forte
  lib/
    kits.ts             — Metadata do kit
brand/
  GUIDE.md              — Este arquivo
  images/               — SVGs gerados
```
