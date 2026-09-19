import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database_service";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (data) => {
        if (!userData) {
            setError("Please log in before publishing a post.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            if (post) {
                const file = data.image?.[0] ? await databaseService.uploadFile(data.image[0]) : null;

                if (file) {
                    await databaseService.deleteFile(post.featuredImage);
                }

                const dbPost = await databaseService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await databaseService.uploadFile(data.image[0]);

                if (!file) {
                    throw new Error("Image upload failed. Please choose another image and try again.");
                }

                const dbPost = await databaseService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (submissionError) {
            setError(submissionError.message || "Unable to publish the post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Draft details</p><h2 className="mt-2 font-serif text-3xl font-bold text-slate-900">Tell your story</h2></div>
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Publish settings</p>
                {error && <p className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" disabled={isSubmitting} bgColor={post ? "bg-emerald-600" : undefined} className="mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? "Saving..." : post ? "Update" : "Submit"}
                </Button>
            </aside>
        </form>
    );
}
