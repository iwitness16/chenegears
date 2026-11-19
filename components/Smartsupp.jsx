import Script from "next/script";

export default function Smartsupp() {
  return (
    <>
      <Script
        id="smartsupp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
var _smartsupp = _smartsupp || {};
_smartsupp.key = 'f91864637401f4b33c53beb052304b3212e384fd';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
          `,
        }}
      />
      <noscript>
        Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noreferrer">Smartsupp</a>
      </noscript>
    </>
  );
}
