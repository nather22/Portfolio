import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { isVisibleEvent, stringContains } from "../helpers";
import useGetTweets from "../Hooks/useGetTweets";
import Tweet from "./Tweet";

export default function Socials() {
  const [pageNum, setPageNum] = useState(0);
  const [twitterListScroll, setTwitterListScroll] = useState(null);
  const [tweetElements, setTweetElements] = useState([]);
  const { loading, error, tweets } = useGetTweets(pageNum);
  const twitterContainer = useRef();

  const lastTweetObserver = useRef();
  const lastTweetObserverHandler = useCallback(
    (node) => {
      if (loading) return;
      if (lastTweetObserver.current) lastTweetObserver.current.disconnect();
      lastTweetObserver.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) lastTweetObserver.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    if (tweets.length) {
      createTweetElements();
    }
  }, [loading]);

  // useEffect(() => {
  //   if (twitterContainer.current) {
  //     const containerScroll =
  //       twitterContainer.current.scrollTop +
  //       twitterContainer.current.getBoundingClientRect().height;
  //     console.log(containerScroll);
  //     setTwitterListScroll(containerScroll);
  //     const listener = twitterContainer.current.addEventListener(
  //       "scroll",
  //       () => {
  //         const containerScroll =
  //           twitterContainer.current.scrollTop +
  //           twitterContainer.current.getBoundingClientRect().height;
  //         setTwitterListScroll(containerScroll);
  //         console.log(containerScroll);
  //       }
  //     );
  //     return () => removeEventListener("scroll", listener);
  //   }
  // }, [twitterContainer]);

  const createTweetElements = () => {
    const tweetEls = tweets.map((tweet, index) => {
      return (
        <div
          className="tweet__container"
          ref={index === tweets.length - 1 ? lastTweetObserverHandler : null}
          key={tweet.id}
        >
          <Tweet tweetObject={tweet} />
        </div>
      );
    });
    setTweetElements(tweetEls);
  };

  return (
    <AnimationOnScroll
      className="socials"
      animateIn="fade-in"
      duration={0.5}
      offset={200}
      animateOnce={true}
    >
      <h2 id="socials" className="socials__title">
        Socials
      </h2>
      <div className="socials__body">
        <div className="socials__twitter">
          <div className="tweets__list" ref={twitterContainer}>
            {tweetElements}
          </div>
        </div>
      </div>
    </AnimationOnScroll>
  );
}
