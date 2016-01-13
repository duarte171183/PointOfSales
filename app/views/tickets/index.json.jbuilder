json.array!(@tickets) do |ticket|
  json.extract! ticket, :id, :subtotal, :total, :pay_with, :change, :status
  json.url ticket_url(ticket, format: :json)
end
