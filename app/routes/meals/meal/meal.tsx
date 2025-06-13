import { useParams } from "react-router";

export default function Meal() {
  const { pid } = useParams<{ pid: string }>();
  return (
    <div>
      <h3 className="text-xl font-semibold">Meal Details</h3>
      <p>Now showing details for meal ID: <strong>{pid}</strong></p>
      {/* Fetch & render the real recipe here */}
    </div>
  );
}
