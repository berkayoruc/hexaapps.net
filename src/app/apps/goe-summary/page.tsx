"use client";

import Layout from "@/app/components/Layout";
import axios from "axios";
import { config } from "process";
import { FC, useCallback, useEffect, useState } from "react";

// Daha iyi performans ve özelleştirme için SVG ikonları
const Icons = {
  Bolt: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-yellow-400"
    >
      <path d="M13 3v7h6l-8 11v-7H5l8-11z" />
    </svg>
  ),
  Zap: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-green-400"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Clock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-sky-400"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  ExternalLink: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 ml-2"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  ),
};

// Tek bir şarj oturumu kartını gösteren bileşen
const SessionCard = ({ session }: any) => {
  // Tarih metnini formatlamak için yardımcı fonksiyon
  const formatDate = (dateString: any) => {
    const [date, time] = dateString.split(" ");
    return { date, time };
  };

  const startDate = formatDate(session.start);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/20">
      {/* Kart Başlığı */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-xl font-bold text-white">
          Oturum #{session.session_number}
        </h3>
        <span className="text-sm font-medium text-gray-400">
          {startDate.date}
        </span>
      </div>

      {/* Oturum İstatistikleri */}
      <div className="space-y-4 flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Zap />
            <span className="text-gray-300">Harcanan Enerji</span>
          </div>
          <span className="font-semibold text-white">
            {session.energy.toFixed(3)} kWh
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Bolt />
            <span className="text-gray-300">Maks. Güç</span>
          </div>
          <span className="font-semibold text-white">
            {session.max_power.toFixed(3)} kW
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Clock />
            <span className="text-gray-300">Toplam Süre</span>
          </div>
          <span className="font-semibold text-white">
            {session.seconds_total}
          </span>
        </div>
      </div>

      {/* Kaydı Görüntüle Butonu */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <a
          href={session.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Kaydı Görüntüle
          <Icons.ExternalLink />
        </a>
      </div>
    </div>
  );
};

const GoeSummaryPage: FC = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Checkbox için state
  const [isRememberUrl, setIsRememberUrl] = useState(false);

  // Component yüklendiğinde localStorage'dan değeri oku
  useEffect(() => {
    // localStorage sadece tarayıcıda çalıştığı için bu kontrolü ekliyoruz
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem("isRememberUrl");
      // Kayıtlı değer "true" ise state'i true yap, değilse false
      setIsRememberUrl(savedValue === "true");
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <label htmlFor="url">{"Veri adresi"}</label>
        <input
          type="text"
          className="p-2"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-1">
        <label htmlFor="rememberUrl">{"Cihazı hatırla"}</label>
        <input
          type="checkbox"
          id="rememberUrl"
          className="p-2"
          checked={isRememberUrl}
          onChange={(e) => setIsRememberUrl(e.target.checked)}
        />
      </div>
      <button
        className="p-2 outline"
        type="button"
        disabled={!url || isLoading}
        onClick={useCallback(async () => {
          setIsLoading(true);
          // Butona tıklandığında mevcut checkbox durumunu localStorage'a yaz
          if (typeof window !== "undefined") {
            localStorage.setItem("isRememberUrl", String(isRememberUrl));
          }
          try {
            const response = await axios.post("/api/proxy", { targetUrl: url });
            if (response.status === 200) {
              setData(response.data);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }, [url, isRememberUrl])}
      >
        {isLoading ? "Alınıyor..." : "Veriyi Getir"}
      </button>
      {data.data && (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Şarj Oturumu Geçmişi
              </h1>
              <p className="text-gray-400 mt-2">
                Tüm şarj oturumlarının detaylı kaydı.
              </p>
            </header>

            {/* Oturum kartları için grid düzeni */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data
                .sort((a: any, b: any) => b.startUnix - a.startUnix)
                .map((session: any) => (
                  <SessionCard key={session.session_number} session={session} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default GoeSummaryPage;
