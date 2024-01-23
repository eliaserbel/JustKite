import { useState } from "react";

const CreateKiteSpot = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [creator, setCreator] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const KiteSpot = {
      name,
      address,
      description,
      level,
      rating,
      comments,
      creator,
    };

    const response = await fetch("/api/kiteSpots", {
      method: "POST",
      body: JSON.stringify(KiteSpot),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      setName("");
      setAddress("");
      setDescription("");
      setLevel("");
      setRating("");
      setComments("");
      setCreator("");
      console.log("new kitespot added:", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a new KiteSpot</h3>

      <label>Kitespot Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Level:</label>
      <input
        type="number"
        onChange={(e) => setLevel(e.target.value)}
        value={level}
      />

      <label>Rating:</label>
      <input
        type="number"
        onChange={(e) => setRating(e.target.value)}
        value={rating}
      />

      <label>Comments:</label>
      <input
        type="text"
        onChange={(e) => setComments(e.target.value)}
        value={comments}
      />

      <label>Creator:</label>
      <input
        type="text"
        onChange={(e) => setCreator(e.target.value)}
        value={creator}
      />

      <button>Add New Spot</button>
    </form>
  );
};

export default CreateKiteSpot;
