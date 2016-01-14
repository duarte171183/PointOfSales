@TicketForm = React.createClass
	
	
	getInitialState: ->
      subtotal: ''
      total: ''
      pay_with: ''
      change: ''
    
    valid: ->
      @state.subtotal && @state.total && @state.change && @state.pay_with

    handleChange: (e) ->
      name = e.target.name
      @setState "#{ name }": e.target.value
    

    handleSubmit: (e) ->
      e.preventDefault()
      $.post 'tickets',{ ticket: @state }, (data) =>
        @props.handleNewTicket data
        @setState @getInitialState()
      , 'JSON'
    
    render: ->
	      React.DOM.form
	        onSubmit: @handleSubmit
	        className: 'form-inline'
	        React.DOM.div
	          className: 'form-group'
	          React.DOM.input
	            type: 'number'
	            className: 'form-control'
	            placeholder: 'subtotal'
	            name: 'subtotal'
	            value: @state.subtotal
	            onChange: @handleChange
	        React.DOM.div
	          className: 'form-group'
	          React.DOM.input
	            type: 'number'
	            className: 'form-control'
	            placeholder: 'total'
	            name: 'total'
	            value: @state.total
	            onChange: @handleChange
	        React.DOM.div
	          className: 'form-group'
	          React.DOM.input
	            type: 'number'
	            className: 'form-control'
	            placeholder: 'pay_with'
	            name: 'pay_with'
	            value: @state.pay_with
	            onChange: @handleChange
	        React.DOM.div
	          className: 'form-group'
	          React.DOM.input
	            type: 'number'
	            className: 'form-control'
	            placeholder: 'change'
	            name: 'change'
	            value: @state.change
	            onChange: @handleChange
	        React.DOM.button
	          type: 'submit'
	          className: 'btn btn-primary'
	          disabled: !@valid()
	          'Cobrar'