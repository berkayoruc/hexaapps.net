"use client";

import Layout from "@/app/components/Layout";
import axios from "axios";
import { FC, useCallback, useState } from "react";

const GoeSummaryPage: FC = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<any>(null);

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
      <button
        className="p-2"
        type="button"
        disabled={!url}
        onClick={useCallback(async () => {
          try {
            const response = await axios.get(url);
            if (response.status === 200) {
              setData(response.data);
            }
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }, [url])}
      >
        {"Gönder"}
      </button>
    </Layout>
  );
};

export default GoeSummaryPage;
