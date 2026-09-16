export interface BrandKit {
  id: string;
  nome: string;
  tagline: string;
  fontes: { googleUrl: string; varFont: string };
}

export const kit: BrandKit = {
  id: "noite-forte",
  nome: "GC Cred",
  tagline: "Tô aqui até tarde.",
  fontes: {
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap",
    varFont: '"Sora", system-ui, sans-serif',
  },
};
