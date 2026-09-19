import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {Container, PostCard} from '../components'
import databaseService from '../appwrite/database_service'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
    }, [])
  
    return (
        <div className='pb-12'>
            <Container>
                <section className='grid gap-10 py-12 md:grid-cols-[1.25fr_0.75fr] md:items-end md:py-20'>
                  <div>
                    <p className='mb-4 text-sm font-bold uppercase tracking-[0.2em] text-amber-600'>A slower corner of the internet</p>
                    <h1 className='max-w-3xl font-serif text-4xl font-bold leading-[0.98] tracking-tight text-slate-900 sm:text-6xl'>Ideas with room to <span className='text-amber-600'>breathe.</span></h1>
                    <p className='mt-6 max-w-xl text-lg leading-8 text-slate-600'>Read thoughtful notes, share what matters, and keep the conversations worth returning to.</p>
                  </div>
                  <div className='rounded-3xl border border-amber-200 bg-amber-100/70 p-7 shadow-lg shadow-amber-900/5'>
                    <p className='text-sm font-bold uppercase tracking-[0.16em] text-amber-700'>Your journal</p>
                    <p className='mt-3 font-serif text-3xl font-bold text-slate-900'>{posts.length} {posts.length === 1 ? 'story' : 'stories'} published</p>
                    {authStatus ? <Link to='/add-post' className='mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700'>Write a story →</Link> : <Link to='/login' className='mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700'>Join the journal →</Link>}
                  </div>
                </section>
                {posts.length === 0 ? (
                  <section className='rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center'>
                    <p className='font-serif text-3xl font-bold text-slate-900'>{authStatus ? 'Your first story is waiting.' : 'A quiet page, for now.'}</p>
                    <p className='mx-auto mt-3 max-w-md text-slate-500'>{authStatus ? 'Turn an idea into something readers can return to.' : 'Sign in to read and write stories in the journal.'}</p>
                  </section>
                ) : <section className='pb-8'>
                  <div className='mb-7 flex items-end justify-between gap-4'><div><p className='text-sm font-bold uppercase tracking-[0.18em] text-amber-600'>Latest writing</p><h2 className='mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl'>Recent stories</h2></div><Link to='/all-posts' className='hidden shrink-0 text-sm font-bold text-slate-600 hover:text-amber-700 sm:block'>View all stories →</Link></div>
                  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                        <PostCard {...post} />
                        </div>
                    ))}
                  </div>
                </section>}
            </Container>
        </div>
    )
}

export default Home
