import React from 'react'

function Logo() {
  return (
    <div className='flex items-center gap-3'>
      <span className='grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-lg font-black text-amber-300 shadow-lg shadow-slate-900/15'>M</span>
      <span className='font-serif text-xl font-bold tracking-tight text-slate-900'>Mint<span className='text-amber-600'>.</span>Journal</span>
    </div>
  )
}

export default Logo
