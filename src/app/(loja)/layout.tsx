"use client";
import ProvedorCarrinho from "@/data/context/ContextoCarrinho";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout(props: ILayout) {
  return (
    <>
      <ProvedorCarrinho>{props.children}</ProvedorCarrinho>
    </>
  );
}
