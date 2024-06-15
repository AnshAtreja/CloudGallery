import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";

const UploadsPage = () => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(9); 

const fetchImages = async () => {
  console.log("Fetching images...");
  try {
    const response = await fetch(
      `http://localhost:5000/api/images/fetch?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      setError(data.message);
      return;
    }

    const data = await response.json();
    console.log("Fetched images:", data.images.length);
    setImages((prevImages) => [...prevImages, ...data.images]);
    setHasMore(data.images.length === limit);
    setPage((prevPage) => prevPage + 1);
  } catch (error) {
    console.error("Error fetching images:", error);
    setError("Internal server error");
  }
};

useEffect(() => {
  fetchImages(); // Fetch images when this component mounts
}, []);

  return (
    <div className="bg-butter flex flex-col items-center py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Uploaded Images</h1>
      <Link
        to="/upload"
        className="bg-gold hover:bg-darkgold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Upload More Images
      </Link>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {images.length === 0 && <p>No Images to Display</p>}
        {chunkArray(images, 3).map((row, index) => (
          <div key={index} className="flex justify-between">
            {row.map((img, idx) => (
              <Image key={idx} imageUrl={img.imageUrl} alt={`Image ${index * 3 + idx}`} />
            ))}
          </div>
        ))}
      </InfiniteScroll>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

export default UploadsPage;
