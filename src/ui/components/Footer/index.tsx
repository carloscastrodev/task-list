export function Footer() {
  return (
    <footer
      className={`mt-auto h-[var(--footerHeight)] border-t-2 border-slate-100`}
    >
      <p className="text-center text-sm">
        Made by{' '}
        <a
          href="https://github.com/carloscastrodev"
          rel="noopener noreferrer"
          target="_blank"
          className="text-bold underline underline-offset-4 hover:opacity-70"
        >
          @carloscastrodev
        </a>
      </p>
    </footer>
  );
}
