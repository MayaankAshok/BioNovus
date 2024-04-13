import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import "./button.css";
import { Nav } from "../components/NavBar/NavElements";
import NavItem from "../components/NavBar/NavItem";

function Display_R() {
  const [items, setResults] = useState([]);

  const getResults = async () => {
    try {
      const response = await axios.get("http://localhost:5000/display_R");
      const sortedResults = response.data.sort((a, b) => a.id.localeCompare(b.id));
      setResults(sortedResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const MyDocument = ({ items }) => (
    <Document>
      <Page style={styles.page}>
        {items.map((item) => (
          <Text key={item.id}>
            {item.id}: {item.type}, {item.intensity}
          </Text>
        ))}
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 10,
    },
  });

  return (
    <div style={{ height: "80vh" }}>
      <h1>All Results</h1>
      {items.map((item) => (
        <li className="list" key={item.id} style={{ fontSize: "18px" }}>
          {item.id}: {item.type}, {item.intensity}
          <button className="button1">
            <PDFDownloadLink
              document={<MyDocument items={items} />}
              fileName="results.pdf"
            >
              {({ loading }) => (loading ? "Loading document..." : "Print")}
            </PDFDownloadLink>
          </button>
        </li>
      ))}
    </div>
  );
}

export default Display_R;