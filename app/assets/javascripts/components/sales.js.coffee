@Sales = React.createClass
  getInitialState: ->
    sales: @props.data
  
  getDefaultProps: ->
    sales: []
  
  addSale: (sale) ->
    sales = @state.sales.slice()
    sales.push sale
    @setState sales: sales
  
  render: ->
    React.DOM.div
      className: 'row'
      
      React.DOM.div
       className: 'col-md-8'
       React.DOM.ul
        className: 'list-group'
        for sale in @state.sales
            React.createElement Sale, key: sale.id, sale: sale

      React.DOM.div
       className: 'col-md-4'    
       React.createElement SaleForm, handleNewSale: @addSale
       React.createElement TicketForm
      
      
      
      