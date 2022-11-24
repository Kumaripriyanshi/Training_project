import React from 'react'
import {Carousel} from "react-carousel-minimal"


export default function CarouselComponent() {
  const data = [
    {
      image: "https://source.unsplash.com/1600x900/?food",
      caption: `<p>You can explore Food Blogs</p>`
    },
    {
      image: "https://source.unsplash.com/1600x900/?travel",
      caption: "Read our travel blogs "
    },
    {
      image: "https://source.unsplash.com/1600x900/?fitness",
      caption: "Improve yr fitness "
    },
    {
      image: "https://source.unsplash.com/1600x900/?entertainment",
      caption: "Get the Entertainment blog Update"
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <>
<div className='carousel_container' style={{"height":"38rem"}}>
<Carousel
            data={data}
            time={5000}
            width="100rem"
            height="500px"
            opacity='0.7'
            captionStyle={captionStyle}
            // radius="10px"
            // slideNumber={true}
            // slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            // slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            // thumbnails={true}
            // thumbnailWidth="100px"
            style={{"opacity":"0.8"}}
          />
   </div> 
    </>
  )
}
