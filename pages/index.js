import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import ScrollToTop from "../components/reusableComponents/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <MetaPanel
        title="newszipped for reading articles"
        descriptionContent="newszipped description"
        keywordsContent="read articles"
        imagePath="/images/icon.ico"
        imageAlt="newszipped"
      />
      <HomePagePanel />
      <ScrollToTop showBelow={250} />

      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}
