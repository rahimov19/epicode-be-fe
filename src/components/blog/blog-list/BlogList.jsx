import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts();
  }, []);
  let getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogs");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        throw new Error("AAAAAAAA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row>
      {posts ? (
        posts.map((post) => (
          <Col
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogItem key={post.title} {...post} />
          </Col>
        ))
      ) : (
        <div></div>
      )}
    </Row>
  );
};

export default BlogList;
