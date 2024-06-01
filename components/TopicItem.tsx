/* eslint-disable @next/next/no-img-element */
"use client";

import "@styles/TopicItem.css";
import { useHoverElementEffect } from "@hooks/useHoverImageEffects";
import Image from "next/image";
import staticImageSrc from "@graphics/revolver-cylinder/cylinder-static.png";
import hoverGifSrc from "@graphics/revolver-cylinder/cylinder-rotation.gif";

type TopicProps = {
  topicHeader: string;
  topicBreaflyText: string;
  topicImageSrc: string | undefined;
};

const TopicItem = (props: TopicProps) => {
  const changingImageId = "header__image-hover";
  const hoverElementId = "topic";

  useHoverElementEffect(
    staticImageSrc.src,
    hoverGifSrc.src,
    changingImageId,
    hoverElementId
  );

  return (
    <div id={hoverElementId}>
      <div id="topic__header">
        <img
          id={changingImageId}
          src={staticImageSrc.src}
          alt="rotated cylinder gif"
        />
        <div className="text_container">
          <p className="centered-text">
            <em id="topic__header_text">{props.topicHeader}</em>
          </p>
        </div>
      </div>
      <div id="topic__main">
        <Image
          id="topic__image"
          alt="topic image"
          src={props.topicImageSrc as string}
        />
        <div id="topic__main-text" className="centered-text text_container">
          <p id="topic__main_text">{props.topicBreaflyText}</p>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;
