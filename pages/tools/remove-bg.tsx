import UploadClient from "../../components/UploadClient";
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Suppression d'arrière-plan</h1>
      <UploadClient endpoint="/api/remove-bg" />
    </main>
  );
}