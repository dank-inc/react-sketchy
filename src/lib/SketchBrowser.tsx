import { Sketch } from "@dank-inc/sketchy";
import React, { cloneElement, useEffect, useState } from "react";

type Props = {
  sketches: Sketch<any>[];
  children: React.ReactElement;
  controls?: boolean;
  dimensions?: [number, number];
  animate?: boolean;
  wrap?: boolean;
};

export const SketchBrowser = ({
  controls,
  sketches,
  children,
  dimensions = [400, 400],
  animate,
  wrap,
}: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!controls) return;

    const controlListener = (e: KeyboardEvent) => {
      if (e.key === "e") next();
      if (e.key === "q") prev();
    };
    document.addEventListener("keypress", controlListener);

    return () => document.removeEventListener("keypress", controlListener);
  });

  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else setIndex(sketches.length - 1);
  };
  const next = () => {
    if (index < sketches.length - 1) setIndex(index + 1);
    else setIndex(0);
  };

  return (
    <>
      <div className="sketch-nav">
        <button onClick={prev}>Prev</button>
        <h3>Sketches!</h3>
        <p>
          index: {index + 1} / {sketches.length}
        </p>
        <button onClick={next}>Next</button>
      </div>
      {cloneElement(children, { sketch: sketches[index], dimensions, animate })}
    </>
  );
};
