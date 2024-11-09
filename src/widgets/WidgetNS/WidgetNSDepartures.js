import React from 'react';
import WidgetNS from './WidgetNS';

const NSDeparturesWidget = ({ title, apiKey, uicCode }) => <WidgetNS title={title} apiKey={apiKey} uicCode={uicCode} type="departures" />;
export default NSDeparturesWidget;
