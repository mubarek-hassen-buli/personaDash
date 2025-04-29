import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
function Navbar() {
  return (
    <div className="mt-2  bg-black">
      <div className="flex justify-between ">
        <div className="flex">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={60}
            height={60}
            className=""
          />
          <Link href="/" className="">
            SmartFace
          </Link>
        </div>

        <div className="flex space-x-3 justify-center mt-5 pr-3">
          <Button variant="outline">Login</Button>
          <Button variant="outline">signup</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
