import React from "react";
import Welcome from "./_component/Welcome";
import OurTeam from "./_component/OurTeam";
import SectionTitle from "@/src/components/ui/SectionTitle";

const About = () => {
  return (
    <div>
      <SectionTitle heading="About Us" />
      <Welcome />
      <OurTeam />
    </div>
  );
};

export default About;
