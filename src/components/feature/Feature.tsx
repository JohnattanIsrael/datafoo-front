import HeroText from '../hero/HeroText'

const Feature = () => {
    return (
        <div className='flex w-full md:pt-32 sm:pt-7 md:pb-40 sm:pb-7'>
            <div className='flex flex-col lg:flex-row gap-x-5 bg-slate-50 w-screen h-200px lg:h-80 grid-cols-2 rounded items-stretch'>
                <div className='h-96 lg:h-80 w-full rounded'>
                    <div className='bg-p-program-6 w-full h-full bg-contain bg-center bg-no-repeat rounded' />
                </div>
                <div className='w-full p-3 lg:pr-3'>
                    <HeroText
                        text='Over 5 years of development experience and 9 years of UX oriented digital design.'
                        subheading='Blending creativity with technical precision'
                        color=''
                    />
                </div> 

            </div>
        </div>
    )
}

export default Feature
