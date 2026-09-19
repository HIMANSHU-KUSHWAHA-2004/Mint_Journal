import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/database_service";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 sm:py-16">
            <Container>
                <article className="mx-auto max-w-4xl">
                <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10">
                    <img
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="aspect-[16/8] w-full object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap justify-end gap-2 sm:right-5 sm:top-5">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-white" textColor="text-slate-900" className="px-4 py-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-rose-600" onClick={deletePost} className="px-4 py-2">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-10">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">Mint Journal</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">{post.title}</h1>
                </div>
                <div className="browser-css mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-[1.05rem] leading-8 text-slate-700 shadow-sm sm:p-10">
                    {parse(post.content)}
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}
