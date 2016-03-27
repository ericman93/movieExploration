class Actor < Person
	def initialize(id, name, image, biography, birthday)
		super(id, image, name, biography, birthday, 'actor')
	end
end