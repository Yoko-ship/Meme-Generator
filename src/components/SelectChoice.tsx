import React, { type SetStateAction } from 'react'
import "../App.css"

export const SelectChoice:React.FC<{setChoice:React.Dispatch<SetStateAction<string>>}> = ({setChoice})=>{
  return (
    <fieldset className="radios">
        <div>
        <input type="radio" value="search" id="search"  name="inputs" onChange={(e) => setChoice(e.target.value)} defaultChecked/>
        <label htmlFor="search">Сгенерировать картинку (AI)</label>
        </div>
        <div>
          <input type="radio" value="url" id="url" name="inputs" onChange={(e) => setChoice(e.target.value)}/>
          <label htmlFor="url">Вставить ссылку</label>
        </div>
        <div>
          <input type="radio" value="drop" id="dro[" name="inputs" onChange={(e) => setChoice(e.target.value)}/>
          <label htmlFor="drop">Загрузить вручную</label>
        </div>
      </fieldset>
  )
}

