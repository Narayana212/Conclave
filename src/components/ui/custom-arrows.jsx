import Image from "next/image";

const NextArrow = (props) => {
    const { className, onClick, style } = props;
    return (
      <>
        <div
          onClick={onClick}
          className="absolute top-52 right-0 cursor-pointer"
          
        >
          <Image alt="right" src="/right-arrow.png" width={"15"} height={"15"}/>
        </div>
        
      </>
    );
  };
  
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <>
      <div
        onClick={onClick}
        className="absolute top-52 left-0 cursor-pointer"
        
      >
        <Image src="/left-arrow.png" alt="left" width={"15"} height={"15"}/>
      </div>
      
    </>
    );
  };


  export {NextArrow,PrevArrow}