'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export function Navbar() {
  const scrollPosition = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolled = scrollPosition > 20;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F19]/90 backdrop-blur-lg border-b border-white/10 shadow-2xl py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Emblem & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          aria-label="Evolvith Digital Headquarters Homepage"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
            E
          </div>
          <span className="font-heading font-extrabold text-xl tracking-wider text-white">
            EVOLVITH
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link
            href="/"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="btn-primary hidden sm:inline-block px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Explore Wave 1
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-2"
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 px-6 py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-2"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-2"
          >
            Products
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-2"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-2"
          >
            Contact
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary block text-center w-full py-3 text-sm font-semibold"
          >
            Explore Wave 1
          </Link>
        </div>
      )}
    </header>
  );
}
