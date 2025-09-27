import "../App.css"

export const RadioInput:React.FC<{setRadio:React.Dispatch<React.SetStateAction<string>>}> =({setRadio})=> {
  return (
    <fieldset className="radios">
        <div>
        <input type="radio" value="create" id="create"  name="drone" onChange={(e) => setRadio(e.target.value)} defaultChecked/>
        <label htmlFor="create">Сгенерировать шутку</label>
        </div>
        <div>
          <input type="radio" value="by-hand" id="by-hand" name="drone" onChange={(e) => setRadio(e.target.value)}/>
          <label htmlFor="by-hand">Написать самому</label>
        </div>
      </fieldset>
  )
}

