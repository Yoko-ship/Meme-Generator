import { Link } from "react-router"
function Header() {
  return (
    <header>
        <ul>
            <li><Link to="/">Главное Меню</Link></li>
            <li><Link to="/generate-meme">Создать Мем</Link></li>
        </ul>
    </header>
  )
}

export default Header