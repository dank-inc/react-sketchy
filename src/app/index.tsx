import { useState } from "react";
import { SketchBrowser, ReactSketchy } from "../lib";
import sketches from "../sketches";
import "./index.css";

export const App = () => {
  const [multi, setMulti] = useState(false);

  const toggle = () => setMulti(!multi);

  return (
    <div>
      <button onClick={toggle}>Multi Mode</button>
      {multi ? (
        <SketchBrowser animate sketches={sketches}>
          <ReactSketchy />
        </SketchBrowser>
      ) : (
        <ReactSketchy animate dimensions={[700, 700]} sketch={sketches[0]} />
      )}
    </div>
  );
};
