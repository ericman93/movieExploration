class Director < Person
	def initialize(id, name, image, biography, birthday)
		super(id, image, name, biography, birthday, 'director')
	end
end