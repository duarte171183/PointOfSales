class ProductSearchTerm
  attr_reader :where_clause, :where_args, :order
 
  def initialize(search_term)
    search_term = search_term.downcase
    @where_clause = ""
    @where_args = {}
 	  build_for_barcode_search(search_term)
  end

private

  def build_for_barcode_search(search_term)
    @where_clause << "CAST (#{:bar_code} AS text) like:#{:bar_code}"
    @where_args[:bar_code]  = starts_with(search_term)

    @where_clause << " OR #{case_insensitive_search(:name)}"
    @where_args[:name]  = starts_with(search_term)
    @oder = "name asc" 
  end

  def starts_with(search_term)
    "%"+search_term + "%"
  end

  def case_insensitive_search(field_name)
    "lower(#{field_name}) like :#{field_name}"
  end
end