import Image from "next/image";
import React from "react";

const Welcome = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 mt-10">
      <p className="mt-10 p-10 align-center">
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse porta erat sit amet eros sagittis, quis hendrerit libero
        aliquam. Fusce semper augue ac dolor efficitur, a pretium metus
        pellentesque.
      </p>
      <Image
        alt="profile"
        className=" h-auto rounded-md"
        height={200}
        src="https://i.postimg.cc/1XR2Ks5k/ab.jpg"
        width={500}
      />
    </div>
  );
};

export default Welcome;
