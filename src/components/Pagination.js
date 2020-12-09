import { useState, useEffect } from "react";

const styles = {
  buttonContainer: {
    float: "right",
    marginLeft: "2vw",
  },
  button: {
    margin: "1vh",
    padding: "0.8vw 1.5vw",
    backgroundColor: "#e2dcd9",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default function Pagination(props) {
  const { url, setPage } = props;

  const [pageAmount, setPageAmount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        console.log("requested at Pagination");
        return response.json();
      })
      .then((res) => {
        //console.log(res);
        setPageAmount(Math.round(res.photos.length / 25));
        setItems(
          Array.from(
            { length: Math.round(res.photos.length / 25) },
            (_, idx) => (
              <button
                key={idx + 1}
                style={styles.button}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            )
          )
        );
      })
      .catch((e) => console.log(e));
  }, [url, setPage]);

  return <div style={styles.buttonContainer}>Select Page: {items}</div>;
}
