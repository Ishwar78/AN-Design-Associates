export const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fd32fa889ce3e424d8e6af5f2c58fe073?format=webp&width=256";

export default function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src={LOGO_URL}
      alt="AN Design Associates logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      loading="eager"
    />
  );
}
