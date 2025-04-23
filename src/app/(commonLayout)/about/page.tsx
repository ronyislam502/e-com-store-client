import React from "react";
import Welcome from "./_component/Welcome";
import OurTeam from "./_component/OurTeam";

const About = () => {
  return (
    <div>
      <h3 className="text-center text-2xl font-bold">About Us</h3>
      <Welcome />
      <OurTeam />
    </div>
  );
};

export default About;
