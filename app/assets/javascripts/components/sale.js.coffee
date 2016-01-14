@Sale = React.createClass
  render: ->
    React.DOM.li 
      className: 'list-group-item'
      null, @props.sale.product_id,  
        React.DOM.span
          className: 'badge'
          null, @props.sale.quantity,  
