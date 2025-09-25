import "../App.css"
import React from "react";

export const ByHandInput: React.FC<{
  setTopText: React.Dispatch<React.SetStateAction<string>>;
  setBottomText: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setTopText, setBottomText }) => {
  return (
    <section className="meme">
      <input
        type="text"
        placeholder="top-text"
        onChange={(e) => setTopText(e.target.value)}
      />
      <input
        type="text"
        placeholder="bottom"
        onChange={(e) => setBottomText(e.target.value)}
      />
    </section>
  );
};
