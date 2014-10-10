var data = (function (data) {

  //Contructor
  function TicketLine(type, pricePerTicket, quantity, isChecked) {
    this.type = type;
    this.pricePerTicket = pricePerTicket;
    this.quantity = quantity;
    this.isChecked = isChecked;
  }

  function Shirt(id, imageUrl) {
    this.id = id;
    this.imageUrl = imageUrl;
  }

  data.ticketLines = [
    new TicketLine('Combi Ticket(01/07 and 02/07)', 60, 0, false),
    new TicketLine('Day Ticket(01/07)', 35, 0, false),
    new TicketLine('Day Ticket(02/07)', 35, 0, false),
    new TicketLine('Camping Ticket', 5, 0, false)
  ];

  data.shirts = [
    new Shirt(1, 'images/t-marvin.jpg'),
    new Shirt(2, 'images/t-commodores.jpg'),
    new Shirt(3, 'images/t-stevie.jpg')
  ];

  return data;
})(data || {});