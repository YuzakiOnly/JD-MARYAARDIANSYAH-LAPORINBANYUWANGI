import React, { useEffect, useRef, useState } from 'react';

export const ShowMap = ({ onLocationSelect }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        const initializeLeafletMap = async () => {
            if (!document.querySelector('link[href*="leaflet"]')) {
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(cssLink);
            }

            if (!window.L) {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }

            if (mapRef.current && !mapInstanceRef.current) {
                const L = window.L;

                const map = L.map(mapRef.current).setView([-8.2191, 114.3691], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                mapInstanceRef.current = map;

                map.on('click', function(e) {
                    addMarker(e.latlng.lat, e.latlng.lng);
                });

                setIsMapLoaded(true);
            }
        };

        initializeLeafletMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const addMarker = async (lat, lng) => {
        if (!mapInstanceRef.current) return;

        const L = window.L;

        if (markerRef.current) {
            mapInstanceRef.current.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker([lat, lng], {
            draggable: true
        }).addTo(mapInstanceRef.current);

        markerRef.current.on('dragend', function(e) {
            const position = e.target.getLatLng();
            reverseGeocode(position.lat, position.lng);
        });

        await reverseGeocode(lat, lng);
    };

    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'LaporinApp/1.0'
                    }
                }
            );

            const data = await response.json();
            let address = '';

            if (data && data.address) {
                const parts = [];
                
                if (data.address.road) {
                    if (data.address.house_number) {
                        parts.push(`${data.address.road} No. ${data.address.house_number}`);
                    } else {
                        parts.push(data.address.road);
                    }
                }

                if (data.address.village) {
                    parts.push(data.address.village);
                } else if (data.address.neighbourhood) {
                    parts.push(data.address.neighbourhood);
                }

                address = parts.join(', ') || data.display_name.split(',').slice(0, 2).join(', ');
            }

            if (!address) {
                address = `Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            }

            setSelectedLocation(address);

            if (onLocationSelect) {
                onLocationSelect(address, lat, lng);
            }

        } catch (error) {
            console.error('Error getting address:', error);
            const coords = `Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            setSelectedLocation(coords);
            
            if (onLocationSelect) {
                onLocationSelect(coords, lat, lng);
            }
        }
    };

    const searchLocation = async (query) => {
        if (!query.trim()) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ' Banyuwangi')}&limit=1`,
                {
                    headers: {
                        'User-Agent': 'LaporinApp/1.0'
                    }
                }
            );

            const results = await response.json();

            if (results.length > 0) {
                const result = results[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);

                if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([lat, lng], 16);
                    addMarker(lat, lng);
                }
            } else {
                alert('Lokasi tidak ditemukan. Coba kata kunci lain.');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Error saat mencari lokasi.');
        }
    };

    return (
        <div className="bg-white shadow px-6 py-10 rounded-lg">
            <div className="mb-4">
                <h1 className="text-xl font-bold uppercase">Lokasi Terkini</h1>
                <p className="text-base font-normal">Klik pada peta untuk memilih lokasi yang ingin dilaporkan</p>
            </div>

            <div className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Cari lokasi (contoh: Jl. Ahmad Yani, Alun-alun)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchLocation(e.target.value);
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            searchLocation(input.value);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                        Cari
                    </button>
                </div>
            </div>

            {selectedLocation && (
                <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-green-800">Lokasi Terpilih:</p>
                            <p className="text-sm text-green-700">{selectedLocation}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <div className="w-full h-[500px] relative border rounded-lg overflow-hidden">
                    {!isMapLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <div className="flex flex-col items-center">
                                <div className="animate-pulse bg-blue-500 w-8 h-8 rounded-full mb-2"></div>
                                <p className="text-sm text-gray-600">Memuat peta...</p>
                            </div>
                        </div>
                    )}
                    
                    <div 
                        ref={mapRef} 
                        className="w-full h-full"
                        style={{ minHeight: '500px' }}
                    />
                </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="font-medium text-blue-800">Cara menggunakan:</p>
                        <ul className="mt-1 text-blue-700 text-xs space-y-1">
                            <li>• Klik pada peta untuk menandai lokasi</li>
                            <li>• Seret penanda untuk menyesuaikan posisi</li>
                            <li>• Gunakan kotak pencarian untuk lokasi spesifik</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};