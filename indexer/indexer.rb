class Indexer
	def initialize(graph_db, movie_dal)
		@graph = graph_db
		@movie_dal = movie_dal
	end

	def start_index_recursively(movieId, ttl)
		index_movie(movieId, ttl)
	end

	private
		def index_movie(movieId, ttl)
			if(ttl > 0)
				movie = @movie_dal.get_movie(movieId)

				@graph.add_node movie.to_hash
				movie.actors.each{|actor| index_actor(movieId, actor, ttl)}
				movie.directors_ids.each{|director_id| index_director(movieId, director_id, ttl)}
			end
		end

		def index_actor(movieId, actor_data, ttl)
			actor = @movie_dal.get_actor(actor_data[:id])

			link = {
				role: "actor",
				character: actor_data[:character]
			}

			@graph.add_node actor.to_hash
			@graph.add_edge movieId, actor.uniqueId, "actor", link

			actor.movies_ids.each{|movie_id| index_movie(movie_id, ttl -1)}
		end

		def index_director(movieId, director_id, ttl)
			director = @movie_dal.get_director(director_id)

			link = {
				role: "director"
			}

			@graph.add_node director.to_hash
			@graph.add_edge movieId, director.uniqueId, "director", link

			director.movies_ids.each{|movie_id| index_movie(movie_id, ttl -1)}
		end
end

class MovieDalOld
	def initialize(graph_db)
		@graph = graph_db
	end

	def get_movie(movieId, ttl)
		if(ttl > 0)
			url = "https://api.themoviedb.org/3/movie/#{movieId}?append_to_response=credits&api_key=#{@api_key}"
			response = HTTParty.get(url)
			
			movie = Movie.new(response.parsed_response)
			
			@graph.add_node movie.to_hash
			index_directors(response.parsed_response['credits']['crew'], movieId, ttl)
			index_actors(response.parsed_response['credits']['cast'], movieId, ttl)
		end	
	end

	def get_actor(actor_id, movieId)
		actor_data = get_person(actor_id)
		actor = Actor.new(actor_data)

		@graph.add_node actor.to_hash
		@graph.add_edge movieId, a.uniqueId, "actor", link

		a["credits"]["cast"].each do |movie|
			get_movie(movie["uniqueId"], ttl - 1)
		end
	end

	def get_person(person_id)
		url = "https://api.themoviedb.org/3/person/#{person_id}?append_to_response=credits&api_key=#{@api_key}"
		response = HTTParty.get(url)

		response.parsed_response
	end

	def index_directors(crew, movieId, ttl)
		crew.select{|c| c['job'] == 'Director'}
		.each do |director|
			# link
			link = {
				role: "director"
			}

			director_data = get_person(director["id"])
			d = Director.new(director_data)
			@graph.add_node d.to_hash
			@graph.add_edge movieId, d.uniqueId, "director", link

			puts "~~~~~ #{d.title} #{ttl} ~~~~~"
			director_data["credits"]["crew"].each do |movie|
				if(movie["job"] == "Director")
					get_movie(movie["id"], ttl - 1)
				end
			end
		end
	end

	def index_actors(cast, movieId, ttl)
		cast.each do |actor|
			# link
			link = {
				role: "actor",
				character: actor["character"].gsub("'",'')
			}

			actor_data = get_person(actor["id"])
			a = Actor.new(actor_data)
			@graph.add_node a.to_hash
			@graph.add_edge movieId, a.uniqueId, "actor", link

			puts "~~~~~ #{a.title} #{ttl} ~~~~~"
			actor_data["credits"]["cast"].each do |movie|
				get_movie(movie["id"], ttl - 1)
			end
		end
	end
end
