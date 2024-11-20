import { useResume } from "../context/resumeContext"

interface ProjectProps {
    name: string
    location: string
    image: string
    href?: string
    littleImage?: boolean
    littleImageSrc?: string
    paragraph?: string
    color?: string
    buttonLabel?: string | undefined
    onCloseFunc?: () => void
}

const ProjectCard = ({ name, location, image, href, littleImage, littleImageSrc, paragraph, color, buttonLabel, onCloseFunc }: ProjectProps) => {
    const { setIsModalOpen, setModalContent } = useResume();

    const onClick = () => {
        setModalContent({
            heading: location,
            country: name,
            paragraph: paragraph,
            buttonLabel: buttonLabel,
            image: littleImageSrc,
            backgroundImage: image,
            color: color,
            onCloseFunc: () => onCloseFunc ? onCloseFunc() : setIsModalOpen(false),
        });
        setIsModalOpen(true);
    }
    

    const cardContent = () => {
        return (
            <div onClick={() => onClick()} className={`${image} rounded-xl w-full h-full bg-cover shadow-sm ${color}`}>
                <div className='p-3 w-full h-full flex justify-start items-end'>
                    <div className='w-full h-min flex flex-col pb-2 '>

                        {littleImage && littleImg()}

                        <div className='text-slate-50 text-xl antialiased font-arch font-normal leading-6'>
                            {name}
                        </div>
                        <div className='text-slate-50 text-3xl antialiased font-arch leading-7 font-bold'>
                            {location}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const littleImg = () => {
        return (
            <div className='h-fill w-fill flex justify-center align-middle'>
                <div className='max-w-[50%] pb-5'>
                    <img
                        src={littleImageSrc}
                        alt='latest project logo'
                    />
                </div>
            </div>
        )
    }

    return (
        <div className='flex-none w-52 lg:w-60 h-80 py-6 px-4'>
          <a className='cursor-pointer' href={href} >
              {cardContent()}
          </a>
        </div>
    )
}
export default ProjectCard