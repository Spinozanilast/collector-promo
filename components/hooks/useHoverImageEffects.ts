"use client";

import { useEffect } from "react";

const useHoverImageEffect = (
  staticUri: string,
  hoverUri: string,
  domElementId: string
) => {
  useEffect(() => {
    const imageElement = document.getElementById(
      domElementId
    ) as HTMLImageElement;

    imageElement.onmouseenter = () => {
      imageElement.src = hoverUri;
    };
    imageElement.onmouseleave = () => {
      imageElement.src = staticUri;
    };
  }, [staticUri, hoverUri, domElementId]);
};

const useHoverElementEffect = (
  staticUri: string,
  hoverUri: string,
  changingElementId: string,
  hoverElementId: string
) => {
  useEffect(() => {
    const imageElement = document.getElementById(
      changingElementId
    ) as HTMLImageElement;

    const hoverElement = document.getElementById(hoverElementId) as HTMLElement;

    hoverElement.onmouseenter = () => {
      imageElement.src = hoverUri;
    };
    hoverElement.onmouseleave = () => {
      imageElement.src = staticUri;
    };
  }, [staticUri, hoverUri, changingElementId, hoverElementId]);
};

export { useHoverElementEffect, useHoverImageEffect };
