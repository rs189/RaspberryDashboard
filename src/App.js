import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CarouselPage from './components/CarouselPage';

function App() {
  const [pages, setPages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundTimeout, setBackgroundTimeout] = useState(600000);

  const loadWidgetComponent = async (module, type) => {
    try {
      const component = await import(`./widgets/${module}/${type}.js`);
      return component.default;
    } catch (error) {
      console.error(`Could not load widget type: ${type} from module: ${module}`, error);
      return null;
    }
  };

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(async (data) => {
        const pagesWithComponents = await Promise.all(data.pages.map(async (page) => {
          const widgetsWithComponents = await Promise.all(page.widgets.map(async (widget) => {
            const { module, type, ...props } = widget;
            const Component = await loadWidgetComponent(module, type);
            return { ...props, Component };
          }));
          return { ...page, widgets: widgetsWithComponents };
        }));
        setPages(pagesWithComponents);
      })
      .catch(error => console.error("Error loading config:", error));
  }, []);

  const loadBackgroundImage = () => {
    fetch('/backgrounds.json')
      .then(response => response.json())
      .then(data => {
        const currentHour = new Date().getHours();
        const suitableImages = data.filter(image => 
          (currentHour < 6 && image.dark) || (currentHour >= 6 && !image.dark)
        );
        if (suitableImages.length > 0) {
          const selectedImage = suitableImages[Math.floor(Math.random() * suitableImages.length)];
          setBackgroundImage(`${selectedImage.image}`);
          console.log(`Background image loaded: ${selectedImage.image}`);
        }
      })
      .catch(error => console.error("Error loading backgrounds:", error));
  };

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        if (data.backgroundTimeout) {
          setBackgroundTimeout(data.backgroundTimeout);
        }
      })
      .catch(error => console.error("Error loading config:", error));
  }, []);

  useEffect(() => {
    loadBackgroundImage();

    const intervalId = setInterval(loadBackgroundImage, backgroundTimeout * 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [backgroundTimeout]);
  
  return (
    <div 
      className="App" 
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
        backgroundColor: 'black',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      <Navbar />
      <div id="dashboard" className="carousel slide carousel-multi-item" data-ride="carousel" data-interval="10000">
        <div className="container-fluid">
          <div className="row" style={{ minHeight: '100vh' }}>
            <ul className="carousel-indicators">
              {pages.map((_, index) => (
                <li key={index} data-target="#dashboard" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
              ))}
            </ul>
            <div className="carousel-inner" role="listbox">
              {pages.map((page, index) => (
                <CarouselPage key={index} active={index === 0}>
                  {page.widgets.map((widget, i) => {
                    const { Component, ...props } = widget;
                    return Component ? <Component key={i} {...props} /> : null;
                  })}
                </CarouselPage>
              ))}
            </div>
            <a className="carousel-control-prev" href="#dashboard" role="button" data-slide="prev" />
            <a className="carousel-control-next" href="#dashboard" role="button" data-slide="next" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
