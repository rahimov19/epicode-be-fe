import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import axios from "axios";

const BlogList = (props) => {
  const apiUrl = process.env.REACT_APP_BE_URL;
  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts();
  }, []);
  let getPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/blogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data.blogs);
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
