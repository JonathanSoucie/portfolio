'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Lock, Truck, MapPin, User, Mail, Phone, Plus, Minus, X } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
  description: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes: { name: string; price: string; dimensions: string }[];
  frames: { name: string; price: string; image: string }[];
}

interface CartItem {
  product: Product;
  selectedSize: number;
  selectedFrame: number;
  quantity: number;
  totalPrice: number;
}



export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Canada'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...cartItems];
    const newQuantity = Math.max(1, newItems[index].quantity + delta);
    newItems[index].quantity = newQuantity;
    
    // Recalculate total price
    const sizePrice = parseFloat(newItems[index].product.sizes[newItems[index].selectedSize].price.replace('$', ''));
    const framePrice = parseFloat(newItems[index].product.frames[newItems[index].selectedFrame].price.replace('+$', ''));
    newItems[index].totalPrice = (sizePrice + framePrice) * newQuantity;
    
    setCartItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 9.99;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleShippingSubmit = () => {
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCurrentStep(3);
  
    // Clear cart
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-300 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <p className="text-gray-300">Order #: AD-{Date.now()}</p>
            <p className="text-gray-300">Total: ${calculateTotal().toFixed(2)}</p>
            <p className="text-gray-300">Estimated Delivery: 5-7 business days</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold">Art Depot Checkout</h1>
          <div className="flex items-center gap-2">
            <Lock size={16} />
            <span className="text-sm">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-white text-black' : 'bg-gray-600'}`}>
                1
              </div>
              <span className="ml-2 hidden sm:inline">Shipping</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-600"></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-white text-black' : 'bg-gray-600'}`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-600"></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-white' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-white text-black' : 'bg-gray-600'}`}>
                3
              </div>
              <span className="ml-2 hidden sm:inline">Complete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Truck size={24} />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Province</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleShippingSubmit}
                    className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard size={24} />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: formatCardNumber(e.target.value)})}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-white focus:outline-none"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    disabled={isProcessing}
                    className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - ${calculateTotal().toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800 rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-700 rounded-lg">
                  <img 
                    src={item.product.image} 
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.product.title}</h3>
                    <p className="text-xs text-gray-400">{item.product.artist}</p>
                    <p className="text-xs text-gray-400">
                      {item.product.sizes[item.selectedSize].name} • {item.product.frames[item.selectedFrame].name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-auto text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 pt-4 border-t border-gray-600">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${calculateShipping().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-600">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={16} />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <p className="text-xs text-gray-400">
                Orders over $50 qualify for free shipping. Estimated delivery: 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}