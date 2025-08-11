// src/CalendarApp.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Moon, Sun, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';

import EventModal from './components/EventModal';
import EventList from './components/EventList';
import CalendarGrid from './components/CalendarGrid';

import { formatDate, getMonthName } from './utils/dateUtils';
import { loadEvents, saveEvents, loadTheme, saveTheme } from './utils/localStorageUtils';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEvents = loadEvents();
    const savedTheme = loadTheme();
    
    if (savedEvents) {
      setEvents(savedEvents);
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(formatDate(clickedDate));
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // helper for creating on a specific date (used by CalendarGrid list + button)
  const openCreateOnDate = (date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id ? eventData : event
      ));
    } else {
      setEvents([...events, eventData]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => event.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calendar
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className={`flex rounded-lg p-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border'}`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`p-3 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-100 border'
              }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Create Event Button */}
            <button
              onClick={handleCreateEvent}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800'
                  : 'hover:bg-white border hover:shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-semibold">
              {getMonthName(month)} {year}
            </h2>
            
            <button
              onClick={() => navigateMonth(1)}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800'
                  : 'hover:bg-white border hover:shadow-md'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setCurrentDate(new Date())}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-100 border'
            }`}
          >
            Today
          </button>
        </div>

        {/* Main Calendar Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CalendarGrid
              year={year}
              month={month}
              today={today}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              onCreateForDate={openCreateOnDate}
              getEventsForDate={getEventsForDate}
              viewMode={viewMode}
              theme={theme}
            />
          </div>

          {/* Event Details Sidebar */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 border h-fit`}>
            <h3 className="font-semibold text-lg mb-4">
              {selectedDate ? `Events for ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}` : 'Select a date'}
            </h3>
            
            {selectedDate ? (
              <EventList
                events={getEventsForDate(selectedDate)}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                theme={theme}
              />
            ) : (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Click on a date to view events</p>
              </div>
            )}
          </div>
        </div>

        {/* Event Modal */}
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
