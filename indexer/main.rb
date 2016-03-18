#require 'orient_db_client'

require 'require_all'
require './movie_dal'
require './orient_db'
require './indexer'

config = YAML.load_file("config.yml")

dal = MovieDal.new(config["movie_dal"]["api_key"])
graph = OrientDb.new(config["orient_db"])
indexer = Indexer.new(graph, dal)

movieId = 27205 # inception
movie = dal.get_movie(movieId)

indexer.start_index_recursively(movieId, 2)