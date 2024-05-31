import { edgesAtom, nodesAtom } from "@/atom/chatflow-atoms";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAtomValue } from "jotai";
import React from "react";

const Navbar = () => {
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const { toast } = useToast();

  const handleValidation = () => {
    if (nodes?.length > 1) {
      let targetCount = 0;
      nodes?.map((node) => {
        const targetIndex = edges?.findIndex(
          (edge) => edge?.target === node?.id
        );
        if (targetIndex === -1) {
          targetCount++;
          if (targetCount === 1) {
            toast({
              variant: "destructive",
              title: "It seems like you have some nodes that are not connected",
            });
          }
        }
      });
      if (targetCount > 1) return;
    }
    toast({
      title: "Well done, boy!",
    });
  };

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
        <Button
          variant="default"
          className="bg-primary"
          onClick={handleValidation}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
