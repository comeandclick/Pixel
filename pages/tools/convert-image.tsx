import UploadClient from "../../components/UploadClient";
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Convertisseur d'images</h1>
      <UploadClient endpoint="/api/convert-image" />
    </main>
  );
}