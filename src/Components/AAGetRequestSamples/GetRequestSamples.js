// firebase
//   .firestore()
//   .collection("products")
//   .where("defaultOffer.0", "<=", currentTime) // Startzeitpunkt <= aktuelle Uhrzeit
//   .where("defaultOffer.1", ">=", currentTime) // Endzeitpunkt >= aktuelle Uhrzeit
//   .orderBy("defaultOffer.0") // Optional: Sortiere nach Startzeitpunkt
//   .limit(10) // Begrenze auf die ersten 10 passenden Produkte
//   .get()
//   .then((snapshot) => {
//     // Verarbeite die zurückgegebenen Produkte hier
//     snapshot.forEach((doc) => {
//       console.log(doc.data());
//       // Handle each product
//     });
//   })
//   .catch((error) => {
//     console.error("Error getting documents: ", error);
//   });

// // Zuerst die Anfrage, um die Gesamtanzahl der übereinstimmenden Dokumente zu zählen
// firebase.firestore().collection("products")
//   .where("defaultOffer.0", "<=", currentTime) // Startzeitpunkt <= aktuelle Uhrzeit
//   .where("defaultOffer.1", ">=", currentTime) // Endzeitpunkt >= aktuelle Uhrzeit
//   .get()
//   .then((snapshot) => {
//     const totalNumberOfProducts = snapshot.size; // Gesamtanzahl der übereinstimmenden Dokumente
//     console.log("Gesamtanzahl der gefundenen Produkte:", totalNumberOfProducts);

//     // Dann die paginierte Abfrage, um nur eine Teilmenge der Dokumente zu erhalten
//     firebase.firestore().collection("products")
//       .where("defaultOffer.0", "<=", currentTime) // Startzeitpunkt <= aktuelle Uhrzeit
//       .where("defaultOffer.1", ">=", currentTime) // Endzeitpunkt >= aktuelle Uhrzeit
//       .orderBy("defaultOffer.0") // Optional: Sortiere nach Startzeitpunkt
//       .limit(10) // Begrenze auf die ersten 10 übereinstimmenden Produkte
//       .get()
//       .then((paginatedSnapshot) => {
//         // Verarbeite die paginierten Ergebnisse hier
//         paginatedSnapshot.forEach((doc) => {
//           console.log(doc.data());
//           // Handle each product
//         });
//       })
//       .catch((error) => {
//         console.error("Error getting paginated documents: ", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Error getting total number of documents: ", error);
//   });
