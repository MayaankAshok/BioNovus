import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import "./button.css"; 
import { Nav } from "../components/NavBar/NavElements"; 
import NavItem from "../components/NavBar/NavItem"; 

function Display_R() {
  // State to store results
  const [items, setResults] = useState([]);

  // Function to fetch results from the server
  const getResults = async () => {
    try {
      // Make a GET request to fetch results
      const response = await axios.get("http://localhost:5000/display_R");
      // Sort the results by ID
      const sortedResults = response.data.sort((a, b) => a.id.localeCompare(b.id));
      // Update the state with the sorted results
      setResults(sortedResults);
    } catch (error) {
      // Alert the user in case of error
      alert('Logging Error: ' + error.response.data.error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getResults();
  }, []);

  // PDF document component
  const MyDocument = ({ item }) => (
    <Document>
      <Page style={styles.page}>
        <Text>
          {item.id}: {item.type}, {item.intensity}
        </Text>
      </Page>
    </Document>
  );

  // Consolidated styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: 10,
    },
    tableData: {
      fontSize: "18px",
    },
  });

  return (
    <div style={{ height: "80vh" }}>
      {/* Header */}
      <h1>All Results</h1>
      {/* Results table */}
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
          {/* Render each result */}
          {items.map((item) => (
            <tr key={item.id}>
              <td style={styles.tableData}>{item.id}</td>
              <td style={styles.tableData}>{item.type}</td>
              <td style={styles.tableData}>{item.intensity}</td>
              <td>
                {/* PDF download link */}
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
