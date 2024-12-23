"use client";
import { useCarrinho } from "@/data/hooks/UseCarrinho";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

export default function Carrinho() {
  const { qtdeDeItens } = useCarrinho();

  return (
    <div>
      <Link href={"/carrinho"}>
        <div className="flex relative">
          <IconShoppingCart size={32} stroke={1} />
          <div
            className="
          flex 
          items-center 
          justify-center 
          text-xs
          bg-red-600 
          rounded-full          
          absolute w-6 h-6 
          -top-2.5 -right-2.5
          "
          >
            {qtdeDeItens}
          </div>
        </div>
      </Link>
    </div>
  );
}
