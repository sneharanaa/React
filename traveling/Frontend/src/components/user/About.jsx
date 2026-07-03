import React from 'react';
import travel from '/travel.png';
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { PiFacebookLogo } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import dinner from '/dinner.png';

function About() {
  return (
    <>  
      <div className="relative w-full bg-zinc-900 text-white flex justify-center items-center overflow-hidden ">
            <div className="absolute inset-0 flex justify-center items-center z-0 transform -rotate-12">
                <div className="text-9xl font-extrabold flex gap-1">
                    <p>Book</p>
                    <p className="bg-red-700 px-1 py-2 text-center rounded-lg">my</p>
                    <p>Tr!p</p>
                </div>
            </div>
    
            <div className="absolute w-full inset-0 bg-black bg-opacity-70 z-0 backdrop-blur-sm overflow-scroll overflow-x-hidden  overflow-y-hidden"></div>
    
            <div className="relative flex flex-col items-center justify-center z-10 p-7 max-w-screen-xl w-full">
                <div className="flex flex-col w-full mb-4">
                    <div>
                      <div className='text-center'>
                          <h1 className='text-5xl text-gray-400 p-3'>ABOUT US</h1>
                      </div>
                      <div className='flex flex-col gap-5'>
                        <div className='flex gap-10'>
                          <div className='flex flex-col gap-10'>
                            <div className='w-[800px] flex gap-9'>
                              <p>Welcome to <span className='font-bold text-red-600'>Book My Trip</span>, your trusted partner in travel experiences. Our mission is simple: to provide travelers with unforgettable journeys and a seamless booking experience. We believe that travel is not just about reaching a destination, but about creating memories that last a lifetime.</p>
                            </div>

                            <div className='w-[800px] flex gap-9'>
                              <p>Founded in 2025, <span className='font-bold text-red-600'>Book My Trip</span> started as a small group of passionate travelers who wanted to make it easier for others to explore the world. Over the years, we have grown into a comprehensive travel agency offering everything from adventure trips to relaxing getaways. We are committed to helping you find the perfect travel experience that matches your preferences, whether it's a serene beach retreat or a thrilling mountain expedition.</p>
                            </div>

                            <div className='w-[800px]'>
                              <h1 className='text-center font-bold text-blue-600'>Join Us on Your Next Adventure</h1>
                              <p>At <span className='font-bold text-red-600'>Book My Trip</span>, we believe in making travel accessible, enjoyable, and stress-free for everyone. Whether you're planning a weekend getaway or an international adventure, we are here to help you make it happen. Start exploring today and create memories that will last a lifetime!</p>
                            </div>
                          </div>

                          <div>
                            <img width={500} src={travel} alt="travel" />
                          </div>
                        </div> 
                        
                        <div className='flex gap-10'>
                            <div>
                              <img width={500} src={dinner} alt="dinner" />
                            </div>

                            <div className='flex flex-col gap-10 mt-12'>
                              <div className='w-[800px]'>
                                <p>We specialize in personalized travel bookings, offering tailored trips for individuals, families, and groups. From booking flights and hotels to arranging tours, activities, and transportation, we take care of every detail so that you can focus on enjoying your trip. Our platform makes it easy to book trips with just a few clicks, ensuring that your travel planning is as smooth as possible.</p>
                              </div>

                              <div className='flex flex-col w-[800px] gap-5'>
                                <p>
                                  <span className='font-bold text-blue-600'>Expert Travel Advice:</span> Our team of experienced travel specialists is here to help you choose the best trips that align with your interests and budget.
                                </p>
                                <p>
                                <span className='font-bold text-blue-600'>Exclusive Deals:</span> We partner with top-rated hotels, airlines, and tour operators to offer you exclusive discounts and special packages.
                                </p>  
                                <p>
                                <span className='font-bold text-blue-600'>24/7 Support:</span> Whether you need assistance before, during, or after your trip, our customer support team is always ready to assist you.
                                </p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div className='flex text-4xl gap-6 justify-center p-5'>
                    <FaInstagram />
                    <PiFacebookLogo />
                    <CiLinkedin />
                    <FaXTwitter />
                </div>
                <div className='flex justify-center'>
                    <Link to={'/'} className='text-blue-600 hover:underline'>Back to Home</Link>
                </div>
            </div>
      </div>
    </>
  )
}

export default About;
