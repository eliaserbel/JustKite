import axios from "axios";
import React from "react";

const URL = "http://localhost:4000/api/kiteSpots/65ad9366509ebc2b7dd2d9d8";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(URL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <h1>{post.name}</h1>
      <p>{post.address}</p>
    </div>
  );
}
