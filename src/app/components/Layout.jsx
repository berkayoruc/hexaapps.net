import HexDecor from "./HexDecor";
import Footer from "./Footer";

const Layout = ({ children, decor = "plain" }) => {
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-x-clip">
      <HexDecor variant={decor} />
      <div className="relative flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
