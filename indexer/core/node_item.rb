class NodeItem
	attr_accessor :uniqueId, :type, :img, :title, :info

	def initialize(uniqueId, type, image, title, info)
		@uniqueId = uniqueId
		@type = type
		@img = "http://image.tmdb.org/t/p/w500/#{image}"
		@title = title
		@info = info
		@exloded_properties = []
	end

	def to_hash
		@exloded_properties.push :@exloded_properties

	    hash = {}
	    instance_variables.select{|var| !@exloded_properties.include?(var)}
	    				  .each {|var| hash[var.to_s.delete("@")] = instance_variable_get(var) }
	    hash
  	end

  	protected
	attr_accessor :exloded_properties
end