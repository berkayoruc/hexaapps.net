"use client";

import Layout from "@/app/components/Layout";
import axios from "axios";
// import { config } from "process"; // Kullanılmıyor, kaldırıldı
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

// localStorage anahtarları için sabitler
const REMEMBER_URL_KEY = "goeSummaryPage_rememberUrl";
const SAVED_URL_KEY = "goeSummaryPage_savedUrl";

// Öneri: Session verisi için bir arayüz tanımlanabilir
// interface SessionData {
//   session_number: number;
//   start: string;
//   energy: number;
//   max_power: number;
//   seconds_total: string | number;
//   link: string;
//   startUnix?: number;
// }

// Tek bir şarj oturumu kartını gösteren bileşen
const SessionCard = ({ session }: any) => {
  // Tarih metnini formatlamak için yardımcı fonksiyon
  const formatDate = (dateString: string) => {
    const [date, time] = dateString.split(" ");
    return { date, time };
  };

  const startDate = formatDate(session.start);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-xl p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 dark:hover:shadow-cyan-400/20">
      {/* Kart Başlığı */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          Oturum #{session.session_number}
        </h3>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {startDate.date}
        </span>
      </div>

      {/* Oturum İstatistikleri */}
      <div className="space-y-4 flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Zap />
            <span className="text-slate-600 dark:text-slate-300">Harcanan Enerji</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            {session.energy.toFixed(3)} kWh
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Bolt />
            <span className="text-slate-600 dark:text-slate-300">Maks. Güç</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            {session.max_power.toFixed(3)} kW
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icons.Clock />
            <span className="text-slate-600 dark:text-slate-300">Şarj Süresi</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            {/* {session.seconds_total} */}
            {session.seconds_charged}
          </span>
        </div>
      </div>

      {/* Kaydı Görüntüle Butonu */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <a
          href={session.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
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
  const [data, setData] = useState<any>(null); // Öneri: API yanıtı için bir tip tanımlanabilir (örn: ApiResponse)
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberUrl, setIsRememberUrl] = useState(false);
  // const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Tema state'i, isteğe bağlı olarak kullanılabilir.

  useEffect(() => {
    // Sayfa yüklendiğinde ve sistem tema tercihi değiştiğinde temayı ayarla
    const applyTheme = () => {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        // setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        // setTheme('light');
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyTheme);

    // localStorage'daki tema değişikliğini dinlemek için (opsiyonel, eğer manuel tema değiştirici varsa)
    // window.addEventListener('storage', applyTheme);

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
      // window.removeEventListener('storage', applyTheme);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIsRemember = localStorage.getItem(REMEMBER_URL_KEY);
      const shouldRemember = savedIsRemember === "true";
      setIsRememberUrl(shouldRemember);

      if (shouldRemember) {
        const savedUrlValue = localStorage.getItem(SAVED_URL_KEY);
        if (savedUrlValue) {
          setUrl(savedUrlValue);
        }
      }
    }
  }, []); // Boş bağımlılık dizisi, sadece component mount edildiğinde çalışır

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
      // "Cihazı hatırla" checkbox'ının mevcut durumunu kaydet
      localStorage.setItem(REMEMBER_URL_KEY, String(isRememberUrl));

      if (isRememberUrl && url.trim() !== "") {
        // Eğer "Cihazı hatırla" seçili ve URL boş değilse, URL'yi kaydet
        localStorage.setItem(SAVED_URL_KEY, url);
      } else if (!isRememberUrl) {
        // Eğer "Cihazı hatırla" seçili değilse, daha önce kaydedilmiş URL'yi sil
        localStorage.removeItem(SAVED_URL_KEY);
      }
    }

    try {
      const response = await axios.post("/api/proxy", { targetUrl: url });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      // Kullanıcıya yönelik bir hata mesajı gösterilebilir
    } finally {
      setIsLoading(false);
    }
  }, [url, isRememberUrl]); // useCallback için bağımlılıklar

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-8">
        <div className="container mx-auto px-4">
          {/* Form Section */}
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl transition-colors duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6 sm:mb-8">
              go-eCharger Şarj Geçmişi
            </h2>
            <div className="space-y-6">
              {/* URL Input Group */}
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Veri Adresi (go-eCharger API /status URL)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="url"
                    className="block w-full pl-11 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors duration-300"
                    placeholder="http://192.168.1.x/status"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Remember URL Checkbox */}
              <div className="flex items-center">
                <input
                  id="rememberUrl"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 dark:text-cyan-500 border-slate-300 dark:border-slate-500 rounded bg-slate-100 dark:bg-slate-700 focus:ring-cyan-500 dark:focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 transition-colors duration-300"
                  checked={isRememberUrl}
                  onChange={(e) => setIsRememberUrl(e.target.checked)}
                />
                <label htmlFor="rememberUrl" className="ml-3 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Bu cihazdaki URL'yi hatırla
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="mt-8 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              disabled={!url.trim() || isLoading}
              onClick={handleFetchData}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Alınıyor...
                </>
              ) : (
                "Veriyi Getir"
              )}
            </button>
          </div>

          {/* Data Display Section */}
          {data && data.data && (
            <div className="mt-12">
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Şarj Oturumu Geçmişi
              </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
                Tüm şarj oturumlarının detaylı kaydı.
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data
                .sort((a: any, b: any) => b.startUnix - a.startUnix)
                .map((session: any) => (
                  <SessionCard key={session.session_number} session={session} />
                ))}
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GoeSummaryPage;
