import NotFoundPage from "../../components/reusableComponents/NotFoundPage";

export default function ContactPage() {
  if (process.env.SITE_NAME !== "asd") {
    //ozkansurucukursu
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1>İletişim formu</h1>
      <p>İletişim formu ve diğer içerikler</p>
    </div>
  );
}
