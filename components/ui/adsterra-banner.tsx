import { useEffect, useRef } from 'react';

const AdsterraBanner = () => {
  const banner = useRef<HTMLDivElement | null>(null);
    
  useEffect(() => {
    const atOptions = {
      key: "00918d65ec046cdcd2377002a5bda1cf",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, []);

  return (
    <div
      className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center"
      ref={banner}
    ></div>
  );
}

export default AdsterraBanner;