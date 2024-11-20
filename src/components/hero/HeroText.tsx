
interface HeroProps {
  text: string
  subheading?: string
  color?: string
  style?: string
}

function HeroText({ text, subheading, color, style } : HeroProps) {

  return (
    <div className={`flex flex-col ${color} ${style}`}>
      <h1 className= {`font-semibold text-4xl lg:text-5xl pt-4 font-arch ${!subheading && 'h32'}`} >
        {text}
      </h1>
      {subheading && 
      <h2 className='font-semibold text-xl pt-4 font-arch'>
        {subheading}
      </h2>
      }
    </div>
  )
}

export default HeroText;