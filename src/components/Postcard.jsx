import React from 'react'
import databaseService from '../appwrite/database_service'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`} className='group block h-full'>
        <article className='h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10'>
            <div className='relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100'>
                <img src={databaseService.getFilePreview(featuredImage)} alt={title}
                className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                <span className='absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur'>Story</span>
            </div>
            <div className='px-2 pb-2 pt-5'>
              <p className='mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-600'>Fresh perspective</p>
              <h2 className='font-serif text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-amber-700'>{title}</h2>
              <span className='mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition group-hover:gap-3'>Read story <span aria-hidden='true'>→</span></span>
            </div>
        </article>
    </Link>
  )
}


export default PostCard
