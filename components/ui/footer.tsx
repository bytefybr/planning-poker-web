"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full text-center h-16 justify-center bg-zinc-50 border-t border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 px-4 2xl:px-0">
      <div className="flex w-full max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-zinc-400 text-sm dark:text-zinc-50 ">
            Desenvolvido por{" "}
            <a href="https://www.bytefy.com.br" target="_blank">
              <span className="underline cursor-pointer">Bytefy</span>
            </a>{" "}
            - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
