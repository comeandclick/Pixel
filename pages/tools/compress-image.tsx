import UploadClient from "../../components/UploadClient";
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Compresseur d'images</h1>
      <UploadClient endpoint="/api/compress-image" />
    </main>
  );
}