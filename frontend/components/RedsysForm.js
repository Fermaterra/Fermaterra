/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { storeIdOper, getInSiteForm } from "../utils/redsysUtils";

export default function RedsysForm() {
  function merchantValidationEjemplo() {
    // Insertar validaciones…
    alert("Esto son validaciones propias");
    return true;
  }

  window.addEventListener("message", (event) => {
    storeIdOper(event, "token", "errorCode", merchantValidationEjemplo);
  });

  function pedido() {
    return `pedido${Math.floor((Math.random() * 1000) + 1)}`;
  }
  getInSiteForm("card-form", "", "", "", "", "Texto botón pago", "999008881", "1", pedido(), "ES", true);
  return (
    <form name="datos">
      <input type="hidden" id="token" />
      <input type="hidden" id="errorCode" />
      <div id="card-form" />
      <a href="javascript:alert(document.datos.token.value + '--' + document.datos.errorCode.value)"> ver</a>
    </form>
  );
}
