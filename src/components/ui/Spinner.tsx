interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Spinner = ({
  size = "md",
  color = "border-white",
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-4 border-solid border-t-transparent ${sizeClasses[size]} ${color}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
