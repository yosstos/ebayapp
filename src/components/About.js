import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import roverImg from "../assets/rover-about.jpg";
import ImgCarousel from "./ImgCarousel";
import Pagination from "./Pagination";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "45vh",
    width: "85vw",
    margin: "1vh",
  },
  sideContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1vw",
    textAlign: "start",
  },
  mainImg: {
    maxWidth: "50vw",
    maxHeight: "100%",
  },
  butttonStyle: {
    margin: "1vh",
    padding: "0.6vw 1.2vw",
    backgroundColor: "#e2dcd9",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  textColor: {
    display: "inline",
    color: "#e3b096",
  },
};

export default function About() {
  const [pageNum, setPage] = useState(1);
  const [imgArr, setImgArr] = useState([]);
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const today = now.toISOString().substring(0, 10); //get date without time

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${today}&api_key=${process.env.REACT_APP_NASA_API_KEY}&page=${pageNum}`
    )
      .then((response) => {
        console.log("requested at About");

        return response.json();
      })
      .then((res) => {
        console.log(res);
        setImgArr(res.photos);
      })
      .catch((e) => console.log(e));
  }, [pageNum, today]);

  let history = useHistory();
  return (
    <div>
      <h1>About The Program</h1>
      <div style={styles.container}>
        <div>
          <img style={styles.mainImg} src={roverImg} alt="Main Rover" />
        </div>
        <div style={styles.sideContainer}>
          <h5>
            Part of NASA's Mars Science Laboratory mission, Curiosity is the
            largest and most capable rover ever sent to Mars. It launched
            November 26, 2011 and landed on Mars at 10:32 p.m. PDT on Aug. 5,
            2012 (1:32 a.m. EDT on Aug. 6, 2012). Curiosity set out to answer
            the question: Did Mars ever have the right environmental conditions
            to support small life forms called microbes? Early in its mission,
            Curiosity's scientific tools found chemical and mineral evidence of
            past habitable environments on Mars. It continues to explore the
            rock record from a time when Mars could have been home to microbial
            life.
            <br />
            <a href="https://mars.nasa.gov/msl/mission/overview/">
              {" "}
              More info here
            </a>
          </h5>

          <div>
            <button
              style={styles.butttonStyle}
              onClick={() => history.push("/Weather")}
            >
              View Weather
            </button>
            <button
              style={styles.butttonStyle}
              onClick={() => history.push("/Images")}
            >
              View Images By Date
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ display: "inline" }}>Curiosity rover images </h3>
        <h3 style={styles.textColor}>from today</h3>
        <ImgCarousel imgArr={imgArr} />
      </div>
      <Pagination
        url={`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${today}&api_key=${process.env.REACT_APP_NASA_API_KEY}`}
        setPage={setPage}
      />
    </div>
  );
}
