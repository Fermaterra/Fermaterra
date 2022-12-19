const mailbody = (activities, bookId) => (

  ` <div>
    <p style="text-align:center;"><img src="shorturl.at/pt357" alt="Fermaterra"></p>
    <h1>Muchas gracias por confiar en Fermaterra</h1>
    <div>
      <p>Aquí tiene un resumen de su compra:</p>
      ${activities}
    </div>
    <p>Su pedido es el: ${bookId}</p>
    <p>Para cualquier consulta puede contactar con nosotros a través de:</p>
    <a href="https://www.instagram.com/fermaterra_/?igshid=YmMyMTA2M2Y%3D">Instagram | Facebook</a>
    <a href="mailto:info@terraferma.com">info@terraferma.com</a>
    <a href="tel:+34613035123">+34 613 035 123</a>
  </div>`
);

module.exports = mailbody;
