interface ProfileFieldProps {
  label: string;
  value: string;
}

export const ProfileField = ({ label, value }: ProfileFieldProps) => {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="text-lg text-gray-800 capitalize">{value}</p>
    </div>
  );
};
