import './CarouselPage.css';

const CarouselPage = ({ active, children }) => {
  const classes = active ? 'carousel-item active' : 'carousel-item';
  return (
    <div className={classes}>
      <div className="carousel-page row h-100 justify-content-center align-items-center">  
        {children}
      </div>
    </div>
  );
}

export default CarouselPage;
