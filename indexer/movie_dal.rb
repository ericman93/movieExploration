require 'httparty'
require_all 'core'


class MovieDal
	def initialize(api_key)
		# movie to YAML
		@api_key = api_key
	end

	def get_movie(movieId)
		url = "https://api.themoviedb.org/3/movie/#{movieId}?append_to_response=credits&api_key=#{@api_key}"
		response = HTTParty.get(url)
		
		Movie.new(response.parsed_response)
		#index_directors(response.parsed_response['credits']['crew'], movieId, ttl)
		#index_actors(response.parsed_response['credits']['cast'], movieId, ttl)
	end

	def get_actor(actorId)
		actor, data = get_person(actorId, 'Actor')
		actor.movies_ids = data['credits']['cast'].map{|cast| cast['id']}

		actor
	end

	def get_director(directorId)
		director, data = get_person(directorId, 'Director')
		director.movies_ids = data['credits']['crew'].select{|crew| crew['job'] == 'Director'}
													 .map{|crew| crew['id']}

		director
	end

	private
	def get_person(person_id, person_type)
		url = "https://api.themoviedb.org/3/person/#{person_id}?append_to_response=credits&api_key=#{@api_key}"
		response = HTTParty.get(url)

		data = response.parsed_response
		person = Object.const_get(person_type).new(data['id'], data['name'], data['profile_path'], data['biography'], data['birthday'])

		return person, data
	end
end
