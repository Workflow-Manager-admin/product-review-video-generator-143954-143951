import React from "react";
import { Composition } from "remotion";
import App from "./App";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

// RemotionRoot: registers both the Remotion composition(s), and mounts the App for web frontend use.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* UI application entry for web */}
      <App />

      {/* Remotion compositions for renderable video(s) */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#1976D2",
          logoColor1: "#1976D2",
          logoColor2: "#FFC107",
        }}
      />
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#1976D2" as const,
          logoColor2: "#FFC107" as const,
        }}
      />
    </>
  );
};
