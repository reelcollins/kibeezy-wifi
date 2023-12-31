'use client';

import React, { useRef }  from 'react'
import { useLoadScript, GoogleMap, MarkerF, CircleF, Marker } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import styles from '@/styles/Map.module.css';



// interface PropertiesMapProps {
//     latt: number;
//     lngg: number;
      
//     }

// export default function UploadMap({latt, lngg}: PropertiesMapProps) {
export default function UploadMap() {
    const [lat, setLat] = useState(-1.1008204900530465);
    const [lng, setLng] = useState(37.010441055197546);
    // const markerRef = useRef();
    // const markerRef = useRef<Marker | null>(null); // Use Marker or any compatible type

    const markerRef = useRef<any>(null); // Use any, but be cautious
    // ...
    // (markerRef.current as Marker).panTo({ lat: 10, lng: 20 });



    const libraries = useMemo(() => ['places'], []);
    const mapCenter = useMemo(() => ({ lat: +lat, lng: +lng }), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });

    const handleMarkerClick = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
      };

    const handleMarkerDragEnd = (marker: any) => {
        const newPosition = marker.getPosition();
        setLat(newPosition.lat());
        setLng(newPosition.lng());
    
        console.log('Marker dragged to:', newPosition.lat(), newPosition.lng());
      };
      
    if (!isLoaded) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className={styles.homeWrapper}>
                <GoogleMap
                    options={mapOptions}
                    zoom={19}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: '800px', height: '360px' }}
                    onLoad={() => console.log('Map Component Loaded...')}
                >
                    <MarkerF
                        position={mapCenter}
                        draggable={true}
                        onDragEnd={handleMarkerDragEnd}
                        onClick={handleMarkerClick}
                        // onLoad={() => console.log('Marker Loaded')} />
                        onLoad={() => {
                            markerRef.current = Marker; // Assign marker reference here
                        }}
                        />
                    {/* {[100, 250].map((radius, idx) => {
                        return (
                        <CircleF
                            key={idx}
                            center={mapCenter}
                            radius={radius}
                            onLoad={() => console.log('Circle Load...')}
                            options={{
                            fillColor: radius > 100 ? 'red' : 'green',
                            strokeColor: radius > 100 ? 'red' : 'green',
                            strokeOpacity: 0.8,
                            }}
                        />
                        );
                    })} */}

                </GoogleMap>
            </div>

        </div>

    )
}

