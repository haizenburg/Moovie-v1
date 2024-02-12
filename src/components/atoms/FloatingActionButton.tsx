// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FloatingActionButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 left-10 rounded-full bg-blue-500 p-4 text-white shadow-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out"
      aria-label="Add to-do item"
    >
      {/* Icon or text for the button */}+
    </button>
  );
};
