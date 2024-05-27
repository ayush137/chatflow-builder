import { Button } from "@/components/ui/button";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full z-40 opacity-95">
      <div className="bg-[#09090b] w-full mx-auto p-[15px] flex justify-between items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.06);]">
        <div className="w-fit">
          <img
            src={
              "https://assets-global.website-files.com/62b301157b5b9d2f6b532e58/62cd41831afdb639d6a29475_BiteSpeedLogoGradient.svg"
            }
          />
        </div>
        <Button variant="default" className="bg-primary">
          Button
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
