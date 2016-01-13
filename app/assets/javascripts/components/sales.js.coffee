@Sales = React.createClass
  getInitialState: ->
    sales: @props.data
  getDefaultProps: ->
    sales: []
  render: ->
    React.DOM.div
      className: 'sales'
      React.DOM.h2
        className: 'quantity'
        'Sales'
      React.createElement SaleForm, handleNewRecord: @addRecord
      React.DOM.hr null
      React.DOM.table
        className: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'product'
            React.DOM.th null, 'ticket'
            React.DOM.th null, 'quantity'
        React.DOM.tbody null,
          for sale in @state.sales
            React.createElement Sale, key: sale.id, sale: sale