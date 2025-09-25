import "../App.css"

export const RadioInput:React.FC<{setRadio:React.Dispatch<React.SetStateAction<string>>}> =({setRadio})=> {
  return (
    <fieldset className="radios">
        <div>
        <input type="radio" value="auto-generated" id="auto-generated"  name="drone" onChange={(e) => setRadio(e.target.value)}/>
        <label htmlFor="auto-generated">Сгенерировать шутку</label>
        </div>
        <div>
          <input type="radio" value="" id="by-hand" name="drone" onChange={(e) => setRadio(e.target.value)}/>
          <label htmlFor="by-hand">Написать самому</label>
        </div>
      </fieldset>
  )
}

