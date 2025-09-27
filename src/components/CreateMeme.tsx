import "../App.css";
import { Drag_Drop } from "./Drag-Drop";
import { useState } from "react";
import { Canvas } from "./Canvas";
import { RadioInput } from "./RadioInput";
import { ByHandInput } from "./ByHandInput";
import { SelectChoice } from "./SelectChoice";

function CreateMeme() {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [radio, setRadio] = useState("create");
  const [inputUrl, setInputUrl] = useState("");
  const [url, setUrl] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [choice, setChoice] = useState("search");


  const imageHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    files!.length > 0 && setUrl(URL.createObjectURL(files![0]));
  };

  const confirmButton = async (e: React.FormEvent) => {
    e.preventDefault();
    if (radio) {
      const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart");
      const data = await res.json();
      setTopText(data.setup);
      setBottomText(data.delivery);
    }
    if (url) {
      setImage(url);
      setUrl("");
      setTrigger(!trigger);
    } else if (inputUrl) {
      setImage(inputUrl);
      setInputUrl("");
      setTrigger(!trigger);
    } else {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${prompt}&per_page=12&client_id=${
          import.meta.env.VITE_ACCESS_KEY
        }`
      );
      if (!res.ok) {
        throw new Error("Произошла ошибка при получении картинки");
      }
      const data = await res.json();
      var randomImage = Math.floor(Math.random() * data.results.length);
      if (randomImage !== 0) {
        randomImage -= 1;
      }

      setImage(data.results[randomImage].urls.regular);
      setPrompt("");
      setTrigger(!trigger);
    }
  };

  return (
    <>
    <form className="meme-container" onSubmit={confirmButton}>
      <SelectChoice setChoice={setChoice} />
      <div className="inputs">
        {choice === "search" && (
          <input
            type="text"
            placeholder="Сгенерировать картинку"
            className="search"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            required
          />
        )}
        {choice === "url" && (
          <input
            type="text"
            placeholder="Вставить ссылку"
            className="search"
            onChange={(e) => setInputUrl(e.target.value)}
            value={inputUrl}
            required
          />
        )}
        {choice === "drop" && <Drag_Drop imageHanlder={imageHanlder} />}
      </div>

      <RadioInput setRadio={setRadio} />
      {radio === "by-hand" && (
        <ByHandInput setBottomText={setBottomText} setTopText={setTopText} />
      )}
      <section className="confirm">
        <button>Подтвердить</button>
      </section>
    </form>
    {image && (
        <Canvas
          topText={topText}
          bottomText={bottomText}
          image={image}
          trigger={trigger}
        />
      )}
    </>
  );
}

export default CreateMeme;
