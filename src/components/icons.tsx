/**
 * Consistent custom appliance iconography (24×24, stroke = currentColor).
 * Replaces OS emoji across the site for a professional, on-brand look.
 */
type IconProps = { className?: string };

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor" as const,
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function LightsIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9 18h6m-5 3h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
    </svg>
  );
}

export function ClimateIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0Z" />
      <path d="M12 9v6" />
    </svg>
  );
}

export function SecurityIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 2.5 4.5 5.7v5.1c0 4.5 3.2 8.2 7.5 9.2 4.3-1 7.5-4.7 7.5-9.2V5.7L12 2.5Z" />
      <path d="m9 11.8 2 2 4-4" />
    </svg>
  );
}

export function EnergyIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

export function FanIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 10.4c0-3 .4-5.6 2.2-5.6 1.4 0 2.3 1.5 1.5 3.4-.6 1.6-2.4 2.4-3.7 2.2Zm0 3.2c0 3-.4 5.6-2.2 5.6-1.4 0-2.3-1.5-1.5-3.4.6-1.6 2.4-2.4 3.7-2.2Zm1.6-1.6c3 0 5.6.4 5.6 2.2 0 1.4-1.5 2.3-3.4 1.5-1.6-.6-2.4-2.4-2.2-3.7Zm-3.2 0c-3 0-5.6-.4-5.6-2.2 0-1.4 1.5-2.3 3.4-1.5 1.6.6 2.4 2.4 2.2 3.7Z" />
    </svg>
  );
}

export function CurtainsIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3 3h18M4 3v18M20 3v18M4 21c3.5 0 5-3 5-9s0-9 0-9M20 21c-3.5 0-5-3-5-9s0-9 0-9" />
    </svg>
  );
}

export function SpeakerIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <circle cx="12" cy="14" r="3.2" />
      <circle cx="12" cy="6" r="1" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3 7.5h13l5-2.5v14l-5-2.5H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
      <circle cx="8.5" cy="11" r="2.2" />
    </svg>
  );
}

export function FingerprintIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M7 19.2c-1.3-1.7-2-3.9-2-6.2a7 7 0 0 1 14 0c0 1.2-.1 2.4-.4 3.5" />
      <path d="M12 9.5a3.5 3.5 0 0 1 3.5 3.5c0 2.2.3 4.3 1 6.3" />
      <path d="M8.5 13a3.5 3.5 0 0 1 1.1-2.5M12 13c0 2.9-.7 5.6-2 8" />
      <path d="M12 2.5c1.2 0 2.4.2 3.5.6" />
    </svg>
  );
}

export function KeypadIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01M12 18.5h.01" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M6.5 12.5c1.2 0 2-.8 2-2s-.8-2-2-2M11 15.5h6.5M14 9.5h3.5" />
    </svg>
  );
}

export function KeyIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="8" cy="16" r="4" />
      <path d="m10.8 13.2 9.7-9.7M17 7l3 3M14 10l2 2" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 2.5 4.5 5.7v5.1c0 4.5 3.2 8.2 7.5 9.2 4.3-1 7.5-4.7 7.5-9.2V5.7L12 2.5Z" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M12 12.5v3" />
    </svg>
  );
}
