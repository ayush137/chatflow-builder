import { atom } from "jotai";
import { Edge, Node } from "reactflow";

const initialNodes: Array<Node> = [];

export const nodesAtom = atom<Array<Node>>(initialNodes);
export const edgesAtom = atom<Array<Edge>>([]);
export const selectedNodeAtom = atom<string | null>(null);
