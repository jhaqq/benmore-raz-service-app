'use client';

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserIcon, PhoneIcon, ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import RealtimeUpdates from "./RealtimeUpdates";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Requests', href: '/requests' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Join Our Team', href: '/technician-application' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-700 to-blue-800 rounded-md flex items-center justify-center group-hover:from-blue-800 group-hover:to-blue-900 transition-all shadow-sm">
              <span className="text-white font-semibold text-lg">S</span>
            </div>
            <span className="text-xl font-medium text-gray-900">ServicePro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <RealtimeUpdates />
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors"
                aria-label="User menu"
              >
                <UserIcon className="h-4 w-4" />
                Account
                <ChevronDownIcon className="h-3 w-3" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/requests"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Requests
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Cog6ToothIcon className="h-4 w-4" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className="btn-primary text-white px-4 py-2 rounded-md text-sm font-medium"
              role="button"
              aria-label="Book a service now"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle main menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium flex items-center gap-2"
                onClick={() => setIsOpen(false)}
                role="button"
              >
                <UserIcon className="h-4 w-4" />
                Sign In
              </Link>
              <Link
                href="/services"
                className="btn-primary text-white block px-3 py-2 mx-3 mt-2 rounded-md text-base font-medium text-center"
                onClick={() => setIsOpen(false)}
                role="button"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}