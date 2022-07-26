import { MutableRefObject, useEffect, useRef } from "react";
import {
  createParams,
  load3dSketch,
  loadSketch,
  create3dParams,
  Sketch3D,
  Sketch,
} from "@dank-inc/sketchy";

type Props = {
  type: "3d" | "2d";
  sketch: Sketch | Sketch3D;
  className?: string;
  elRef?: MutableRefObject<HTMLElement | null>;
  dimensions?: [number, number];
  animate?: boolean;
};

export const ReactSketchy = ({
  sketch,
  dimensions,
  className,
  animate,
  elRef,
  type,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = elRef?.current || ref.current;

    const params =
      type === "3d"
        ? load3dSketch(
            sketch as Sketch3D,
            create3dParams({
              containerId: "dank-vision",
              w: dimensions?.[0],
              h: dimensions?.[1],
              animated: animate,
            })
          )
        : loadSketch(
            sketch as Sketch,
            createParams({
              element: el,
              dimensions,
              animate,
            })
          );

    return () => {
      if (params) params.animated = false;

      const child = el.firstChild;
      child && el.removeChild(child);
    };
  }, [sketch, ref, elRef, dimensions, animate, type]);

  if (elRef) return null;

  return <div className={className} id="dank-vision" ref={ref}></div>;
};
