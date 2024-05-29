import TextNode from "./types/TextNode";
import { TEXT_NODE } from "./constants";
import { TNodeTypeMap } from "./type";
import { TextNodeBluePrint } from "./BlueprintCollection";

export const nodeTypes = { [TEXT_NODE]: TextNode };

export const NODE_TYPE_MAP: TNodeTypeMap = {
  [TEXT_NODE]: TextNodeBluePrint,
};
