"use client";

import dynamic from "next/dynamic";

// Below-the-fold sections that are visual rather than textual. Loading them
// on demand keeps GSAP, the videos and the big galleries out of the initial
// bundle, so the hero hydrates and animates sooner.
const skeleton = (h: string) =>
  function Skeleton() {
    return <div style={{ minHeight: h }} aria-hidden="true" />;
  };

export const LazyLifestyle = dynamic(() => import("./Lifestyle"), { ssr: false, loading: skeleton("70vh") });
export const LazyFeatureReel = dynamic(() => import("./FeatureReel"), { ssr: false, loading: skeleton("80vh") });
export const LazySmartLock = dynamic(() => import("./SmartLock"), { ssr: false, loading: skeleton("80vh") });
export const LazyScenes = dynamic(() => import("./Scenes"), { ssr: false, loading: skeleton("90vh") });
export const LazyAppShowcase = dynamic(() => import("./AppShowcase"), { ssr: false, loading: skeleton("70vh") });
export const LazyGallery = dynamic(() => import("./Gallery"), { ssr: false, loading: skeleton("90vh") });

export const LazyRuntime = dynamic(() => import("./worlds/power/Runtime"), { ssr: false, loading: skeleton("90vh") });
export const LazyUseCases = dynamic(() => import("./worlds/power/UseCases"), { ssr: false, loading: skeleton("80vh") });

export const LazyCollections = dynamic(() => import("./worlds/furniture/Collections"), { ssr: false, loading: skeleton("120vh") });
export const LazyRooms = dynamic(() => import("./worlds/furniture/Rooms"), { ssr: false, loading: skeleton("80vh") });
