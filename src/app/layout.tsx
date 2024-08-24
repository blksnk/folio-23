import "@/styles/root.sass";
import "@s/_vars.sass";
import fontRepo from "@/app/fonts";

export const metadata = {
  title: "Veigel.Studio",
  description: "A multi-disciplinary designer experimental portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={fontRepo.body.className}
      style={{ backgroundColor: "#0B1312" }}
    >
      <body>
        <div id="backgroundRoot"></div>
        {children}
      </body>
    </html>
  );
}
