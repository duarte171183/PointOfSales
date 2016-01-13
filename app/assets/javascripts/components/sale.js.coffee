@Sale = React.createClass
  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.sale.product_id
      React.DOM.td null, @props.sale.ticket_id
      React.DOM.td null, @props.sale.quantity
