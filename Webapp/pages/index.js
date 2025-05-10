
import Head from "next/head";
import { useState, useEffect, Fragment, useRef } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Webcam from 'react-webcam';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [data, setData] = useState({
    analysis: "",
    reliability_score: 0,
    confidence_level: 0,
    flagged_keywords: [],
    sentiment_score: 0
  });
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const webcamRef = useRef(null);
  
  const videoConstraints = {
    facingMode: facingMode
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageFile(imageSrc);
    // Stop the camera after capturing
    const stream = webcamRef.current.video.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    // Hide the camera view
    webcamRef.current.video.srcObject = null;
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search || imageFile) {
        setIsLoading(true);
        const res = await fetch(`/api/gemini`, {
          body: JSON.stringify({
            name: search,
            image: imageFile
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const responseData = await res.json();
        setData(responseData);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, imageFile]);

  const chartData = {
    labels: ['Reliability', 'Unreliability'],
    datasets: [
      {
        data: [data.reliability_score, 100 - data.reliability_score],
        backgroundColor: ['#4CAF50', '#ff4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Fragment>
      <Head>
        <title>Fake News Detection App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-r from-pink-100 to-blue-300 min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <main className="flex flex-col justify-center max-w-4xl w-full align-center">
          <h1 className="text-4xl text-center font-extrabold text-slate-800 drop-shadow sm:text-5xl mb-1">
            AlHakikaNews App
          </h1>
          <p className="block text-sm text-center font-medium text-gray-500 mb-8">
            This application is designed to fight against propaganda and unreliable information. Paste your article or upload/capture an image below for real-time verification.
          </p>

          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <textarea
              className="w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Paste your article here..."
            />
            
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="mb-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full rounded-lg"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={captureImage}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Capture Photo
                </button>
                <button
                  onClick={switchCamera}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Switch Camera
                </button>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setSearch(query)}
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Content"}
            </button>
          </div>

          {data.analysis && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
                  <p className="text-gray-700 mb-4">{data.analysis}</p>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Flagged Keywords:</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.flagged_keywords.map((keyword, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Reliability Score</h3>
                    <div className="w-48 h-48 mx-auto">
                      <Doughnut data={chartData} options={{ cutout: '70%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Confidence Level</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${data.confidence_level}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Sentiment Score</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            data.sentiment_score > 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{
                            width: `${Math.abs(data.sentiment_score * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Fragment>
  );
}
