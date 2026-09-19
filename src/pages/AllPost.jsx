import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/database_service'
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        databaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
    }, [])
  return (
    <div className='py-12 sm:py-16'>
        <Container>
            <div className='mb-10 max-w-2xl'>
              <p className='text-sm font-bold uppercase tracking-[0.2em] text-amber-600'>The archive</p>
              <h1 className='mt-3 font-serif text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl'>Every story, <span className='text-amber-600'>one place.</span></h1>
              <p className='mt-4 text-lg leading-8 text-slate-600'>A growing collection of ideas from the Mint Journal community.</p>
            </div>
            {posts.length === 0 ? <div className='rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center font-serif text-2xl font-bold text-slate-700'>No stories published yet.</div> : <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>}
            </Container>
    </div>
  )
}

export default AllPosts
