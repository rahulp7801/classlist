"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';




const ECommerce: React.FC = () => {
  const router = useRouter();


  const handlePress = () => {
    router.push('/course-catalog');

  }

  return (
    <>
      <Breadcrumb pageName="Classes List" />
      <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8 mb-5">

    <Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-big text-white/60 uppercase font-bold">Class Lookup</p>
        <h4 className="text-white font-medium text-large">Browse Vista's Course Catalog</h4>
      </CardHeader>

      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover opacity-1"
        src="../../images/homecards/classeshome.png"
      />

    </Card>
    <Card className="col-span-12 sm:col-span-4 h-[300px]">

      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Club Lookup</p>
        <h4 className="text-white font-medium text-large">Find clubs that suit your interests</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover opacity-1"
        src="../../images/homecards/clubhomecard.jpg"
      />
    </Card>
    <Card className="col-span-12 sm:col-span-4 h-[300px]">

      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">College Requirements</p>
        <h4 className="text-white font-medium text-large">View Vista's graduation requirements</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover opacity-1"
        src="https://nextui.org/images/card-example-2.jpeg"
      />
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">

      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
        <h4 className="text-white font-medium text-2xl">Four Year Plan Generator</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-0.2"
        src="../../images/homecards/fouryearplancard.jpg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-white text-tiny">Available soon. Get notified.</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Notify Me
        </Button>
      </CardFooter>
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">

      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Confused?</p>
        <h4 className="text-white/90 font-medium text-xl">View additional counseling information</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover opacity-1"
        src="../../images/homecards/counselor.png"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src="https://nextui.org/images/breathing-app-icon.jpeg"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white">Chat with a Vista AI chatbot</p>
          </div>
        </div>
        <Button radius="full" size="sm" color="primary">Chat Now</Button>
      </CardFooter>
    </Card>
  </div>
    

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
