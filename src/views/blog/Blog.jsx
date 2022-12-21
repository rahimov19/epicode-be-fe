/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";

import "./styles.css";
const Blog = (props) => {
  let deletePost = async () => {
    console.log(params.id);
    const options = {
      method: "DELETE",
    };

    try {
      const endpoint = `http://localhost:3001/blogs/${params.id}`;
      const response = await fetch(endpoint, options);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  let getPost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/blogs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        throw new Error("AAAAAAAA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // getPosts();
    getPost();
    // const { id } = params;
    // const blog = posts.find((post) => post._id.toString() === id);

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              {blog.readTime ? (
                <div>
                  {blog.readTime.value} {blog.readTime.unit} read
                </div>
              ) : (
                <div></div>
              )}
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
                <Button variant="danger" className="mt-3" onClick={deletePost}>
                  DELETE
                </Button>
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
