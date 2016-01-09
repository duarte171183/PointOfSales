json.array!(@products) do |product|
  json.extract! product, :id, :name, :brand, :price, :purchaseprice, :dateofofexpiry, :minstock, :maxstock, :description
  json.url product_url(product, format: :json)
end
