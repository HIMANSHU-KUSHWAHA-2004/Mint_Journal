import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import {Container,LogoutBtn,Logo} from '../index'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

   return (
    <header className='sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 py-3 backdrop-blur-xl'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <Link to='/' onClick={() => setMenuOpen(false)}>
              <Logo />
            </Link>
          </div>
          <button
            type='button'
            aria-expanded={menuOpen}
            aria-controls='main-navigation'
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className='rounded-full p-2 text-slate-700 transition hover:bg-amber-50 hover:text-amber-700 sm:hidden'
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span className='sr-only'>{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className='block h-0.5 w-5 bg-current shadow-[0_-6px_0_currentColor,0_6px_0_currentColor]' />
          </button>
          <ul id='main-navigation' className={`${menuOpen ? 'flex' : 'hidden'} basis-full flex-col items-stretch gap-1 border-t border-slate-200/80 pt-3 sm:flex sm:basis-auto sm:flex-row sm:items-center sm:justify-end sm:gap-1.5 sm:border-0 sm:pt-0 sm:gap-2`}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => `block rounded-xl px-3 py-2.5 text-sm font-semibold transition sm:rounded-full sm:px-4 sm:py-2 ${isActive ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
                >{item.name}</NavLink>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn onLogout={() => setMenuOpen(false)} />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
