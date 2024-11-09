import './CarouselItem.css';
import React, { useEffect, useState } from 'react';

const CarouselItem = ({ title, children }) => {
  const [className, setClassName] = useState('widget-card card bg-dark');

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        if (data.blurEnabled) {
          setClassName(prevClassName => `${prevClassName} widget-card-blur`);
        }
      })
      .catch(error => console.error("Error loading config:", error));
  }, []);

  return (
    <div className="col-xs-4 col-xs-12">
      <div className={className}>
        <h5 className="card-header widget-text">{title}</h5>
        {children}
      </div>
    </div> 
  );
}

export default CarouselItem;
