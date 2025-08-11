// src/components/EventList.jsx
import React from 'react';
import { Calendar, Clock, Edit3, X } from 'lucide-react';
import { formatTime } from '../utils/dateUtils';

const EventList = ({ events, onEdit, onDelete, theme }) => {
  if (!events || events.length === 0) {
    return (
      <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No events for this day</p>
      </div>
    );
  }

  return (
  <div className="space-y-3">
  {events.map((event) => (
  <div
  key={event.id}
  className={`p-4 rounded-lg border-l-4 border-blue-500 ${
  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
  }`}
  >
  <div className="flex items-start justify-between">
  <div className="flex-1">
  <h4 className="font-medium text-lg">{event.title}</h4>
  <div className="flex items-center gap-1 text-sm text-blue-500 mt-1">
  <Clock className="w-4 h-4" />
  <span>{formatTime(event.time)}</span>
  </div>
  {event.description && (
  <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
  {event.description}
  </p>
  )}
  </div>
  <div className="flex gap-2">
  <button
  onClick={() => onEdit(event)}
  className={`p-2 rounded-lg transition-colors ${
  theme === 'dark'
  ? 'hover:bg-gray-600 text-gray-300'
  : 'hover:bg-gray-200 text-gray-600'
  }`}
  >
  <Edit3 className="w-4 h-4" />
  </button>
  <button
  onClick={() => onDelete(event.id)}
  className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
  >
  <X className="w-4 h-4" />
 </button>
  </div>
  </div>
  </div>
  ))}
    </div>
  );
};

export default EventList;
