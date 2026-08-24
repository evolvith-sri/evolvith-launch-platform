'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { COMMERCIAL_PRODUCTS_COUNT } from '@/lib/products';

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
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-wider text-white flex items-center gap-2">
              EVOLVITH
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-medium">
                EEOS
              </span>
            </span>
            <span className="text-[9px] font-mono text-gray-400 tracking-tight">
              Enterprise Operating Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300" aria-label="Main Navigation">
          <Link
            href="/"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors flex items-center gap-1.5"
          >
            <span>Products</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
              {COMMERCIAL_PRODUCTS_COUNT} OS
            </span>
          </Link>
          <Link
            href="/store"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors flex items-center gap-1.5"
          >
            <span>Store</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              $49+
            </span>
          </Link>
          <Link
            href="/workstations/audit-os-01"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors flex items-center gap-1"
          >
            <span>Workstation</span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              LIVE
            </span>
          </Link>
          <Link
            href="/docs"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/support"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            Support
          </Link>
          <Link
            href="/about"
            className="hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors"
          >
            About
          </Link>
          <Link
            href="/redeem"
            className="text-cyan-400/90 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1 transition-colors text-xs font-mono"
          >
            Redeem Code
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/store"
            className="btn-primary hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg shadow-cyan-500/10"
          >
            <span>Browse Store</span>
            <span className="text-[10px] text-cyan-200">→</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-2"
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
        <div className="lg:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-1.5"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-1.5 flex items-center justify-between"
          >
            <span>Products</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{COMMERCIAL_PRODUCTS_COUNT} OS</span>
          </Link>
          <Link
            href="/store"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-emerald-400 font-medium text-base py-1.5 flex items-center justify-between"
          >
            <span>Commercial Store</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">From $49</span>
          </Link>
          <Link
            href="/workstations/audit-os-01"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-1.5 flex items-center justify-between"
          >
            <span>Workstation</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">LIVE</span>
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-1.5"
          >
            Documentation
          </Link>
          <Link
            href="/support"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-1.5"
          >
            Support
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-cyan-400 font-medium text-base py-1.5"
          >
            About
          </Link>
          <Link
            href="/redeem"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-400 font-medium text-base py-1.5"
          >
            Redeem AppSumo Code
          </Link>
          <div className="pt-2">
            <Link
              href="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary block text-center w-full py-3 text-xs font-bold uppercase font-mono tracking-wider"
            >
              Enter Commercial Store ($49+)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
