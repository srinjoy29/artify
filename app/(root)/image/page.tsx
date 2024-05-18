"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Ensure you have the 'next/image' component available
import styles from "./page.module.css";

const Home = () => {
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("512x512"); // Default size
  const [hasDownload, setHasDownload] = useState(false);

  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to fetch and set the image from local storage
  const setImageFromStorage = () => {
    const storedImage = localStorage.getItem("generatedImage");
    if (storedImage) {
      setImage(storedImage);
      setHasDownload(true);
    }
  };

  // Effect to set image from local storage on component mount
  useEffect(() => {
    setImageFromStorage();
  }, []);

  // Function to generate new image and store in local storage
  const generateImage = async () => {
    setLoading(true);
    try {
      const [prompt, numImages] = searchVal.split(",").map((val) => val.trim());
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, n: Math.min(5, parseInt(numImages)), size: selectedSize }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setImage(data.url);
      setSearchVal("");
      setHasDownload(true);

      // Save image URL in local storage
      localStorage.setItem("generatedImage", data.url);
    } catch (error) {
      console.error(error);
      alert("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <h1>Text To Image Generation</h1>
        <input
          value={searchVal}
          type="text"
          onChange={(event) => setSearchVal(event.target.value)}
          placeholder="Enter prompt"
        />
        {/* <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
          <option value="256x256">256x256</option>
          <option value="512x512">512x512</option>
          <option value="1024x1024">1024x1024</option>
        </select> */}
        <button onClick={generateImage} disabled={loading}>
          {loading ? "Loading..." : "Generate image"}
        </button>
      </div>
      {image && (
        <div className={styles.imageContainer}>
          <img className="image-result" src={image} alt="AI generated" />
        </div>
      )}
      {hasDownload && (
        <button 
          className="download-btn" 
          onClick={downloadHandler}
        >
          Download Image
        </button>
      )}
    </main>
  );
};

export default Home;
