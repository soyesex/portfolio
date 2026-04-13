const links = [
  { label: "email", href: "mailto:johan@example.com" },
  { label: "github", href: "https://github.com/johan" },
  { label: "linkedin", href: "https://linkedin.com/in/johan" },
];

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-black border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <span className="font-mono text-[11px] text-white/30">
          johan · qa engineer
        </span>
        <nav className="flex gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-white/30 hover:text-[#3B82F6] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
