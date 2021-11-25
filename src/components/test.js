const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Ticket type</Text>
          <Text style={styles.text}>Adults</Text>
          <Text style={styles.text}>Students</Text>
          <Text style={styles.text}>Children</Text>
        </View>
        <View style={styles.section}>
          <Text>Ticket quantity</Text>
          <Text style={styles.text}>
            {adultTickets} X {selectValue} RON
          </Text>
          <Text style={styles.text}>
            {studentTickets} X {(selectValue * 0.2)} RON
          </Text>
          <Text style={styles.text}>{childrenTickets} X 0 RON</Text>
        </View>
        <View style={styles.section}>
          <Text>Ticket price(TOTAL)</Text>
          <Text style={styles.text}>{(adultTickets * selectValue)} RON</Text>
          <Text style={styles.text}>
            {(studentTickets * selectValue * 0.2)} RON
          </Text>
          <Text style={styles.text}>0 RON</Text>
        </View>
      </Page>
    </Document>
  
);