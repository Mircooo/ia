interface VideoProps {
  src: string;
  className?: string;
}

export function Video({ src, className = '' }: VideoProps) {
  return (
    <video
      src={src}
      muted
      loop
      autoPlay
      playsInline
      className={`w-full h-full object-cover rounded-lg ${className}`}
    />
  );
}
