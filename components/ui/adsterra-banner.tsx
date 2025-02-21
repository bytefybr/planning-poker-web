/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head';

const AdsterraBanner = () => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '00918d65ec046cdcd2377002a5bda1cf',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            `,
          }}
        ></script>
        <script
          type="text/javascript"
          src="//www.highperformanceformat.com/00918d65ec046cdcd2377002a5bda1cf/invoke.js"
        ></script>
      </Head>
      <div id="ad-container">
        {/* O seu conteúdo do anúncio pode ser injetado automaticamente pela lógica no invoke.js */}
      </div>
    </>
  );
};

export default AdsterraBanner;