import { LoadingSpinner } from "./LoadingSpinner";

export function Loading() {
  return (
    <div className="mt-48 flex items-center justify-center">
      <LoadingSpinner
        height={80}
        width={80}
        color="#10069F"
        secondaryColor="#10069FB2"
      />
    </div>
  );
}
