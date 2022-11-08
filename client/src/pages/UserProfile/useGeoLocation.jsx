import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        coordinates: { latitude: "", longitude: "" },
    });

    const onSuccess = (location) => {
        setLocation({
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;