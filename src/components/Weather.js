import { useState, useEffect } from "react";

const styles = {
  container: {
    marginTop: "2vh",
    display: "grid",
    gridTemplateColumns: "repeat(5, 18vh)",
    gap: "1.5vw",
    //gridAutoRows: 'minmax(100px, auto)',
    maxWidth: "100%",
    placeContent: "center",
  },
  card: {
    height: "18vh",
    width: "18vh",
    fontSize: "small",
    border: "solid",
    borderRadius: "4px",
  },
};

export default function Weather() {
  const [sols, setSols] = useState([]);
  const [Jso, setJso] = useState([]);
  const [pageNum, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=${process.env.REACT_APP_NASA_API_KEY}&page=${pageNum}`
    )
      .then((response) => {
        console.log("requested at Weather");
        return response.json();
      })
      .then((res) => {
        console.log(res);
        setJso(res);
        setSols(res.sol_keys);
      })
      .catch((e) => console.log(e));
  }, [pageNum]);

  let cards = sols.map((sol) => {
    return (
      <div key={sol} style={styles.card}>
        {`Data point: ${sol}
                    Temperature[AVG]: ${
                      Jso[sol].AT ? Jso[sol].AT.av : "No info"
                    }
                    Wind[AVG]: ${Jso[sol].HWS ? Jso[sol].HWS.av : "No info"}
                    Pressure[AVG]: ${Jso[sol].PRE ? Jso[sol].PRE.av : "No info"}
                    First UTC: ${Jso[sol].First_UTC}
                    Last UTC: ${Jso[sol].Last_UTC}
                    `}
      </div>
    );
  });
  return (
    <>
      <h2>Mars Weather</h2>
      <div style={styles.container}>{cards}</div>
    </>
  );
}
