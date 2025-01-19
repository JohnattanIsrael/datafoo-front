import ProjectCard from './ProjectCard';
import logo2 from '/assets/logo2.png'
import vw from '/assets/vw.png'
import audi from '/assets/audi.png'
import hyundai from '/assets/hyundai.png'
import eye from '/assets/eye.svg'

const ProjectFeed = () => {

  return (
    <div className='overflow-x-auto flex w-full h-full shadow-lg'>
      <ProjectCard
        image='bg-p-vw ease-in-out duration-300 hover:opacity-100'
        name='USA and Canada'
        location='Volkswagen'
        paragraph='I currently work as a Fullstack Developer for VWFS. Volkswagen is one of the brands I have contributed to their frontends and backends for the last 3 years.'
        littleImageSrc={vw}
      />
      <ProjectCard
        image='bg-p-audi ease-in-out duration-300 hover:opacity-100'
        name='USA and Canada'
        location='Audi'
        paragraph='Audi is also one of the brands I´m most proud of. My contributions have included Devops, Frontend and Backend development for several proyects.'
        littleImageSrc={audi}
      />
      <ProjectCard
        image='bg-p-hyundai ease-in-out duration-300 hover:opacity-100'
        name='USA and Mexico'
        location='Hyundai Technology'
        paragraph='I worked for Hyundai Technology USA and Mexico as well as several of the owner´s companies and e-commerces. I was the Tech Lead for the Frontend team.'
        littleImageSrc={hyundai}
      />
            <ProjectCard
        image='opacity-80 ease-in-out duration-300 hover:opacity-100'
        littleImage={true}
        littleImageSrc={logo2}
        name='Mexico'
        location='PIMARC'
        paragraph='PIMARC is a construction company that I worked for as a Fullstack Developer. I was in charge of the whole tech stack and the Growth Hacking strategies. This is one of my precedents for all UX/UI and User Centered Marketing knowledge.'
        color='bg-gradient-to-r from-amber-400 to-amber-500'
      />
      <ProjectCard
        image='bg-p-eye ease-in-out duration-300 hover:opacity-100'
        name='USA and Mexico'
        location='Code The World'
        paragraph='Code The World is a huge project I´m currently working on. It´s a people oriented platform that promotes coding and technology to help resolve world problems.'
        littleImageSrc={eye}
      />

    </div>
  )
}

export default ProjectFeed;