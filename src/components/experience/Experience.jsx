import React from 'react'
import "./experience.css"
import { BsPatchCheckFill } from "react-icons/bs"
import { AiFillHtml5 } from "react-icons/ai"
import { RiCss3Fill } from "react-icons/ri"
import { IoLogoJavascript} from "react-icons/io"
import { SiBootstrap,SiReacttable,SiChakraui, SiMaterialui,SiAliexpress,SiPostgresql,SiMongodb,SiSequelize } from "react-icons/si"
import {FaNodeJs} from "react-icons/fa"


const Experience = () => {
  return (
    <section id='experience'>
     <h5>What Skills I Have </h5>
     <h2> My Experience</h2>

      <div className='container experience__container'>
          <div className='experience__frontend'>
              <h3>Frontend Development </h3>
                  <div className='experience__content'>
                        <article className='experience__details'>
                              <AiFillHtml5 className="experience__details-icon"/>
                                <div>
                                <h4> HTML </h4>
                              <small className='text-light'> Intermediate </small>
                                </div>
                        </article>
                        <article className='experience__details'>
                              <RiCss3Fill className="experience__details-icon"/>
                              <div>
                              <h4> CSS </h4>
                              <small className='text-light'> Intermediate </small>
                              </div>
                        </article>
                        <article className='experience__details'>
                              <IoLogoJavascript className="experience__details-icon"/>
                              <div>
                              <h4> JavaScript </h4>
                              <small className='text-light'> Avanced </small>
                              </div>
                        </article>
                        <article className='experience__details'>
                              <SiBootstrap className="experience__details-icon"/>
                            <div>
                            <h4> Bootstrap </h4>
                              <small className='text-light'> Intermediate </small>
                            </div>
                        </article>
                        <article className='experience__details'>
                              <SiReacttable className="experience__details-icon"/>
                              <div>
                              <h4> REACT </h4>
                              <small className='text-light'> Avanced </small>
                              </div>
                        </article>
                        <article className='experience__details'>
                              <SiChakraui className="experience__details-icon"/>
                              <div>
                              <h4> CHAKARA UI </h4>
                              <small className='text-light'> Experienced </small>
                              </div>
                        </article>
                        <article className='experience__details'>
                              <SiMaterialui className="experience__details-icon"/>
                              <div>
                              <h4> MATERIAL UI </h4>
                              <small className='text-light'> Avanced </small>
                              </div>
                        </article>
                  </div>
          </div>
               <div className='experience__backend'>
               <h3>Backend Development </h3> 
               <div className='experience__content'>
                     <article className='experience__details'>
                          <FaNodeJs className="experience__details-icon"/>
                          <div>
                          <h4> Node Js </h4>
                          <small className='text-light'> Experienced </small>
                          </div>
                    </article>
                    <article className='experience__details'>
                          <SiAliexpress className="experience__details-icon"/>
                        <div>
                        <h4> Express Js </h4>
                          <small className='text-light'> Experienced </small>
                        </div>
                    </article>
                    <article className='experience__details'>
                          <SiPostgresql className="experience__details-icon"/>
                          <div>
                          <h4> Postgres SQL </h4>
                          <small className='text-light'> Experienced </small>
                          </div>
                    </article>
                    <article className='experience__details'>
                          <SiMongodb className="experience__details-icon"/>
                          <div>
                          <h4> MongoDB</h4>
                          <small className='text-light'> Experienced </small>
                          </div>
                    </article>
                    <article className='experience__details'>
                          <BsPatchCheckFill className="experience__details-icon"/>
                          <div>
                          <h4> Mongoose</h4>
                          <small className='text-light'> Experienced </small>
                          </div>
                    </article>
                    <article className='experience__details'>
                          <SiSequelize className="experience__details-icon"/>
                         <div>
                         <h4> Sequelize</h4>
                          <small className='text-light'> Experienced </small>
                         </div>
                    </article>
              </div>

               </div>
      </div>
    </section>
  )
}

export default Experience