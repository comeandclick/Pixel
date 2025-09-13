import UploadClient from "../../components/UploadClient";
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Compresseur vidéo</h1>
      <UploadClient endpoint="/api/compress-video" accept="video/*" />
    </main>
  );
}