"use client";

import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
      <div className="relative">
        <Image
          priority
          alt="Premium Car Wash"
          className="object-cover"
          height={500}
          src="https://i.postimg.cc/SxXtVSR2/slider-3-1150x500.jpg"
          width={1150}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/shop">
            <Button className="px-6 py-3 text-lg" color="primary">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative">
        <Image
          priority
          alt="Premium Car Wash"
          className="object-cover"
          height={500}
          src="https://i.postimg.cc/B65zDm6m/slider-1-1150x500.jpg"
          width={1150}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/shop">
            <Button className="px-6 py-3 text-lg" color="primary">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
