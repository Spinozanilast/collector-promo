"use client";

import "@styles/TopicItem.css";
import { useHoverElementEffect } from "@hooks/useHoverImageEffects";
import Image from "next/image";

type TopicProps = {
  topicHeader: string;
  topicBreaflyText: string;
};

const TopicItem = (props: TopicProps) => {
  const changingImageId = "header__image-hover";
  const hoverElementId = "topic";
  const staticUri = "/revolver-cylinder/cylinder-static.png";
  const hoverUri = "/revolver-cylinder/cylinder-rotation.gif";

  useHoverElementEffect(staticUri, hoverUri, changingImageId, hoverElementId);

  return (
    <div id={hoverElementId}>
      <div id="topic__header">
        <Image
          id={changingImageId}
          src={staticUri}
          width={55}
          height={55}
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
          src={staticUri}
          width={100}
          height={200}
        />
        <div id="topic__main-text" className="centered-text text_container">
          <p id="topic__main_text">{props.topicBreaflyText}</p>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;
