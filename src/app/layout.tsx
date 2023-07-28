import './root.sass'
import './variables.module.sass'
import fontRepo from "@/app/fonts";

export const metadata = {
  title: 'Genmetsu',
  description: "Jean-Nicolas Veigel's design folio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontRepo.body.className} style={{backgroundColor: "#0B1312"}}>
      <body>
        <div id="backgroundRoot"></div>
        {children}
      </body>
    </html>
  )
}

