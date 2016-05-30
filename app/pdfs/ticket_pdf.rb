class TicketPdf < Prawn::Document
	def initialize(ticket, view)
		super(top_margin: 70, :page_size => 'A3')
		@ticket = ticket
		@view = view
		ticket_number
		line_items
		total_price
	end

	def ticket_number
		text "Ticket \##{@ticket.id}", size: 12, style: :bold
	end

	def line_items
		move_down 20
		table line_item_rows
	end

	def line_item_rows
		[["Product", "Qty", "Total"]]+
		@ticket.sales.map do |item|
			[item.product.name, item.quantity, price(item.totalsale)]
		end
	end

	def price(num)
		@view.number_to_currency(num)
	end

	def total_price
		move_down 15
		text "Total: #{price(@ticket.total)}", size: 10, style: :bold
		text "Pay With: #{price(@ticket.pay_with)}", size: 10, style: :bold
		text "Change: #{price(@ticket.change)}", size: 10, style: :bold
	end
end
