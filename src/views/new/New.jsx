import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
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
      author: {
        name: author,
        avatar: `https://ui-avatars.com/api/?name=${author}`,
      },
      content: html,
    };
    console.log(submitObject);
    const options = {
      method: "POST",
      body: JSON.stringify(submitObject),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const endpoint = "http://localhost:3001/blogs/";
      const response = await fetch(endpoint, options);

      alert("Post edited successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const [cats, setCats] = useState();
  let getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogs");
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
