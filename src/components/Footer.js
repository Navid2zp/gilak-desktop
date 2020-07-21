import React from "react";
const electron = window.require("electron");

function Footer() {
  return (
    <footer className="page-footer pt-4 text-center">
      <img
        src="./static/android-icon.png"
        alt="Android Version"
        width="48"
        height="48"
		title="دریافت نسخه اندروید"
		style={{cursor: "pointer"}}
		onClick={() => electron.shell.openExternal("https://play.google.com/store/apps/details?id=studio.arvix.gilak")}
      />
      <p className="text-center footer-text mt-1" style={{ width: "100%" }}>
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
