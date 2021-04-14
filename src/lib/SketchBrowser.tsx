import { Sketch } from "@dank-inc/sketchy";
import { useState } from "react";

type Props = {
  sketches: Sketch[];
};

export const SketchBrowser = ({ sketches }: Props) => {
  const [sketch, setSketch] = useState("");

  return (
    <div className="sketch-nav">
      <button>Back</button>
      <p>Sketch: {}</p>
      <button>Next</button>
    </div>
  );
};
