import './App.css'
import CreateMeme from './components/CreateMeme'
import Main from './components/Main'
import Root from './components/Root'
import "./index.css"
import { createBrowserRouter,RouterProvider } from 'react-router'

  const router = createBrowserRouter([
    {path:"/",element:<Root/>,children:[
      {index:true,element:<Main/>},
      {path:'/generate-meme',element:<CreateMeme/>}
    ]}
  ])

function App() {

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
