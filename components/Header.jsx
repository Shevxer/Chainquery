import React from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Image from "next/image";

const Header = () => {
  return (
    <div className=" navbar bg-base-100 w-[95vw] mx-auto rounded-2xl p-3">
      <div className="flex-1">
        <Link
          className="btn btn-ghost text-xl font-bold hover:scale-105"
          href="/"
        >
          <Image src={"/logo1.png"} width={100} height={50} alt="logo" />
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal  px-1 mr-2">
          <li className="font-semibold">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="font-semibold">
            <Link href="/ask">Ask Question</Link>
          </li>
        </ul>
        <Link href="/ask-AI" className="btn btn-outline w-28 mr-2">
          Ask AI
          <FaWandMagicSparkles />
        </Link>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
