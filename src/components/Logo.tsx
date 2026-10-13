import Image from "next/image";

/**
 * Aaro Tec brand mark — the gradient roof with the hanging power switch
 * (cropped, with transparent background, from the full lockup in
 * /public/newaarotec.jpeg). Used in the navbar alongside the "Aaro Tec"
 * wordmark; the footer shows the full lockup.
 */
export default function LogoMark({
  className = "h-9 w-9",
}: {
  className?: string;
}) {
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <Image
        src="/aaro-mark.png"
        alt="Aaro Tec"
        fill
        sizes="44px"
        className="object-contain"
      />
    </span>
  );
}
