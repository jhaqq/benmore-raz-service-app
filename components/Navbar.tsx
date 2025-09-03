'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, UserIcon, ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import RealtimeUpdates from "./RealtimeUpdates";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Requests', href: '/requests' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Fixed width */}
          <div className="flex-shrink-0 w-48">
            <Link href="/" className="inline-flex items-center">
              <Image 
                src="/3.svg" 
                alt="Domo Home Services" 
                width={300}
                height={80}
                className="h-14 w-auto rounded-xl"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    style={{
                      color: isActive ? 'var(--primary)' : undefined,
                    }}
                    role="menuitem"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop CTA Buttons - Fixed width to match logo */}
          <div className="hidden md:flex items-center justify-end space-x-4 w-48">
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
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
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
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors rounded-md ${
                    isActive
                      ? 'bg-gray-100 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{
                    color: isActive ? 'var(--primary)' : undefined
                  }}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
                role="button"
              >
                <UserIcon className="h-4 w-4" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}