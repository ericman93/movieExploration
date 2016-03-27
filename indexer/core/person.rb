class Person < NodeItem
	attr_accessor :birthday, :movies_ids

	def initialize(id, image, name, biography, birthday, type)
		super(id, type, image, name, biography)
		@birthday = birthday
		@exloded_properties = [:@movies_ids]
	end
end