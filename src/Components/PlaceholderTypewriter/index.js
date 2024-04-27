import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TypewriterPlaceholder = ({ textArray, period }) => {
  let loopNum = 0;
  let txt = "";
  let isDeleting = false;

  const [outputText, setOutputText] = useState("");

  const tick = () => {
    const i = loopNum % textArray.length;
    const fullTxt = textArray[i];

    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
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

    setOutputText(txt);

    setTimeout(tick, delta);
  };

  useEffect(() => {
    tick();
  }, []);

  return <span>{outputText}</span>;
};

TypewriterPlaceholder.propTypes = {
  textArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  period: PropTypes.number.isRequired,
};

export default TypewriterPlaceholder;
