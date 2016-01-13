@SaleForm = React.createClass
    getInitialState: ->
      product_id: ''
      ticket_id: ''
      quantity: ''
    handleChange: (e) ->
      name = e.target.name
      @setState "#{ name }": e.target.value
    valid: ->
      @state.product_id && @state.ticket_id && @state.quantity
    render: ->
      React.DOM.form
        className: 'form-inline'
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'number'
            className: 'form-control'
            placeholder: 'product_id'
            name: 'product_id'
            value: @state.product_id
            onChange: @handleChange
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'number'
            className: 'form-control'
            placeholder: 'ticket_id'
            name: 'ticket_id'
            value: @state.ticket_id
            onChange: @handleChange
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'number'
            className: 'form-control'
            placeholder: 'quantity'
            name: 'quantity'
            value: @state.quantity
            onChange: @handleChange
        React.DOM.button
          type: 'submit'
          className: 'btn btn-primary'
          disabled: !@valid()
          'Create record'
        


