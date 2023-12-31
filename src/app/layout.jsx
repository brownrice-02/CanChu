"use client";
import "./globals.css";
// import Providers from "../redux/provider";
import { Provider } from "react-redux";
import store from "../redux/store/store";
// import { store_auth } from "../redux/store/store";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Canchu",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Provider store={store_auth}> */}
        <Provider store={store}>
          {/* <main className={inter.className}>{children}</main> */}
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
