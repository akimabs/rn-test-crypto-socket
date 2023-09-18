import { useRef } from "react";

export const useCountRender = () => {
  const renders = useRef(0);
  console.log("renders: ", renders.current++);
};
