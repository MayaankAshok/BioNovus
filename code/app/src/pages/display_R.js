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
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const MyDocument = ({ item }) => (
    <Document>
      <Page style={styles.page}>
        <Text>
          {item.id}: {item.type}, {item.intensity}
        </Text>
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
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Intensity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ fontSize: "18px" }}>{item.id}</td>
              <td style={{ fontSize: "18px" }}>{item.type}</td>
              <td style={{ fontSize: "18px" }}>{item.intensity}</td>
              <td>
                <button className="button1">
                  <PDFDownloadLink document={<MyDocument item={item} />} fileName={`${item.id}.pdf`}>
                    {({ loading }) => (loading ? "Loading document..." : "Print")}
                  </PDFDownloadLink>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Display_R;