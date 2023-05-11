/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
const REDSYS_DOMAIN = "https://sis-t.redsys.es:25443";
const IFRAME_REDSYS = "redsys-hosted-pay-button";

let result3DSMethod = "";
let id3DSMethod = "";

function toHex(str) {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += `${str.charCodeAt(i).toString(16)}`;
  }
  return hex;
}

function getCardInput(id, style) {
  const div = document.getElementById(id);
  const frame = document.createElement("iframe");
  frame.setAttribute("id", "redsys-hosted-field-number");
  frame.setAttribute("name", "redsys-hosted-field-number");
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("type", "number");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?style=${toHex(style)}&frame=cardNumber&version=V2`);
  div.appendChild(frame);
}

function getExpirationYearInput(id, style) {
  const div = document.getElementById(id);
  const frame = document.createElement("iframe");
  frame.setAttribute("id", "redsys-hosted-field-expirationYear");
  frame.setAttribute("name", "redsys-hosted-field-expirationYear");
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?style=${toHex(style)}&frame=expirationYear&version=V2`);
  frame.setAttribute("type", "tel");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts");
  div.appendChild(frame);
}

function getExpirationMonthInput(id, style) {
  const div = document.getElementById(id);
  const frame = document.createElement("iframe");
  frame.setAttribute("id", "redsys-hosted-field-expirationMonth");
  frame.setAttribute("name", "redsys-hosted-field-expirationMonth");
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?style=${toHex(style)}&frame=expirationMonth&version=V2`);
  frame.setAttribute("type", "tel");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts");
  div.appendChild(frame);
}

function getCVVInput(id, style) {
  const div = document.getElementById(id);
  const frame = document.createElement("iframe");
  frame.setAttribute("id", "redsys-hosted-field-cvv");
  frame.setAttribute("name", "redsys-hosted-field-cvv");
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("type", "number");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?style=${toHex(style)}&frame=cvv&version=V2`);
  div.appendChild(frame);
}

function getPayButton(id, style, buttonValue, fuc, terminal, order) {
  const div = document.getElementById(id);
  const frame = document.createElement("iframe");
  frame.setAttribute("id", IFRAME_REDSYS);
  frame.setAttribute("name", IFRAME_REDSYS);
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("type", "number");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("onload", "setMerchantDomain(500);");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts allow-modals");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?buttonValue=${toHex(buttonValue)}&style=${toHex(style)}&frame=button&fuc=${toHex(fuc)}&terminal=${toHex(terminal)}&order=${toHex(order)}&version=V2`);
  div.appendChild(frame);
}

function getInSiteForm(
  id,
  styleButton,
  styleBody,
  styleBox,
  styleBoxText,
  buttonValue,
  fuc,
  terminal,
  order,
  idioma,
  mostrarLogo
) {
  const div = document.getElementById(id);
  const idiomaInsite = idioma || "ES";
  const mostrarLogoInsite = typeof mostrarLogo !== "undefined" ? mostrarLogo : true;

  const frame = document.createElement("iframe");
  frame.setAttribute("id", IFRAME_REDSYS);
  frame.setAttribute("name", IFRAME_REDSYS);
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("type", "number");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("onload", "setMerchantDomain(500);");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts allow-modals allow-popups");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?buttonValue=${toHex(buttonValue)}&styleButton=${toHex(styleButton)}&styleBody=${toHex(styleBody)}&styleBox=${toHex(styleBox)}&styleBoxText=${toHex(styleBoxText)}&frame=inSite&fuc=${toHex(fuc)}&terminal=${toHex(terminal)}&order=${toHex(order)}&version=V2` + `&idioma=${idiomaInsite}&mostrarLogo=${mostrarLogoInsite}`);
  div.appendChild(frame);
}

function init3DS(id, emv3ds) {
  document.getElementById(id).innerHTML = "<div id='fadeFrame' style='position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: #000;z-index:1001;opacity:.75;-moz-opacity: 0.75;filter: alpha(opacity=75);'><button style='position:absolute;left:50%;top:90%;opacity:initial;' onclick=document.getElementById('fadeFrame').remove();document.getElementById('lightFrame').remove();>Cerrar</button></div><div id='lightFrame' style='position: absolute;top: 25%;left: 25%;width: 50%;height: 50%;padding: 16px;background: #fff;color: #333;z-index:1002;overflow: auto;'></div>";
  const frame = document.createElement("iframe");
  frame.setAttribute("id", "redsys-hosted-field-3ds");
  frame.setAttribute("name", "redsys-hosted-field-3ds");
  frame.setAttribute("style", "width: 100%; height: 100%;");
  frame.setAttribute("frameborder", "0");
  frame.setAttribute("scrolling", "no");
  frame.setAttribute("sandbox", "allow-same-origin allow-scripts allow-forms");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?emv3ds=${toHex(emv3ds)}&frame=3ds&version=V2`);
  document.getElementById("lightFrame").appendChild(frame);
}

function execute3DSMethod(id, threeDSMethodURL, threeDSServerTransID) {
  id3DSMethod = id;

  const frame = document.createElement("iframe");
  frame.setAttribute("id", "redsys-hosted-field-3dsmethod");
  frame.setAttribute("name", "redsys-hosted-field-3dsmethod");
  frame.setAttribute("style", "width:0;height:0;border:0;border:none;display:none;");
  frame.setAttribute("src", `${REDSYS_DOMAIN}/sis/getInputNC?threeDSMethodURL=${threeDSMethodURL}&threeDSServerTransID=${threeDSServerTransID}&frame=3dsmethod&version=V2`);
  document.getElementsByTagName("BODY")[0].appendChild(frame);
  setTimeout(() => {
    if (result3DSMethod == "") {
      result3DSMethod = "N";
      document.getElementById(id3DSMethod).value = result3DSMethod;
    }
  }, 10000);
}

function hex2a(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}

function storeIdOper(ev, id, err, funct) {
  if (ev.data.idOper && ev.origin == REDSYS_DOMAIN) {
    document.getElementById(err).value = "";
    document.getElementById(id).value = ev.data.idOper;
  } else if (ev.data.error && ev.origin == REDSYS_DOMAIN) {
    document.getElementById(id).value = "";
    document.getElementById(err).value = ev.data.error;
  } else if (ev.data == "merchantValidation" && ev.origin == REDSYS_DOMAIN) {
    if (typeof funct === "function") {
      if (funct()) {
        window.frames[IFRAME_REDSYS].postMessage({ validation: "OK" }, REDSYS_DOMAIN);
      } else {
        window.frames[IFRAME_REDSYS].postMessage({ validation: "KO" }, REDSYS_DOMAIN);
      }
    } else {
      window.frames[IFRAME_REDSYS].postMessage({ validation: "OK" }, REDSYS_DOMAIN);
    }
  } else if (ev.data.result3DSMethod) {
    result3DSMethod = ev.data.result3DSMethod;
    document.getElementById(id3DSMethod).value = result3DSMethod;
  }
}

function close3DS() {
  document.getElementById("lightFrame").style.display = "none";
  document.getElementById("fadeFrame").style.display = "none";
}

function set3DSResult(ev, id) {
  if (ev.data.DS_MERCHANT_EMV3DS && ev.origin == REDSYS_DOMAIN) {
    document.getElementById(id).value = JSON.stringify(ev.data.DS_MERCHANT_EMV3DS);
    close3DS();
  }
}

// Deprecated
function loadRedsysForm() {}

function setMerchantDomain(time) {
  setTimeout(() => {
    if (window.frames[IFRAME_REDSYS]) {
      window.frames[IFRAME_REDSYS].postMessage("domain", REDSYS_DOMAIN);
    }
  }, time);
}

export {
  getCardInput,
  getExpirationYearInput,
  getExpirationMonthInput,
  getCVVInput,
  getPayButton,
  getInSiteForm,
  init3DS,
  execute3DSMethod,
  toHex,
  hex2a,
  storeIdOper,
  set3DSResult,
  close3DS,
  loadRedsysForm,
  setMerchantDomain,
};
