import './WidgetFlashcard.css';
import React, { useEffect, useState } from 'react';
import CarouselItem from '../../components/CarouselItem';

const WidgetFlashcard = ({ title, source }) => {
  const [flashcardData, setFlashcardData] = useState({
    title: 'デフォルト',
    subtitle: 'でふぁると',
    meaning: 'Default',
  });

  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((data) => {
        const randomFlashcard = data[Math.floor(Math.random() * data.length)];
        setFlashcardData({
          title: randomFlashcard.title,
          subtitle: randomFlashcard.subtitle,
          meaning: randomFlashcard.meaning,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [source]);

  return (
    <CarouselItem title={title}>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <p className="card-text" style={{ textAlign: 'center' }}>
              <span className="widget-flashcard-span"
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  wordWrap: 'normal',
                  whiteSpace: 'nowrap',
                  fontSize: '32px',
                }}>{flashcardData.title}
              </span>
            </p>
          </div>
        </div>
        {flashcardData.subtitle && (
          <div className="row">
            <div className="col-12">
              <p className="card-text" style={{ textAlign: 'center' }}>
                <span className="widget-flashcard-span" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.5)' 
                  }}>{flashcardData.subtitle}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12">
            <p className="card-text" style={{ textAlign: 'center' }}>
              <span className="widget-flashcard-span"
                style={{
                  color: 'rgba(255, 255, 255, 0.25)',
                  fontStyle: 'italic',
                }}>{flashcardData.meaning}
              </span>
            </p>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default WidgetFlashcard;
