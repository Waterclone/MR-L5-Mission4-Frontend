import React, { useState, ChangeEvent } from "react";

interface Car {
  imageUrl: string;
  make: string;
  model: string;
  year: number;
}

const ByType: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [carType, setCarType] = useState<string>("");
  const [similarCars, setSimilarCars] = useState<Car[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("carImage", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCarType(data.carType);
        setSimilarCars(data.cars);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <div className="bg-lightgrey flex justify-center p-12 mb-2">
        <div>
          <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-md">
            <div>
              <div>
                <div className="border-dashed border-2 border-turnersgrey p-10 rounded-lg mt-10">
                  <div className="flex justify-center">
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="flex justify-center m-4">
                  <button onClick={handleUpload} className="bg-turnersblue text-white font-semibold py-2 px-4 mt-6 rounded hover:bg-turnersred transition-colors duration-700">
                    Find My New Car!
                  </button>
                </div>
                <div className="bg-turnersblue">
                  {carType && (
                    <div className="bg-yellow p-6 shadow-md rounded-lg">
                      <h2 className="flex justify-center text-white text-xl font-semibold mb-4">Car type uploaded: {carType}</h2>
                      <h3 className="flex justify-center text-white text-xl font-semibold mb-4">Take your pick!</h3>
                      <div className="bg-pink flex flex-wrap gap-6 p-6">
                        <ul>
                          {similarCars.map((car, index) => (
                            <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
                              <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-auto mb-2 rounded-lg" />

                              <h4 className="text-lg font-semibold">
                                {car.make} {car.model}
                              </h4>

                              <p className="text-gray-600">{car.year}</p>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ByType;
