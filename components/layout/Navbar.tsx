'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
] as const

// -------------------------------------------------------------------------
// Navbar
// -------------------------------------------------------------------------
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  // Refs for focus management
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const overlayFirstRef = useRef<HTMLAnchorElement>(null)
  const overlayLastRef = useRef<HTMLAnchorElement>(null)

  // Scroll detection
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handler, { passive: true })
    // Check initial scroll position
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close overlay on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Body scroll lock + Escape key + focus trap when menu opens
  useEffect(() => {
    if (!menuOpen) return

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Move focus to first link when overlay opens
    overlayFirstRef.current?.focus()

    // Escape key + focus trap handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }

      // Focus trap: intercept Tab at overlay boundaries
      if (e.key === 'Tab') {
        const first = overlayFirstRef.current
        const last = overlayLastRef.current

        if (!first || !last) return

        if (e.shiftKey) {
          // Shift+Tab: if focus is on first element, loop to last
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          // Tab: if focus is on last element, loop to first
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  return (
    <>
      {/* ----------------------------------------------------------------
          Main header
      ---------------------------------------------------------------- */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50',
          'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out',
          scrolled
            ? 'bg-[rgba(13,13,13,0.85)] backdrop-blur-md border-b border-white/8 h-16'
            : 'bg-transparent h-20',
        )}
      >
        <div className="mx-auto max-w-7xl px-lg h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-[20px] tracking-[-0.02em] text-text-primary"
          >
            CLMC
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-xl">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'relative font-body text-[14px] text-text-primary py-sm',
                  'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-text-primary',
                  'after:origin-left motion-safe:after:transition-transform motion-safe:after:duration-200',
                  pathname === href
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="primary" size="sm">Get in Touch</Button>
            </Link>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
            className="md:hidden p-[10px] flex flex-col justify-center items-center gap-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive-focus"
          >
            <span
              className={cn(
                'block h-[2px] w-6 bg-text-primary',
                'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out',
                menuOpen ? 'translate-y-[7px] rotate-45' : '',
              )}
            />
            <span
              className={cn(
                'block h-[2px] w-6 bg-text-primary',
                'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out',
                menuOpen ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'block h-[2px] w-6 bg-text-primary',
                'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out',
                menuOpen ? '-translate-y-[7px] -rotate-45' : '',
              )}
            />
          </button>
        </div>
      </header>

      {/* ----------------------------------------------------------------
          Mobile full-screen overlay
      ---------------------------------------------------------------- */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 bg-surface-primary flex flex-col"
        >
          {/* Overlay header — close button (X state) */}
          <div className="flex items-center justify-between px-lg h-20">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-display font-bold text-[20px] tracking-[-0.02em] text-text-primary"
            >
              CLMC
            </Link>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="p-[10px] flex flex-col justify-center items-center gap-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive-focus"
            >
              <span className="block h-[2px] w-6 bg-text-primary translate-y-[7px] rotate-45" />
              <span className="block h-[2px] w-6 bg-text-primary opacity-0" />
              <span className="block h-[2px] w-6 bg-text-primary -translate-y-[7px] -rotate-45" />
            </button>
          </div>

          {/* Centered nav links */}
          <nav
            aria-label="Mobile navigation"
            className="flex-1 flex flex-col items-center justify-center gap-xl"
          >
            {NAV_LINKS.map(({ href, label }, index) => {
              const isFirst = index === 0
              const isLast = index === NAV_LINKS.length - 1
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  ref={isFirst ? overlayFirstRef : isLast ? overlayLastRef : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeMenu}
                  className={cn(
                    'font-display text-[36px] font-bold text-text-primary',
                    'relative',
                    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-text-primary',
                    'after:origin-left motion-safe:after:transition-transform motion-safe:after:duration-200',
                    isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
