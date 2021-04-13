import { useEffect, useRef } from "react";
import Sketchy, {
  createParams,
  loadSketch,
  SketchConfig,
} from "@dank-inc/sketchy";

type Props = SketchConfig & {
  sketch: Sketchy.Sketch;
};

export const ReactSketchy = ({
  sketch,
  dimensions,
  animate,
  element,
  timeOffset,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    loadSketch(
      sketch,
      createParams({
        element: element || el,
        dimensions,
        animate,
        timeOffset,
      })
    );

    return () => {
      const child = el.firstChild;
      child && el.removeChild(child);
    };
  }, [sketch, ref, element, dimensions, animate, timeOffset]);

  return <div ref={ref}></div>;
};
