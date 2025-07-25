import Features from "@/components/custom/Features";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import PhoneShowcase from "@/components/custom/PhoneShowcase";
import Trial from "@/components/custom/Trial";
import React from "react";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <Features/>
      <PhoneShowcase/>
      <Trial/>
      <Footer/>
    </>
  );
}
