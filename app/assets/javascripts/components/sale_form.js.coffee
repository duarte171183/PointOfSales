@SaleForm = React.createClass
    
    getInitialState: ->
      product_id: ''
      ticket_id: ''
      quantity: ''
    
    valid: ->
      @state.product_id && @state.quantity

    handleChange: (e) ->
      name = e.target.name
      @setState "#{ name }": e.target.value
    

    handleSubmit: (e) ->
      e.preventDefault()
      $.post '', { sale: @state }, (data) =>
        @props.handleNewSale data
        @setState @getInitialState()
      , 'JSON'
    
    render: ->
      React.DOM.form
        onSubmit: @handleSubmit
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
            placeholder: 'quantity'
            name: 'quantity'
            value: @state.quantity
            onChange: @handleChange
        React.DOM.button
          type: 'submit'
          className: 'btn btn-primary'
          disabled: !@valid()
          'Add Product'
        


