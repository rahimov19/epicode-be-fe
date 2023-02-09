import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./styles.css";

const Home = (props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/login");
    if (searchParams.get("accessToken")) {
      localStorage.setItem("accessToken", searchParams.get("accessToken"));
      navigate("/");
    }
  }, [navigate, searchParams]);
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      <BlogList />
    </Container>
  );
};

export default Home;
