import './root.sass'
import './variables.module.sass'
import Lines from "@/components/Lines";
import NavBar from "@/components/NavBar";
import { Blobs } from "@/components/Blobs.component";
import fontRepo from "@/app/fonts";
import { Providers } from "@/app/providers";
import CenterTextVector from "@/components/CenterTextVector";
import { withUrqlClient } from "next-urql";
import { clientConfig } from "@/api/client";

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
    <html lang="en" className={fontRepo.body.className} style={{backgroundColor: "#000"}}>
      <body>
        <div id="backgroundRoot"></div>
        {/*<CenterTextVector/>*/}
        {/*<Lines animate/>*/}
        {/*<Blobs count={8} offsetAmount={80}/>*/}
        {children}
        {/*<NavBar/>*/}
      </body>
    </html>
  )
}

