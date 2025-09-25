import TrollFace from "../assets/Troll Face.png";
import "../App.css";
import { Drag_Drop } from "./Drag-Drop";
import {useState } from "react";
import { Canvas } from "./Canvas";
import { RadioInput } from "./RadioInput";
import { ByHandInput } from "./ByHandInput";

function CreateMeme() {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [radio, setRadio] = useState("");

  const [url, setUrl] = useState("");
  const imageHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    files!.length > 0 && setUrl(URL.createObjectURL(files![0]));
  };

  const confirmButton = async () => {
    if(radio){
      const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart")
      const data = await res.json()
      setTopText(data.setup)
      setBottomText(data.delivery)
    }
    if (url) {
      setImage(url);
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
      console.log(data)
      setImage(data.results[randomImage].urls.regular);
    }
  };
  return (
    <main className="meme-container">
      <header className="header">
        <img src={TrollFace}></img>
        <h2>Meme Generator</h2>
      </header>
      <section className="generate_present">
        <div className="inputs">
          <input
            type="text"
            placeholder="Search Image"
            className="search"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Drag_Drop imageHanlder={imageHanlder} />
        </div>
      </section>

      <RadioInput setRadio={setRadio} />
      {!radio && (
        <ByHandInput setBottomText={setBottomText} setTopText={setTopText}/>
      )}
      <section className="confirm">
        <button onClick={confirmButton}>Подтвердить</button>
      </section>

      {image && (
        <Canvas topText={topText} bottomText={bottomText} image={image} />
      )}
    </main>
  );
}

export default CreateMeme;
