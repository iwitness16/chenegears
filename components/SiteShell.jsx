import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import SideTab from "./SideTab";
import WhatsAppFloat from "./WhatsAppFloat";

export default function SiteShell({ children, hideAnnouncement = false }) {
  return (
    <>
      {!hideAnnouncement && <AnnouncementBar />}
      <Header />
      <main>{children}</main>
      <Footer />
      <SideTab />
      <WhatsAppFloat />
    </>
  );
}
