"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogsExamples = [
  {
    id: 1,
    img: "/assets/photos/placeholderImage.svg",
    title: "Title pepe.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, perferendis? Vel modi, iste ad aperiam asperiores cum, pariatur minima, natus voluptate esse earum consectetur consequatur voluptas corrupti eveniet animi officia veritatis quae quos. Nulla tempore, voluptate sunt porro, ea vero molestiae doloremque expedita eos omnis quaerat asperiores nemo qui velit.",
    createdAt: "09/10/2024",
  },
  {
    id: 2,
    img: "/assets/photos/placeholderImage.svg",
    title: "Title pepe.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, perferendis? Vel modi, iste ad aperiam asperiores cum, pariatur minima, natus voluptate esse earum consectetur consequatur voluptas corrupti eveniet animi officia veritatis quae quos. Nulla tempore, voluptate sunt porro, ea vero molestiae doloremque expedita eos omnis quaerat asperiores nemo qui velit.",
    createdAt: "09/10/2024",
  },
  {
    id: 3,
    img: "/assets/photos/placeholderImage.svg",
    title: "Title pepe.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, perferendis? Vel modi, iste ad aperiam asperiores cum, pariatur minima, natus voluptate esse earum consectetur consequatur voluptas corrupti eveniet animi officia veritatis quae quos. Nulla tempore, voluptate sunt porro, ea vero molestiae doloremque expedita eos omnis quaerat asperiores nemo qui velit.",
    createdAt: "09/10/2024",
  },
  {
    id: 4,
    img: "/assets/photos/placeholderImage.svg",
    title: "Title pepe.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, perferendis? Vel modi, iste ad aperiam asperiores cum, pariatur minima, natus voluptate esse earum consectetur consequatur voluptas corrupti eveniet animi officia veritatis quae quos. Nulla tempore, voluptate sunt porro, ea vero molestiae doloremque expedita eos omnis quaerat asperiores nemo qui velit.",
    createdAt: "09/10/2024",
  },
  {
    id: 5,
    img: "/assets/photos/placeholderImage.svg",
    title: "Title pepe.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, perferendis? Vel modi, iste ad aperiam asperiores cum, pariatur minima, natus voluptate esse earum consectetur consequatur voluptas corrupti eveniet animi officia veritatis quae quos. Nulla tempore, voluptate sunt porro, ea vero molestiae doloremque expedita eos omnis quaerat asperiores nemo qui velit.",
    createdAt: "09/10/2024",
  },
  {
    id: 6,
    img: "/assets/photos/placeholderImage.svg",
    title: "Title pepe FINAL.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, perferendis? Vel modi, iste ad aperiam asperiores cum, pariatur minima, natus voluptate esse earum consectetur consequatur voluptas corrupti eveniet animi officia veritatis quae quos. Nulla tempore, voluptate sunt porro, ea vero molestiae doloremque expedita eos omnis quaerat asperiores nemo qui velit.",
    createdAt: "09/10/2024",
  },
];

const BlogCard = ({ blog }: { blog: any }) => (
  <Card className="overflow-hidden shadow-none border-none bg-transparent">
    <Link href="#" className="block">
      <img
        src={blog.img}
        alt={blog.title}
        width="100%"
        className="object-cover rounded-lg border"
      />
    </Link>
    <CardHeader className="px-0">
      <CardTitle className="line-clamp-2 hover:underline text-3xl">
        <Link href="#">{blog.title}</Link>
      </CardTitle>
    </CardHeader>
    <CardContent className="px-0">
      <p className="text-lg text-muted-foreground line-clamp-3">
        {blog.description}
      </p>
    </CardContent>
    <CardFooter className="px-0">
      <time dateTime={blog.createdAt} className="text-sm text-muted-foreground">
        {blog.createdAt}
      </time>
    </CardFooter>
  </Card>
);

const BlogCardSkeleton = () => (
  <Card className="overflow-hidden shadow-none border-none">
    <Skeleton className="w-full h-48 rounded-lg" />
    <CardHeader className="px-0">
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent className="px-0">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
    <CardFooter className="px-0">
      <Skeleton className="h-4 w-24" />
    </CardFooter>
  </Card>
);

const BlogClient = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredBlogs = blogsExamples.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="flex items-start justify-center min-h-screen bg-gray-50">
      <div className="container max-w-5xl flex flex-col items-start justify-center h-full p-5 lg:p-10 gap-10 border-r border-l border-dashed bg-[#fcfcfb]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-20 mt-20"
          >
            <motion.section className="text-start space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
              <p className="text-lg text-muted-foreground">
                A statically generated blog example using Next.js and Markdown.
              </p>
            </motion.section>

            {/* Featured Post */}
            <motion.section>
              <Card className="shadow-none border-none bg-transparent">
                {loading ? (
                  <Skeleton className="w-full h-64 rounded-lg" />
                ) : (
                  <Link href="#" className="block">
                    <img
                      src="/assets/photos/placeholderImage.svg"
                      alt="Featured blog post"
                      width="100%"
                      className="w-full object-cover rounded-lg border"
                    />
                  </Link>
                )}
                <CardContent className="space-y-4 pt-6 px-0">
                  {loading ? (
                    <>
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-24" />
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold tracking-tight hover:underline">
                        <Link href="#">Lorem ipsum dolor sit amet</Link>
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit...
                      </p>
                      <time className="text-sm text-muted-foreground">
                        09/10/2024
                      </time>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.section>

            {/* Blog List */}
            <motion.section className="space-y-10">
              <div className="sticky top-16 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-5 py-5 bg-[#fcfcfb80] backdrop-blur-sm">
                <h2 className="text-3xl font-bold">More Stories</h2>
                <div className="relative w-full md:w-[20rem]">
                  <Input
                    type="text"
                    placeholder="Search blogs..."
                    className="pr-10"
                    onClick={() => setOpen(true)}
                  />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">Ctrl</span>K
                  </kbd>
                </div>
              </div>

              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading
                  ? Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <li key={index}>
                          <BlogCardSkeleton />
                        </li>
                      ))
                  : currentPosts.map((blog) => (
                      <li key={blog.id}>
                        <BlogCard blog={blog} />
                      </li>
                    ))}
              </ul>

              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.section>
          </motion.div>
        </AnimatePresence>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Type to search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Blogs">
              {filteredBlogs?.map((blog) => (
                <CommandItem key={blog.id}>
                  <Link href="#" className="flex items-center">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="w-8 h-8 object-cover rounded mr-2"
                    />
                    <span>{blog.title}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </section>
  );
};

export default BlogClient;
