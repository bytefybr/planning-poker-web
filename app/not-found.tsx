"use client";

const NotFound = () => {
  return (
    <div className="flex w-full flex-col min-h-3.5 items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para a página inicial
        </a>
    </div>
  );
};

export default NotFound;
