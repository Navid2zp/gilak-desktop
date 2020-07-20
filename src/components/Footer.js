import React from "react";
const electron = window.require("electron");

function Footer() {
  return (
      <footer className="page-footer pt-5">
        <p className="text-center footer-text" style={{ width: "100%" }}>
          Design by{" "}
          <a
            href="https://navid2zp.com"
            onClick={(evt) => {
              evt.preventDefault();
              electron.shell.openExternal("https://navid2zp.com");
            }}
          >
            Navid Zarepak
          </a>{" "}
          - Source: gdic.ir
        </p>
      </footer>
  );
}

export default Footer;
