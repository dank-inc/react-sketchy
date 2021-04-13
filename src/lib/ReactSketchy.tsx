import { MutableRefObject, useEffect, useRef } from "react";
import Sketchy, {
  createParams,
  loadSketch,
  SketchConfig,
} from "@dank-inc/sketchy";

type Props = SketchConfig & {
  sketch: Sketchy.Sketch;
  className?: string;
  elRef?: MutableRefObject<HTMLElement>;
};

export const ReactSketchy = ({
  sketch,
  dimensions,
  className,
  animate,
  timeOffset,
  elRef,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = elRef?.current || ref.current;

    loadSketch(
      sketch,
      createParams({
        element: el,
        dimensions,
        animate,
        timeOffset,
      })
    );

    return () => {
      const child = el.firstChild;
      child && el.removeChild(child);
    };
  }, [sketch, ref, elRef, dimensions, animate, timeOffset]);

  if (elRef?.current) return null;

  return <div className={className} ref={ref}></div>;
};
