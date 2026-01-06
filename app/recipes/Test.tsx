export default function TestClick() {
  return (
    <div
      onClick={() => console.log("clicked")}
      className="w-64 h-64 bg-red-500 cursor-pointer"
    >
      CLICK ME
    </div>
  );
}