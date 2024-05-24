import styles from "./page.module.css";
import ThreeColtScene from "@/components/three/ColtScene";
import React from "react";

import NavMenuUp from "@/components/NavMenuUp";
import TopicItem from "@/components/TopicItem";

const loremText =
  "Lorem ipsum dolor sit amet consectetur. Eu proin est nam lorem. Suspendisse pulvinar velit senectus volutpat amet ac sit. Massa neque quis venenatis mauris lorem metus. Mauris lacus a augue at in neque.";

export default function Home() {
  return (
    <React.StrictMode>
      <ThreeColtScene position={"absolute"} zIndex={"-1"} />
      <NavMenuUp />
      <TopicItem topicHeader={"Topic Header"} topicBreaflyText={loremText} />
    </React.StrictMode>
  );
}
