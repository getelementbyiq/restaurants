import React from "react";

const TimestampComponent = ({ timestamp }) => {
  // Erstelle ein neues Date-Objekt mit dem gegebenen Zeitstempel
  const dateObject = new Date(timestamp.seconds * 1000);

  // Extrahiere Tag, Monat und Jahr
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Monate beginnen bei 0, also +1
  const year = dateObject.getFullYear() % 100; // Nur die letzten zwei Ziffern des Jahres

  // Füge führende Nullen hinzu, wenn der Tag oder Monat einstellig ist
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Erstelle das gewünschte Format
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  return <span>{formattedDate}</span>;
};

export default TimestampComponent;
