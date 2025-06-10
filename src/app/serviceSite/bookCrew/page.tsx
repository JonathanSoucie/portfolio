'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MapPin, Calendar } from 'lucide-react';

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  suspension: string;
  tireType: string;
}

interface Service {
  id: string;
  name: string;
  price?: number;
  category: string;
}

const BookYourCrew: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    make: '',
    model: '',
    year: '',
    suspension: '',
    tireType: ''
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // January 2025

  const tracks = [
    'Calabogie Motorsports Park',
    'Canadian Tire Motorsport Park', 
    'Shannonville Motorsports Park',
    'Mosport International Raceway',
    'Grand Bend Motorplex'
  ];

  const services: Service[] = [
    // Tires
    { id: 'tire-swap-4', name: 'Track-grade tire swap (4 sets)', price: 2000, category: 'tires' },
    { id: 'tire-swap-2', name: 'Track-grade tire swap (2 sets)', price: 1000, category: 'tires' },
    { id: 'drag-tire-swap', name: 'Drag tire swap (1 set)',price: 500, category: 'tires' },
    { id: 'drag-tire-swap-2', name: 'Drag tire swap (2 sets)',price: 1000, category: 'tires' },
    { id: 'no-tire-swap', name: 'No tire swap', category: 'tires' },

    // Tech Inspection
    { id: 'full-inspection', name: 'Full pre-race inspection', category: 'tech' },
    { id: 'lapping-inspection', name: 'Lapping day inspection', category: 'tech' },
    { id: 'mechanical-assessment', name: 'Mechanical Assessment', category: 'tech' },
    { id: 'brake-fluid-check', name: 'Brake & Fluid Check', category: 'tech' },
    { id: 'pre-pit-check', name: 'Pre Pit Check', category: 'tech' },

    // Meals
    { id: 'crew-lunch', name: 'Crew & Crew Catered Lunch', category: 'meals' },
    { id: 'trackside-gourmet', name: 'Trackside Gourmet Meal', category: 'meals' },
    { id: 'premium-meal', name: 'Premium Meal Package', category: 'meals' },
    { id: 'breakfast-combo', name: 'Breakfast + Lunch Combo', category: 'meals' },
    { id: 'no-meals', name: 'No Meals', category: 'meals' },

    // Transport
    { id: 'door-to-track', name: 'Door-to-Track Transport', category: 'transport' },
    { id: 'enclosed-trailer', name: 'Enclosed Trailer Delivery', category: 'transport' },
    { id: 'roadtrip-car', name: 'Roadtrip Car Hauling', category: 'transport' },
    { id: 'large-trailer', name: 'Large Trailer (up to 3 Cars)', category: 'transport' },
    { id: 'no-transport', name: 'No Transport', category: 'transport' }
  ];

  const serviceCategories = [
    { id: 'tires', title: 'Tires' },
    { id: 'tech', title: 'Tech Inspection' },
    { id: 'meals', title: 'Meals' },
    { id: 'transport', title: 'Transport' }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Add day headers
    dayNames.forEach(day => {
      days.push(
        <div key={day} className="text-center text-gray-400 text-sm font-medium p-2">
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      const isToday = day === 16; // Highlighting 16th as shown in the image
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`p-2 text-center rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            isSelected 
              ? 'bg-[#ff352a] text-white shadow-lg shadow-[#ff352a]/25 ring-2 ring-[#ff352a]/50' 
              : isToday 
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Recommended Tracks:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTrack(track)}
                    className={`p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 text-left relative overflow-hidden ${
                      selectedTrack === track 
                        ? 'ring-2 ring-[#ff352a] bg-gray-700 shadow-lg shadow-[#ff352a]/25' 
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-4 h-4 text-white mr-2" />
                          <span className="text-sm text-white">Track</span>
                        </div>
                        <h4 className="text-white font-medium text-base leading-tight">{track}</h4>
                      </div>
                      {selectedTrack === track && (
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 bg-[#ff352a] rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    {selectedTrack === track && (
                      <div className="mt-3 text-sm text-[#ff352a] font-medium">
                        ✓ Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {selectedTrack && (
                <div className="mt-6 p-4 bg-[#ff352a]/10 border border-[#ff352a]/20 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#ff352a] mr-2" />
                    <span className="text-[#ff352a] font-medium">Selected Track: </span>
                    <span className="text-white ml-1">{selectedTrack}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {serviceCategories.map(category => (
              <div key={category.id}>
                <h3 className="text-white font-medium mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {services
                    .filter(service => service.category === category.id)
                    .map(service => (
                      <label
                        key={service.id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            className="w-4 h-4 text-[#ff352a] bg-gray-700 border-gray-600 rounded focus:ring-[#ff352a] focus:ring-2"
                          />
                          <span className="text-gray-300">{service.name}</span>
                        </div>
                        {service.price && (
                          <span className="text-gray-400">${service.price}</span>
                        )}
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Make:
                </label>
                <input
                  type="text"
                  value={vehicleInfo.make}
                  onChange={(e) => setVehicleInfo(prev => ({ ...prev, make: e.target.value }))}
                  placeholder="e.g. BMW"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Model:
                </label>
                <input
                  type="text"
                  value={vehicleInfo.model}
                  onChange={(e) => setVehicleInfo(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g. M3 Competition"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Year:
                </label>
                <input
                  type="text"
                  value={vehicleInfo.year}
                  onChange={(e) => setVehicleInfo(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="e.g. 2024"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Suspension Setup:
                </label>
                <input
                  type="text"
                  value={vehicleInfo.suspension}
                  onChange={(e) => setVehicleInfo(prev => ({ ...prev, suspension: e.target.value }))}
                  placeholder="e.g. KW V3"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Tire Type:
                </label>
                <input
                  type="text"
                  value={vehicleInfo.tireType}
                  onChange={(e) => setVehicleInfo(prev => ({ ...prev, tireType: e.target.value }))}
                  placeholder="e.g. 200tw"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                />
              </div>
            </div>
            <button className="flex items-center text-[#ff352a] hover:text-[#e82e24] px-2 rounded transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add another vehicle
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-medium text-lg">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </div>
            
            {selectedDate && (
              <div className="p-4 bg-[#ff352a]/10 border border-[#ff352a]/20 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-[#ff352a] mr-2" />
                  <span className="text-[#ff352a] font-medium">Selected Date: </span>
                  <span className="text-white ml-1">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long' })} {selectedDate}, {currentMonth.getFullYear()}
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Time:
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-[#ff352a] focus:outline-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="text-white font-medium mb-2">Track:</h4>
                <p className="text-gray-400">{selectedTrack || 'Not selected'}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Vehicle:</h4>
                <p className="text-gray-400">
                  {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Price:</h4>
                <p className="text-gray-400">
                  ${services
                    .filter(s => selectedServices.includes(s.id) && s.price)
                    .reduce((total, s) => total + (s.price || 0), 0)}
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Services:</h4>
                <div className="text-gray-400 space-y-1">
                  {selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? <div key={serviceId}>{service.name}</div> : null;
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Date/Time:</h4>
                <p className="text-gray-400">
                  {selectedDate ? `${currentMonth.toLocaleDateString('en-US', { month: 'long' })} ${selectedDate}, ${currentMonth.getFullYear()}` : 'Not selected'}
                  {selectedTime && ` at ${selectedTime}`}
                </p>
              </div>
            </div>
            <div className="pt-8">
              <button className="w-full bg-[#ff352a] hover:bg-[#e82e24] text-white font-medium py-4 px-6 rounded-lg transition-colors">
                CONFIRM
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="service-site min-h-screen bg-[#0b0b0b]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Book Your Crew</h1>
          <p className="text-gray-400">Choose your track, pick your services, and let us handle the rest</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep 
                    ? 'bg-[#ff352a] text-white' 
                    : step < currentStep 
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 5 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step {currentStep} - {
                currentStep === 1 ? 'Pick a Track' :
                currentStep === 2 ? 'Choose Services' :
                currentStep === 3 ? 'Vehicle Info (up to 3)' :
                currentStep === 4 ? 'Date & Time' :
                'Summary + Confirm'
              }
            </h2>
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            {currentStep < 5 && (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center px-6 py-3 bg-[#ff352a] hover:bg-[#e82e24] text-white rounded-lg font-medium transition-colors ml-auto"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookYourCrew;