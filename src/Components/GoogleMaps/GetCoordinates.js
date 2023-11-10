// import axios from "axios";

// // Funktion zum Abrufen von Koordinaten aus einer Adresse
// export const apiKey = process.env.GOOGLE_API_KEY;
// const getCoordinatesFromAddress = async (address, apiKey) => {
//   try {
//     const response = await axios.get(
//       "https://maps.googleapis.com/maps/api/geocode/json",
//       {
//         params: {
//           address: address,
//           key: apiKey,
//         },
//       }
//     );

//     if (response.data.results.length > 0) {
//       const location = response.data.results[0].geometry.location;
//       return location;
//     } else {
//       throw new Error("Adresse nicht gefunden");
//     }
//   } catch (error) {
//     console.error("Fehler bei der Geocoding-Anfrage:", error);
//     throw error;
//   }
// };

// export default getCoordinatesFromAddress;
