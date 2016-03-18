class Movie < NodeItem
	attr_accessor :runtime, :score, :release_date, :actors, :directors_ids

	def initialize(object)
		super(object['id'], "movie", object['poster_path'], object['original_title'], object['plot'])
		
		#@plot = object['overview']
		@release_date = object['release_date']
		@actors = object['credits']['cast'].map{|actor| {
			id: actor["id"],
			character: actor["character"].gsub("'",'')
		}}
		@directors_ids = object['credits']['crew'].select{|crew| crew["job"] == "Director"}.map{|crew| crew["id"]}

		@exloded_properties = [
			:@actors,
			:@directors_ids
		]
	end
end