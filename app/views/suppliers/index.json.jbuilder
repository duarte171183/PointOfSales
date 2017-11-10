json.array!(@suppliers) do |supplier|
  json.extract! supplier, :id, :name, :rfc, :phone_number, :email, :address, :postal_code
  json.url supplier_url(supplier, format: :json)
end
