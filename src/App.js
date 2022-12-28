import { useState , useRef} from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';


function App() {
  const inputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const mintNFT = async () => {
    const form = new FormData();
    form.append("file", inputRef.current.files[0]);

    const options = {
      method: "POST",
      body: form,
      headers: {
        Authorization: process.env.REACT_APP_NFTPort_API_KEY,
      },
    };

    await fetch(
      "https://api.nftport.xyz/v0/mints/easy/files?" +
        new URLSearchParams({
          chain: "goerli",
          name: title,
          description: description,
          mint_to_address: address,
        }),
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
      toast.success("NFT Minted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        theme: "dark",
      });
  };



  return (
    <form className="upload-form">
        <label name="acc_add" className="normal-label">
          Enter your Wallet Address
        </label>

        <input
          name="acc_add"
          className="acc_add"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label name="file" className="drop-container">
          <input
            type="file"
            className="upload"
            ref={inputRef}
            name="uploadImage"
          />
        </label>
        <label name="title" className="normal-label">
          NFT Name
        </label>
        <input
          name="title"
          className="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label name="desc" className="normal-label">
          NFT Description
        </label>
        <textarea
          name="desc"
          className="desc"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="button" className="button_slide slide_right" onClick={mintNFT} >
          MINT
        </button>
        <ToastContainer />
      </form>
  );
}

export default App;
