"use client";
import React, { useEffect } from "react";

const GoogleMap = () => {
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.568848, lng: 35.906464 }, // Özkan Sürücü Kursu Bafra'nın koordinatları
        zoom: 15,
      });

      const marker = new google.maps.Marker({
        position: { lat: 41.568848, lng: 35.906464 },
        map: map,
        title: "Özkan Sürücü Kursu",
      });

      const infoWindow = new google.maps.InfoWindow({
        content:
          '<h3>Özkan Sürücü Kursu</h3><p>Bafra, Samsun</p><a href="https://www.google.com/maps/dir/?api=1&destination=41.568848,35.906464" target="_blank">Yol Tarifi Al</a>',
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    };

    window.initMap = initMap;
    loadGoogleMapsScript();
  }, []);

  return <div id="map" style={styles.map}></div>;
};

const styles = {
  map: {
    width: "100%",
    height: "100vh",
  },
};

export default GoogleMap;
