import './WidgetNS.css';
import React, { useEffect, useState } from 'react';
import CarouselItem from '../../components/CarouselItem';

const WidgetNS = ({ title, apiKey, uicCode, type }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const getTrains = () => {
      const params = { uicCode: uicCode };
      const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/${type}?${new URLSearchParams(params)}`;
      fetch(url, {
        method: 'GET',
        headers: { "Ocp-Apim-Subscription-Key": apiKey },
      })
        .then(response => response.json())
        .then(data => {
          const trainData = type === "arrivals" ? data.payload.arrivals : data.payload.departures;
          const sortedTrains = trainData
            .filter(train => train[`${type === "arrivals" ? "arrival" : "departure"}Status`] === "INCOMING" || train[`${type === "arrivals" ? "arrival" : "departure"}Status`] === "ON_STATION")
            .sort((a, b) => new Date(a.actualDateTime) - new Date(b.actualDateTime));
          setTrains(sortedTrains);
        })
        .catch(error => {
          console.error(`Error fetching ${type} trains:`, error);
        });
    };

    getTrains();
  }, [apiKey, uicCode, type]);

  return (
    <CarouselItem title={title} >
        <div className="card-body">
          {trains.slice(0, 3).map((train, index) => {
            const time = new Date(train.actualDateTime);
            const timeString = time.toLocaleTimeString().substring(0, time.toLocaleTimeString().length - 3);
            const timeMinutes = Math.max(0, Math.round((time - new Date()) / 60000));

            return (
              <div key={index} style={{ paddingBottom: '12px' }}>
                <div className="row">
                  <div className="col-6">
                    <p className="card-text" style={{ textAlign: 'left', marginLeft: '20px' }}>
                      <span className="widget-ns-span widget-ns-title">
                        {type === "arrivals" ? train.origin : train.direction}
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="card-text" style={{ textAlign: 'right' }}>
                      <span className="widget-ns-span widget-ns-title">
                        {timeString}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p className="card-text" style={{ textAlign: 'left', marginLeft: '20px' }}>
                      <span className="widget-ns-span widget-ns-subtitle">
                        {train.trainCategory}
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="card-text" style={{ textAlign: 'right' }}>
                      <span className="widget-ns-span widget-ns-subtitle">
                        {timeMinutes} min
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </CarouselItem>
  );
};

export default WidgetNS;
