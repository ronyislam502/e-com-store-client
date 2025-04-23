import { FacebookIcon, TwitterIcon } from "@/src/components/icons";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import React from "react";

const OurTeam = () => {
  return (
    <div className="my-10">
      <SectionTitle heading="Our Team" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="shadow-2xl">
          <CardBody className="overflow-visible bg-white">
            <Image
              alt={""}
              className="object-cover"
              height={296}
              src="https://i.postimg.cc/xdM1wyy0/t1.jpg"
              width={350}
            />
          </CardBody>
          <CardFooter className="flex-col items-center bg-white ">
            <h3 className="text-sm font-bold text-black">John Filmr Doe</h3>
            <p className="text-sm">Managing Director</p>
            <p className="flex gap-2">
              <FacebookIcon />
              <TwitterIcon />
            </p>
          </CardFooter>
        </Card>
        <Card className="shadow-2xl">
          <CardBody className="overflow-visible bg-white">
            <Image
              alt={""}
              className="object-cover"
              height={296}
              src="https://i.postimg.cc/Pr7fNFSX/t2.jpg"
              width={350}
            />
          </CardBody>
          <CardFooter className="flex-col items-center bg-white ">
            <h3 className="text-sm font-bold text-black">Jaye Smith</h3>
            <p className="text-sm">Lead Developer</p>
            <p className="flex gap-2">
              <FacebookIcon />
              <TwitterIcon />
            </p>
          </CardFooter>
        </Card>
        <Card className="shadow-2xl">
          <CardBody className="overflow-visible bg-white">
            <Image
              alt={""}
              className="object-cover"
              height={296}
              src="https://i.postimg.cc/HLDp98GF/t3.jpg"
              width={350}
            />
          </CardBody>
          <CardFooter className="flex-col items-center bg-white ">
            <h3 className="text-sm font-bold text-black">Mike Arney</h3>
            <p className="text-sm">Director</p>
            <p className="flex gap-2">
              <FacebookIcon />
              <TwitterIcon />
            </p>
          </CardFooter>
        </Card>
        <Card className="shadow-2xl">
          <CardBody className="overflow-visible bg-white">
            <Image
              alt={""}
              className="object-cover"
              height={296}
              src="https://i.postimg.cc/CKGwPMS5/t4.jpg"
              width={350}
            />
          </CardBody>
          <CardFooter className="flex-col items-center bg-white ">
            <h3 className="text-sm font-bold text-black">Michele Lampa</h3>
            <p className="text-sm">Quality Checker</p>
            <p className="flex gap-2">
              <FacebookIcon />
              <TwitterIcon />
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OurTeam;
