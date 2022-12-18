const mailbody = (activities) => (

  ` <div>
    <h1>Muchas gracias por confiar en Fermaterra</h1>
    <div>
      <p>Aquí tiene un resumen de su compra:</p>
      ${activities}
    </div>
    <p>Su pedido es el: </p>
    <p>Para cualquier consulta puede contactar con nsotros a treavés de...</p>
  </div>`
);

module.exports = mailbody;
