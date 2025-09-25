import { useEffect, useRef} from "react"
import "../App.css"

export const Canvas:React.FC<{image:any,topText:string,bottomText:string}> = ({image,topText,bottomText})=>{
    const canvasRef = useRef<HTMLCanvasElement>(null)
    function fitTextToWidth(ctx:CanvasRenderingContext2D,text:string,maxWidth:number,initialSize:number){
        let fontSize = initialSize
        do{
            ctx.font = `${fontSize}px myFont`;
            fontSize--
        }while(ctx.measureText(text).width > maxWidth && fontSize > 10)
        return fontSize
    }

    useEffect(() =>{
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = image
        img.onload = async()=>{
            const canvas = canvasRef.current
            const ctx = canvas?.getContext("2d")
            if(!canvas || !ctx) return
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight
            ctx?.drawImage(img,0,0,img.naturalWidth,img.naturalHeight)
            
            const font = new FontFace('myFont',"url(/Roboto-VariableFont_wdth,wght.ttf)")
            await font.load()
            document.fonts.add(font);

            const txt = topText
            const bottomTxt = bottomText
            const initialSize = Math.floor(img.naturalWidth / 8)
            const fontSizeTop = fitTextToWidth(ctx,txt,canvas.width - 40,initialSize)
            const fontSizeBottom = fitTextToWidth(ctx,bottomText,canvas.width - 40,initialSize)

            ctx!.font = `${fontSizeTop}px myFont`;
            ctx?.strokeText(txt,(canvas.width - ctx.measureText(txt).width)/2,150)
            ctx?.fillText(txt,(canvas.width - ctx.measureText(txt).width)/2,150)


            const txtdim = ctx?.measureText(txt);
            const txtdHeight = txtdim!.actualBoundingBoxAscent + txtdim.actualBoundingBoxDescent
            const bottomY = (canvas.height - txtdHeight) - 100
            ctx.font = `${fontSizeBottom}px myFont`
            ctx.strokeText(bottomTxt,(canvas.width - ctx.measureText(bottomText).width)/2,bottomY)
            ctx.fillText(bottomTxt,(canvas.width - ctx.measureText(bottomText).width)/2,bottomY)
        }
    },[image])


    const saveImage = ()=>{
        const canvas = canvasRef.current
        if(!canvas) return

        const link = document.createElement("a")
        link.download = 'meme.png'
        link.href = canvas.toDataURL("image/png")
        link.click()
    }

    return(
        <div className="canvas-container"
        
        >
            <canvas ref={canvasRef}/>
            <button onClick={saveImage}>Скачать</button>
        </div>
    )
}