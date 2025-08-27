'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCartIcon, MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface CartItem {
  serviceId: number;
  serviceName: string;
  category: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = localStorage.getItem('serviceCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  const updateQuantity = (serviceId: number, itemId: number, change: number) => {
    const updatedCart = cart.map(service => {
      if (service.serviceId === serviceId) {
        const updatedItems = service.items.map(item => {
          if (item.id === itemId) {
            const newQuantity = Math.max(0, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        }).filter(item => item.quantity > 0);

        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        return {
          ...service,
          items: updatedItems,
          totalPrice
        };
      }
      return service;
    }).filter(service => service.items.length > 0);

    setCart(updatedCart);
    localStorage.setItem('serviceCart', JSON.stringify(updatedCart));
  };

  const removeService = (serviceId: number) => {
    const updatedCart = cart.filter(service => service.serviceId !== serviceId);
    setCart(updatedCart);
    localStorage.setItem('serviceCart', JSON.stringify(updatedCart));
  };

  const getCartTotal = () => {
    return cart.reduce((total, service) => total + service.totalPrice, 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Store cart data for booking flow and redirect to date/time selection
      localStorage.setItem('pendingBooking', JSON.stringify(cart));
      router.push('/book/checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/services" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Services
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
            {cart.length} Service{cart.length !== 1 ? 's' : ''}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some services to get started</p>
            <Link 
              href="/services"
              className="btn-primary inline-block text-white px-6 py-3 rounded-md font-medium"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((service) => (
                  <div key={service.serviceId} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{service.serviceName}</h3>
                        <p className="text-sm text-gray-600 capitalize">{service.category}</p>
                      </div>
                      <button
                        onClick={() => removeService(service.serviceId)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Remove service"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {service.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">${item.price} each</div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(service.serviceId, item.id, -1)}
                                className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-700"
                              >
                                <MinusIcon className="h-3 w-3" />
                              </button>
                              
                              <span className="w-8 text-center text-sm font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => updateQuantity(service.serviceId, item.id, 1)}
                                className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-700"
                              >
                                <PlusIcon className="h-3 w-3" />
                              </button>
                            </div>
                            
                            <div className="text-sm font-semibold text-gray-900 min-w-[60px] text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Service Total:</span>
                        <span className="text-lg font-semibold text-gray-900">${service.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-medium text-gray-900">$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (estimated):</span>
                    <span className="font-medium text-gray-900">${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${(getCartTotal() + 5 + (getCartTotal() * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full text-white py-3 px-4 rounded-md font-medium mb-3"
                >
                  Proceed to Booking
                </button>

                <Link 
                  href="/services"
                  className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}