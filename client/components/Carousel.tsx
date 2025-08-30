import { useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  children: React.ReactNode;
  className?: string;
  autoplay?: number;
  controls?: boolean;
  pauseOnHover?: boolean;
};

export default function Carousel({
  children,
  className = "",
  autoplay = 4000,
  controls = true,
  pauseOnHover = true,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [index, setIndex] = useState(0);
  const slidesCount = useMemo(
    () => (Array.isArray(children) ? children.length : 1),
    [children],
  );
  const timer = useRef<NodeJS.Timeout | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    const tick = () => !paused.current && emblaApi.scrollNext();
    timer.current = setInterval(tick, autoplay);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [emblaApi, autoplay]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => {
        if (pauseOnHover) paused.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) paused.current = false;
      }}
    >
      <div
        className="overflow-hidden"
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        <div className="flex gap-3 sm:gap-4" role="list">
          {children}
        </div>
      </div>

      {controls && slidesCount > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            Prev
          </button>
          <button
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            Next
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {Array.from({ length: slidesCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="basis-full sm:basis-1/2 lg:basis-1/3 min-w-0"
      role="listitem"
    >
      {children}
    </div>
  );
}
