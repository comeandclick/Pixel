import UploadClient from "../../components/UploadClient";
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Redimensionneur d'images</h1>
      <UploadClient endpoint="/api/resize-image" />
    </main>
  );
}