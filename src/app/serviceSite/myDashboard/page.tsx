'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Car, 
  Clock, 
  DollarSign, 
  Settings, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  User
} from 'lucide-react';

interface Booking {
  id: string;
  trackName: string;
  date: string;
  time: string;
  vehicle: {
    year: string;
    make: string;
    model: string;
  };
  services: string[];
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  crewAssigned?: {
    name: string;
    phone: string;
    email: string;
  };
}

const MyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sample booking data
  const bookings: Booking[] = [
    {
      id: 'BK001',
      trackName: 'Calabogie Motorsports Park',
      date: '2025-06-15',
      time: '08:00',
      vehicle: { year: '2023', make: 'BMW', model: 'M3 Competition' },
      services: ['Track-grade tire swap (4 sets)', 'Full pre-race inspection', 'Crew & Crew Catered Lunch'],
      totalPrice: 450,
      status: 'confirmed',
      crewAssigned: {
        name: 'Mike Johnson',
        phone: '(555) 123-4567',
        email: 'mike@crewservice.com'
      }
    },
    {
      id: 'BK002',
      trackName: 'Canadian Tire Motorsport Park',
      date: '2025-06-22',
      time: '09:30',
      vehicle: { year: '2022', make: 'Porsche', model: '911 GT3' },
      services: ['Track-grade tire swap (2 sets)', 'Mechanical Assessment', 'Premium Meal Package'],
      totalPrice: 320,
      status: 'pending'
    },
    {
      id: 'BK003',
      trackName: 'Shannonville Motorsports Park',
      date: '2025-05-28',
      time: '10:00',
      vehicle: { year: '2021', make: 'Honda', model: 'Civic Type R' },
      services: ['Lapping day inspection', 'Brake & Fluid Check', 'No Meals'],
      totalPrice: 180,
      status: 'completed',
      crewAssigned: {
        name: 'Sarah Chen',
        phone: '(555) 987-6543',
        email: 'sarah@crewservice.com'
      }
    },
    {
      id: 'BK004',
      trackName: 'Mosport International Raceway',
      date: '2025-07-10',
      time: '07:00',
      vehicle: { year: '2024', make: 'McLaren', model: '570S' },
      services: ['Track-grade tire swap (4 sets)', 'Full pre-race inspection', 'Door-to-Track Transport'],
      totalPrice: 650,
      status: 'cancelled'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      case 'completed':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.trackName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    const currentDate = new Date();
    const bookingDate = new Date(booking.date);
    
    let matchesTab = true;
    if (activeTab === 'upcoming') {
      matchesTab = bookingDate >= currentDate && booking.status !== 'completed' && booking.status !== 'cancelled';
    } else if (activeTab === 'past') {
      matchesTab = bookingDate < currentDate || booking.status === 'completed' || booking.status === 'cancelled';
    }
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const stats = {
    totalBookings: bookings.length,
    upcomingBookings: bookings.filter(b => new Date(b.date) >= new Date() && b.status !== 'cancelled').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalSpent: bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalPrice, 0)
  };

  return (
    <div className="service-site min-h-screen bg-[#0b0b0b]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-gray-400">Manage your crew bookings and track history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-[#ff352a]" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-white">{stats.upcomingBookings}</p>
              </div>
              <Clock className="w-8 h-8 text-[#ff352a]" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completedBookings}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-[#ff352a]" />
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">${stats.totalSpent}</p>
              </div>
              <DollarSign className="w-8 h-8 text-[#ff352a]" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
              {[
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'past', label: 'Past' },
                { id: 'all', label: 'All' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#ff352a] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#ff352a] focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button className="flex items-center px-4 py-2 bg-[#ff352a] hover:bg-[#e82e24] text-white rounded-lg font-medium transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No bookings found</h3>
              <p className="text-gray-400 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming bookings yet."
                  : "No bookings match your current filters."
                }
              </p>
              <button className="bg-[#ff352a] hover:bg-[#e82e24] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Book Your First Crew
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <span className="text-gray-400 text-sm">#{booking.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-[#ff352a]" />
                        <span className="text-sm">{booking.trackName}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-[#ff352a]" />
                        <span className="text-sm">
                          {new Date(booking.date).toLocaleDateString()} at {booking.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Car className="w-4 h-4 mr-2 text-[#ff352a]" />
                        <span className="text-sm">
                          {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2 text-[#ff352a]" />
                        <span className="text-sm font-medium">${booking.totalPrice}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mt-3">
                      <p className="text-gray-400 text-xs mb-1">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Crew Assignment */}
                    {booking.crewAssigned && (
                      <div className="mt-3 p-3 bg-gray-800 rounded-lg">
                        <p className="text-gray-400 text-xs mb-2">Assigned Crew:</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center text-gray-300">
                            <User className="w-4 h-4 mr-1 text-[#ff352a]" />
                            {booking.crewAssigned.name}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Phone className="w-4 h-4 mr-1 text-[#ff352a]" />
                            {booking.crewAssigned.phone}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Mail className="w-4 h-4 mr-1 text-[#ff352a]" />
                            {booking.crewAssigned.email}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              New Booking
            </button>
            <button className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors">
              <Calendar className="w-5 h-5 mr-2" />
              View Calendar
            </button>
            <button className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors">
              <Settings className="w-5 h-5 mr-2" />
              Account Settings
            </button>
            <button className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors">
              <DollarSign className="w-5 h-5 mr-2" />
              Billing History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;