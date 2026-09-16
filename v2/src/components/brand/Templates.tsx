interface SocialPostProps {
  title?: string;
  subtitle?: string;
  cta?: string;
}

export function OGImage({
  title = "Grana na conta sem susto.",
  subtitle = "Empréstimo consignado direto no WhatsApp.",
  cta = "Simular agora",
}: SocialPostProps) {
  return (
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#1A1033" />
      <circle cx="200" cy="150" r="300" fill="#3A1F7A" opacity="0.45" />
      <circle cx="1000" cy="500" r="250" fill="#D4FF3F" opacity="0.05" />

      <rect x="80" y="80" width="52" height="52" rx="12" fill="#D4FF3F" />
      <path d="M106 100L98 104v8c0 4.2 2.7 8.1 6 9.2 3.6-1.1 6.4-5 6.4-9.2v-8l-6.4-3.2z" fill="#1A1033" fillOpacity="0.85" />
      <path d="M103 108l2 2 4-4" stroke="#D4FF3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="144" y="114" fontFamily="Sora, system-ui" fontSize="18" fontWeight="700" fill="#F5F3FF" letterSpacing="-0.3">GC Cred</text>

      <text x="80" y="240" fontFamily="Sora, system-ui" fontSize="64" fontWeight="800" fill="#F5F3FF" letterSpacing="-2">{title}</text>
      <text x="80" y="310" fontFamily="Sora, system-ui" fontSize="24" fontWeight="500" fill="#B8AEE0">{subtitle}</text>

      <rect x="80" y="420" width="260" height="56" rx="999" fill="#D4FF3F" />
      <text x="210" y="454" textAnchor="middle" fontFamily="Sora, system-ui" fontSize="16" fontWeight="700" fill="#1A1033">{cta}</text>

      <text x="80" y="580" fontFamily="Sora, system-ui" fontSize="14" fill="#8B7FBB">Empréstimo consignado · wa.me/5583981810388</text>
    </svg>
  );
}

export function ProfileImage({ size = 400 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="80" fill="#1A1033" />
      <circle cx="200" cy="180" r="120" fill="#3A1F7A" opacity="0.5" />
      <rect x="120" y="100" width="160" height="200" rx="20" fill="#2E1F5E" stroke="#3D2A6A" />
      <path d="M200 140L170 155v40c0 26 17 50.5 30 57 13-6.5 30-31 30-57v-40l-30-15z" fill="#D4FF3F" fillOpacity="0.15" />
      <path d="M185 195l10 10 20-20" stroke="#D4FF3F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="200" y="340" textAnchor="middle" fontFamily="Sora, system-ui" fontSize="28" fontWeight="700" fill="#F5F3FF" letterSpacing="-0.5">GC CRED</text>
    </svg>
  );
}

export function PostImage1080x1350({
  valor = "1.000",
  parcelas = "12",
  parcela = "99,99",
}: {
  valor?: string;
  parcelas?: string;
  parcela?: string;
}) {
  return (
    <svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="1350" fill="#1A1033" />
      <circle cx="200" cy="200" r="400" fill="#3A1F7A" opacity="0.4" />

      <rect x="60" y="60" width="280" height="44" rx="22" fill="#2E1F5E" stroke="#3D2A6A" />
      <text x="200" y="88" textAnchor="middle" fontFamily="Sora, system-ui" fontSize="14" fontWeight="600" fill="#B8AEE0" letterSpacing="0.5">GC CRED · SIMULADOR</text>

      <text x="60" y="200" fontFamily="Sora, system-ui" fontSize="84" fontWeight="800" fill="#F5F3FF" letterSpacing="-3">Grana</text>
      <text x="60" y="280" fontFamily="Sora, system-ui" fontSize="84" fontWeight="800" fill="#F5F3FF" letterSpacing="-3">na conta</text>
      <text x="60" y="360" fontFamily="Sora, system-ui" fontSize="84" fontWeight="800" fill="#D4FF3F" letterSpacing="-3">sem susto.</text>

      <rect x="60" y="440" width="960" height="480" rx="32" fill="#2E1F5E" stroke="#3D2A6A" />
      <text x="100" y="510" fontFamily="Sora, system-ui" fontSize="18" fontWeight="600" fill="#B8AEE0">Quanto você quer receber?</text>
      <rect x="100" y="530" width="880" height="64" rx="16" fill="#1A1033" stroke="#3D2A6A" />
      <text x="124" y="570" fontFamily="Sora, system-ui" fontSize="24" fontWeight="700" fill="#F5F3FF">R$ {valor}</text>

      <text x="100" y="660" fontFamily="Sora, system-ui" fontSize="18" fontWeight="600" fill="#B8AEE0">Resultado</text>
      <rect x="100" y="680" width="880" height="180" rx="20" fill="#1A1033" stroke="#3D2A6A" />
      <text x="140" y="730" fontFamily="Sora, system-ui" fontSize="14" fontWeight="600" fill="#8B7FBB" letterSpacing="0.08em">VOCÊ PAGA</text>
      <text x="140" y="790" fontFamily="JetBrains Mono, monospace" fontSize="48" fontWeight="700" fill="#D4FF3F">{parcelas}× de R$ {parcela}</text>
      <text x="140" y="830" fontFamily="Sora, system-ui" fontSize="16" fill="#B8AEE0">Sujeito à análise</text>

      <rect x="60" y="980" width="960" height="80" rx="999" fill="#D4FF3F" />
      <text x="540" y="1030" textAnchor="middle" fontFamily="Sora, system-ui" fontSize="22" fontWeight="700" fill="#1A1033">Enviar no WhatsApp →</text>

      <text x="540" y="1120" textAnchor="middle" fontFamily="Sora, system-ui" fontSize="16" fill="#8B7FBB">wa.me/5583981810388 · Pix em até 24h</text>

      <text x="540" y="1300" textAnchor="middle" fontFamily="Sora, system-ui" fontSize="14" fill="#6A5F9A">© 2026 GC Cred · Sujeito à análise · 83 98181-0388</text>
    </svg>
  );
}
