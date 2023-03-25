import './root.sass'
import Lines from "@/app/Lines";
import NavBar from "@/app/NavBar";

import fontRepo from "@/app/fonts";
import { Blobs } from "@/components/Blobs.component";

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
    <html lang="en" className={fontRepo.body.className}>
      <body>
        <Blobs count={12} offsetAmount={80}/>
        <Lines/>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
