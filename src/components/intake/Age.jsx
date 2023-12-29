export const Age = ({birthYear, setBirthYear}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 150 }, (v, k) => currentYear - k - 2);

  return (
    <select
      value={birthYear}
      onChange={(e) => setBirthYear(e.target.value)}
      className="p-2 m-2 border-2 border-gray-300 rounded"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
