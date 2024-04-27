import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Typewriter = ({ textArray, period }) => {
  let loopNum = 0;
  let txt = "";
  let isDeleting = false;

  const tick = () => {
    const i = loopNum % textArray.length;
    const fullTxt = textArray[i];

    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }

    // Set the text content of the element
    const targetElement = document.getElementById("typewriter-text");
    if (targetElement) {
      targetElement.innerHTML = `<span class="wrap">${txt}<a style="color: #ffffff;">|</a></span>`;
    }

    let delta = 200 - Math.random() * 100;

    if (isDeleting) {
      delta /= 2;
    }

    if (!isDeleting && txt === fullTxt) {
      delta = period;
      isDeleting = true;
    } else if (isDeleting && txt === "") {
      isDeleting = false;
      loopNum++;
      delta = 500;
    }

    setTimeout(tick, delta);
  };

  useEffect(() => {
    tick();
  }, []);

  return <div id="typewriter-text"></div>;
};

Typewriter.propTypes = {
  textArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  period: PropTypes.number.isRequired,
};

export default Typewriter;
