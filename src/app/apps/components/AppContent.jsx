import Link from "next/link";
import Image from "next/image";
import blackUS from "../assets/appstore/US/black.svg";
import android from "../assets/google_play.png";

const AppContent = ({
  screenshot,
  title,
  p,
  appURL = "",
  androidAppUrl = "",
  media = /** @type {import("react").ReactNode} */ (null),
}) => {
  return (
    <main className="pb-24 flex xs:flex-row flex-col-reverse xs:gap-24 gap-6 w-full">
      {media || (
        <div className="xs:w1/3 w-11/12 ">
          <Image src={screenshot} alt="" />
        </div>
      )}
      <div className="text-lg text-gray-950 text-opacity-90 dark:text-white dark:text-opacity-90 ">
        <h1 className="py-5 text-4xl font-bold">{title}</h1>
        <p className="py-3 text-lg">{p}</p>
        <div className="flex flex-row gap-2">
          {appURL && (
            <Link
              rel="noopener noreferrer"
              href={appURL}
              target="_blank"
              className="flex py-2"
            >
              <Image src={blackUS} alt="" />
            </Link>
          )}
          {androidAppUrl && (
            <Link
              rel="noopener noreferrer"
              href={androidAppUrl}
              target="_blank"
              className="flex py-2"
            >
              <Image src={android} alt="" className="w-32" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default AppContent;
