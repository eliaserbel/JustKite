import { useState } from "react";
import { useKiteSpotsContext } from "../hooks/useKiteSpotsContext";

const CreateKiteSpot = () => {
  const { dispatch } = useKiteSpotsContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [creator, setCreator] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kitespot = {
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
      body: JSON.stringify(kitespot),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setName("");
      setAddress("");
      setDescription("");
      setLevel("");
      setRating("");
      setComments("");
      setCreator("");
      console.log("new kitespot added:", json);
      dispatch({ type: "CREATE_KITESPOT", payload: json });
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
        className={emptyFields.includes("name") ? "error" : ""}
      />

      <label>Address:</label>
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        className={emptyFields.includes("address") ? "error" : ""}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Level:</label>
      <input
        type="number"
        onChange={(e) => setLevel(e.target.value)}
        value={level}
        className={emptyFields.includes("level") ? "error" : ""}
      />

      <label>Rating:</label>
      <input
        type="number"
        onChange={(e) => setRating(e.target.value)}
        value={rating}
        className={emptyFields.includes("rating") ? "error" : ""}
      />

      <label>Comments:</label>
      <input
        type="text"
        onChange={(e) => setComments(e.target.value)}
        value={comments}
        className={emptyFields.includes("comments") ? "error" : ""}
      />

      <label>Creator:</label>
      <input
        type="text"
        onChange={(e) => setCreator(e.target.value)}
        value={creator}
        className={emptyFields.includes("creator") ? "error" : ""}
      />

      <button>Add New Spot</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CreateKiteSpot;
