import "../App.css"
import Emoji from "../assets/Emoji.png"
import Mask from "../assets/Mask (Frame).png"
import { Link } from "react-router"
function Main() {
  return (
    <div className="container">
        <div className="left">
            <img src={Emoji}></img>
            <h2>Meme Generator</h2>
            <p>Create fun memes for social media <br/>with this easy-to-use generator</p>
            <Link to="/generate-meme">Создать</Link>
        </div>
        <div className="right">
            <img src={Mask}></img>
        </div>
    </div>
  )
}

export default Main