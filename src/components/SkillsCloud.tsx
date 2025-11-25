"use client";

import React from "react";
import { Cloud, renderSimpleIcon, ICloud, SimpleIcon } from "react-icon-cloud";
import {
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siMongodb,
  siPostgresql,
  siGit,
  siGithub,
  siDocker,
  siPython,
  siAndroid,
  siFirebase,
  siFastapi,
  siCplusplus,
  siHtml5,
  siCss,
  siMysql,
  siPydantic,
  siOpenai,
  siAnthropic,
} from "simple-icons/icons";

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

const icons = [
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siMongodb,
  siPostgresql,
  siGit,
  siGithub,
  siDocker,
  siPython,
  siAndroid,
  siFirebase,
  siFastapi,
  siCplusplus,
  siHtml5,
  siCss,
  siMysql,
  siPydantic,
  siOpenai,
  siAnthropic,
];

export default function SkillsCloud() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
      {mounted && (
        <Cloud {...cloudProps}>
          {icons.map((icon) => renderCustomIcon(icon, "dark"))}
        </Cloud>
      )}
    </div>
  );
}
