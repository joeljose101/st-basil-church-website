import { Cinzel, Lora } from 'next/font/google';
import '../styles/globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata = {
  title: 'St. Basil Jacobite Syrian Orthodox Church | Melbourne',
  description:
    'St. Basil Jacobite Syrian Orthodox Church, Coburg North, Melbourne. Preserving the West Syriac liturgical tradition of the Syriac Orthodox Patriarchate of Antioch.',
  metadataBase: new URL('https://stbasilmelbourne.org'),
  openGraph: {
    title: 'St. Basil Jacobite Syrian Orthodox Church | Melbourne',
    description:
      'A welcoming spiritual home for generations, rooted in the West Syriac liturgical tradition.',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
