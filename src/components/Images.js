import { useState, useEffect } from "react";
import Pagination from "./Pagination";

const styles = {
  container: {
    marginTop: "2vh",
    display: "grid",
    gridTemplateColumns: "repeat(5, 12vh)",
    gap: "1.5vw",
    maxWidth: "100%",
    placeContent: "center",
  },
  photo: {
    height: "12vh",
    width: "12vh",
    maxWidth: "100%",
    "&::after": {
      alignItems: "center",
      background: "rgba(black, 0.5)",
      color: "white",
      content: "read more",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      opacity: "0",
      position: "absolute",
      transition: "all 0.5s ease",
      width: "100%",
    },

    "&:hover": {
      color: "white",
      background: "rgba(black, 0.5)",
      content: "read more !important",
      justifyContent: "center",
      "&::after": {
        opacity: "1",
      },
    },
  },
};
export default function Images() {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const today = now.toISOString().substring(0, 10);

  const [date, setDate] = useState(today);
  const [images, setImages] = useState([]);
  const [pageNum, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.REACT_APP_NASA_API_KEY}&page=${pageNum}`
    )
      .then((response) => {
        console.log("requested at Images");
        return response.json();
      })
      .then((res) => {
        console.log(res);
        setImages(res.photos);
      })
      .catch((e) => console.log(e));
  }, [pageNum, date]);

  const handleDate = (event) => {
    setDate(event.target.value);
    setPage(1);
  };

  return (
    <>
      <h2>Mars Images By Date</h2>
      <h5>Earth date: {date}</h5>
      <input
        type="date"
        min="2015-07-01"
        max="2020-12-09"
        onChange={handleDate}
      ></input>
      {images && images.length ? (
        <div>
          <div style={styles.container}>
            {images.map((i) => (
              <img key={i.id} style={styles.photo} src={i.img_src} alt={i.id} />
            ))}
          </div>
          <Pagination
            url={`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.REACT_APP_NASA_API_KEY}`}
            setPage={setPage}
          />
        </div>
      ) : (
        <h1>No images from that day!</h1>
      )}
    </>
  );
}
