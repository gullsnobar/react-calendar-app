// src/components/CalendarGrid.jsx
import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { formatDate, formatTime, getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';

const CalendarGrid = ({
  year,
  month,
  today,
  selectedDate,
  onDateClick,
  onCreateForDate,
  getEventsForDate,
  viewMode,
  theme,
}) => {

  const renderGridView = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day headers
    dayNames.forEach((day) => {
      days.push(
        <div key={`header-${day}`} className={`p-3 text-center font-medium ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {day}
        </div>
      );
    });

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(new Date(year, month, day));
      const dayEvents = getEventsForDate(date);
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
      const isSelected = selectedDate === date;

      days.push(
        <div
          key={day}
          onClick={() => onDateClick(day)}
          className={`p-3 cursor-pointer border-2 border-transparent hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 relative ${
            isToday ? 'bg-blue-100 dark:bg-blue-900' : ''
          } ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : ''}`}
        >
          <div className={`font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
            {day}
          </div>
          {dayEvents.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="text-xs bg-blue-500 text-white rounded px-2 py-1 truncate"
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500 font-medium">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 border rounded-lg overflow-hidden">
        {days}
      </div>
    );
  };

  const renderListView = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const rows = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(new Date(year, month, day));
      const dayEvents = getEventsForDate(date);
      const dayOfWeek = new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'short' });
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();

      rows.push(
        <div
          key={day}
          className={`flex items-center p-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          } ${isToday ? 'bg-blue-50 dark:bg-blue-900' : ''} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
        >
          <div className="w-20 flex-shrink-0">
            <div className={`font-semibold text-lg ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
              {day}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {dayOfWeek}
            </div>
          </div>
          
          <div className="flex-1 ml-4">
            {dayEvents.length === 0 ? (
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                No events
              </div>
            ) : (
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-blue-500 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="font-medium">{event.title}</div>
                    {event.description && (
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        - {event.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={() => onCreateForDate(date)}
            className="ml-4 p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      );
    }

    return (
      <div className={`border rounded-lg overflow-hidden ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        {rows}
      </div>
    );
  };

  return (
    <>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </>
  );
};

export default CalendarGrid;
