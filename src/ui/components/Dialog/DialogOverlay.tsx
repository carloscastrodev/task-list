export function DialogOverlay() {
  return (
    <div
      tabIndex={-1}
      aria-hidden={true}
      className="absolute z-[-1] h-screen w-screen bg-[rgba(0,0,0,0.5)] blur-lg"
    />
  );
}
