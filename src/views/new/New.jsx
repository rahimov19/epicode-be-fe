/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const apiUrl = process.env.REACT_APP_BE_URL;
  const [image, setImage] = useState(null);
  const [imageBlog, setImageBlog] = useState(null);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  // const [idd, setIdd] = useState("");
  let idd = "";

  const submitHandle = async (e) => {
    e.preventDefault();

    const title = document.querySelector("#blog-form").value;
    const author = document.querySelector("#blog-Author").value;
    const readtime = document.querySelector("#blog-ReadTime").value;
    const category = document.querySelector("#blog-category").value;

    const submitObject = {
      category: category,
      title: title,
      readTime: {
        value: readtime,
        unit: "minute",
      },
      content: html,
      author: {
        name: author,
      },
    };

    const options = {
      method: "POST",
      body: JSON.stringify(submitObject),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const endpoint = `${apiUrl}/blogs/`;
      const response = await fetch(endpoint, options);
      // let postId = await response.json();
      idd = await response.json();
      // console.log(postId);
      console.log(idd);

      alert("Post edited successfully");
    } catch (error) {
      console.log(error);
    }

    const formData = new FormData();

    formData.append("avatar", image);

    const options2 = {
      method: "POST",
      body: formData,
    };

    try {
      const endpoint = `${apiUrl}/files/${idd.id}/user`;
      console.log(endpoint);
      const response = await fetch(endpoint, options2);
    } catch (error) {
      console.log(error);
    }

    const formData2 = new FormData();

    formData2.append("blog", imageBlog);

    const options3 = {
      method: "POST",
      body: formData2,
    };

    try {
      const endpoint = `${apiUrl}/files/${idd.id}/blog`;
      const response = await fetch(endpoint, options3);
    } catch (error) {
      console.log(error);
    }

    try {
      const endpoint = `${apiUrl}/blogs/email`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [cats, setCats] = useState();
  let getPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setCats(data);
      } else {
        throw new Error("AAAAAAAA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    getPosts();
  }, []);
  const [html, setHTML] = useState(null);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);
  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" />
        </Form.Group>
        <Form.Group controlId="blog-Author" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author" />
        </Form.Group>
        <Form.Group controlId="blog-email" className="mt-3">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            size="lg"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mt-4 d-flex flex-column">
          <Form.Label>Author Avatar</Form.Label>
          <input
            type="file"
            id="avatar"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </Form.Group>
        <Form.Group className="mt-4 d-flex flex-column">
          <Form.Label>Post Cover</Form.Label>
          <input
            type="file"
            id="blog"
            onChange={(e) => setImageBlog(e.target.files[0])}
          ></input>
        </Form.Group>
        <Form.Group controlId="blog-ReadTime" className="mt-3">
          <Form.Label>Read Time</Form.Label>
          <Form.Control size="lg" placeholder="Read Time in Mins" />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select">
            {cats ? (
              cats.map((cat) => <option>{cat.category}</option>)
            ) : (
              <option>Nothing</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            onClick={(e) => submitHandle(e)}
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
