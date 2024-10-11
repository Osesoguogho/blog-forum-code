import React, {useState} from 'react';
import { HiChevronLeft } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";

const ImageSlider = ({imageData}) => {
    const [imageIndex, setImageIndex] = useState(0);
    console.log(imageData);
    const handleNext = () => {
      setImageIndex(imageIndex === imageData.length - 1 ? 0 : imageIndex + 1 )
    };
    const handlePrevious = () => {
      setImageIndex(imageIndex === 0 ? imageData.length - 1  : imageIndex - 1 )
    };

  return (
        <div className='flex justify-center items-center relative'>
          <HiChevronLeft className="absolute left-4 text-white cursor-pointer hover:cursor-pointer" onClick={handlePrevious}/>
         {imageData.map((image, index) => {
      return <img src={`http://localhost:3800/uploads/${image.filename}`} className={`my-3  object-cover md:h-screen ${imageIndex !== index? "hidden" : ""} rounded-md transition ease-in delay-100`}  alt={image.originalname} key={index}/>
 })}
 <HiChevronRight className="absolute text-white right-4 cursor-pointer hover:cursor-pointer" onClick={handleNext}/>
    <span className="absolute flex bottom-6">{ imageData.map((_, index) => (
      <button className={`bg-white rounded-full ${imageIndex !== index ? "bg-gray-600" : ""} mx-2 w-[8px] h-[8px] hover:cursor-pointer`} onClick={()=>setImageIndex(index)} key={index}></button>
      ))} </span>
     </div>
      )
}

export default ImageSlider