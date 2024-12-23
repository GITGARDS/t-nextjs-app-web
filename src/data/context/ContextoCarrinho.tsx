"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ItemCarrinho from "../model/ItemCarrinho";
import Produto from "../model/Produto";

interface IContextoCarrinhoProps {
  itens: ItemCarrinho[];
  qtdeDeItens: number;
  adicionar: (item: Produto) => void;
  remover: (item: Produto) => void;
}

export const ContextoCarrinho = createContext<IContextoCarrinhoProps>(
  {} as IContextoCarrinhoProps
);

interface IProvedorCarrinhoProps {
  children: React.ReactNode;
}

export default function ProvedorCarrinho(props: IProvedorCarrinhoProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const { set, get } = useLocalStorage();

  useEffect(() => {
    const carrinho = get("carrinho");
    if (carrinho) {
      setItens(carrinho);
    }
  }, [get]);

  const remover = useCallback(
    (produto: Produto) => {
      const novosItens = itens
        .map((i) => {
          if (i.produto.id === produto.id) {
            i.quantidade--;
          }
          return i;
        })
        .filter((f) => f.quantidade > 0);
      alterarItens(novosItens);
    },
    [itens]
  );

  const adicionar = useCallback(
    (produto: Produto) => {
      const indice = itens.findIndex((i) => i.produto.id === produto.id);
      if (indice === -1) {
        setItens([...itens, { produto, quantidade: 1 }]);
      } else {
        const novo = [...itens];
        novo[indice].quantidade++;
        alterarItens(novo);
      }
    },
    [itens]
  );

  const alterarItens = (novosItens: ItemCarrinho[]) => {
    setItens(novosItens);
    set("carrinho", novosItens);
  };

  return (
    <ContextoCarrinho.Provider
      value={{
        itens,
        adicionar,
        remover,
        get qtdeDeItens() {
          return itens.reduce((total, item) => total + item.quantidade, 0);
        },
      }}
    >
      <div>{props.children}</div>
    </ContextoCarrinho.Provider>
  );
}
