"use client";

import { useEffect, useMemo, useState } from "react";
import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";

import { useTelegramMock } from "@/hooks/useTelegramMock";
//import
//import Image from "next/image";

// function App(props: PropsWithChildren) {
//   const lp = useLaunchParams();
//   const miniApp = useMiniApp();
//   const themeParams = useThemeParams();
//   const viewport = useViewport();

//   useEffect(() => {
//     return bindMiniAppCSSVars(miniApp, themeParams);
//   }, [miniApp, themeParams]);

//   useEffect(() => {
//     return bindThemeParamsCSSVars(themeParams);
//   }, [themeParams]);

//   useEffect(() => {
//     return viewport && bindViewportCSSVars(viewport);
//   }, [viewport]);

//   return (
//     <
//     >
//       {props.children}
//     </>
//   );
// }


export function TelegramProvider({children}) {
 return (
<  SDKProvider acceptCustomStyle >
    {children}
  </SDKProvider>
 )
}