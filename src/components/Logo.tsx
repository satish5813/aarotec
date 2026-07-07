import Image from "next/image";

/**
 * Aaro Tec brand mark — the official A-house logo (cropped from the full
 * lockup in /public/logo.jpeg). Used in the navbar and footer alongside the
 * "Aaro Tec" wordmark.
 */
export default function LogoMark({
  className = "h-9 w-9",
}: {
  className?: string;
}) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <Image
        src="/aaro-logo.png"
        alt="Aaro Tec"
        fill
        sizes="44px"
        className="object-contain"
      />
    </span>
  );
}
