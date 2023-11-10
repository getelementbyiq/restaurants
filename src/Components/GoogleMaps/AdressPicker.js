// import React, { useEffect, useState } from "react";

// function AddressAutofill({ onAddressAutofilled }) {
//   const [apiLoaded, setApiLoaded] = useState(false);
//   const [street, setStreet] = useState("");
//   const [houseNumber, setHouseNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");

//   useEffect(() => {
//     if (!apiLoaded) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=DEIN_API_KEY&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.addEventListener("load", () => {
//         setApiLoaded(true);
//       });

//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script);
//       };
//     }
//   }, [apiLoaded]);

//   useEffect(() => {
//     if (apiLoaded) {
//       // Die Google Maps-API wurde geladen
//       // Hier kannst du den `AutocompleteService` verwenden
//       const autocompleteService =
//         new window.google.maps.places.AutocompleteService();

//       // Verwende den `autocompleteService` für die Adress-Autofill-Logik
//       const address = `${street} ${houseNumber}, ${city}, ${country}`;

//       autocompleteService.getPlacePredictions(
//         { input: address },
//         (predictions) => {
//           if (predictions && predictions.length > 0) {
//             const selectedPlace = predictions[0].description;
//             // Übergebe die ausgewählte Adresse an die Elternkomponente
//             onAddressAutofilled(selectedPlace);
//           }
//         }
//       );
//     }
//   }, [apiLoaded, street, houseNumber, city, country]);

//   return (
//     <div>
//       <input
//         placeholder="Straße"
//         type="text"
//         value={street}
//         onChange={(e) => setStreet(e.target.value)}
//       />
//       <input
//         placeholder="Hausnummer"
//         type="text"
//         value={houseNumber}
//         onChange={(e) => setHouseNumber(e.target.value)}
//       />
//       <input
//         placeholder="Stadt"
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <input
//         placeholder="Land"
//         type="text"
//         value={country}
//         onChange={(e) => setCountry(e.target.value)}
//       />
//     </div>
//   );
// }

// export default AddressAutofill;
