import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-9 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div><span className="font-serif text-lg font-bold text-slate-900">Mint<span className="text-amber-600">.</span>Journal</span><p className="mt-1">Thoughts worth keeping close.</p></div>
        <div className="flex gap-5 font-medium"><Link className="hover:text-amber-700" to="/">Home</Link><Link className="hover:text-amber-700" to="/all-posts">All posts</Link><Link className="hover:text-amber-700" to="/add-post">Write</Link></div>
        <p>© {new Date().getFullYear()} Mint Journal</p>
      </div>
    </footer>
  )
}

export default Footer
